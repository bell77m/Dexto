import { component$, useSignal } from '@builder.io/qwik';
import { Link } from '@builder.io/qwik-city';

export default component$(() => {
  const name = useSignal('');
  const email = useSignal('');
  const password = useSignal('');
  const agree = useSignal(false);

  return (
    <div class="flex min-h-screen">
      {/* Left Side - Signup Form */}
      <div class="w-1/2 flex flex-col justify-center items-center bg-white p-10">
        <Link href="/" class="flex shrink-0 items-center cursor-pointer">
          <img alt="My DEXTO Icon" src="/image/DextoLogoDark.svg" width="167" height="32" />
        </Link>
        <h1 class="text-3xl font-bold mb-6">Get Started Now</h1>
        <form class="w-full max-w-sm">
          <label class="block mb-2">Name</label>
          <input 
            type="text" 
            class="w-full p-2 border border-gray-300 rounded mb-4" 
            placeholder="Enter your name"
            bind:value={name}
          />
          <label class="block mb-2">Email address</label>
          <input 
            type="email" 
            class="w-full p-2 border border-gray-300 rounded mb-4" 
            placeholder="Enter your email"
            bind:value={email}
          />
          <label class="block mb-2">Password</label>
          <input 
            type="password" 
            class="w-full p-2 border border-gray-300 rounded mb-4" 
            placeholder="Enter your password"
            bind:value={password}
          />
          <label class="block mb-2">Confirm Password</label>
          <input 
            type="password" 
            class="w-full p-2 border border-gray-300 rounded mb-4" 
            placeholder="Enter your password"
            bind:value={password}
          />
          
          <div class="flex items-center mb-4">
            <input 
              type="checkbox" 
              class="mr-2"
              bind:checked={agree}
            />
            <span>I agree to the <a href="#" class="text-blue-600">terms & policy</a></span>
          </div>
          <button class="w-full bg-black text-white py-2 rounded">Sign up</button>
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
        <p class="mt-4">Have an account? <a href="#" class="text-blue-600">Log In</a></p>
      </div>

      {/* Right Side - Image Background */}
      <div class="w-1/2 h-screen bg-cover bg-center" style="background-image: url('/image/World.svg')"></div>
    </div>
  );
});
