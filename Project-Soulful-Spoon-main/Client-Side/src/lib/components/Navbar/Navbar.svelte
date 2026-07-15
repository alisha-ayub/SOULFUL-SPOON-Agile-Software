<script>
    import logo from '$lib/components/images/Logo.png'; 
    import profileicon from '$lib/components/images/profileicon.jpg'

    import { onMount } from 'svelte'; //added
</script>

<!-- Navbar -->
<nav class="navbar">
    <div class="logo-container">
        <a href="/">
            <img src={logo} alt="Soulful Spoon Logo" class="logo" />
        </a>
        <span class="site">Soulful Spoon</span>
    </div>
    <ul class="nav-buttons">
        <li class="dropdown">
            <a href="#/">Recipes</a>
            <ul class="dropdown-content">
            <li><a href="/breakfast">Breakfast</a></li>
            <li><a href="/lunch">Lunch</a></li>
            <li><a href="/dinner">Dinner</a></li>
            <li><a href="/desserts">Desserts</a></li>
            <li><a href="/snacks">Snacks</a></li>
            <li><a href="/quick-easy">Quick and Easy</a></li>
            <li><a href="/airfryer">Airfryer</a></li>
            </ul>
        </li>
        <li><a href="/Tips&tricks">Tips & Tricks</a></li>
        <li><a href="/About us">Aboutus</a></li>
    </ul>
    
<div class="action-buttons">
    <!-- lined to publish article page (change to actual one) -->
    <button class="add-button" title="Add New" on:click={() => window.location.href='/mockarticlepublish'}>+</button>

 <!-- profile dropdown login.signup -->
 <div class="profile-dropdown">
    <img src={profileicon} alt="Profile" class="profile-icon"/>
    
    <ul class="dropdown-menu">
        <li><a href="/login" rel="external">Login</a></li>
        <li><a href="/signup"rel="external">Sign Up</a></li>
    </ul>
 </div>
</div>
</nav>