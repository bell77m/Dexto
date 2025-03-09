
import { component$, useSignal, $, useStore, useOnWindow, useTask$} from "@builder.io/qwik";

export default component$(() => {
  const showCommentBox = useSignal(false);
  const showRespondBox = useSignal(false);
  const showModal = useSignal(false);
  const postTitle = useSignal("");
  const newComment = useSignal("");
  const newTag = useSignal("");
  const tags = useSignal<string[]>([]);
  const comments = useSignal<{ id: number; title: string; text: string; tags: string[]; image?: string; user: string; timestamp: string; likes: number; hasLiked: boolean;}[]>([]);
  const imageFile = useSignal<File | null>(null);
  const state2 = useStore({ selected: [] as string[] });
  const state = useStore({ menuOpen: false, reportOpen: false, selectedReason: "" });
  const userName = useSignal("");
  const commentsR = useSignal<{ postId: number; id: number; text: string }[]>([]);
  const newCommentR = useSignal("");
  const commentsReply = useSignal<{ parentId: number | null; text: string }[]>([]);
  const newCommentReply = useSignal("");
  const selectedCommentId = useSignal<number | null>(null);
  const selectedPostId = useSignal<number | null>(null);
  const postCommentMap = useStore<{ [postId: number]: number[] }>({});

      
        useTask$(({ track }) => {
          track(() => showCommentBox.value); // Runs when showCommentBox changes
          if (showCommentBox.value && selectedCommentId.value !== null) {
            selectedPostId.value = selectedCommentId.value; // ✅ Set correct postId
            console.log("🟢 PostId set using useTask$:", selectedPostId.value);
          }
        });
  
        const addComment = $((postId: number) => {
          if (!newCommentR.value.trim()) return;
        
          // ✅ Generate a unique ID for the new comment
          const commentId = Date.now();
        
          console.log("🟢 Adding new comment to postId:", postId);
        
          // ✅ Ensure comment is added under the correct post
          commentsR.value = [
            ...commentsR.value,
            { postId: postId, id: commentId, text: newCommentR.value.trim() }
          ];
        
          // ✅ Track comment under this post
          if (!postCommentMap[postId]) {
            postCommentMap[postId] = [];
          }
          postCommentMap[postId].push(commentId);
        
          console.log("🟢 Updated postCommentMap:", JSON.stringify(postCommentMap, null, 2));
        
          newCommentR.value = ""; 
          showCommentBox.value = false;
        });
        const deletePost = $((postId: number) => {
          console.log("🔴 Attempting to delete post:", postId);
          console.log("🟡 Current comments before deletion:", JSON.stringify(commentsR.value, null, 2));  
        
          // ✅ Get all comment IDs associated with this post
          const commentsToDelete = postCommentMap[postId] || [];
        
          console.log("🟡 Comments linked to this post:", commentsToDelete);
        
          // ✅ Remove all comments linked to this post
          commentsR.value = commentsR.value.filter(comment => !commentsToDelete.includes(comment.id));
        
          console.log("🟡 Remaining comments after deletion:", JSON.stringify(commentsR.value, null, 2));
        
          // ✅ Remove post from tracking map
          delete postCommentMap[postId];
        
          // ✅ Remove the post itself
          comments.value = comments.value.filter(post => post.id !== postId);
          console.log("🟢 Post deleted successfully:", postId);
        
          state.menuOpen = false;
        });
        const resetPostInputs = () => {
          postTitle.value = "";
          newComment.value = "";
          imageFile.value = null;
          tags.value = [];
          userName.value = "";
          showModal.value = false;
        };
                
        const deleteComment = $((commentId: number) => {
          console.log("🔴 Deleting comment:", commentId);

          commentsR.value = commentsR.value.filter(comment => comment.id !== commentId);
     
          Object.keys(postCommentMap).forEach(postId => {
            postCommentMap[Number(postId)] = postCommentMap[Number(postId)].filter(id => id !== commentId);
          });
        
          console.log("🟡 Remaining comments after deletion:", JSON.stringify(commentsR.value, null, 2));
          console.log("🟡 Updated postCommentMap:", JSON.stringify(postCommentMap, null, 2));
        
          console.log("🟢 Comment deleted successfully:", commentId);
        });
        
        
        const addLike = $((postId: number) => {
          comments.value = comments.value.map(post =>
            post.id === postId 
              ? { 
                  ...post, 
                  likes: post.hasLiked ? post.likes - 1 : post.likes + 1, // ✅ Increase or decrease likes
                  hasLiked: !post.hasLiked // ✅ Toggle like state
                } 
              : post
          );
        });

      const toggleSelection = (value: string) => {
        if (state2.selected.includes(value)) {
          state2.selected = state2.selected.filter((item) => item !== value);
        } else {
          state2.selected = [...state2.selected, value];
        }
      };

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
    <div>
      <button
        class="fixed bottom-5 right-5 bg-blue-500 hover:bg-blue-700 text-white font-bold py-4 px-5 rounded-full shadow-lg transition-transform transform hover:scale-110"
        onClick$={() => (showModal.value = true)}
      >
        <svg 
        xmlns="http://www.w3.org/2000/svg" 
        fill="none" 
        viewBox="0 0 24 24" 
        stroke-width="1.5" 
        stroke="currentColor" 
        class="size-6">
            <path 
            stroke-linecap="round" 
            stroke-linejoin="round" 
            d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
        </svg>

      </button>

      {showModal.value && (
        <div class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div class="bg-white p-6 rounded-lg shadow-lg w-[500px]">
            <h3 class="text-lg font-bold mb-3">Create new post</h3>

            <input
              class="w-full p-2 border rounded-md text-lg font-bold"
              placeholder="Post title..."
              bind:value={postTitle}
            />
            <input
              class="w-full p-2 border rounded-md text-lg font-bold"
              placeholder="Your name..."
              bind:value={userName}
            />
            <textarea
              class="w-full p-3 border rounded-md h-40 resize-none mt-2"
              placeholder="Write your post..."
              bind:value={newComment}
            ></textarea>

            <div class="mt-3">
              <input
                class="w-full p-2 border rounded-md"
                placeholder="Add a tag..."
                bind:value={newTag}
                onKeyPress$={(e) => {
                  if (e.key === "Enter" && newTag.value.trim()) {
                    tags.value = [...tags.value, newTag.value.trim()];
                    newTag.value = "";
                  }
                }}
              />
              <div class="flex flex-wrap mt-2">
                {tags.value.map((tag, index) => (
                  <span key={index} class="bg-gray-200 text-gray-700 px-2 py-1 rounded-full text-sm mr-2 mt-1 flex items-center">
                  {tag}
                  <button class="ml-2 text-red-500 hover:text-red-700" 
                    onClick$={() => { 
                      tags.value = tags.value.filter((_, i) => i !== index); // Remove tag immediately
                    }}>
                    ✕
                  </button>
                  </span>
                ))}
              </div>
            </div>

            <div class="mt-3">
              <label class="cursor-pointer">
              <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    viewBox="0 0 20 20" 
                    fill="currentColor" 
                    class="size-5">
                <path 
                    fill-rule="evenodd" 
                    d="M1 5.25A2.25 2.25 0 0 1 3.25 3h13.5A2.25 2.25 0 0 1 19 5.25v9.5A2.25 2.25 0 0 1 16.75 17H3.25A2.25 2.25 0 0 1 1 14.75v-9.5Zm1.5 5.81v3.69c0 .414.336.75.75.75h13.5a.75.75 0 0 0 .75-.75v-2.69l-2.22-2.219a.75.75 0 0 0-1.06 0l-1.91 1.909.47.47a.75.75 0 1 1-1.06 1.06L6.53 8.091a.75.75 0 0 0-1.06 0l-2.97 2.97ZM12 7a1 1 0 1 1-2 0 1 1 0 0 1 2 0Z" clip-rule="evenodd" />
              </svg>

                <input
                  type="file"
                  accept="image/*"
                  class="hidden"
                  onChange$={(e) => {
                    const file = (e.target as HTMLInputElement).files?.[0];
                    if (file) {
                      imageFile.value = file;
                    }
                  }}
                />
              </label>
            </div>

            {imageFile.value && (
              <div class="mt-3">
                <p class="text-sm text-gray-500">Image Preview:</p>
                <img
                  src={URL.createObjectURL(imageFile.value)}
                  alt="Preview"
                  class="mt-1 max-w-full h-40 object-cover rounded border"
                />
              </div>
            )}

            <div class="flex justify-end gap-2 mt-4">
              <button
                class="px-4 py-2 bg-blue-500 text-white rounded"
                onClick$={() => { 
                  if (postTitle.value.trim() || newComment.value.trim() || imageFile.value || tags.value.length) {
                    const reader = new FileReader();
                    const timestamp = new Date().toLocaleString();
                
                    // ✅ Ensure each post has a unique ID
                    const postId = Date.now();
                    console.log(`🟢 Creating new post with ID: ${postId}`);
                
                    // ✅ Initialize empty comment tracking for this post
                    postCommentMap[postId] = [];
                
                    const newPost = {
                      id: postId,
                      title: postTitle.value,
                      text: newComment.value,
                      tags: [...tags.value],
                      user: userName.value || "Anonymous",
                      timestamp,
                      likes: 0,
                      hasLiked: false,
                    };
                
                    if (imageFile.value) {
                      reader.onload = () => {
                        comments.value = [...comments.value, { ...newPost, image: reader.result as string }];
                        resetPostInputs();
                      };
                      reader.readAsDataURL(imageFile.value);
                    } else {
                      comments.value = [...comments.value, newPost];
                      resetPostInputs();
                    }
                  }
                }}
                
              >
                Post
              </button>

              <button
                class="px-4 py-2 bg-gray-300 rounded"
                onClick$={() => {
                  showModal.value = false;
                  postTitle.value = "";
                  newComment.value = "";
                  imageFile.value = null;
                  tags.value = [];
                }}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
      <article class="flex flex-col max-w-full w-[808px] p-10 bg-white shadow-md rounded-lg">
        {comments.value.map((comment, index) => (
          <div key={index} class="p-6 border-b last:border-b-0">
            <div class="flex justify-between items-center">
              <h4 class="text-3xl font-bold text-black">{comment.title}</h4>
              <p class="text-sm text-gray-500">{comment.timestamp}</p>
            </div>
            <p class="text-md text-gray-600 mt-1">Posted by: <strong>{comment.user}</strong></p>
            <p class="mt-4 text-lg font-light text-black">{comment.text}</p>
            <div class="flex flex-wrap gap-2 mt-4">
              {comment.tags.map((tag, idx) => (
                <span
                  key={idx}
                  class="px-4 py-2 rounded-2xl bg-gray-200 text-gray-700 text-sm font-medium"
                >
                  #{tag}
                </span>
              ))}
            </div>
            {comment.image && (
              <img
                src={comment.image}
                alt="Uploaded"
                class="mt-6 w-full max-h-80 object-cover rounded-lg"
              />
            )}
            <div class="flex flex-wrap gap-5 justify-between py-6 mt-20 w-full bg-white-[0px_4px_4px_rgba(0,0,0,0.05)] max-md:px-5 max-md:mt-10 max-md:max-w-full">
            <div class="flex gap-10 text-center">
            <button 
              onClick$={() => addLike(comment.id)} 
              class="flex items-center gap-2 active:scale-110"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                class={`size-6 transition-all ${comment.hasLiked ? "text-red-500 fill-red-500" : "hover:text-red-500"}`}
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z"
                />
              </svg>
              <span>{comment.likes}</span>
            </button>
              <div class="flex gap-10 text-center">
                <button onClick$={() => { showCommentBox.value = true}} class="flex items-center gap-2 active:scale-110">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  class="size-6"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M8.625 9.75a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H8.25m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H12m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0h-.375m-13.5 3.01c0 1.6 1.123 2.994 2.707 3.227 1.087.16 2.185.283 3.293.369V21l4.184-4.183a1.14 1.14 0 0 1 .778-.332 48.294 48.294 0 0 0 5.83-.498c1.585-.233 2.708-1.626 2.708-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0 0 12 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018Z"
                  />
                </svg>
                <span class="text-base font-medium"></span>
                </button>
          
              </div>
            </div>
            <div  class="flex gap-10 justify-between items-center self-start">
              <div class="relative menu-container">
                <button onClick$={toggleMenu} class="focus:outline-none">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M12 6.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5ZM12 12.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5ZM12 18.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5Z" />
                </svg>
                </button>
                {state.menuOpen && (
                  <div
                    class="absolute right-0 top-full mt-2 w-48 bg-white shadow-lg rounded-md py-2 z-50"
                    onClick$={(e) => e.stopPropagation()}
                  >
                    <a href="#" class="block px-4 py-2 hover:bg-red-300" onClick$={() => deletePost(comment.id)}>
                       <div class = "text-red-500 hover:text-red-700">
                       Delete
                       </div>
                    </a>
                    <a href="#" onClick$={openReport} class="block px-4 py-2 hover:bg-gray-100">
                      Report
                    </a>
                  </div>
                )}
              </div>
            </div>
            {state.reportOpen && (
            <div class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div class="bg-white p-6 rounded-lg w-96">
              <h2 class="text-xl font-semibold mb-4">Why do you want to report this post?</h2>
              <div class="space-y-2">
                {["I don't like this post", "Spam", "Hate speech"].map((reason) => (
                  <label key={reason} class="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      name="reportReason"
                      value={reason}
                      checked={state2.selected.includes(reason)}
                      onChange$={() => toggleSelection(reason)}
                    />
                    {reason}
                  </label>
                ))}
                <p class="mt-4">Selected: {state2.selected.join(", ") || "None"}</p>
              </div>
              <div class="flex justify-end gap-2 mt-4">
                <button onClick$={closeReport} class="px-4 py-2 bg-gray-200 rounded">Cancel</button>
                <button onClick$={submitReport} class="px-4 py-2 bg-red-500 text-white rounded">Send</button>
              </div>
            </div>
            </div>
            )}
            <section class="flex overflow-hidden flex-col justify-center items-center px-20 py-28 w-full text-base text-black bg-stone-50 max-md:px-5 max-md:pb-24 max-md:max-w-full">
              <div class="mb-0 max-w-full w-[833px] max-md:mb-2.5">
                <h2 class="self-start ml-4 text-3xl md:text-4xl font-semibold max-md:ml-2.5">
                  Responses
                </h2>
                
                {/* Respond Button */}
                <div class="flex flex-wrap gap-5 justify-between py-5 pr-4 pl-16 mt-16 ml-4 max-w-full text-lg md:text-xl font-medium text-black bg-white rounded shadow-[0px_4px_4px_rgba(0,0,0,0.15)] w-[808px] max-md:pl-5 max-md:mt-10">
                  <p class="my-auto">What are your thoughts?</p>
                  <button
                    class="px-10 py-4 whitespace-nowrap bg-green-500 rounded-2xl text-sm md:text-base max-md:px-5"
                    onClick$={() => {
                      showCommentBox.value = true; // Open the modal
                      selectedCommentId.value = index;
                    }}
                  >
                    Respond
                  </button>
                </div>
                <div>
                {commentsR.value 
                .filter(comment => comment.postId === index) // ✅ Only show comments for this post
                .map(comment => (
                <article key={comment.id}
                  class="flex flex-col justify-center items-center px-7 py-6 mt-16 bg-white rounded-2xl min-h-[223px] shadow-md"
                >
                  <div class="w-full rounded-none max-w-[751px]">
                    <div class="flex flex-wrap gap-5 justify-between w-full">
                      <div class="flex gap-10 items-start">
                        <img
                          loading="lazy"
                          src="https://cdn.builder.io/api/v1/image/assets/TEMP/d3b302d5c7f11b118e7eb826591fa710b577e2c9ae5e30e5cac2adb5282933b1"
                          class="object-contain shrink-0 aspect-square rounded-[170px] w-[50px]"
                          alt="User avatar"
                        />
                        <div class="flex flex-col items-start mt-1">
                          <span class="font-medium">User</span>
                          <button 
                            class="text-red-500 hover:text-red-700" 
                            onClick$={() => deleteComment(comment.id)} // ✅ Delete comment on click
                          >
                            ✕
                          </button>
                          <p class="self-stretch mt-6 font-light">{comment.text}</p>
                          <button onClick$={() => { 
                            showRespondBox.value = true; 
                            selectedCommentId.value = comment.id; // ✅ Save correct comment ID
                          }} class="self-stretch mt-6 font-light flex justify-end">
                            Reply
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Replies should be inside the comment block */}
                  <div class="ml-6 border-l-2 border-gray-300 pl-3 w-full">
                    {commentsReply.value
                      .filter(reply => reply.parentId === comment.id) // ✅ Show only replies linked to this comment
                      .map((reply, index) => (
                        <div key={index} class="mt-2">
                          <p class="text-gray-700">↳ {reply.text}</p> 
                        </div>
                      ))
                    }
                  </div>

                </article>
              ))}
                </div>
              </div>
            </section>
            </div>
            </div>
              ))}
            </article>
            {showCommentBox.value&& (
              <div>
                {/* Response Box */}
                {showCommentBox.value && (
                <div class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                  <div class="bg-white p-6 rounded-lg shadow-lg w-96">
                    <h3 class="text-lg font-bold mb-3">Write a Response</h3>
                    <textarea
                      class="w-full p-2 border rounded-md"
                      placeholder="Write your response..."
                      bind:value={newCommentR}
                    ></textarea>
                    <div class="flex justify-end gap-2 mt-3">
                      <button
                        class="px-4 py-2 bg-blue-500 text-white rounded"
                        onClick$={() => { if (selectedCommentId.value !== null) {
                          console.log("🟢 Submitting comment for postId:", selectedCommentId.value);
                          addComment(selectedCommentId.value); // ✅ Ensure correct postId is passed
                          selectedCommentId.value = null; // ✅ Reset after posting
                        }
                      }}
                      >              
                        Submit
                      </button>
                      <button
                        class="px-4 py-2 bg-gray-300 rounded"
                        onClick$={() => {
                          showCommentBox.value = false; // Close modal on cancel
                          newCommentR.value = "";
                        }}
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                </div>
                )}
            </div>
            )}
            {showRespondBox.value&& (
              <div>
                {/* Response Box */}
                {showRespondBox.value && (
                <div class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                  <div class="bg-white p-6 rounded-lg shadow-lg w-96">
                    <h3 class="text-lg font-bold mb-3">Write a Response</h3>
                    <textarea
                      class="w-full p-2 border rounded-md"
                      placeholder="Write your response..."
                      bind:value={newCommentReply}
                    ></textarea>
                    <div class="flex justify-end gap-2 mt-3">
                      <button
                        class="px-4 py-2 bg-blue-500 text-white rounded"
                        onClick$={() => {
                          if (newCommentReply.value.trim() && selectedCommentId.value !== null) {
                            commentsReply.value = [
                              ...commentsReply.value, 
                              { parentId: selectedCommentId.value, text: newCommentReply.value.trim() } 
                            ];
                            selectedCommentId.value = null;
                            newCommentReply.value = ""; 
                            showRespondBox.value = false; 
                          }
                        }}
                                        
                      >
                        Reply
                      </button>
                      <button
                        class="px-4 py-2 bg-gray-300 rounded"
                        onClick$={() => {
                          showRespondBox.value = false; // Close modal on cancel
                          newCommentReply.value = "";
                        }}
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                </div>
                )}
            </div>
            )}
          </div>            
        
      );
    });
