'use client';

import { useState, useMemo, useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from 'react-leaflet';
import L from 'leaflet';

interface MarkerPosition {
  lat: number;
  lng: number;
}

// カスタムマーカーアイコン
const createCustomIcon = () => {
  return L.icon({
    iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
  });
};

function LocationMarker({ 
  onLocationSelect, 
  onConfirm,
  initialPosition,
  router
}: { 
  onLocationSelect: (position: MarkerPosition) => void;
  onConfirm: (position: MarkerPosition) => void;
  initialPosition: MarkerPosition | null;
  router: ReturnType<typeof useRouter>;
}) {
  const [position, setPosition] = useState<MarkerPosition | null>(initialPosition);
  const markerRef = useRef<L.Marker>(null);

  const map = useMapEvents({
    click(e) {
      const newPosition = {
        lat: e.latlng.lat,
        lng: e.latlng.lng
      };
      setPosition(newPosition);
      onLocationSelect(newPosition);
      map.flyTo(e.latlng, map.getZoom());
      
      // 次のティックでポップアップを開く
      setTimeout(() => {
        if (markerRef.current) {
          markerRef.current.openPopup();
        }
      }, 0);
    },
  });

  const icon = useMemo(() => createCustomIcon(), []);

  const handleConfirm = () => {
    if (position) {
      onConfirm(position);
      // /timeページに遷移
      router.push('/time');
    }
  };

  return position === null ? null : (
    <Marker position={position} icon={icon} ref={markerRef}>
      <Popup autoClose={false} closeOnClick={true}>
        <div className="p-2">
          <div className="mb-2 text-center">
            <p className="text-xs text-slate-700 font-serif mb-1">この場所の記憶を探しますか?</p>
            <p className="text-[10px] text-slate-500">
              {position.lat.toFixed(4)}°N, {position.lng.toFixed(4)}°E
            </p>
          </div>
          <button
            onClick={handleConfirm}
            className="w-full px-5 py-2.5 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-serif text-sm rounded-lg hover:from-purple-600 hover:to-pink-600 transition-all duration-300 shadow-lg shadow-purple-500/30 hover:shadow-purple-500/50 hover:scale-[1.02] active:scale-95"
          >
            ✨ ここにする！
          </button>
        </div>
      </Popup>
    </Marker>
  );
}

const STORAGE_KEY = 'map_marker_position';

export default function InteractiveMap() {
  const [savedPosition, setSavedPosition] = useState<MarkerPosition | null>(null);
  const router = useRouter();
  
  // デフォルトの中心位置（東京）
  const defaultCenter: [number, number] = [35.6812405, 139.7671248];

  // 初回ロード時にセッションストレージから位置を読み込む
  useEffect(() => {
    const storedPosition = sessionStorage.getItem(STORAGE_KEY);
    if (storedPosition) {
      try {
        const position = JSON.parse(storedPosition);
        setSavedPosition(position);
      } catch (error) {
        console.error('Failed to parse stored position:', error);
      }
    }
  }, []);

  const handleLocationSelect = () => {
    // クリック時の処理（必要に応じて追加）
  };

  const handleConfirm = (position: MarkerPosition) => {
    // セッションストレージに保存
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify(position));
    setSavedPosition(position);
    console.log('位置を保存しました:', position);
  };

  return (
    <div className="w-full">
      <div className="w-full rounded-lg overflow-hidden shadow-lg" style={{ height: 'calc(100vh - 280px)', minHeight: '400px', maxHeight: '700px' }}>
        <MapContainer
          center={savedPosition ? [savedPosition.lat, savedPosition.lng] : defaultCenter}
          zoom={13}
          style={{ height: '100%', width: '100%' }}
          scrollWheelZoom={true}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <LocationMarker 
            onLocationSelect={handleLocationSelect} 
            onConfirm={handleConfirm}
            initialPosition={savedPosition}
            router={router}
          />
        </MapContainer>
      </div>
    </div>
  );
}
