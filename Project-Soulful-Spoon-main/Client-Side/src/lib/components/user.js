// Import necessary dependencies
import { writable } from 'svelte/store';

// Define the user store
const userStore = writable({
  isLoggedIn: false,
  // Add other user data properties as needed
});

// Export user store methods
export const user = {
  subscribe: userStore.subscribe,
  login: (userData) => {
    userStore.set({
      isLoggedIn: true,
      ...userData,
    });
  },
  logout: () => {
    userStore.set({
      isLoggedIn: false,
    });
  },
};

