import { component$, useSignal } from "@builder.io/qwik";

export const MyProject = component$((props: { class?: string }) => {
  const isCreating = useSignal(false);
  const newProjectName = useSignal("");
  const selectedLanguage = useSignal("");
  const projects = useSignal<{ name: string; language: string; image: string; createdAt: number; isEditing: boolean }[]>([]);

  const getLanguageImage = (language: string) => {
    switch (language) {
      case "Python":
        return "https://upload.wikimedia.org/wikipedia/commons/c/c3/Python-logo-notext.svg";
      case "C++":
        return "https://upload.wikimedia.org/wikipedia/commons/1/18/ISO_C%2B%2B_Logo.svg";
      case "Java":
        return "https://img.icons8.com/?size=100&id=13679&format=png&color=000000";
      default:
        return "https://upload.wikimedia.org/wikipedia/commons/5/5b/Logo_JavaScript.svg";
    }
  };

  const formatTimeAgo = (timestamp: number) => {
    const now = Date.now();
    const diffInSeconds = Math.floor((now - timestamp) / 1000);
    const diffInMinutes = Math.floor(diffInSeconds / 60);
    const diffInHours = Math.floor(diffInMinutes / 60);
    const diffInDays = Math.floor(diffInHours / 24);

    const rtf = new Intl.RelativeTimeFormat("en", { numeric: "auto" });

    if (diffInSeconds < 60) {
      return "Just now";
    } else if (diffInMinutes < 60) {
      return rtf.format(-diffInMinutes, "minute");
    } else if (diffInHours < 24) {
      return rtf.format(-diffInHours, "hour");
    } else {
      return rtf.format(-diffInDays, "day");
    }
  };

  return (
    <section class={`flex flex-col flex-grow items-start text-white bg-gray-900 ${props.class || ""}`}>
      <h1 class="mt-12 ml-20 text-2xl font-semibold tracking-tight leading-none">My Project</h1>

      <h2 class="flex gap-10 mt-10 ml-20 text-xs font-semibold tracking-tight leading-none">
        <button class="px-20 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition" onClick$={() => (isCreating.value = true)}>
         Create your Project
        </button>
        <button class="px-20 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition" onClick$={() => alert("Import feature is under development!")}>
         Import your Project
        </button>
      </h2>


      {isCreating.value && (
        <div class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div class="bg-gray-800 p-6 rounded-lg w-96">
            <h2 class="text-xl font-semibold">Create New Project</h2>
            <input
              class="w-full p-2 mt-4 bg-gray-700 text-white border border-gray-500 rounded-md"
              placeholder="Enter project name..."
              value={newProjectName.value}
              onInput$={(e) => (newProjectName.value = (e.target as HTMLInputElement).value)}
            />

            <h3 class="mt-4">Choose Language:</h3>
            <div class="flex gap-4 mt-2">
              {["Python", "C++", "Java"].map((lang) => (
                <button
                  key={lang}
                  class={`px-4 py-2 rounded-md ${selectedLanguage.value === lang ? "bg-green-600" : "bg-gray-600"} text-white`}
                  onClick$={() => (selectedLanguage.value = lang)}
                >
                  {lang}
                </button>
              ))}
            </div>

            <div class="flex justify-end gap-2 mt-6">
              <button class="px-4 py-2 bg-gray-500 text-white rounded-md" onClick$={() => (isCreating.value = false)}>
                Cancel
              </button>
              <button
                class="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
                onClick$={() => {
                  if (newProjectName.value && selectedLanguage.value) {
                    projects.value = [
                      ...projects.value,
                      {
                        name: newProjectName.value,
                        language: selectedLanguage.value,
                        image: getLanguageImage(selectedLanguage.value),
                        createdAt: Date.now(),
                        isEditing: false,
                      },
                    ];
                    newProjectName.value = "";
                    selectedLanguage.value = "";
                    isCreating.value = false;
                  }
                }}
              >
                Create
              </button>
            </div>
          </div>
        </div>
      )}

      <div class="mt-8 ml-20 w-full max-w-3xl space-y-4">
        {projects.value.map((project, index) => (
          <div key={index} class="relative flex flex-col items-start px-6 py-4 bg-gray-800 rounded-lg hover:bg-gray-700 transition duration-300 group">
            <div class="flex gap-6 items-center">
              <img alt={`${project.language} Logo`} src={project.image} width="50" height="50" />
              <div>
                {project.isEditing ? (
                  <input
                    class="text-xl font-medium bg-gray-700 text-white border border-gray-500 px-2 py-1 rounded-md"
                    value={project.name}
                    onInput$={(e) => {
                      projects.value[index].name = (e.target as HTMLInputElement).value;
                    }}
                    onBlur$={() => {
                      projects.value[index].isEditing = false;
                      projects.value = [...projects.value]; // อัปเดต state
                    }}
                    autoFocus
                  />
                ) : (
                  <h3 class="text-xl font-medium">{project.name}</h3>
                )}
                <h4 class="flex gap-2 text-xs text-neutral-400">
                  <p class="text-white">{project.language}</p>
                  <p>{formatTimeAgo(project.createdAt)}</p>
                </h4>
              </div>
            </div>

            <div class="absolute right-4 top-1/2 -translate-y-1/2 flex gap-2 opacity-0 group-hover:opacity-100 transition duration-300">
              <button
                class="bg-gray-700 hover:bg-gray-500 text-white px-2 py-1 rounded-md"
                onClick$={() => {
                  projects.value[index].isEditing = true;
                  projects.value = [...projects.value]; // อัปเดต state
                }}
              >
                <img alt="Edit Icon" src="https://img.icons8.com/?size=100&id=8Y4tD58oU8lB&format=png&color=FFFFFF" width="25" height="25" />
              </button>
              <button class="bg-gray-700 hover:bg-gray-500 text-white px-2 py-1 rounded-md">
                <img alt="Download Icon" src="https://img.icons8.com/?size=100&id=xfmO9wVKAyAR&format=png&color=FFFFFF" width="25" height="25" onClick$={() => alert("Download complete!")} />
              </button>
              <button
                class="bg-gray-700 hover:bg-gray-500 text-white px-2 py-1 rounded-md"
                onClick$={() => {
                  projects.value = projects.value.filter((_, i) => i !== index);
                }}
              >
                <img alt="Delete Icon" src="https://img.icons8.com/?size=100&id=43949&format=png&color=FFFFFF" width="25" height="25" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
});
