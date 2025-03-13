import { component$, useSignal, $, useVisibleTask$, useStore } from "@builder.io/qwik";
import { useNavigate } from '@builder.io/qwik-city';
import { useUserStore } from "~/store/store";
import API_URL from "~/configURL/config";
import { Link } from "@builder.io/qwik-city";

export default component$(() => {
  const { userId } = useUserStore();
  const posts = useSignal([]); // เก็บโพสต์
  const isLoading = useSignal(true); // สถานะการโหลดโพสต์
  const searchQuery = useSignal("");  // เก็บคำค้นจาก Search Bar
  const newComment = useSignal<{ [key: number]: string }>({}); // เก็บคอมเมนต์
  const navigate = useNavigate();

  // ฟังก์ชันโหลดโพสต์ตามคำค้น
  const loadPosts = $(async () => {
    isLoading.value = true;
    try {
      const res = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          query: `query {
            searchPosts(query: "${searchQuery.value}") {
              id
              userId
              userName
              userProfile
              title
              content
              imageUrl
              tags
              likes
              createdAt
              comments {
                id
                userId
                userName
                userProfile
                content
                createdAt
              }
            }
          }`
        }),
      });
      const result = await res.json();

      // ✅ เรียงโพสต์ใหม่ล่าสุดให้อยู่บนสุด
      posts.value = (result.data?.searchPosts || []).sort(
        (a: any, b: any) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      );

      isLoading.value = false;
    } catch (err) {
      console.error("Error loading posts", err);
      isLoading.value = false;
      navigate('/service-unavailable');
    }
  });

  // ฟังก์ชันค้นหาจากคำค้น
  const handleSearch = $(async () => {
    await loadPosts(); // เมื่อมีการค้นหาคำใหม่ ให้ส่งคำค้นไปยัง GraphQL API
  });

  // ฟังก์ชันเพิ่มคอมเมนต์
  const addComment = $(async (postId: number) => {
    const commentText = newComment.value[postId]?.trim();
    if (!commentText || commentText.length === 0) return alert("⚠️ Comment cannot be empty!");

    await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        query: `mutation {
          addComment(userId: ${userId.value}, postId: ${postId}, content: """${commentText.replace(/\n/g, "\\n")}""") {
            id
            userId
            userName
            userProfile
            content
            createdAt
          }
        }`
      }),
    });

    newComment.value[postId] = ""; // รีเซ็ตค่า comment
    await loadPosts();
  });

  // ฟังก์ชันลบโพสต์
  const deletePost = $(async (postId: number) => {
    if (!confirm("Are you sure you want to delete this post?")) return;
    const response = await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        query: `mutation { deletePost(userId: ${userId.value}, postId: ${postId}) }`,
      }),
    });
    const result = await response.json();
    if (result.data?.deletePost) {
      posts.value = posts.value.filter(post => post.id !== postId);
    } else {
      alert("❌ Failed to delete post");
    }
  });

  // การตรวจสอบการขยายโพสต์และคอมเมนต์
  const postExpanded = useStore<{ [key: number]: boolean }>({});
  const commentExpanded = useStore<{ [key: number]: boolean }>({});

  // ฟังก์ชัน toggle สำหรับขยายโพสต์
  const togglePostExpand = $(async (postId: number) => {
    postExpanded[postId] = !postExpanded[postId];
  });

  // ฟังก์ชัน toggle สำหรับขยายคอมเมนต์
  const toggleCommentExpand = $(async (commentId: number) => {
    commentExpanded[commentId] = !commentExpanded[commentId];
  });

  useVisibleTask$(() => {
    loadPosts(); // โหลดโพสต์เมื่อ component ถูกแสดง
  });

  return (
    <div>
      {/* Forum Header */}
      <header class="flex overflow-visible flex-col justify-center px-11 py-4 w-full bg-stone-50 max-md:px-5 max-md:max-w-full">
        <nav class="flex flex-wrap gap-10 items-center max-md:max-w-full">
          <Link href="/home" class="flex shrink-0 items-center cursor-pointer">
            <img
              alt="My DEXTO Icon"
              src="/image/DextoLogoDark.svg"
              width="167"
              height="32"
              class="w-[167px] h-[32px]" // Ensures consistency
            />
          </Link>

          {/* Search Bar */}
          <div class="flex flex-col grow shrink justify-center items-start self-stretch px-4 py-2 my-auto text-base text-center text-black whitespace-nowrap rounded-xl bg-slate-100 min-h-8 min-w-60 w-[582px] max-md:max-w-full">
            <div class="flex justify-between items-center w-full">
              <img
                loading="lazy"
                src="https://cdn.builder.io/api/v1/image/assets/TEMP/d4845346f380a756c24e9423a6761e275126ff31841f2114d9117540cdb1ddfe"
                alt="Search icon"
                width="20"
                height="20"
                class="w-5 h-5 mr-3"
              />
              <input
                type="text"
                placeholder="Search..."
                class="w-full bg-transparent border-none focus:outline-none"
                value={searchQuery.value}
                onInput$={(e) => searchQuery.value = (e.target as HTMLInputElement).value} // อัพเดตค่าเมื่อมีการพิมพ์
                onKeyDown$={(event) => {
                  if (event.key === 'Enter') {
                    handleSearch();  // เมื่อกด Enter ให้ทำการค้นหา
                  }
                }}  // เมื่อกด Enter จะทำการค้นหา
              />
            </div>
          </div>

          {/* Search Button */}
          <button
            class="px-4 py-2 bg-blue-500 text-white rounded ml-2"
            onClick$={handleSearch} // เมื่อคลิกปุ่มค้นหา
          >
            Search
          </button>
        </nav>
      </header>

      <div class="p-6 bg-gray-900 text-white min-h-screen flex flex-col items-center">
        {isLoading.value ? (
          <p class="text-left text-gray-400 w-full max-w-2xl flex-grow">📢 Loading forum posts...</p>
        ) : posts.value.length === 0 ? (
          <div class="flex-grow flex items-center justify-center w-full">
            <p class="text-center text-gray-400 text-xl">🚫 No posts found</p>
          </div>
        ) : (
          posts.value.map((post: any) => {
            return (
              <div key={post.id} class="relative bg-gray-800 p-4 rounded-lg mt-4 max-w-2xl w-full">
                {/* หัวข้อโพสต์ + ปุ่ม Delete */}
                <div class="flex justify-between items-start w-full">
                  <div class="max-w-[85%] break-words">
                    <h2 class="text-3xl font-bold text-left">
                      {post.title}
                    </h2>
                    <span class="text-sm text-gray-400">
                      ({new Date(post.createdAt).toLocaleString()})
                    </span>
                  </div>

                  {post.userId === userId.value && (
                    <button
                      class="px-3 py-1 bg-red-500 text-white rounded text-sm"
                      onClick$={() => deletePost(post.id)}
                    >
                      Delete
                    </button>
                  )}
                </div>

                {/* ✅ ตัดเนื้อหาโพสต์ ถ้ายาวเกิน 300 ตัวอักษร */}
                <div class="max-w break-words whitespace-pre-line overflow-wrap break-word mt-2">
                  <p class="text-left">
                    {postExpanded[post.id] || post.content.length <= 300
                      ? post.content
                      : post.content.slice(0, 300) + "..."}
                  </p>

                  {/* ปุ่ม Read More / Read Less */}
                  {post.content.length > 300 && (
                    <button
                      class="text-blue-400 text-sm underline"
                      onClick$={() => togglePostExpand(post.id)}
                    >
                      {postExpanded[post.id] ? "Read less" : "Read more"}
                    </button>
                  )}
                </div>

                <div class="mt-2 flex flex-wrap gap-2 max-w-[85%]">
                  {post.tags?.split(',').map((tag: string) => (
                    <span key={tag} class="px-2 py-1 bg-blue-600 text-white rounded break-words overflow-hidden">
                      #{tag}
                    </span>
                  ))}
                </div>

                {/* คอมเมนต์ */}
                <div class="mt-4 border-t pt-2">
                  <h3 class="text-lg font-semibold text-left">Comments:</h3>
                  {post.comments?.length > 0 ? (
                    post.comments.map((comment: any) => {
                      return (
                        <div key={comment.id} class="ml-4 mt-2 flex items-start gap-2">
                          <img src={comment.userProfile || "/image/defaultProfile.svg"} class="w-8 h-8 rounded-full" />
                          <div class="max-w-[85%] break-words whitespace-pre-line overflow-wrap break-word">
                            <span class="font-semibold">{comment.userName}</span>
                            <p class="text-left">
                              {commentExpanded[comment.id] || comment.content.length <= 100
                                ? comment.content
                                : comment.content.slice(0, 100) + "..."}
                            </p>

                            {/* ปุ่ม Read More / Read Less */}
                            {comment.content.length > 100 && (
                              <button
                                class="text-blue-400 text-sm underline"
                                onClick$={() => toggleCommentExpand(comment.id)}
                              >
                                {commentExpanded[comment.id] ? "Read less" : "Read more"}
                              </button>
                            )}
                          </div>
                        </div>
                      );
                    })
                  ) : (
                    <p class="text-left text-gray-400">No comments yet.</p>
                  )}
                </div>

                {/* ช่องพิมพ์คอมเมนต์ */}
                <div class="mt-2 flex items-center w-full max-w space-x-2">
                  <input
                    class="flex-1 p-2 border rounded-md text-gray-700"
                    placeholder="Write a comment..."
                    value={newComment.value[post.id] || ""}
                    onInput$={(e) => (newComment.value[post.id] = (e.target as HTMLInputElement).value)}
                    onKeyDown$={(event) => {
                      if (event.key === "Enter") {
                        event.preventDefault();
                        addComment(post.id);
                      }
                    }}
                  />
                  <button class="px-4 py-2 bg-blue-500 text-white rounded whitespace-nowrap" onClick$={() => addComment(post.id)}>
                    ➤
                  </button>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
});