import { useSignal, useVisibleTask$, $ } from '@builder.io/qwik';

const STORAGE_KEY = 'userStore';

export const useUserStore = () => {
  const displayName = useSignal('');
  const userId = useSignal('');

  useVisibleTask$(() => {
    const storedUser = JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}');
    if (storedUser.displayName && storedUser.userId) {
      displayName.value = storedUser.displayName;
      userId.value = storedUser.userId;
    }
  });

  // ✅ ใช้ $() เพื่อให้ Qwik สามารถ serialize ฟังก์ชันได้
  const updateStore = $((newDisplayName: string, newUserId: string) => {
    displayName.value = newDisplayName;
    userId.value = newUserId;
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ displayName: newDisplayName, userId: newUserId }));
  });

  const logout = $(() => {
    displayName.value = '';
    userId.value = '';
    localStorage.removeItem(STORAGE_KEY);
  });

  return { displayName, userId, updateStore, logout };
};
