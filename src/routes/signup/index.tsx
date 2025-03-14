import { component$, useSignal, $ } from '@builder.io/qwik';
import { Link, useNavigate } from '@builder.io/qwik-city';
import API_URL from '~/configURL/config';

export default component$(() => {
  const name = useSignal('');
  const email = useSignal('');
  const password = useSignal('');
  const confirmPassword = useSignal('');
  const agree = useSignal(false);
  const errorMessages = useSignal<string[]>([]);
  const isLoading = useSignal(false);
  const navigate = useNavigate();
  const API_URLL = import.meta.env.VITE_API_URL || API_URL;

  const isValidUsername = $((username: string) => {
    const usernameRegex = /^[a-zA-Z0-9]+$/;
    return usernameRegex.test(username);
  });

  const handleSubmit$ = $(async () => {
    errorMessages.value = [];
    isLoading.value = true;

    // error signup
    if (!name.value.trim() || !await isValidUsername(name.value)) 
      errorMessages.value.push("Username must contain only letters and numbers!");
    
    if (!agree.value) errorMessages.value.push("You must agree to the terms & policy!");
    
    if (!email.value.toLowerCase().trim().match(/^\S+@\S+\.\S+$/)) 
      errorMessages.value.push("Invalid email format!");
    
    if (password.value.length < 6) 
      errorMessages.value.push("Password must be at least 6 characters long!");
    
    if (password.value !== confirmPassword.value) 
      errorMessages.value.push("Passwords do not match!");

    if (errorMessages.value.length > 0) {
      isLoading.value = false;
      return;
    }

    try {
      const response = await fetch(API_URLL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          query: `
            mutation AddUser($displayName: String!, $email: String!, $password: String!) {
              addUser(displayName: $displayName, email: $email, password: $password) {
                id
                displayName
                email
              }
            }
          `,
          variables: {
            displayName: name.value.trim(),
            email: email.value.toLowerCase().trim(),
            password: password.value
          }
        }),
      });

      const result = await response.json();
      if (!response.ok || result.errors) {
        throw new Error(result.errors?.[0]?.message || "Signup failed!");
      }

      alert("Signup successful!");
      navigate('/login');
    } catch (error) {
      errorMessages.value.push(error.message || "Network error. Please try again!");
    } finally {
      isLoading.value = false;
    }
  });

  return (
    <div class="flex min-h-screen overflow-hidden">
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
            onInput$={(e) => {
              // Remove non-alphanumeric characters from input
              const value = e.target.value.replace(/[^a-zA-Z0-9]/g, '');
              e.target.value = value;
              name.value = value;
            }} 
          />
          <label class="block mb-2">Email address</label>
          <input 
            type="email" 
            class="w-full p-2 border border-gray-300 rounded mb-4" 
            placeholder="Enter your email" 
            onInput$={(e) => {
              // Remove spaces from input
              const value = e.target.value.replace(/\s/g, '');
              e.target.value = value;
              email.value = value.toLowerCase();
            }} 
          />
          <label class="block mb-2">Password</label>
          <input 
            type="password" 
            class="w-full p-2 border border-gray-300 rounded mb-4" 
            placeholder="Enter your password" 
            onInput$={(e) => {
              // Remove spaces from input
              const value = e.target.value.replace(/\s/g, '');
              e.target.value = value;
              password.value = value;
            }} 
          />
          <label class="block mb-2">Confirm Password</label>
          <input 
            type="password" 
            class="w-full p-2 border border-gray-300 rounded mb-4" 
            placeholder="Enter your password again" 
            onInput$={(e) => {
              // Remove spaces from input
              const value = e.target.value.replace(/\s/g, '');
              e.target.value = value;
              confirmPassword.value = value;
            }} 
          />
          
          {errorMessages.value.length > 0 && (
            <div class="bg-red-100 text-red-700 p-3 rounded mb-4">
              <ul class="list-disc list-inside">
                {errorMessages.value.map((err) => (
                  <li>{err}</li>
                ))}
              </ul>
            </div>
          )}

          <div class="flex items-center mb-4">
            <input type="checkbox" class="mr-2" onChange$={(e) => agree.value = e.target.checked} />
            <span>I agree to the <a href="#" class="text-blue-600">terms & policy</a></span>
          </div>
          <button 
            type="submit" 
            class="w-full bg-black text-white py-2 rounded flex items-center justify-center disabled:opacity-50" 
            disabled={!name.value || !email.value || !password.value || !confirmPassword.value || isLoading.value}
          >
            {isLoading.value ? <span class="animate-spin mr-2">🔄</span> : "Sign up"}
          </button>
        </form>
        <p class="mt-4">Have an account? <a href="/login" class="text-blue-600">Log In</a></p>
      </div>
      <div class="w-1/2 min-h-screen bg-cover bg-center" style="background-image: url('/image/World.svg')"></div>
    </div>
  );
});