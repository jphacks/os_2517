from rest_framework.decorators import api_view
from rest_framework.response import Response
from django.http import HttpResponse
import requests
import base64
from openai import OpenAI
import os
from dotenv import load_dotenv
from PIL import Image
import io


# =======================================
# APIキー設定
# =======================================
GOOGLE_MAPS_API_KEY ="AIzaSyBDLEzaQISZgfUy5uZ8x7mKyolyWPlp7EM"
WEATHER_API_KEY = "XVQYQYBQF72PMZULFPDMQTKFT"
openai_key=os.getenv("OPENAI_APIKEY")


# =======================================
# 天気情報取得関数
# =======================================
def get_weather_data(lat, lon, date):
    url = (
        f"https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/"
        f"{lat},{lon}/{date}?unitGroup=metric&key={WEATHER_API_KEY}&contentType=json"
    )
    print(f"Fetching weather data from: {url}")  # デバッグ用
    
    try:
        response = requests.get(url)
        print(f"Weather API response status: {response.status_code}")  # デバッグ用
        
        if response.status_code != 200:
            print("Weather API error:", response.status_code, response.text)
            return None

        data = response.json()
        print(f"Weather API response data: {data}")  # デバッグ用
        
        result = {
            "location": data.get("resolvedAddress"),
            "datetime": data["days"][0]["datetime"],
            "conditions": data["days"][0]["conditions"],
            "temp": data["days"][0]["temp"],
            "humidity": data["days"][0]["humidity"],
            "windspeed": data["days"][0]["windspeed"],
        }
        print(f"Processed weather data: {result}")  # デバッグ用
        return result
        
    except Exception as e:
        import traceback
        print("Error fetching weather data:", str(e))
        print("Traceback:", traceback.format_exc())
        return None

# =======================================
# Street View画像取得関数
# =======================================
def get_street_view_image(lat, lon, size="600x400", fov="80", heading="0", pitch="0"):
    url = (
        f"https://maps.googleapis.com/maps/api/streetview?"
        f"size={size}&location={lat},{lon}&fov={fov}&heading={heading}&pitch={pitch}"
        f"&key={GOOGLE_MAPS_API_KEY}"
    )
    response = requests.get(url)
    if response.status_code != 200:
        print("Street View API error:", response.status_code, response.text)
        return None
    return response.content

# =======================================
# AI合成関数（クロップ＋正方形化）
# =======================================
def fallback_generate_local_image(image_bytes, weather):
    """簡易フォールバック: 天気に応じた画像処理をローカルで行い返す
    weather: dict または文字列（'Rain'が含まれるか等を判定）
    """
    try:
        img = Image.open(io.BytesIO(image_bytes))
        if img.mode != 'RGBA':
            img = img.convert('RGBA')

        overlay = Image.new('RGBA', img.size, (0, 0, 0, 0))
        draw = None

        cond = ''
        try:
            if isinstance(weather, dict):
                cond = weather.get('conditions', '')
            else:
                cond = str(weather)
        except Exception:
            cond = str(weather)

        # Overcast / Rain などに対する簡易処理
        if 'Rain' in cond or 'rain' in cond.lower():
            # 暗めのグレー半透明レイヤーを重ねる
            overlay = Image.new('RGBA', img.size, (50, 50, 70, 120))
            # 軽い雨線を描画
            from PIL import ImageDraw
            draw = ImageDraw.Draw(overlay)
            w, h = img.size
            for i in range(0, 200, 6):
                x = (i * 7) % w
                draw.line((x, 0, x + 10, h), fill=(200, 200, 255, 80), width=1)
        elif 'Overcast' in cond or 'cloud' in cond.lower():
            overlay = Image.new('RGBA', img.size, (40, 40, 50, 110))
        elif 'Snow' in cond or 'snow' in cond.lower():
            overlay = Image.new('RGBA', img.size, (220, 240, 255, 80))
        else:
            # それ以外は軽く色温度を下げる
            overlay = Image.new('RGBA', img.size, (0, 0, 0, 30))

        combined = Image.alpha_composite(img, overlay)

        # RGBに戻して保存
        out = combined.convert('RGB')
        buf = io.BytesIO()
        out.save(buf, format='PNG')
        return buf.getvalue()
    except Exception as e:
        print('Fallback image generation error:', e)
        return None


