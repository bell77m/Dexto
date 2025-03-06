import { component$ } from "@builder.io/qwik";

interface Props {
  posts: { 
    title: string;
    text: string;
    tags: string[];
    image?: string;
    user: string;
    timestamp: string;
  }[];
  currentTags: string[];
}

const posts = [
  {
    title: "The Future of AI in Medicine",
    text: "Artificial intelligence is transforming the healthcare industry...",
    tags: ["AI"],
    image: "https://example.com/ai-medicine.jpg",
    user: "Dr. Smith",
    timestamp: "March 4, 2025",
  },
  {
    title: "Understanding Quantum Computing",
    text: "Quantum computing is a rapidly evolving field...",
    tags: ["Quantum Computing", "Physics", "Technology"],
    image: "https://example.com/quantum-computing.jpg",
    user: "Jane Doe",
    timestamp: "March 3, 2025",
  },
  {
    title: "The Rise of Electric Vehicles",
    text: "EVs are becoming more popular due to their environmental benefits...",
    tags: ["Electric Vehicles", "Sustainability", "Technology"],
    image: "https://example.com/electric-cars.jpg",
    user: "Elon Musk Fan",
    timestamp: "March 2, 2025",
  },
  {
    title: "How to Build a Web App with React",
    text: "A step-by-step guide to building modern web applications...",
    tags: ["React", "Web Development", "Programming","AI"],
    image: "https://example.com/react-web-app.jpg",
    user: "Coder123",
    timestamp: "March 1, 2025",
  },
  {
    title: "AI vs Human Creativity",
    text: "Can artificial intelligence truly replace human creativity?",
    tags: ["AI"],
    image: "https://example.com/ai-vs-human.jpg",
    user: "Philosopher",
    timestamp: "March 5, 2025",
  },
];




export const ForumRecommended = component$<Props>(({ posts = [], currentTags = [] }) => {
  console.log("📢 ForumRecommended - Received Tags:", currentTags);
  console.log("📢 ForumRecommended - Received Posts:", posts);

  // ✅ Fix: Return match inside filter
  const filteredPosts = posts.filter(post => {
    if (!currentTags.length) return false; // Prevent empty matches
  
    const match = post.tags.some(tag => currentTags.includes(tag));
    console.log(`🔍 Checking Post "${post.title}" - Tags: ${post.tags} | CurrentTags: ${currentTags} | Match Found: ${match}`);
    return match; // Ensure `filter()` actually returns a value
  });
  

  console.log("✅ Filtered Posts:", filteredPosts);

  return (
    <section class="flex overflow-hidden flex-col items-center px-20 pt-28 pb-48 w-full bg-white">
      <div class="flex flex-col max-w-full w-[812px]">
        <h2 class="self-start ml-3.5 text-4xl font-semibold text-black">
          Recommended from Dexto
        </h2>

        <div class="mt-10">
          {filteredPosts.length > 0 ? (
            <div class="flex gap-5 flex-wrap">
              {filteredPosts.map((article, index) => (
                <article key={index} class="w-6/12">
                  <div class="flex flex-col py-2 w-full">
                    <h3 class="text-2xl font-bold text-black">{article.title}</h3>
                    <p class="mt-2 text-sm font-light text-black">{article.text}</p>
                    <p class="mt-1 text-xs font-medium text-gray-500">
                      Posted by {article.user} on {article.timestamp}
                    </p>
                  </div>
                </article>
              ))}
            </div>
          ) : (
            <p class="text-gray-500 mt-5">No similar posts found.</p>
          )}
        </div>
      </div>
    </section>
  );
});
