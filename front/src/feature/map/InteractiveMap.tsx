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
            <p className="text-xs text-slate-700 mb-1">この場所でよろしいですか?</p>
            <p className="text-[10px] text-slate-500">
              {position.lat.toFixed(4)}°N, {position.lng.toFixed(4)}°E
            </p>
          </div>
          <button
            onClick={handleConfirm}
            className="w-full px-5 py-2.5 bg-sky-500 text-white text-sm rounded-lg hover:bg-sky-600 transition-all duration-300 shadow-lg shadow-sky-500/30 hover:shadow-sky-500/40 hover:scale-[1.03] active:scale-95 focus:outline-none focus:ring-4 focus:ring-sky-400/50"
          >
            ✨ ここに決めた
          </button>
        </div>
      </Popup>
    </Marker>
  );
}

const STORAGE_KEY = 'map_marker_position';

export default function InteractiveMap() {
  const [savedPosition, setSavedPosition] = useState<MarkerPosition | null>(null);
  const [isMounted, setIsMounted] = useState(false);
  const router = useRouter();
  
  // デフォルトの中心位置(東京)
  const defaultCenter: [number, number] = [35.6812405, 139.7671248];

  // クライアントサイドでマウント後にsessionStorageを読み込む
  useEffect(() => {
    setIsMounted(true);
    
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
    if (isMounted) {
      sessionStorage.setItem(STORAGE_KEY, JSON.stringify(position));
    }
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
