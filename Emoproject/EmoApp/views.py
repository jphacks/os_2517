from rest_framework.decorators import api_view
from rest_framework.response import Response
from django.http import HttpResponse
import requests
import base64
import openai
import os

# =======================================
# APIキー設定（環境変数から取得）
# =======================================
GOOGLE_MAPS_API_KEY = "AIzaSyBDLEzaQISZgfUy5uZ8x7mKyolyWPlp7EM"
WEATHER_API_KEY = "XVQYQYBQF72PMZULFPDMQTKFT"
openai.api_key = os.getenv("OPENAI_API_KEY")  # 環境変数から取得

# =======================================
# 基本エンドポイント
# =======================================
@api_view(['GET'])
def hello(request):
    return Response({"message": "Hello from Django!"})

# =======================================
# 天気情報取得関数
# =======================================
def get_weather_data(lat, lon, date):
    url = (
        f"https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/"
        f"{lat},{lon}/{date}?unitGroup=metric&key={WEATHER_API_KEY}&contentType=json"
    )
    response = requests.get(url)
    if response.status_code != 200:
        print("Weather API error:", response.status_code, response.text)
        return None

    data = response.json()
    return {
        "location": data.get("resolvedAddress"),
        "datetime": data["days"][0]["datetime"],
        "conditions": data["days"][0]["conditions"],
        "temp": data["days"][0]["temp"],
        "humidity": data["days"][0]["humidity"],
        "windspeed": data["days"][0]["windspeed"],
    }

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
# AI合成関数
# =======================================
def generate_ai_image_backend(image_bytes, prompt):
    """
    OpenAI Images API を使って Street View 画像を天気条件に合わせて合成
    """
    img_base64 = base64.b64encode(image_bytes).decode("utf-8")

    try:
        response = openai.images.generate(
            model="gpt-image-1",
            prompt=prompt,
            image=img_base64,
            size="1024x1024"
        )
        new_img_base64 = response.data[0].b64_json
        return base64.b64decode(new_img_base64)
    except Exception as e:
        print("OpenAI image generation error:", e)
        return None

# =======================================
# 天気情報API
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
# Street View画像API
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
        return HttpResponse("lat and lon are required", status=400)

    image_bytes = get_street_view_image(lat, lon, size, fov, heading, pitch)
    if not image_bytes:
        return HttpResponse("Failed to fetch map image", status=500)

    return HttpResponse(image_bytes, content_type="image/png")

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

    return HttpResponse(ai_image_bytes, content_type="image/png")
