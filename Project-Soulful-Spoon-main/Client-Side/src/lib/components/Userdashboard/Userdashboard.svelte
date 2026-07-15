<script>
    import { onMount } from "svelte";
    import '$lib/css/dashboard.css';
    import logo from '$lib/components/images/Logo.png'


    let userName = "";
    let bio = "";
    let contact = "";

    let websiteColor = "light";
    let textSize = "medium"

    //load saved into localstorage
    onMount(() => {
        const savedProfile = JSON.parse(localStorage.getItem("userProfile"));
        const savedPreferences = JSON.parse(localStorage.getItem("userPreferences"));

        if (savedProfile) {
            userName = savedProfile.userName;
            bio = savedProfile.bio;
            contact = savedProfile.contact;
        }

        if (savedPreferences) {
            websiteColor = savedPreferences.websiteColor;
            textSize = savedPreferences.textSize;
        }

        applyPreferences();
    });

    // Save profile settings & clear fields
    function saveProfile() {
        const profileData = { userName, bio, contact };
        localStorage.setItem("userProfile", JSON.stringify(profileData));
        
        // Clear fields after saving
        userName = "";
        bio = "";
        contact = "";

        alert("Profile settings saved and cleared!");
    }

    // Save preferences & clear fields
    function savePreferences() {
        const preferencesData = { websiteColor, textSize };
        localStorage.setItem("userPreferences", JSON.stringify(preferencesData));
        applyPreferences();

        // Reset dropdowns to default after saving
        websiteColor = "light";
        textSize = "medium";

        alert("Preferences saved and cleared!");
    }

    // Apply preferences instantly
    function applyPreferences() {
        document.body.style.backgroundColor = websiteColor === "dark" ? "#1a1a1a" : "#ffffff";
        document.body.style.color = websiteColor === "dark" ? "#ffffff" : "#000000";
        document.body.style.fontSize = textSize === "small" ? "14px" : textSize === "large" ? "18px" : "16px";
    }
</script>

<div class="logo-container">
    <a href="/">
    <img src={logo} alt="Soulful Spoon Logo" class="logo" />
    </a>
</div>

<div class="dashboard-container">
    <h2>👤 User Dashboard</h2>

    <!-- User Profile Section -->
    <div class="form-group">
        <label for="userName">Username</label>
        <input id="userName" type="text" bind:value={userName} placeholder="Enter your name">
    </div>

    <div class="form-group">
        <label for="bio">Bio</label>
        <textarea id="bio" bind:value={bio} placeholder="Tell us about yourself..."></textarea>
    </div>

    <div class="form-group">
        <label for="contact">Email / Phone</label>
        <input id="contact" type="text" bind:value={contact} placeholder="Enter your email or phone number">
    </div>

    <button on:click={saveProfile} class="button">Save Profile</button>

    <hr>

    <!-- Preferences Section -->
    <h2>🎨 Preferences</h2>

    <div class="form-group">
        <label for="websiteColor">Website Color</label>
        <select id="websiteColor" bind:value={websiteColor} on:change={applyPreferences}>
            <option value="light">Light Mode</option>
            <option value="dark">Dark Mode</option>
        </select>
    </div>

    <div class="form-group">
        <label for="textSize">Text Size</label>
        <select id="textSize" bind:value={textSize} on:change={applyPreferences}>
            <option value="small">Small</option>
            <option value="medium">Medium</option>
            <option value="large">Large</option>
        </select>
    </div>

    <button on:click={savePreferences} class="button">Save Preferences</button>
</div>

