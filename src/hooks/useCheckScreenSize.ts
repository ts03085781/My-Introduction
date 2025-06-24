import { useState, useEffect } from 'react';
import { DeviceType } from '@/types/commonsType';

const useCheckScreenSize = (): DeviceType => {
  const [deviceType, setDeviceType] = useState<DeviceType>('Web');

  useEffect(() => {
    const checkScreenSize = () => {
      const width = window.innerWidth;
      setDeviceType(width <= 768 ? 'Mobile' : 'Web');
    };

    // 初始檢查
    checkScreenSize();

    // 監聽視窗大小變化
    window.addEventListener('resize', checkScreenSize);

    // 清理函數
    return () => {
      window.removeEventListener('resize', checkScreenSize);
    };
  }, []);

  return deviceType;
};

export default useCheckScreenSize;
