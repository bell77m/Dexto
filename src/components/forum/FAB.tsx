
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
        
        const addReply = $(() => {
          if (!newCommentReply.value.trim() || selectedCommentId.value === null) return;
        
          commentsReply.value = [...commentsReply.value, {
            parentId: selectedCommentId.value,
            text: newCommentReply.value.trim()
          }];
          
          newCommentReply.value = "";
          showRespondBox.value = false;
        });
        

        const addComment = $((postId: number) => {
          if (!newCommentR.value.trim()) return;
        
          const commentId = Date.now();
          commentsR.value = [...commentsR.value, { postId, id: commentId, text: newCommentR.value.trim() }];
          newCommentR.value = "";
        });
        
        const deletePost = $((postId: number) => {
          if (!confirm("Are you sure you want to delete this post? This will remove all associated comments.")) return;
        
          console.log("🔴 Attempting to delete post:", postId);
        
          // Remove all comments associated with this post
          commentsR.value = commentsR.value.filter(comment => comment.postId !== postId);
          console.log("🟡 Remaining comments after deletion:", JSON.stringify(commentsR.value, null, 2));
        
          // Remove post itself
          comments.value = comments.value.filter(post => post.id !== postId);
          console.log("🟢 Post deleted successfully:", postId);
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
      {comments.value.map((post) => (
              <div key={post.id} class="p-6 border-b last:border-b-0">
                <div class="flex justify-between items-center">
                  <h4 class="text-3xl font-bold text-black">{post.title}</h4>
                  <p class="text-sm text-gray-500">{post.timestamp}</p>
                </div>
                <p class="text-md text-gray-600 mt-1">Posted by: <strong>{post.user}</strong></p>
                <p class="mt-4 text-lg font-light text-black">{post.text}</p>

                <div class="flex flex-wrap gap-2 mt-4">
                  {post.tags.map((tag, idx) => (
                    <span key={idx} class="px-4 py-2 rounded-2xl bg-gray-200 text-gray-700 text-sm font-medium">
                      #{tag}
                    </span>
                  ))}
                </div>

                {post.image && (
                  <img src={post.image} alt="Uploaded" class="mt-6 w-full max-h-80 object-cover rounded-lg" />
                )}

                {/* Like, Comment, and Delete Section */}
                <div class="flex justify-between py-4 border-t border-gray-200 mt-4">
                  <button onClick$={() => addLike(post.id)} class="flex items-center gap-2 text-gray-600 hover:text-blue-500">
                    👍 {post.likes}
                  </button>
                  <button onClick$={() => selectedPostId.value = post.id} class="text-gray-600 hover:text-blue-500">
                    💬 Comment
                  </button>
                  <button onClick$={() => deletePost(post.id)} class="text-red-500 hover:text-red-700">
                    ❌ Delete
                  </button>
                </div>

                {/* Comment Box */}
                <div class="mt-4">
                  <input
                    class="w-full p-2 border rounded-md text-gray-700"
                    placeholder="Write a comment..."
                    bind:value={newCommentR}
                    onKeyPress$={(e) => {
                      if (e.key === "Enter" && newCommentR.value.trim()) {
                        addComment(post.id);
                      }
                    }}
                  />
                </div>

                {/* Display Comments */}
                <div class="mt-4">
                  {commentsR.value.filter(comment => comment.postId === post.id).map(comment => (
                    <div key={comment.id} class="ml-6 mt-2 border-l-2 pl-3">
                      <p class="text-gray-700 font-medium">User</p>
                      <p class="text-gray-600">{comment.text}</p>

                      {/* Reply Section */}
                      <div class="mt-2 ml-6">
                        <button
                          class="text-blue-500 text-sm"
                          onClick$={() => { showRespondBox.value = true; selectedCommentId.value = comment.id; }}
                        >
                          Reply
                        </button>

                        {/* Show Replies */}
                        {commentsReply.value.filter(reply => reply.parentId === comment.id).map((reply) => (
                          <div key={reply.parentId} class="ml-4 mt-2 text-gray-600">
                            ↳ {reply.text}
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
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
            {showRespondBox.value && (
              <div class="mt-2 ml-6">
                <input
                  class="w-full p-2 border rounded-md text-gray-700"
                  placeholder="Write a reply..."
                  bind:value={newCommentReply}
                  onKeyPress$={(e) => {
                    if (e.key === "Enter") {
                      addReply();
                    }
                  }}
                />
              </div>
            )}
          </div>            
        
      );
    });
