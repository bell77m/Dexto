import { component$, useSignal, $ } from '@builder.io/qwik';
import { Link, useNavigate } from '@builder.io/qwik-city';
import { useUserStore } from '~/store/store'; 
import API_URL from '~/configURL/config';

export default component$(() => {
  const email = useSignal('');
  const password = useSignal('');
  const agree = useSignal(false);
  const errorMessage = useSignal('');
  const isLoading = useSignal(false);
  const navigate = useNavigate();

  
  const userStore = useUserStore();  

  const handleLogin$ = $(async () => {
    errorMessage.value = ''; 
    isLoading.value = true; 

    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 5000); // 5 วินาที
     
      const response = await fetch(API_URL, {  
        method: 'POST',
        signal: controller.signal,
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
                  profilePictureUrl  
                }
              }
            }
          `,
          variables: { email: email.value, password: password.value },
        }),
      });
     
      clearTimeout(timeoutId);
     
      // ตรวจสอบ HTTP status
      if (!response.ok) {
        switch (response.status) {
          case 400:
            errorMessage.value = 'Bad Request. Please check your input.';
            break;
          case 401:
            errorMessage.value = 'Unauthorized. Invalid credentials.';
            break;
          case 403:
            errorMessage.value = 'Forbidden. You do not have access.';
            break;
          case 404:
            errorMessage.value = 'Service not found.';
            break;
          case 500:
            errorMessage.value = 'Internal Server Error. Please try again later.';
            break;
          default:
            errorMessage.value = 'An unexpected error occurred.';
        }
        isLoading.value = false;
        return;
      }
     
      const result = await response.json();
      const loginData = result.data?.loginUser;
     
      // ตรวจสอบ GraphQL response
      if (!loginData?.success) {
        errorMessage.value = loginData?.message || 'Login failed!';
        isLoading.value = false;
        return;
      }
     
      console.log('User Data:', loginData.user);
      
      const { updateStore } = userStore;
      updateStore(
        loginData.user.displayName,
        loginData.user.id,
        loginData.user.profilePictureUrl
      );
     
      console.log('Sidebar Display Name login:', userStore.displayName);
      alert(`Welcome, ${loginData.user.displayName}!`);
      navigate('/home');
     
     } catch (error: unknown) {
      // จัดการ error หลากหลายประเภท
      if (error instanceof Error && error.name === 'AbortError') {
        errorMessage.value = 'Request timed out. Please check your connection.';
      } else if (error instanceof TypeError) {
        // Network error
        errorMessage.value = 'Network error. Please check your internet connection.';
      } else if (error instanceof SyntaxError) {
        // JSON parsing error
        errorMessage.value = 'Error processing server response.';
        navigate('/service-unavailable');
      } else {
        // Fallback for other unexpected errors
        errorMessage.value = 'An unexpected error occurred. Please try again.';
        navigate('/service-unavailable');
      }
    
      // Log error for debugging
      console.error('Login error:', error);
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

          {/* <div class="flex items-center mb-4">
            <input
              type="checkbox"
              class="mr-2"
              onChange$={(e) => (agree.value = (e.target as HTMLInputElement).checked)}
            />
            <span>Remember me</span>
          </div> */}
          
          <button
            type="submit"
            class="w-full bg-black text-white mt-10 py-2 rounded disabled:opacity-50"
            disabled={!email.value || !password.value || isLoading.value}
          >
            {isLoading.value ? 'Logging in...' : 'Sign in'}
          </button>
        </form>
        <p class="mt-4">
          Don't have an account? <a href="/signup" class="text-blue-600">Sign Up</a>
        </p>
      </div>

      {/* Right Side - Image Background */}
      <div class="w-1/2 min-h-screen bg-cover bg-center" style="background-image: url('/image/World.svg')"></div>
    </div>
  );
});