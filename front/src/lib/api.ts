import { Position } from '@/types';

/**
 * 🚧 モックAPI: 実際のAPIに置き換える必要があります
 * 
 * @param position - 緯度経度
 * @param datetime - 日時 (ISO 8601形式)
 * @returns Base64エンコードされた画像データ
 */
export async function generateImage(
  position: Position,
  datetime: string
): Promise<string> {
  // TODO: 実際のAPIエンドポイントに置き換える
  // const response = await fetch('YOUR_API_ENDPOINT', {
  //   method: 'POST',
  //   headers: { 'Content-Type': 'application/json' },
  //   body: JSON.stringify({
  //     latitude: position.lat,
  //     longitude: position.lng,
  //     datetime: datetime,
  //   }),
  // });
  // const data = await response.json();
  // return data.image;

  // モック実装: 2-4秒のランダムな遅延をシミュレート
  await new Promise(resolve => setTimeout(resolve, 2000 + Math.random() * 2000));

  // モック画像（1x1のグラデーション画像）
  // 実際のAPIからはBase64形式で画像が返ってくる想定
  const mockImage = generateMockBase64Image(position, datetime);
  
  return mockImage;
}

/**
 * モック用のBase64画像を生成
 */
function generateMockBase64Image(position: Position, datetime: string): string {
  // 簡易的なカラフルな画像を生成（デモ用）
  const canvas = document.createElement('canvas');
  canvas.width = 800;
  canvas.height = 600;
  const ctx = canvas.getContext('2d');
  
  if (ctx) {
    // グラデーション背景
    const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
    const hue = Math.abs(position.lat + position.lng) % 360;
    gradient.addColorStop(0, `hsl(${hue}, 70%, 60%)`);
    gradient.addColorStop(1, `hsl(${(hue + 60) % 360}, 70%, 40%)`);
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    // テキスト表示
    ctx.fillStyle = 'white';
    ctx.font = 'bold 32px sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('Generated Image', canvas.width / 2, canvas.height / 2 - 40);
    
    ctx.font = '20px sans-serif';
    ctx.fillText(`Lat: ${position.lat.toFixed(4)}, Lng: ${position.lng.toFixed(4)}`, canvas.width / 2, canvas.height / 2 + 10);
    ctx.fillText(new Date(datetime).toLocaleString('ja-JP'), canvas.width / 2, canvas.height / 2 + 40);
  }
  
  return canvas.toDataURL('image/png');
}
