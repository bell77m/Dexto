import { component$, useStore } from '@builder.io/qwik';

interface VoiceChatProps {
  name: string;
  pic: string;
  mic: string;
}

export const VoiceChat = component$<VoiceChatProps>(({ name, pic, mic }) => {
  // Store เก็บสีที่ถูกใช้ไปแล้ว
  const store = useStore({
    usedColors: [] as string[],
  });

  // 🌈 สีรุ้ง 7 สี ระดับ 500
  const rainbowColors = [
    "border-red-500", "border-orange-500", "border-yellow-500",
    "border-green-500", "border-blue-500", "border-indigo-500", "border-purple-500"
  ];

  // ฟังก์ชันสุ่มสีแบบไม่ซ้ำ
  const getUniqueRainbowColor = () => {
    // หาเฉพาะสีที่ยังไม่ถูกใช้
    const availableColors = rainbowColors.filter(c => !store.usedColors.includes(c));

    // ถ้าสีหมดแล้ว ให้รีเซ็ต
    if (availableColors.length === 0) {
      store.usedColors = [];
    }

    // เลือกสีแบบสุ่มจากสีที่เหลืออยู่
    const randomColor = availableColors[Math.floor(Math.random() * availableColors.length)];

    // บันทึกสีที่ถูกใช้ไปแล้ว
    store.usedColors.push(randomColor);

    return randomColor;
  };

  // ดึงสีสุ่มที่ไม่ซ้ำกัน
  const borderColor = getUniqueRainbowColor();

  return (
    <div class={`w-[250px] h-[70px] mb-3 rounded-md bg-gray-900 flex items-center border border-solid ${borderColor}`}>
      <div class="flex items-center mx-4 gap-10">
        <div>
          <img alt={`${name}'s Avatar`} src={pic} class="w-8 h-8 rounded-full" />
        </div>
      </div>
      
      <div class="w-fit">
        <h1 class="text-base font-bold text-zinc-400">{name}</h1>
      </div>

      <div class="w-fit h-fit ml-auto mr-3">
        <img alt="Mic Status" src={mic} class="w-6 h-6" />
      </div>
    </div>
  );
});
