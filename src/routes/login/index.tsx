import { component$, useSignal, $ } from '@builder.io/qwik';
import { Link, useNavigate } from '@builder.io/qwik-city';

export default component$(() => {
  const email = useSignal('');
  const password = useSignal('');
  const agree = useSignal(false);
  const errorMessage = useSignal('');
  const isLoading = useSignal(false);
  const navigate = useNavigate();

  const handleLogin$ = $(async () => {
    errorMessage.value = ''; // เคลียร์ข้อความผิดพลาด
    isLoading.value = true; // เริ่มการโหลด

    try {
      const response = await fetch('http://10.6.38.160:3000/graphql', {  // URL ของ backend ที่เชื่อมต่อ
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          query: `
            mutation LoginUser($email: String!, $password: String!) {
              loginUser(email: $email, password: $password) {
                success
                message
                user {
                  id
                  displayName
                  email
                }
              }
            }
          `,
          variables: { email: email.value, password: password.value },
        }),
      });

      const result = await response.json();
      const loginData = result.data?.loginUser;

      if (!loginData?.success) {
        errorMessage.value = loginData?.message || 'Login failed!';
        isLoading.value = false;
        return;
      }

      alert(`Welcome, ${loginData.user.displayName}!`);
      navigate('/dashboard'); // เปลี่ยนไปที่หน้าหลักหรือ Dashboard
    } catch (error) {
      errorMessage.value = 'Network error. Please try again!';
    } finally {
      isLoading.value = false;
    }
  });

  return (
    <div class="flex min-h-screen overflow-hidden">
      {/* Left Side - Login Form */}
      <div class="w-1/2 flex flex-col justify-center items-center bg-white p-6 max-h-screen overflow-auto">
        <Link href="/" class="flex shrink-0 items-center cursor-pointer mb-7">
          <img alt="My DEXTO Icon" src="/image/DextoLogoDark.svg" width="167" height="32" />
        </Link>
        <h1 class="text-3xl font-bold mb-1">Welcome back!</h1>
        <h2 class="text-2xl mb-6">Enter your Credentials to access your account</h2>
        <form class="w-full max-w-sm" preventdefault:submit onSubmit$={handleLogin$}>
          <label class="block mb-2">Email address</label>
          <input
            type="email"
            class="w-full p-2 border border-gray-300 rounded mb-4"
            placeholder="Enter your email"
            onInput$={(e) => (email.value = (e.target as HTMLInputElement).value)}
          />
          <label class="block mb-2">Password</label>
          <input
            type="password"
            class="w-full p-2 border border-gray-300 rounded mb-4"
            placeholder="Enter your password"
            onInput$={(e) => (password.value = (e.target as HTMLInputElement).value)}
          />

          {errorMessage.value && <p class="text-red-500 mb-4">{errorMessage.value}</p>}

          <div class="flex items-center mb-4">
            <input
              type="checkbox"
              class="mr-2"
              onChange$={(e) => (agree.value = (e.target as HTMLInputElement).checked)}
            />
            <span>Remember me</span>
          </div>
          <button
            type="submit"
            class="w-full bg-black text-white py-2 rounded disabled:opacity-50"
            disabled={!email.value || !password.value || isLoading.value}
          >
            {isLoading.value ? 'Logging in...' : 'Sign in'}
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
        <p class="mt-4">
          Don't have an account? <a href="/signup" class="text-blue-600">Sign Up</a>
        </p>
      </div>

      {/* Right Side - Image Background */}
      <div class="w-1/2 min-h-screen bg-cover bg-center" style="background-image: url('/image/World.svg')"></div>
    </div>
  );
});
