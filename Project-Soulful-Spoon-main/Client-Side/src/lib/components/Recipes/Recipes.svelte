<script>
    import "$lib/css/recipes.css";
    import logo from '$lib/components/images/Logo.png'; 
    import profileicon from '$lib/components/images/profileicon.jpg';
    // import Breakfast from '$lib/components/images/Breakfast.jpg';
    // import Lunch from '$lib/components/images/Lunch.jpg';
    // import Dinner from '$lib/components/images/Dinner.jpg';
    // import Desserts from '$lib/components/images/Desserts.jpg';
    // import Snacks from '$lib/components/images/Snacks.jpg';
    // import Quickeasy from '$lib/components/images/Breakfast.jpg';
    // import Airfryer from '$lib/components/images/Airfryer.png';
    import Pancake from '$lib/components/images/pancakewmaplesyrup.jpg';
    import Avocado from '$lib/components/images/avocadotoast.jpg';
    import Yogurt from '$lib/components/images/yogurtgranola.jpg';
    import Oatmeal from '$lib/components/images/oatmealfruit.jpg';
    import ChickenSalad from '$lib/components/images/chickensalad.jpg';
    import Agliolio from '$lib/components/images/agliolio.jpg';
    import Salmon from '$lib/components/images/teriyakisalmon.jpg';
    import Tofu from '$lib/components/images/tofuveg.jpg';
    import ButterChicken from '$lib/components/images/butterchicken.jpg';
    import BeefMash from '$lib/components/images/beefmash.jpg';
    import LemonFish from '$lib/components/images/lemonfish.jpg';
    import BasmatiRice from '$lib/components/images/basmatirice.jpg';
    import ChocLava from '$lib/components/images/choclava.jpg';
    import Tiramisu from '$lib/components/images/tiramisu.jpg';
    import StrawberryCheesecake from '$lib/components/images/strawberrycheesecake.jpg';
    import MangoStickyRice from '$lib/components/images/mangostickyrice.jpg';
    import Nachos from '$lib/components/images/nachos.jpg';
    import CheeseGarlicBread from '$lib/components/images/cheesegarlicbread.jpg';
    import PopcornChicken from '$lib/components/images/popcornchicken.jpg';
    import Hummus from '$lib/components/images/hummus.jpg';
    import EggSandwich from '$lib/components/images/eggsandwich.jpg';
    import GarlicShrimp from '$lib/components/images/garlicshrimp.jpg';
    import MugCake from '$lib/components/images/mugcake.jpg';
    import FrenchFries from '$lib/components/images/frenchfries.jpg';
    import BuffaloWings from '$lib/components/images/buffalochicken.jpg';
    import CheeseSticks from '$lib/components/images/cheesesticks.jpg';
    import SweetPotatoWedges from '$lib/components/images/potatowedges.jpg';
    import BananaSmoothie from '$lib/components/images/BananaSmoothie.jpg';
    import facebooklogo from '$lib/components/images/facebooklogo.png';
    import instalogo from '$lib/components/images/instalogo.png';
    import xlogo from '$lib/components/images/xlogo.png';
    import whatsapplogo from '$lib/components/images/whatsapplogo.png';


    // importing the javascript to recipe.js
    import { onMount } from "svelte";
    import smoothScroll from "$lib/components/Recipes/recipe.js"; 

    // allow smooth scrolling
    onMount(() => {
        smoothScroll();
    });
        // Sample images for different recipe sections
        const breakfastImages = [
        { src: Pancake, text: "Pancakes with Maple Syrup" },
        { src: Avocado, text: "Avocado Toast with Poached Egg" },
        { src: Yogurt, text: "Greek Yogurt & Granola Bowl" },
        { src: Oatmeal, text: "Oatmeal with Fruits & Nuts" }]

        const lunchImages = [
        { src: ChickenSalad, text: "Grilled Chicken Caesar Salad" },
        { src: Agliolio, text: "Spaghetti Aglio e Olio" },
        { src: Salmon, text: "Teriyaki Salmon Rice Bowl" },
        { src: Tofu, text: "Vegetable Stir-Fry with Tofu" }]

        const dinnerImages = [
        { src: ButterChicken, text: "Butter Chicken with Garlic Naan" },
        { src: BeefMash, text: "Beef Stroganoff with Mashed Potatoes" },
        { src: LemonFish, text: "Lemon Herb Grilled Fish with Quinoa" },
        { src: BasmatiRice, text: "Vegetable Curry with Basmati Rice" }]

        const dessertsImages = [
        { src: ChocLava, text: "Chocolate Protein Lava Cake" },
        { src: Tiramisu, text: "Classic Dark Tiramisu" },
        { src: StrawberryCheesecake, text: "Vegan Strawberry Cheesecake" },
        { src: MangoStickyRice, text: "Mango Sticky Rice" }]

        const snacksImages = [
        { src: Nachos, text: "Nachos with Guacamole & Salsa" },
        { src: CheeseGarlicBread, text: "Cheese & Garlic Breadsticks" },
        { src: PopcornChicken, text: "Crispy Popcorn Chicken" },
        { src: Hummus, text: "Hummus with Pita Chips" }]

        const quickeasyImages = [
        { src: EggSandwich, text: "Egg & Cheese Sandwich" },
        { src: GarlicShrimp, text: "One-Pan Garlic Shrimp Pasta" },
        { src: MugCake, text: "Microwave Mug Cake" },
        { src: BananaSmoothie, text: "Banana Peanut Butter Smoothie" }]

        const airfryerImages = [
        { src: FrenchFries, text: "Crispy Air Fryer French Fries" },
        { src: BuffaloWings, text: "Buffalo Chicken Wings" },
        { src: CheeseSticks, text: "Air Fryer Mozzarella Sticks" },
        { src: SweetPotatoWedges, text: "Cajun-Spiced Sweet Potato Wedges" }]
