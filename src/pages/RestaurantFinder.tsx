import { useState, useEffect, useCallback } from 'react';
import { GoogleMap, Marker, Circle } from '@react-google-maps/api';
import { Card, Input, Select } from 'antd';
import marker from '@/assets/images/marker.png';

// 地圖容器的樣式
const mapContainerStyle = {
  width: '100%',
  height: '100%',
};

// 定義餐廳資料的型別 (使用公開、穩定的屬性名稱)
interface Restaurant {
  id: string;
  displayName: string;
  formattedAddress: string;
  rating: number;
  location: google.maps.LatLng;
}

const RestaurantFinder = () => {
  // 狀態管理
  const [currentLocation, setCurrentLocation] = useState<{
    lat: number;
    lng: number;
  } | null>(null);
  const [searchRadius, setSearchRadius] = useState(0); // 預設搜尋半徑 0 公尺
  const [minRating, setMinRating] = useState(4); // 預設最低星星數 4
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
  const handleSearch = useCallback(async () => {
    if (!currentLocation) return;
    setLoading(true);
    setRestaurants([]);
    setError(null);

    try {
      const request = {
        fields: ['id', 'displayName', 'formattedAddress', 'rating', 'location'],
        locationRestriction: {
          center: currentLocation,
          radius: searchRadius,
        },
        includedTypes: ['restaurant'],
      };

      const { places } = await google.maps.places.Place.searchNearby(request);

      // 在前端手動過濾評分 (使用公開屬性 p.rating)
      const filteredPlaces = places.filter(
        (p) => p.rating && p.rating >= minRating
      );
      if (filteredPlaces.length > 0) {
        // 建立我們自己的乾淨物件陣列
        const results = filteredPlaces.map((p) => ({
          id: p.id!,
          displayName: p.displayName!,
          formattedAddress: p.formattedAddress!,
          rating: p.rating!,
          location: new google.maps.LatLng(p.location!),
        })) as Restaurant[];

        // 排序
        const sortedResults = results.sort((a, b) => a.rating - b.rating);

        setRestaurants(sortedResults);
      } else {
        setError('找不到符合條件的餐廳。');
      }
    } catch (e) {
      console.error(e);
      setError('搜尋時發生錯誤。');
    } finally {
      setLoading(false);
    }
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
    <div className="h-full">
      {/* 左側控制與結果面板 */}
      <Card className="mb-4">
        <h2 className="text-xl font-bold mb-4">尋找附近餐廳</h2>
        <div className="flex gap-4">
          <div>
            <label className="block">搜尋範圍</label>
            <Input
              className="w-[160px] mt-1"
              type="number"
              size="middle"
              min={0}
              addonAfter="公尺"
              value={searchRadius}
              onChange={(e) => setSearchRadius(Number(e.target.value))}
            />
          </div>
          <div>
            <label className="block">最低星星數</label>
            <Select
              className="w-[160px] mt-1"
              size="middle"
              value={minRating}
              onChange={(value) => setMinRating(value)}
            >
              <option value={1}>⭐</option>
              <option value={2}>⭐⭐</option>
              <option value={3}>⭐⭐⭐</option>
              <option value={4}>⭐⭐⭐⭐</option>
            </Select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              您目前的座標
            </label>
            <div className="mt-1 p-2 bg-gray-200 rounded-md text-sm">
              緯度: {currentLocation?.lat.toFixed(5)}, 經度:{' '}
              {currentLocation?.lng.toFixed(5)}
            </div>
          </div>
          <button
            onClick={handleSearch}
            disabled={loading}
            className=" bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 disabled:bg-gray-400"
          >
            {loading ? '搜尋中...' : '搜尋'}
          </button>
        </div>
      </Card>

      {/* 地圖 */}
      {currentLocation && (
        <div className="flex gap-4 h-full w-full">
          {/* 餐廳列表 (使用公開屬性) */}
          {restaurants.length > 0 && (
            <div className=" overflow-y-auto max-h-[calc(100vh-300px)] p-4">
              {restaurants.map((place) => (
                <div
                  key={place.id}
                  className="p-4 mb-2 bg-white rounded-lg border border-gray-300"
                >
                  <h3 className="text-lg font-semibold">{place.displayName}</h3>
                  <p className="text-sm text-gray-600">
                    評分: {place.rating} ⭐
                  </p>
                  <p className="text-sm text-gray-500">
                    {place.formattedAddress}
                  </p>
                </div>
              ))}
            </div>
          )}

          {/* 右側地圖面板 (使用公開屬性) */}
          <div className="w-full h-full">
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
                  strokeColor: '#3b82f6',
                  strokeOpacity: 0.8,
                  strokeWeight: 2,
                  fillColor: '#3b82f6',
                  fillOpacity: 0.1,
                }}
              />

              {/* 餐廳位置標記 */}
              {restaurants.map((place) => (
                <Marker
                  key={place.id}
                  position={place.location}
                  title={place.displayName}
                  icon={{
                    url: marker,
                    scaledSize: new google.maps.Size(36, 36),
                  }}
                  //   label={{
                  //     text: place.displayName,
                  //     color: 'blue',
                  //     fontWeight: 'bold',
                  //     fontSize: '14px',
                  //   }}
                />
              ))}
            </GoogleMap>
          </div>
        </div>
      )}
    </div>
  );
};

export default RestaurantFinder;
