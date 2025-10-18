/**
 * セッションストレージのキー定数
 */
export const STORAGE_KEYS = {
  MAP_POSITION: 'map_marker_position',
  DATETIME: 'selected_datetime',
} as const;

/**
 * 位置情報の型定義
 */
export interface Position {
  lat: number;
  lng: number;
}

/**
 * 生成された画像の型定義
 */
export interface GeneratedImage {
  id: string;
  base64: string;
  position: Position;
  datetime: string;
  createdAt: string;
}
