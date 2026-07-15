
<script>
    import '$lib/css/homepage.css'; //import homepage styles
    import logo from '$lib/components/images/Logo.png'; 
    import profileicon from '$lib/components/images/profileicon.jpg'
    import SalmonQuinoaBowl from '$lib/components/images/SalmonQuinoaBowl.jpg';
    import PrawnSpagetti from '$lib/components/images/PrawnSpagetti.jpg';
    import BananaOatmealPancakes from '$lib/components/images/BananaOatmealPancakes.jpg';
    import StickyGingerSesameChicken from '$lib/components/images/StickyGingerSesameChicken.jpg';
    import ChickpeaSaladSandwich from '$lib/components/images/ChickpeaSaladSandwich.jpg';
    import StrawberryYoghurtBites from '$lib/components/images/StrawberryYoghurtBites.jpg';
    import SteakWithMushroomSauce from '$lib/components/images/SteakWithMushroomSauce.jpg';
    import EggSalad from '$lib/components/images/EggSalad.jpg';
    import facebooklogo from '$lib/components/images/facebooklogo.png';
    import instalogo from '$lib/components/images/instalogo.png';
    import xlogo from '$lib/components/images/xlogo.png';
    import whatsapplogo from '$lib/components/images/whatsapplogo.png';
    import Userdashboard from '../Userdashboard/Userdashboard.svelte';
    import {auth, logout} from '$lib/firebase';

    import { onMount } from 'svelte'; //added
	import { applyAction } from '$app/forms';

    let searchQuery = "";
    let selectedCourse = "";
    let selectedDiet = "";
    let isAuthenticated = false;
    let user = null;
    // let isDarkMode = false; //light mode default

    // const savedTheme = localStorage.getItem("theme");
    // if (savedTheme) {
    //     isDarkMode = savedTheme === "dark";
    //     applyTheme();
    // }

    // //toggle light and dark mode
    // function toggleTheme() {
    //     isDarkMode = !isDarkMode;
    //     localStorage.setItem("theme", isDarkMode ? "dark" : "light");
    //     applyTheme();
    // }

    // //applying theme 
    // function applyTheme() {
    //     document.documentElement.classList.toggle("dark-mode", isDarkMode);
    // }
 
//  clear filter button functions
    function clearFilters() {
        searchQuery = "";
        selectedCourse = "";
        selectedDiet = "";
        // filtering image initalisation
        filteredImages = images;

    document.querySelectorAll('input[name="course"]').forEach((el) => el.checked = false);
    document.querySelectorAll('input[name="diet"]').forEach((el) => el.checked = false);
    }
    
    onMount (() => {
        auth.onAuthStateChanged((u) => {
            if (u) {
                isAuthenticated = true;
                user = u;
            } else {
                isAuthenticated = false;
                user = null;
            }
        });
    });

    function handleSignOut() {
        logout();
        isAuthenticated = false;
        user = null;
    }

    //defining image array
    let images = [
        {src: SalmonQuinoaBowl, text: "Salmon Quinoa Bowl", course:["lunch"], diet: ["halal","gluten-free"]},
        {src: PrawnSpagetti, text: "Prawn Spagetti", course:["dinner"], diet: ["halal", "high-protein"]},
        {src: BananaOatmealPancakes, text: "Banana Oatmeal Pancakes", course:["breakfast"], diet: ["halal", "high-protein", "vegetarian", "dairy-free"]},
        {src: StickyGingerSesameChicken, text: "Sticky Ginger Sesame Chicken", course:["lunch", "dinner"], diet: ["halal", "high-protein"]},
        {src: ChickpeaSaladSandwich, text: "Chickpea Salad Sandwich", course:["dinner", "lunch"], diet: ["halal","vegan", "dairy-free"]},
        {src: StrawberryYoghurtBites, text: "Strawberry Yoghurt Bites", course:["bites"], diet:["halal", "vegetarian"]},
        {src: SteakWithMushroomSauce, text: "Steak With Mushroom Sauce", course: ["dinner", "lunch"], diet: ["high-protein", "halal"]},
        {src: EggSalad, text: "Egg Salad", course: ["breakfast"], diet: ["diary-free", "gluten-free", "halal"]}  
    ];

    //reactive variables for filtered images
    let filteredImages = images;

        //function to handle search
    function handleSearch() {
        filteredImages = images.filter(image =>
            (searchQuery === "" ||
                image.text.toLowerCase().includes(searchQuery.toLowerCase()) ||
                image.course.some(c => c.toLowerCase().includes(searchQuery.toLowerCase())) ||
                image.diet.some(d => d.toLowerCase().includes(searchQuery.toLowerCase()))
    
        ) &&
        (selectedCourse === "" || image.course.includes(selectedCourse)) &&
        (selectedDiet === "" || image.diet.includes(selectedDiet))
    );
 }

    onMount(() => {
        filteredImages = images;
    });

    //added by Harshikaa to show user-published and default recipes. have to replace with backend database
    onMount(() => {
        if(typeof localStorage !== "undefined"){
            let savedRecipes = JSON.parse(localStorage.getItem("recipes")) || [];

            images = [
                ...images, 
                ...savedRecipes.map(recipe => ({
                src: recipe.image_path || "/src/lib/components/images/publish-article.jpg",
                text: recipe.title
            }))
            ];
        }
    });