</script>

<div>
    <script src="https://cdn.botpress.cloud/webchat/v2.2/inject.js"></script>
    <script src="https://files.bpcontent.cloud/2025/02/25/06/20250225063934-HGA74MAU.js"></script>
</div>

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
            <a href="#/">Recipes</a>
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
        <li><a href="/About us">Aboutus</a></li>
    </ul>


    <!-- <div class="action-buttons">
    <button class="add-button" title="Add New">+</button>
        <img src={profileicon} alt="Profile" class="profile-icon" />
    </div>
</nav> -->

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




<!-- Recipe Sections -->
<section id="breakfast" class="recipe-section">
    <h2>Breakfast Recipes</h2>
    <p>Start your day with the best breakfast options.</p>
    <div class="recipe-grid">
        {#each breakfastImages as img}
            <div class="container">
                <img src={img.src} alt={img.text} class="image">
                <div class="overlay">
                    <div class="text">{img.text}</div>
                </div>
            </div>
        {/each}
    </div>
</section>

<section id="lunch" class="recipe-section">
    <h2>Lunch Recipes</h2>
    <p>Power through the day with our tasty lunch ideas.</p>
    <div class="recipe-grid">
        {#each lunchImages as img}
            <div class="container">
                <img src={img.src} alt={img.text} class="image">
                <div class="overlay">
                    <div class="text">{img.text}</div>
                </div>
            </div>
        {/each}
    </div>
</section>

<section id="dinner" class="recipe-section">
    <h2>Dinner Recipes</h2>
    <p>End your day with a fulfilling meal.</p>
    <div class="recipe-grid">
        {#each dinnerImages as img}
            <div class="container">
                <img src={img.src} alt={img.text} class="image">
                <div class="overlay">
                    <div class="text">{img.text}</div>
                </div>
            </div>
        {/each}
    </div>
</section>

<section id="desserts" class="recipe-section">
    <h2>Dessert Recipes</h2>
    <p>Indulge in sweet treats with our dessert collection.</p>
    <div class="recipe-grid">
        {#each dessertsImages as img}
            <div class="container">
                <img src={img.src} alt={img.text} class="image">
                <div class="overlay">
                    <div class="text">{img.text}</div>
                </div>
            </div>
        {/each}
    </div>
</section>

<section id="snacks" class="recipe-section">
    <h2>Snack Recipes</h2>
    <p>Quick and easy snacks to keep your energy levels high.</p>
    <div class="recipe-grid">
        {#each snacksImages as img}
            <div class="container">
                <img src={img.src} alt={img.text} class="image">
                <div class="overlay">
                    <div class="text">{img.text}</div>
                </div>
            </div>
        {/each}
    </div>
</section>

<section id="quick-easy" class="recipe-section">
    <h2>Quick & Easy Recipes</h2>
    <p>Fast, simple, and delicious recipes for busy days.</p>
    <div class="recipe-grid">
        {#each quickeasyImages as img}
            <div class="container">
                <img src={img.src} alt={img.text} class="image">
                <div class="overlay">
                    <div class="text">{img.text}</div>
                </div>
            </div>
        {/each}
    </div>
</section>

<section id="airfryer" class="recipe-section">
    <h2>Air Fryer Recipes</h2>
    <p>Healthy and crispy dishes made easy with an air fryer.</p>
    <div class="recipe-grid">
        {#each airfryerImages as img}
            <div class="container">
                <img src={img.src} alt={img.text} class="image">
                <div class="overlay">
                    <div class="text">{img.text}</div>
                </div>
            </div>
        {/each}
    </div>
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
                <li><a href="/About us">About us</a></li>
            </ul>
          </div>
          <!-- social media -->
           <div class="footer-column">
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