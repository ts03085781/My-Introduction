import { useState, useEffect, useCallback } from 'react';
import { GoogleMap, Marker, Circle } from '@react-google-maps/api';
import { Button, Card, Input, Select } from 'antd';
import marker from '@/assets/images/marker.png';
import { SearchOutlined } from '@ant-design/icons';
import { useTranslation } from 'react-i18next';

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
  const { t } = useTranslation();
  const [currentLocation, setCurrentLocation] = useState<{
    lat: number;
    lng: number;
  } | null>(null);
  const [searchRadius, setSearchRadius] = useState(0); // 預設搜尋半徑 0 公尺
  const [minRating, setMinRating] = useState(4); // 預設最低星星數 4
  const [restaurants, setRestaurants] = useState<Restaurant[]>([]);
  const [loading, setLoading] = useState(true);

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
        () => {
          setLoading(false);
        }
      );
    } else {
      setLoading(false);
    }
  }, []);

  // 處理搜尋按鈕點擊事件
  const handleSearch = useCallback(async () => {
    if (!currentLocation) return;
    setLoading(true);
    setRestaurants([]);

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
        setRestaurants([]);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  }, [currentLocation, searchRadius, minRating]);

  // 渲染主畫面
  if (loading && !currentLocation) {
    return <div className="p-8">正在取得您的位置...</div>;
  }

  if (!currentLocation) {
    return <div className="p-8">無法顯示地圖，因為沒有位置資訊。</div>;
  }

  return (
    <div className="h-full">
      {/* 左側控制與結果面板 */}
      <Card className="mb-4">
        <h2 className="text-xl font-bold mb-2">
          {t('page.restaurantFinder.title')}
        </h2>
        <div className="flex gap-4 items-end flex-wrap">
          <div>
            <label className="block">
              {t('page.restaurantFinder.searchRadius')}
            </label>
            <Input
              className="w-[130px] mt-1"
              type="number"
              size="middle"
              min={100}
              max={3000}
              addonAfter={t('page.restaurantFinder.searchRadiusUnit')}
              value={searchRadius}
              onChange={(e) => setSearchRadius(Number(e.target.value))}
            />
          </div>
          <div>
            <label className="block">
              {t('page.restaurantFinder.minRating')}
            </label>
            <Select
              className="w-[130px] mt-1"
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
              {t('page.restaurantFinder.currentLocation')}
            </label>
            <Input
              className="w-[225px] mt-1"
              size="middle"
              value={`${t('page.restaurantFinder.latitude')}:${currentLocation?.lat.toFixed(5)}, ${t('page.restaurantFinder.longitude')}:${currentLocation?.lng.toFixed(5)}`}
              readOnly
            />
          </div>
          <Button
            size="middle"
            className="text-white py-2 px-4 rounded-md hover:bg-indigo-700 disabled:bg-gray-400"
            type="primary"
            onClick={handleSearch}
            disabled={loading}
          >
            <SearchOutlined />
          </Button>
        </div>
      </Card>

      {/* 地圖 */}
      <div className="flex w-full border rounded-lg h-[calc(100vh-382px)]">
        {/* 左側餐廳列表 */}
        <div className=" overflow-y-auto p-4 w-[460px]">
          {restaurants.length > 0 &&
            restaurants.map((place) => (
              <div
                key={place.id}
                className="p-4 mb-2 bg-white rounded-lg border border-gray-300"
              >
                <h3 className="text-lg font-semibold">{place.displayName}</h3>
                <p className="text-sm text-gray-600">
                  {t('page.restaurantFinder.rating')}: {place.rating} ⭐
                </p>
                <p className="text-sm text-gray-500">
                  {place.formattedAddress}
                </p>
              </div>
            ))}
          {restaurants.length === 0 && (
            <p className=" text-red-500 text-center text-lg">
              {t('page.restaurantFinder.noRestaurantFound')}
            </p>
          )}
        </div>

        {/* 右側地圖面板 */}
        <div className="w-full rounded-lg overflow-hidden">
          {currentLocation && (
            <GoogleMap
              mapContainerStyle={mapContainerStyle}
              center={currentLocation}
              zoom={15}
            >
              {/* 使用者位置標記 */}
              <Marker
                position={currentLocation}
                title={t('page.restaurantFinder.yourLocation')}
              />

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
          )}
        </div>
      </div>
    </div>
  );
};

export default RestaurantFinder;
