import { component$, useSignal } from "@builder.io/qwik";
import { Sidebarmini } from "~/components/sidebarmini/Sidebarmini";
import { VoiceChat } from "~/components/voice-chat/VoiceChat";

export default component$(() => {
  const userData = [
    {
      id: 1,
      name: "Mickie Mouse",
      pic: "/image/home.svg",
    },
    {
      id: 2,
      name: "Minnie1234",
      pic: "/image/home.svg",
    },
    {
      id: 3,
      name: "Daisy Duck",
      pic: "/image/home.svg",
    },
    {
      id: 4,
      name: "Doraemon",
      pic: "/image/home.svg",
    },
    {
      id: 5,
      name: "Nobita",
      pic: "/image/home.svg",
    },
    {
      id: 6,
      name: "Shizuka",
      pic: "/image/home.svg",
    }
  ];

  const isMicOn = useSignal(true);
  const isHpOn = useSignal(true);

  return (
    <>
      <div class="flex h-screen w-full bg-gray-900">
        <Sidebarmini />
        <div class="flex w-[300px] flex-col border border-solid border-zinc-600 bg-gray-900 font-medium">
          <div class="mt-2 flex min-h-[255px] flex-col items-center justify-start rounded-xl bg-gray-800 px-6 py-4 text-xl font-bold text-zinc-400">
            <div class="h-fit w-fit justify-center bg-gray-800 text-xl font-bold text-zinc-400">
              Project
            </div>
            <div class="mt-8 flex h-[55px]  w-[250px] !flex-row rounded-md border border-solid border-zinc-400 bg-gray-900 p-4">
              <div>
                <img
                  alt="Python"
                  src="https://upload.wikimedia.org/wikipedia/commons/c/c3/Python-logo-notext.svg"
                  width="25"
                  height="25"
                />
              </div>
              <div class="px-3 text-base font-bold text-zinc-400">
                Project1.py
              </div>
            </div>
            <button class="mt-14 h-[50px] w-[150px] rounded-md bg-red-600 text-white active:scale-110">
              Leave
            </button>
          </div>
          <div class="mt-2 flex min-h-[655px] flex-col items-center justify-start rounded-xl bg-gray-800 px-6 py-4 text-xl font-bold text-zinc-400">
            <div class="mb-3 h-fit w-fit justify-center bg-gray-800 text-xl font-bold text-zinc-400">
              Voice Chat
            </div>
            {userData.map((item) => (
              <VoiceChat key={item.id} {...item} />
            ))}
            <div class="mt-auto h-[80px] w-[270px] rounded-md border border-solid border-zinc-400 bg-gray-900">
              <div class="flex items-center px-3 py-7">
                <img
                  alt="User"
                  src="/image/DextoMiniLogo.svg"
                  width="25"
                  height="25"
                />
                <div class="px-3">
                  <h1 class="text-base font-bold text-zinc-400">Dexto_Owner</h1>
                </div>
                <div class="ml-5">
                  <img
                    alt="Mic"
                    src={
                      isMicOn.value ? "/image/MicOn.svg" : "/image/MicOff.svg"
                    }
                    width="25"
                    height="25"
                    class="cursor-pointer hover:opacity-80"
                    onClick$={() => (isMicOn.value = !isMicOn.value)}
                  />
                </div>
                <div class="ml-5">
                  <img
                    alt="Headphone"
                    src={isHpOn.value ? "/image/HpOn.svg" : "/image/HpOff.svg"}
                    width="25"
                    height="25"
                    class="cursor-pointer hover:opacity-80"
                    onClick$={() => {
                      isHpOn.value = !isHpOn.value; // Toggle หูฟัง
                      isMicOn.value = isHpOn.value; // ถ้าหูฟังเปิด ไมค์ต้องเปิดด้วย
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="w-[1310px] h-[932px] bg-gray-900 text-white">
          code here
        </div>
      </div>
    </>
  );
});
