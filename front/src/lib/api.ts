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
  datetime: Date
): Promise<string> {
  // TODO: 実際のAPIエンドポイントに置き換える
  // const response = await fetch('YOUR_API_ENDPOINT', {
  //   method: 'POST',
  //   headers: { 'Content-Type': 'application/json' },
  //   body: JSON.stringify({
  //     location: {
  //       lat: position.lat,
  //       lon: position.lng,
  //     },
  //     date: datetime,
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
 * モック用のBase64画像を生成（ランダムな縦横比）
 */
function generateMockBase64Image(position: Position, datetime: Date): string {
  // ランダムな縦横比を生成
  const aspectRatios = [
    { width: 800, height: 600 },   // 4:3 横長
    { width: 1200, height: 800 },  // 3:2 横長
    { width: 1000, height: 1000 }, // 1:1 正方形
    { width: 600, height: 900 },   // 2:3 縦長
    { width: 800, height: 1200 },  // 2:3 縦長
    { width: 1600, height: 900 },  // 16:9 ワイド横長
    { width: 900, height: 1600 },  // 9:16 ワイド縦長
    { width: 1400, height: 1000 }, // 7:5 横長
    { width: 700, height: 1000 },  // 7:10 縦長
  ];
  
  // 位置情報からランダムシードを生成（同じ位置では同じ縦横比になる）
  const seed = Math.abs(Math.floor(position.lat * 1000 + position.lng * 1000));
  const selectedRatio = aspectRatios[seed % aspectRatios.length];
  
  // 簡易的なカラフルな画像を生成（デモ用）
  const canvas = document.createElement('canvas');
  canvas.width = selectedRatio.width;
  canvas.height = selectedRatio.height;
  const ctx = canvas.getContext('2d');
  
  if (ctx) {
    // グラデーション背景
    const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
    const hue = Math.abs(position.lat + position.lng) % 360;
    gradient.addColorStop(0, `hsl(${hue}, 70%, 60%)`);
    gradient.addColorStop(0.5, `hsl(${(hue + 40) % 360}, 80%, 50%)`);
    gradient.addColorStop(1, `hsl(${(hue + 80) % 360}, 70%, 40%)`);
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    // ランダムな円を追加（装飾）
    const circleCount = 5 + (seed % 8);
    for (let i = 0; i < circleCount; i++) {
      const x = ((seed * (i + 1) * 123) % canvas.width);
      const y = ((seed * (i + 1) * 456) % canvas.height);
      const radius = 30 + ((seed * (i + 1)) % 100);
      const alpha = 0.1 + ((seed * (i + 1)) % 30) / 100;
      
      ctx.fillStyle = `hsla(${(hue + i * 60) % 360}, 80%, 60%, ${alpha})`;
      ctx.beginPath();
      ctx.arc(x, y, radius, 0, Math.PI * 2);
      ctx.fill();
    }
    
    // テキスト表示
    const fontSize = Math.min(canvas.width, canvas.height) / 20;
    ctx.fillStyle = 'rgba(255, 255, 255, 0.9)';
    ctx.shadowColor = 'rgba(0, 0, 0, 0.5)';
    ctx.shadowBlur = 10;
    ctx.font = `bold ${fontSize}px sans-serif`;
    ctx.textAlign = 'center';
    ctx.fillText('Generated Memory', canvas.width / 2, canvas.height / 2 - fontSize);
    
    ctx.font = `${fontSize * 0.6}px sans-serif`;
    ctx.fillText(`${selectedRatio.width}×${selectedRatio.height}`, canvas.width / 2, canvas.height / 2);
    
    ctx.font = `${fontSize * 0.5}px sans-serif`;
    ctx.fillText(`${position.lat.toFixed(4)}°N, ${position.lng.toFixed(4)}°E`, canvas.width / 2, canvas.height / 2 + fontSize * 0.8);
    ctx.fillText(new Date(datetime).toLocaleString('ja-JP'), canvas.width / 2, canvas.height / 2 + fontSize * 1.5);
  }
  
  return canvas.toDataURL('image/png');
}
