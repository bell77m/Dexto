import { component$, useSignal, $ } from '@builder.io/qwik';
import { Link } from '@builder.io/qwik-city';

export default component$(() => {
  const name = useSignal('');
  const email = useSignal('');
  const password = useSignal('');
  const confirmPassword = useSignal('');
  const agree = useSignal(false);
  const errorMessage = useSignal('');
  const isLoading = useSignal(false);

  const handleSubmit$ = $(async () => {
    errorMessage.value = ''; // เคลียร์ error ก่อนเริ่ม
    isLoading.value = true;  // เริ่มโหลด

    if (!agree.value) {
      errorMessage.value = "You must agree to the terms & policy!";
      isLoading.value = false;
      return;
    }

    if (password.value !== confirmPassword.value) {
      errorMessage.value = "Passwords do not match!";
      isLoading.value = false;
      return;
    }

    if (!email.value.match(/^\S+@\S+\.\S+$/)) {
      errorMessage.value = "Invalid email format!";
      isLoading.value = false;
      return;
    }

    try {
      const response = await fetch("http://10.6.38.139:3000/graphql", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          query: `
            mutation CreateUser($displayName: String!, $email: String!, $password: String!) {
              createUser(displayName: $displayName, email: $email, password: $password) {
                id
                displayName
                email
              }
            }
          `,
          variables: {
            displayName: name.value,
            email: email.value,
            password: password.value
          }
        }),
      });

      const result = await response.json();

      if (result.errors) {
        errorMessage.value = result.errors[0].message || "Signup failed!";
        isLoading.value = false;
        return;
      }

      alert("Signup successful!");
      name.value = '';
      email.value = '';
      password.value = '';
      confirmPassword.value = '';
      agree.value = false;
    } catch (error) {
      errorMessage.value = "Network error. Please try again!";
    } finally {
      isLoading.value = false;
    }
  });

  return (
    <div class="flex min-h-screen overflow-hidden">
      {/* Left Side - Signup Form */}
      <div class="w-1/2 flex flex-col justify-center items-center bg-white p-6 max-h-screen overflow-auto">
        <Link href="/" class="flex shrink-0 items-center cursor-pointer">
          <img alt="My DEXTO Icon" src="/image/DextoLogoDark.svg" width="167" height="32" />
        </Link>
        <h1 class="text-3xl font-bold mb-6">Get Started Now</h1>
        <form class="w-full max-w-sm" preventdefault:submit onSubmit$={handleSubmit$}>
          <label class="block mb-2">Name</label>
          <input 
            type="text" 
            class="w-full p-2 border border-gray-300 rounded mb-4" 
            placeholder="Enter your name"
            onInput$={(e) => name.value = (e.target as HTMLInputElement).value}
          />
          <label class="block mb-2">Email address</label>
          <input 
            type="email" 
            class="w-full p-2 border border-gray-300 rounded mb-4" 
            placeholder="Enter your email"
            onInput$={(e) => email.value = (e.target as HTMLInputElement).value}
          />
          <label class="block mb-2">Password</label>
          <input 
            type="password" 
            class="w-full p-2 border border-gray-300 rounded mb-4" 
            placeholder="Enter your password"
            onInput$={(e) => password.value = (e.target as HTMLInputElement).value}
          />
          <label class="block mb-2">Confirm Password</label>
          <input 
            type="password" 
            class="w-full p-2 border border-gray-300 rounded mb-4" 
            placeholder="Enter your password again"
            onInput$={(e) => confirmPassword.value = (e.target as HTMLInputElement).value}
          />
          
          {errorMessage.value && <p class="text-red-500">{errorMessage.value}</p>}

          <div class="flex items-center mb-4">
            <input 
              type="checkbox" 
              class="mr-2"
              onChange$={(e) => agree.value = (e.target as HTMLInputElement).checked}
            />
            <span>I agree to the <a href="#" class="text-blue-600">terms & policy</a></span>
          </div>
          <button 
            type="submit" 
            class="w-full bg-black text-white py-2 rounded disabled:opacity-50"
            disabled={!name.value || !email.value || !password.value || !confirmPassword.value || isLoading.value}
          >
            {isLoading.value ? "Signing up..." : "Sign up"}
          </button>
        </form>
        <div class="flex items-center w-full max-w-sm my-4">
          <hr class="flex-grow border-gray-300" />
          <span class="mx-2">or</span>
          <hr class="flex-grow border-gray-300" />
        </div>
        <div class="flex space-x-4">
          <button class="flex items-center px-4 py-2 border rounded">
            <img src="/image/GoogleLogo.svg" class="w-5 h-5 mr-2" /> Sign in with Google
          </button>
        </div>
        <p class="mt-4">Have an account? <a href="/login" class="text-blue-600">Log In</a></p>
      </div>

      {/* Right Side - Image Background */}
      <div class="w-1/2 min-h-screen bg-cover bg-center" style="background-image: url('/image/World.svg')"></div>
    </div>
  );
});

