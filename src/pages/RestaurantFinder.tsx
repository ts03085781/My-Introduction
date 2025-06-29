import { useState, useEffect, useCallback } from 'react';
import { GoogleMap, LoadScript, Marker, Circle } from '@react-google-maps/api';

// 定義餐廳資料的型別
interface Restaurant {
  place_id: string;
  name: string;
  vicinity: string;
  rating: number;
  geometry: google.maps.places.PlaceGeometry;
}

// 地圖容器的樣式
const mapContainerStyle = {
  width: '100%',
  height: '100%',
};

// 從環境變數讀取 API Key
const API_KEY = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;

const RestaurantFinder = () => {
  // 狀態管理
  const [currentLocation, setCurrentLocation] = useState<{
    lat: number;
    lng: number;
  } | null>(null);
  const [searchRadius, setSearchRadius] = useState(1000); // 預設搜尋半徑 1000 公尺
  const [minRating, setMinRating] = useState(4.0); // 預設最低星星數 4.0
  const [restaurants, setRestaurants] = useState<Restaurant[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // 當元件載入時，取得使用者位置
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setCurrentLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          });
          setLoading(false);
        },
        (err) => {
          setError(`無法取得位置: ${err.message}`);
          setLoading(false);
        }
      );
    } else {
      setError('您的瀏覽器不支援地理位置功能。');
      setLoading(false);
    }
  }, []);

  // 處理搜尋按鈕點擊事件
  const handleSearch = useCallback(() => {
    if (!currentLocation) return;
    setLoading(true);
    setRestaurants([]);

    const service = new google.maps.places.PlacesService(
      document.createElement('div')
    );

    const request: google.maps.places.PlaceSearchRequest = {
      location: currentLocation,
      radius: searchRadius,
      type: 'restaurant',
    };

    service.nearbySearch(request, (results, status) => {
      if (status === google.maps.places.PlacesServiceStatus.OK && results) {
        const filteredResults = results.filter(
          (place) =>
            place.rating &&
            place.rating >= minRating &&
            place.geometry?.location
        ) as Restaurant[];

        // 為了排序，我們需要真正的 Google LatLng 物件
        const sortedResults = filteredResults.sort((a, b) => {
          const distA = google.maps.geometry.spherical.computeDistanceBetween(
            new google.maps.LatLng(currentLocation),
            a.geometry.location!
          );
          const distB = google.maps.geometry.spherical.computeDistanceBetween(
            new google.maps.LatLng(currentLocation),
            b.geometry.location!
          );
          return distA - distB;
        });

        setRestaurants(sortedResults);
      } else {
        setError('找不到符合條件的餐廳。');
      }
      setLoading(false);
    });
  }, [currentLocation, searchRadius, minRating]);

  // 渲染主畫面
  if (loading && !currentLocation) {
    return <div className="p-8">正在取得您的位置...</div>;
  }

  if (error) {
    return <div className="p-8 text-red-500">{error}</div>;
  }

  if (!currentLocation) {
    return <div className="p-8">無法顯示地圖，因為沒有位置資訊。</div>;
  }

  return (
    <LoadScript googleMapsApiKey={API_KEY} libraries={['places', 'geometry']}>
      <div className="flex h-[calc(100vh-theme_header_height)]">
        {/* 左側控制與結果面板 */}
        <div className="w-1/3 p-4 overflow-y-auto bg-gray-100">
          <h2 className="text-2xl font-bold mb-4">尋找附近餐廳</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                搜尋範圍 (公尺)
              </label>
              <input
                type="number"
                value={searchRadius}
                onChange={(e) => setSearchRadius(Number(e.target.value))}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                最低星星數 (1-5)
              </label>
              <input
                type="number"
                step="0.1"
                min="1"
                max="5"
                value={minRating}
                onChange={(e) => setMinRating(Number(e.target.value))}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                您目前的座標
              </label>
              <div className="mt-1 p-2 bg-gray-200 rounded-md text-sm">
                緯度: {currentLocation.lat.toFixed(5)}, 經度:{' '}
                {currentLocation.lng.toFixed(5)}
              </div>
            </div>
          </div>
          <button
            onClick={handleSearch}
            disabled={loading}
            className="mt-6 w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 disabled:bg-gray-400"
          >
            {loading ? '搜尋中...' : '搜尋'}
          </button>

          <div className="mt-6">
            {restaurants.map((place) => (
              <div
                key={place.place_id}
                className="p-4 mb-2 bg-white rounded-lg shadow"
              >
                <h3 className="text-lg font-semibold">{place.name}</h3>
                <p className="text-sm text-gray-600">評分: {place.rating} ⭐</p>
                <p className="text-sm text-gray-500">{place.vicinity}</p>
              </div>
            ))}
          </div>
        </div>

        {/* 右側地圖面板 */}
        <div className="w-2/3">
          <GoogleMap
            mapContainerStyle={mapContainerStyle}
            center={currentLocation}
            zoom={15}
          >
            {/* 使用者位置標記 */}
            <Marker position={currentLocation} title="您的位置" />

            {/* 搜尋範圍圓圈 */}
            <Circle
              center={currentLocation}
              radius={searchRadius}
              options={{
                strokeColor: '#FF0000',
                strokeOpacity: 0.8,
                strokeWeight: 2,
                fillColor: '#FF0000',
                fillOpacity: 0.1,
              }}
            />

            {/* 餐廳位置標記 */}
            {restaurants.map((place) => (
              <Marker
                key={place.place_id}
                position={place.geometry.location!}
                title={place.name}
              />
            ))}
          </GoogleMap>
        </div>
      </div>
    </LoadScript>
  );
};

export default RestaurantFinder;
