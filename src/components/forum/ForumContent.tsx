import { component$, useSignal, $ ,useOnWindow,useStore,useTask$} from "@builder.io/qwik";
import FAB from "~/components/forum/FAB";
{/*หัวโพสต์*/}
export const ForumContent = component$(() => {
  const likes = useSignal(0); // Signal to track likes count
  const hasLiked = useSignal(false); // Track whether the user has liked
  const state = useStore({ menuOpen: false, reportOpen: false, selectedReason: "" });
  const state2 = useStore({ selected: [] as string[] });
  const comments = useSignal<string[]>([]);
  const newComment = useSignal("");
  const showModal = useSignal(false);
  const latestCount = useSignal(comments.value.length); // Store latest count separately

  // Track `comments.value.length` and update `latestCount`
  useTask$(({ track }) => {
    track(() => comments.value.length);
    latestCount.value = comments.value.length; // ✅ Forces UI update
  });

  const toggleSelection = (value: string) => {
    if (state2.selected.includes(value)) {
      state2.selected = state2.selected.filter((item) => item !== value);
    } else {
      state2.selected = [...state2.selected, value];
    }
  };
  

  const addLike = $(() => {
    if (!hasLiked.value) {
      likes.value++;
      hasLiked.value = true;
    }else if(hasLiked.value == true){
      likes.value--;
      hasLiked.value = false;
    }
  });

  const toggleMenu = $(() => {
    state.menuOpen = !state.menuOpen;
  });

  const openReport = $(() => {
    state.reportOpen = true;
    state.menuOpen = false;
  });

  const closeReport = $(() => {
    state.reportOpen = false;
    state.selectedReason = "";
  });

  const submitReport = $(() => {
    console.log("Reported:", state2.selected);
    state2.selected = [];
    closeReport();
  });

  useOnWindow(
    "click",
    $((event) => {
      const target = event.target as HTMLElement;
      if (!target.closest(".menu-container")) {
        state.menuOpen = false;
      }
    })
  );

  return (
    
    <main class="flex overflow-hidden flex-col justify-center items-center px-20 py-24 w-full bg-white max-md:px-5 max-md:pt-24 max-md:max-w-full">
      <FAB />
      
            
    </main>
    
  );
});
