import { component$ } from '@builder.io/qwik';
import { Sidebarmini } from '~/components/sidebarmini/Sidebarmini';
import { VoiceChat } from '~/components/voice-chat/VoiceChat';

export default component$(() => {
  const userData = [
    {
      id: 1,
      name: "Mickie Mouse",
      pic: "/image/home.svg",
      mic: "/image/chat.svg"
    },
    {
      id: 2,
      name: "Minnie1234",
      pic: "/image/home.svg",
      mic: "/image/chat.svg"
    },
    {
      id: 3,
      name: "Daisy Duck",
      pic: "/image/home.svg",
      mic: "/image/chat.svg"
    },
    {
      id: 4,
      name: "Doraemon",
      pic: "/image/home.svg",
      mic: "/image/chat.svg"
    },
    {
      id: 5,
      name: "Nobita",
      pic: "/image/home.svg",
      mic: "/image/chat.svg"
    }
  ]
  
  return (
    <>
      <div class="flex w-full h-screen bg-gray-900">
        <Sidebarmini/>
        <div class="w-[300px] flex flex-col font-medium bg-gray-900 border border-solid border-zinc-600">
          <div class="min-h-[255px] flex-col mt-2 rounded-xl flex justify-start items-center px-6 py-4 text-xl font-bold text-zinc-400 bg-gray-800">
            <div class="w-fit h-fit text-xl justify-center font-bold text-zinc-400 bg-gray-800">Project</div>
            <div class="bg-gray-900 flex !flex-row  w-[250px] h-[55px] mt-8 p-4 rounded-md border border-solid border-zinc-400">
              <div>
              <img alt="Python" src="https://upload.wikimedia.org/wikipedia/commons/c/c3/Python-logo-notext.svg" width="25" height="25" />
              </div>
              <div class="font-bold text-base text-zinc-400 px-3">Project1.py</div>
            </div>
            <button class="w-[150px] h-[50px] rounded-md bg-red-600 mt-14 text-white active:scale-110">Leave</button>
          </div>
          <div class="min-h-[655px] flex-col mt-2 rounded-xl flex justify-start items-center px-6 py-4 text-xl font-bold text-zinc-400 bg-gray-800">
            <div class="w-fit h-fit text-xl justify-center font-bold text-zinc-400 bg-gray-800 mb-3">Voice Chat</div>
            {userData.map((item) => (
            <VoiceChat key={item.id} {...item} />
            ))}
          <div class="w-[270px] h-[80px] mt-auto bg-gray-900 rounded-md border border-solid border-zinc-400">
            <div class="flex items-center py-7 px-3">
              <img alt="User" src="/image/DextoMiniLogo.svg" width="25" height="25" />
              <div class="px-3">
                <h1 class="text-base font-bold text-zinc-400">Dexto_Owner</h1>
              </div>
              <div class="ml-5">
                <img alt="User" src="/image/DextoMiniLogo.svg" width="25" height="25" />
              </div>
              <div class="ml-5">
                <img alt="User" src="/image/DextoMiniLogo.svg" width="25" height="25" />
              </div>
            </div>
          </div>
          </div>
        </div>
      </div>
    </>
  );
});