</script>

<svelte:head>
     <script src="https://cdn.botpress.cloud/webchat/v2.2/inject.js"></script>
<script src="https://files.bpcontent.cloud/2025/02/25/06/20250225063934-HGA74MAU.js"></script>
    </svelte:head>
    
<!-- Navbar -->
<nav class="navbar">
    <div class="logo-container">
        <a href="/" rel="external">
        <img src={logo} alt="Soulful Spoon Logo" class="logo" />
    </a>
        <span class="site">Soulful Spoon</span>
    </div>
    <ul class="nav-buttons">
        <li class="dropdown">
            <a href="/recipes">Recipes</a>
            <ul class="dropdown-content">
            <li><a href="/recipes#breakfast">Breakfast</a></li>
            <li><a href="/recipes#lunch">Lunch</a></li>
            <li><a href="/recipes#dinner">Dinner</a></li>
            <li><a href="/recipes#desserts">Desserts</a></li>
            <li><a href="/recipes#snacks">Snacks</a></li>
            <li><a href="/recipes#snacks">Snacks</a></li>
            <li><a href="/recipes#quick-easy">Quick and Easy</a></li>
            <li><a href="/recipes#airfryer">Airfryer</a></li>
            </ul>
        </li>
        <li><a href="/Tips&tricks">Tips & Tricks</a></li>
        <li><a href="/Aboutus">About us</a></li>
        <li><a href="/Userdashboard">⚙️</a></li>
    </ul>

    <!-- <div class="action-buttons">  -->
        <!-- toggle -->
          <!-- <button class="theme-toggle" on:click={toggleTheme}>
            {isDarkMode ? "🌙 Dark Mode" : " 🔆Light Mode"}
         </button>
    </div>  -->

    <div class="action-buttons">
    <!-- lined to publish article page (change to actual one) -->
    <button class="add-button" title="Add New" on:click={() => window.location.href='/mockarticlepublish'}>+</button>

 <!-- profile dropdown login.signup -->
 <div class="profile-dropdown">
    <img src={profileicon} alt="Profile" class="profile-icon"/>
    
    <ul class="dropdown-menu">
        {#if isAuthenticated}
        <li><a href="Articlepublish">Articlepublish</a></li>
        <li><a href="/profile">Profile</a></li>
        {:else}
        <li><a href="/login" rel="external">Login</a></li>
        <li><a href="/signup"rel="external">Sign Up</a></li>
        <li><a href="/#" on:click={handleSignOut}>Sign Out</a></li>
        <li>Sign Out</li>
        {/if}
    </ul>
 </div>
</div>
</nav>


<!-- search bar -->
<div class="search-filter-container">

    <!-- Filters -->
<div class="filter-box">
    <button class="filter-button">
        Filter Options ⇩</button>

    <div class="filter-dropdown">
        <h4>Courses</h4>
        <ul>
            <li><input type="radio" name="course" bind:group={selectedCourse} value="breakfast" on:change={handleSearch}/> <label for="breakfast">Breakfast</label></li>
            <li><input type="radio" name="course" bind:group={selectedCourse}  value="lunch" on:change={handleSearch}/> <label for="lunch">Lunch</label></li>
            <li><input type="radio" name="course" bind:group={selectedCourse}  value="dinner" on:change={handleSearch}/> <label for="dinner">Dinner</label></li>
            <li><input type="radio" name="course" bind:group={selectedCourse}  value="bites" on:change={handleSearch}/> <label for="bites">Bites</label></li>
            <li><input type="radio" name="course" bind:group={selectedCourse}  value="highprotein" on:change={handleSearch}/> <label for="highProtein">High Protein</label></li>
            <li><input type="radio" name="course" bind:group={selectedCourse}  value="dessert" on:change={handleSearch}/> <label for="dessert">Dessert</label></li>
            <li><input type="radio" name="course" bind:group={selectedCourse}  value="baking" on:change={handleSearch}/> <label for="baking">Baking</label></li>
        </ul>
        <h4>Dietary Requirements</h4>
        <ul>
            <li><input type="radio" name="diet" bind:group={selectedDiet}  value="vegan" on:change={handleSearch}/> <label for="vegan">Vegan</label></li>
            <li><input type="radio" name="diet" bind:group={selectedDiet}  value="vegetarian" on:change={handleSearch}/> <label for="vegetarian">Vegetarian</label></li>
            <li><input type="radio" name="diet" bind:group={selectedDiet}  value="halal" on:change={handleSearch}/> <label for="halal">Halal</label></li>
            <li><input type="radio" name="diet" bind:group={selectedDiet}  value="dairyfree" on:change={handleSearch}/> <label for="dairyFree">Dairy Free</label></li>
            <li><input type="radio" name="diet" bind:group={selectedDiet}  value="glutenfree" on:change={handleSearch}/> <label for="glutenFree">Gluten Free</label></li>
        </ul>
        <!-- clear button -->
         <button class="clear-button" on:click={clearFilters}>Clear All</button>
    </div>
 </div>
    <div class="search-container">
    <input
        type="text"
        bind:value={searchQuery}
        on:input={handleSearch}
        placeholder="Search recipes..."
        class="search-input"
        />
        <button class="search-button" on:click={handleSearch}>⌕</button>
 </div>
 </div>

 <!-- <main class={isDarkMode ? "dark-mode" : ""}>
    <h2>Welcome to Soulful Spoon</h2>
     only show when authenticated
     {#if isAuthenticated}
     <Userdashboard/>
     {:else}
     <p>Please log in to view your profile.</p>
    {/if} -->
<!-- </main> -->

<main>
    <h2>Welcome to Soulful Spoon</h2>
</main>

<!-- image layout all 8 images -->
<section class="image-layout">
    {#each filteredImages as image}
    <div class="imagetext">
        <!-- added to link each recipe to its individual page -->
        <a href="/recipes/{image.text.toLowerCase().replace(/\s+/g, '-')}" rel="external">
            <img src={image.src} alt={image.text} />
            <div class="hover-text">
                <p>{image.text}</p>
            </div>
        </a>
    </div>
    {/each}
</section>

<!-- Footer -->
<footer class="footer">
    <div class="footer-container">
        <!-- logo and about us  -->
         <div class="footer-column">
            <img src={logo} alt="Soulful Spoon Logo" class="footer-logo">
            <p class="footer-about">Discover delicious recipes, tips and tricks for a healthier lifestyle.</p>
         </div>
         <!-- links for quick acess -->
          <div class="footer-column">
            <h4>Quick Links</h4>
            <ul class="footer-links">
                <li><a href="/Recipepage">Recipes</a></li>
                <li><a href="/Tips&tricks">Tips & Tricks</a></li>
                <li><a href="/About us">Aboutus</a></li>
            </ul>
          </div>
          <!-- social media -->
           <div class="footer-column">
            <h4>Follow us!</h4>
            <div class="social-icons">
                <a href="/#" class="social-link">
                    <img src={facebooklogo} alt="Facebook">
                </a>
                <a href="/#" class="social-link">
                    <img src={instalogo} alt="Instagram">
                </a>
                <a href="/#" class="social-link">
                    <img src={xlogo} alt="X">
                </a>
                <a href="/#" class="social-link">
                    <img src={whatsapplogo} alt="Whatsapp">
                </a>
            </div>
        </div>
    </div>
 </footer>