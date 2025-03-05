import { useStore } from '@builder.io/qwik';

export const useUserStore = () => {
  // ตรวจสอบว่าอยู่ในฝั่ง Client
  const isClient = typeof window !== 'undefined';

  // อ่านข้อมูลจาก localStorage หากเป็น client-side
  const displayName = isClient ? localStorage.getItem('userDisplayName') || 'Guest' : 'Guest';
  const userId = isClient ? parseInt(localStorage.getItem('userId') || '0') : 0;

  return useStore({
    displayName,
    userId,
  });
};