def generate_ai_image_backend(image_bytes, prompt, weather=None, size=1024):
    """Try OpenAI image edit; on billing-limit or similar errors, return a local fallback image."""
    try:
        img = Image.open(io.BytesIO(image_bytes))
        if img.mode != "RGB":
            img = img.convert("RGB")

        # 正方形クロップ
        min_side = min(img.width, img.height)
        left = (img.width - min_side) // 2
        top = (img.height - min_side) // 2
        right = left + min_side
        bottom = top + min_side
        img_cropped = img.crop((left, top, right, bottom))

        # リサイズ
        img_resized = img_cropped.resize((size, size))

        # PNGとして保存
        buffer = io.BytesIO()
        img_resized.save(buffer, format="PNG")
        buffer.seek(0)

        # ensure file-like has a name so multipart gets correct mimetype
        try:
            buffer.name = 'image.png'
        except Exception:
            class FileLike(io.BytesIO):
                pass
            new_buf = FileLike(buffer.getvalue())
            new_buf.name = 'image.png'
            buffer = new_buf




        print(os.getenv("OPENAI_APIKEY"))

        client = OpenAI(api_key=openai_key)

        response = client.images.create_variation(
        image=open("image_edit_original.png", "rb"),
        n=2,
        size="1024x1024",
        response_format="b64_json"
        )


        # 生成結果からbase64を取得（SDKによってはdata[].b64_json または url になるため両対応）
        if hasattr(response, 'data') and len(response.data) > 0:
            item = response.data[0]
            if hasattr(item, 'b64_json') and item.b64_json:
                new_img_base64 = item.b64_json
                return base64.b64decode(new_img_base64)
            elif hasattr(item, 'url') and item.url:
                image_url = item.url
                image_response = requests.get(image_url)
                if image_response.status_code == 200:
                    return image_response.content

        print("OpenAI response did not contain image data:", response)
        # フォールバック
        return fallback_generate_local_image(image_bytes, weather)

    except Exception as e:
        import traceback
        print("OpenAI image generation error:", e)
        print(traceback.format_exc())
        # 課金上限等のエラーが来た場合はフォールバック生成
        try:
            if 'billing_hard_limit_reached' in str(e) or 'Billing hard limit' in str(e):
                print('Detected billing hard limit, using local fallback image')
                return fallback_generate_local_image(image_bytes, weather)
        except Exception:
            pass
        # その他のエラーでもフォールバックを試す
        return fallback_generate_local_image(image_bytes, weather)
# =======================================
# Street View画像取得エンドポイント
# =======================================
@api_view(['GET'])
def get_map_file(request):
    lat = request.GET.get('lat')
    lon = request.GET.get('lon')
    size = request.GET.get('size', '600x400')
    fov = request.GET.get('fov', '80')
    heading = request.GET.get('heading', '0')
    pitch = request.GET.get('pitch', '0')

    if not lat or not lon:
        return Response({"error": "lat and lon are required"}, status=400)

    image_bytes = get_street_view_image(lat, lon, size, fov, heading, pitch)
    if not image_bytes:
        return Response({"error": "Failed to fetch map image"}, status=500)

    return HttpResponse(image_bytes, content_type="image/png")

# =======================================
# 天気情報取得エンドポイント
# =======================================
@api_view(['GET'])
def get_weather(request):
    lat = request.GET.get('lat')
    lon = request.GET.get('lon')
    date = request.GET.get('date')

    if not lat or not lon or not date:
        return Response({"error": "lat, lon, and date are required"}, status=400)

    data = get_weather_data(lat, lon, date)
    if not data:
        return Response({"error": "Failed to fetch weather data"}, status=500)

    return Response(data)

# =======================================
# AI合成用エンドポイント
# =======================================
@api_view(['GET'])
def generate_ai_image(request):
    lat = request.GET.get('lat')
    lon = request.GET.get('lon')
    date = request.GET.get('date')

    if not lat or not lon or not date:
        return Response({"error": "lat, lon, date are required"}, status=400)

    # 天気情報取得
    weather_data = get_weather_data(lat, lon, date)
    if not weather_data:
        return Response({"error": "Failed to fetch weather"}, status=500)

    # Street View画像取得
    image_bytes = get_street_view_image(lat, lon)
    if not image_bytes:
        return Response({"error": "Failed to fetch map image"}, status=500)

    # AIに送信するプロンプト生成
    prompt = f"""
このStreet View画像をもとに、以下の天気条件に合わせて合成加工してください。
天気: {weather_data['conditions']}
気温: {weather_data['temp']}°C
湿度: {weather_data['humidity']}%
風速: {weather_data['windspeed']} km/h
"""

    # AI合成
    ai_image_bytes = generate_ai_image_backend(image_bytes, prompt)
    if not ai_image_bytes:
        return Response({"error": "AI image generation failed"}, status=500)

    # 生成画像をPNGで返す
    return HttpResponse(ai_image_bytes, content_type="image/png")
