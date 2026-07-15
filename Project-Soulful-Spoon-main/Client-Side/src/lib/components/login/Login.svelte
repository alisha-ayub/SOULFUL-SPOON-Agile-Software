<script>
    //commented out for now to view css and html (couldnt work if i did not comment out)
     import { goto } from "$app/navigation";
    import { AUTH_URL } from "../../../lib/js/api-urls.js";
    import "$lib/css/login.css";  
    import {loginWithGoogle, logout, auth} from "$lib/firebase";
    import {onMount} from "svelte";

    let user = null;
    let username = "";
    let password = "";
    let error = false;
  
    async function googleLogin(){
      try{
        const result = await loginWithGoogle();
        user = result.user;
        console.log("Google Login Sucess:", user);
        // goto("/", { replaceState: true });
        window.location.href = "/"; //had to change to this to ensure the page reloads completely

      } catch (error){
          console.log("Google Login Failed:", error);
      }
    }

    function handleLogout(){
      logout();
      user = null;
      console.log("User is logged out");
    }

    onMount(() => {
      auth.onAuthStateChanged((u) => {
        if(u){
          user = u; //contains displayName, email, photoURL, uid, emailVerified
          console.log("User is logged in", u);
        }
        // user.u;
      });
    });
  
    /**
     * Handles logging in by sending a POST request to /api/auth, with the given username and password.
     *
     * If successful, redirect the user back to the homepage. Otherwise, display an error message.
     */
     async function handleSubmit() {
  error = false;
  
  try {
    const response = await fetch(AUTH_URL, {
      method: "POST",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password })
      
    });

    if (!response.ok) {
      // If response is not okay (status code other than 2xx)
      
      if (response.status === 401) {
        // Unauthorized: Incorrect username or password
        error = true;
      } else {
        // Other server errors
        console.error("Server error:", response.statusText);
      }
    } else {
      // Successful login, redirect user to homepage
      goto("/", { invalidateAll: true, replaceState: true });
    }
  } catch (error) {
    console.error("Error while processing login:", error);
    error = true; // Set error flag for unexpected errors
  }
}
   
  </script>
  
  

  <!-- HTML for login page-->
  <div class="login-container" >
    <!-- login image -->
    <div class="login-image"></div>
      <!-- login form -->
      <div class="login-form">
        <!-- close button -->
        <!-- <button class="close-button" on:click={() => goto('/')}>x</button> -->
        <button class="close-button" on:click={() => window.location.href = "/"}>x</button>
        <h2>Welcome Back!</h2>
        <form on:submit|preventDefault={handleSubmit}>
          <input type="username" bind:value={username} placeholder="Username" required />
          <input type="password" bind:value={password} placeholder="Password" required />
          <p class="forgot-password">
            Forgot Password? <a href="#/"> Get Help</a>
          </p>
          <button class="login-button" type="submit">Login</button>
        </form>
        <!-- profile picture -->
          {#if user}
          <div class="user-info">
            <img src={user.photoURL} alt="Profile">
            <p>Welcome, {user.displayName}!</p>
            <button on:click={handleLogout}>Logout</button>
          </div>
          {:else}
          <div class="social-login">
            <p>Or Log In With:</p>
            <div class="social-icons">
              <button on:click={googleLogin}>
                <img src="src/lib/components/images/google-icon.png" alt="Google" />
              </button>
              <!-- <img src="src/lib/components/images/facebook-icon.png" alt="Facebook" /> -->
            </div>
          </div>
          {/if}

          <p class="signup">
            <!-- No Account? <a href="/signup" on:click={() => goto("/signup")}>Sign Up</a> -->
           No Account? <a href="/signup" rel="external">Sign Up</a>
          </p>
      </div>
  </div>
  
  <!-- <h1 id="loginHeader">Login</h1>
  
    <form id="login-container" on:submit|preventDefault={handleSubmit}>
    <label for="username">Username:</label>
    <input type="text" name="username" bind:value={username} required />
    <label for="password">Password:</label>
    <input type="password" name="password" bind:value={password} required />
    <button id="loginButton" type="submit">Login</button>
    {#if error}
      <span class="error">username or password not correct, please try again.</span>
    {/if}
    <div class="signup">
      <span class="signingup">Don't have an account?
        <a href="/signup" on:click={() => goto("/signup")}>&#x1F64C Sign up</a>
          </span>
      </div>
    </form> -->

  