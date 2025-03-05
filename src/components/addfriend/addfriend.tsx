import { component$ } from '@builder.io/qwik';

interface AddfriendProps {
  title: string;
  description: string;
  image1: string;
  image2: string;
}

export const Addfriend = component$<AddfriendProps>(({ title, description, image1, image2 }) => {
  return (
    <div class="w-[1150px] h-32 mb-11 p-10 rounded-md bg-gray-700 flex items-center space-x-4">
      <div class="items-center flex space-x-3 ml-10 mr-10 gap-10">
        <div>
        <img src={image1} alt="Project" class="w-10 h-10" />
        </div>
        <div>
          <img src={image2} alt="Minnie" class="w-16 h-16" />
        </div>
      </div>

      <div class="w-[400px]">
        <div class=" mb-3">
          <h1 class="text-2xl font-bold text-gray-200">{title}</h1>
        </div>
        <div>
          <p class="text-base text-gray-300">{description}</p>
        </div>
      </div>
      
      <div>
        <button class="w-20 h-10 ml-40 mr-5 rounded-lg text-black bg-green-400 active:scale-110">
          Accept
        </button>
      </div>

      <div>
        <button class="w-20 h-10 rounded-lg text-white bg-transparent">
          Cancel
        </button>
      </div>
    </div>
  );
});