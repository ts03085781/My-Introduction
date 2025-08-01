import { useState, useEffect, useCallback, useRef } from 'react';
import {
  GoogleMap,
  Marker,
  Circle,
  DirectionsRenderer,
} from '@react-google-maps/api';
import { Button, Card, Input, Select, Tooltip } from 'antd';
import marker from '@/assets/images/marker.png';
import { SearchOutlined } from '@ant-design/icons';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { selectTheme } from '@/store/slices/themeSlice';
import { mapStylesOfDarkTheme } from '@/constants/restaurantFinder';

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
  userRatingCount: number;
  businessStatus: string;
}

interface CurrentLocation {
  lat: number;
  lng: number;
}

const RestaurantFinder = () => {
  const { t } = useTranslation();
  const [currentLocation, setCurrentLocation] =
    useState<CurrentLocation | null>(null);
  const [searchRadius, setSearchRadius] = useState<number>(0); // 預設搜尋半徑 0 公尺
  const [minRating, setMinRating] = useState<number>(4); // 預設最低星星數 4
  const [restaurants, setRestaurants] = useState<Restaurant[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [directions, setDirections] =
    useState<google.maps.DirectionsResult | null>(null);
  const [selectedRestaurant, setSelectedRestaurant] =
    useState<Restaurant | null>(null);
  const theme = useSelector(selectTheme);
  const restaurantCardRefs = useRef<{ [id: string]: HTMLDivElement | null }>(
    {}
  );

  // 翻譯營業狀態
  const translateBusinessStatus = (businessStatus: string) => {
    switch (businessStatus) {
      case 'OPERATIONAL':
        return t('page.restaurantFinder.businessStatus.OPERATIONAL');
      case 'CLOSED_PERMANENTLY':
        return t('page.restaurantFinder.businessStatus.CLOSED_PERMANENTLY');
      case 'CLOSED_TEMPORARILY':
        return t('page.restaurantFinder.businessStatus.CLOSED_TEMPORARILY');
      default:
        return businessStatus;
    }
  };

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
    setDirections(null); // 清除路線
    setSelectedRestaurant(null); // 清除選中的餐廳

    try {
      const request = {
        fields: [
          'id',
          'displayName',
          'formattedAddress',
          'rating',
          'location',
          'userRatingCount',
          'businessStatus',
        ],
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
          userRatingCount: p.userRatingCount!,
          businessStatus: p.businessStatus!,
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

  // 處理餐廳卡片點擊事件
  const handleRestaurantClick = useCallback(
    async (restaurant: Restaurant) => {
      if (!currentLocation) return;

      setSelectedRestaurant(restaurant);

      try {
        const directionsService = new google.maps.DirectionsService();

        const result = await directionsService.route({
          origin: currentLocation,
          destination: restaurant.location,
          travelMode: google.maps.TravelMode.WALKING,
        });

        setDirections(result);
      } catch (error) {
        console.error('路線計算失敗:', error);
      }
    },
    [currentLocation]
  );

  // 清除路線
  const clearRoute = useCallback(() => {
    setDirections(null);
    setSelectedRestaurant(null);
  }, []);

  useEffect(() => {
    if (
      selectedRestaurant &&
      restaurantCardRefs.current[selectedRestaurant.id]
    ) {
      restaurantCardRefs.current[selectedRestaurant.id]?.scrollIntoView({
        behavior: 'smooth',
        block: 'center',
      });
    }
  }, [selectedRestaurant]);

  // 渲染主畫面
  if (loading && !currentLocation) {
    return <div className="p-8">正在取得您的位置...</div>;
  }

  if (!currentLocation) {
    return <div className="p-8">無法顯示地圖，因為沒有位置資訊。</div>;
  }

  return (
    <div className="h-full">
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
            <label className="block">
              {t('page.restaurantFinder.currentLocation')}
            </label>
            <Input
              className="w-[225px] mt-1"
              size="middle"
              value={`${t('page.restaurantFinder.latitude')}:${currentLocation?.lat.toFixed(5)}, ${t('page.restaurantFinder.longitude')}:${currentLocation?.lng.toFixed(5)}`}
              readOnly
            />
          </div>
          <Tooltip title={t('page.restaurantFinder.search')}>
            <Button
              size="middle"
              className="text-white py-2 px-4 rounded-md hover:bg-indigo-700 disabled:bg-gray-400"
              type="primary"
              onClick={handleSearch}
              disabled={loading}
            >
              <SearchOutlined />
            </Button>
          </Tooltip>
        </div>
      </Card>

      {/* 地圖 */}
      <div className="flex w-full border rounded-lg h-[calc(100vh-120px)] dark:bg-[#1f2937] dark:border-none">
        {/* 左側餐廳列表 */}
        <div className="restaurant-list overflow-y-auto p-4 w-[460px]">
          {restaurants.map((place) => (
            <div
              key={place.id}
              ref={(el) => {
                restaurantCardRefs.current[place.id] = el;
              }}
              className={`restaurant-card p-4 mb-2 rounded-lg border cursor-pointer transition-all duration-200 hover:shadow-md hover:scale-105 ${
                selectedRestaurant?.id === place.id
                  ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                  : 'border-gray-300 dark:border-gray-700'
              }`}
              onClick={() => handleRestaurantClick(place)}
            >
              <h3 className="text-lg font-semibold">{place.displayName}</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                {t('page.restaurantFinder.rating')}: {place.rating} ⭐
              </p>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                {t('page.restaurantFinder.userRatingCount')}:{' '}
                {place.userRatingCount}
              </p>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                {t('page.restaurantFinder.businessStatus.title')}:{' '}
                {translateBusinessStatus(place.businessStatus)}
              </p>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                {t('page.restaurantFinder.formattedAddress')}:{' '}
                {place.formattedAddress}
              </p>
              {selectedRestaurant?.id === place.id && (
                <p className="text-sm text-blue-600 dark:text-blue-400 mt-2 font-medium">
                  {t('page.restaurantFinder.showedRestaurantRoute')}
                </p>
              )}
            </div>
          ))}

          {restaurants.length === 0 && (
            <p className="text-red-500 text-center text-lg">
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
              options={{
                styles: theme === 'dark' ? mapStylesOfDarkTheme : [], // 亮色模式使用預設樣式
                zoomControl: true, // 縮放控制
                mapTypeControl: false, // 地圖類型控制
                scaleControl: true, // 比例尺控制
                streetViewControl: false, // 街景檢視控制
                rotateControl: false, // 旋轉控制
                fullscreenControl: true, // 全螢幕控制
              }}
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
                  onClick={() => handleRestaurantClick(place)}
                />
              ))}

              {/* 路線渲染 */}
              {directions && (
                <DirectionsRenderer
                  directions={directions}
                  options={{
                    polylineOptions: {
                      strokeColor: '#3b82f6',
                      strokeWeight: 5,
                    },
                  }}
                />
              )}

              {/* 清除路線按鈕 */}
              {selectedRestaurant && (
                <div className="flex justify-center mt-4 w-fit mx-auto">
                  <Button
                    type="primary"
                    onClick={clearRoute}
                    className="w-full"
                  >
                    {t('page.restaurantFinder.clearRoute')}
                  </Button>
                </div>
              )}
            </GoogleMap>
          )}
        </div>
      </div>
    </div>
  );
};

export default RestaurantFinder;
