<script>
    //importing necessary assets and styles
    import "$lib/css/articledetail.css"
    import logo from '$lib/components/images/Logo.png'; 
    import profileicon from '$lib/components/images/profileicon.jpg'
    import { onMount, onDestroy } from "svelte";
    import facebooklogo from '$lib/components/images/facebooklogo.png';
    import instalogo from '$lib/components/images/instalogo.png';
    import xlogo from '$lib/components/images/xlogo.png';
    import whatsapplogo from '$lib/components/images/whatsapplogo.png';

    //exporting props to be recieved from the parent component
    export let id = ""; //unique recipe ID
    export let article_title = "Unknown Title";
    export let article_content = "No Content Available";
    export let username = "Anonymous";
    export let likes = 0;
    export let dislikes = 0;
    export let date_published = "Unknown Date";
    export let image_path = "";

    //state variable
    let userReaction = null;
    let showShareMenu = false;
    let currentURL = "";

    //authentication state
    let isAuthenticated = false; // this is to track if a user is logged in
    let loggedInUser = "Anonymous"; //no user

    let newComment = "";
    let comments = [];

    let replyingTo = { commentID: null, replyID: null}
    let replyText = "";
    let replyingToUsername = null;

    let visibleComments = 7;
    let commentsExpanded = false;
    let visibileReplies = {};

    let latestRecipes = [];
    let mostLikedRecipes = [];

    let isSubscribed = false;
    let successMessage = "";
    let loggedInUserEmail = "";

    //run when component is mounted
    onMount(async() => {
        currentURL = window.location.href;
        //using local storage first instead of backend
        if(typeof window !== "undefined"){
            try{
        
                //fetch recipes from json file
                const response = await fetch("/recipes.json");
                if(!response.ok) throw new Error("Failed to fetch recipes.");
                const data = await response.json();
                const currentRecipe = data.find(recipe => recipe.id === id);

                //update likes and dislikes from fetched data
                if(currentRecipe){
                    likes = currentRecipe.likes;
                    dislikes = currentRecipe.dislikes
                }

                //retrieve stored user interaction
                let storedLikes = localStorage.getItem(`likes-${id}`);
                let storedDislikes = localStorage.getItem(`dislikes-${id}`);
                let storedReaction = localStorage.getItem(`reaction-${id}`);

                likes = storedLikes ? parseInt(storedLikes, 10) : likes;
                dislikes = storedDislikes  ? parseInt(storedDislikes, 10) : dislikes;
                userReaction = storedReaction || null;

                //fetching and sorting most liked and latest recipes 
                mostLikedRecipes = data.map(recipe => {
                    let storedLikes = localStorage.getItem(`likes-${recipe.id}`);
                    return{
                        ...recipe, 
                        likes: storedLikes ? parseInt(storedLikes, 10): recipe.likes
                    };
                })
                .sort((a, b) => b.likes - a.likes)
                .slice(0, 3)

                latestRecipes = data   
                .sort((a,b) => new Date(b.date_published) - new Date(a.date_published)) //sort by newest first
                .slice(0, 3); //get latest recipe
            }
            catch(error){
                console.error("Error fetching recipes:", error);
            }
           
            //load existing comments from local storage
            const storedComments = localStorage.getItem(`comments-${id}`);
            comments = storedComments ? JSON.parse(storedComments) : [];

            let storedUser = localStorage.getItem("loggedInUser");
            let storedEmail = localStorage.getItem("loggedInUserEmail")
            loggedInUser = storedUser ? storedUser : "Anonymous";
            loggedInUserEmail = storedEmail ? storedEmail : null;

            //check subscription status
            if(loggedInUserEmail){
                let storedSubscription = JSON.parse(localStorage.getItem(`newsletter-${loggedInUserEmail}`));
                isSubscribed = storedSubscription ?? false;
            }

            document.addEventListener("click", handleClickOutside);
        }   
    });

    //user authentication status
    $: isAuthenticated = loggedInUser !== "Anonymous";

    onDestroy(() => {
        if(typeof window !== "undefined"){
            document.removeEventListener("click", handleClickOutside);
        }
    });
    
    //handles user reactions
    function updateReaction(type){
        if(type === "like"){
            if(userReaction === "like"){
                //if user already liked, remove the like
                likes -= 1;
                userReaction = null;
                localStorage.removeItem(`reaction-${id}`);
            }
            else{
                //remove dislike first, if switching from dislike
                if(userReaction === "dislike"){
                    dislikes -= 1;
                }
                likes += 1;
                userReaction = "like";
                localStorage.setItem(`reaction-${id}`, "like");
            }
        }
        else if(type === "dislike"){
            if(userReaction === "dislike"){
                //if user already disliked, remove the dislike
                dislikes -= 1;
                userReaction = null;
                localStorage.removeItem(`reaction-${id}`);
            }
            else{
                //remove like first, if switching from like
                if(userReaction === "like"){
                    likes -= 1;
                }
                dislikes += 1;
                userReaction = "dislike";
                localStorage.setItem(`reaction-${id}`, "dislike");
            }
        }

        localStorage.setItem(`likes-${id}`, likes.toString());
        localStorage.setItem(`dislikes-${id}`, dislikes.toString());

        updateMostLikedRecipes();
    }

    function printRecipe(){
        window.print();
    }

    function toggleShareOptions(event){
        event.stopPropagation();
        showShareMenu = !showShareMenu;
    }

    function handleClickOutside(event){
        if(!event.target.closest(".share-container")){
            showShareMenu = false;
        }
    }

    function shareOn(platform){
        let text = encodeURIComponent("Check Out This Recipe: ");
        let url = encodeURIComponent(currentURL);
        let shareURL = "";

        if (platform === "whatsapp"){
            shareURL = `https://api.whatsapp.com/send?text=${text}%20${url}`;
        }
        else if (platform === "facebook"){
            shareURL = `https://www.facebook.com/sharer/sharer.php?u=${url}`;
        }
        else if (platform === "twitter"){
            shareURL = `https://twitter.com/intent/tweet?text=${text}&url=${url}`;
        }

        window.open(shareURL, "_blank");
    }

    function copyLink(){
        navigator.clipboard.writeText(currentURL).then(() => {
            alert("Link Copied to Clipboard!");
        })
    }

    //adds a new comment
    function addComment(){
        if (newComment.trim() === ""){
            return;
        };

        const commentObject= {
            id: Date.now(),
            username: loggedInUser, 
            text: newComment,
            date: new Date().toLocaleString(),
            profilePic: profileicon, 
            replies: []
        };

        comments = [...comments, commentObject];
        localStorage.setItem(`comments-${id}`, JSON.stringify(comments));
        newComment ="";
    }

    //to delete a comment
    function deleteComment(commentID){
        comments = comments.filter(comment => comment.id !== commentID);
        localStorage.setItem(`comments-${id}`, JSON.stringify(comments));
    }

    //to add reply
    function addReply(commentID){
        if(replyText.trim() === ""){
            return;
        };

        let formattedReplyText = replyingTo.replyID ? `@${replyingToUsername} ${replyText}` : replyText;

        const replyObject = {
            id: Date.now(),
            username: loggedInUser, 
            text: formattedReplyText,
            date: new Date().toLocaleString(),
            profilePic: profileicon, 
        };

        comments = comments.map(comment => {
            if(comment.id == commentID){
                return {...comment, replies: [...comment.replies, replyObject]};
            }

            return comment;
        });

        localStorage.setItem(`comments-${id}`, JSON.stringify(comments));

        replyingTo = { commentID: null, replyID: null};
        replyText = "";
        replyingToUsername = null;

    }

    //delete reply
    function deleteReply(commentID, replyID){
        comments = comments.map(comment => {
            if (comment.id === commentID){
                return{
                    ...comment, 
                    replies: comment.replies.filter(reply => reply.id != replyID)
                };
            }
            return comment;
        });
        localStorage.setItem(`comments-${id}`, JSON.stringify(comments));
    }

    function toggleComments(){
        commentsExpanded = !commentsExpanded;
        visibleComments = commentsExpanded ? comments.length : 7;
    }

    function toggleReplies(commentID){
        visibileReplies[commentID] = !visibileReplies[commentID];
    }

    function toggleSubscription(event){
        if(!loggedInUserEmail) return;

        isSubscribed = event.target.checked;
        localStorage.setItem(`newsletter-${loggedInUserEmail}`, JSON.stringify(isSubscribed));

        successMessage = isSubscribed
            ? "🎉 You Have Subscribed!"
            : "😞 You Have Unsubscribed";

        //setTimeout(() => successMessage = "", 3000);
    }

    function navigateToRecipe(recipeID){
        window.location.href = `/recipes/${recipeID}`;
    }

    //most liked recipes section
    function updateMostLikedRecipes(){
        if(typeof window !== "undefined"){
            fetch("/recipes.json")
            .then(response => response.json())
            .then(data => {
                mostLikedRecipes = data.map(recipe => {
                    let storedLikes = localStorage.getItem(`likes-${recipe.id}`);
                    let updatedLikes = storedLikes ? parseInt(storedLikes, 10) : recipe.likes;
                    localStorage.setItem(`likes-${recipe.id}`, updatedLikes.toString());
                    return {...recipe, likes: updatedLikes};
                })
                .sort((a, b) => b.likes - a.likes)
                .slice(0, 3);
            })
        }
    }

</script>

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
            <li><a href="/breakfast">Breakfast</a></li>
            <li><a href="/lunch">Lunch</a></li>
            <li><a href="/dinner">Dinner</a></li>
            <li><a href="/desserts">Desserts</a></li>
            <li><a href="/snacks">Snacks</a></li>
            <li><a href="/snacks">Snacks</a></li>
            <li><a href="/quick-easy">Quick and Easy</a></li>
            <li><a href="/airfryer">Airfryer</a></li>
            </ul>
        </li>
        <li><a href="/Tips&tricks">Tips & Tricks</a></li>
        <li><a href="/About us">About us</a></li>
    </ul>

    <div class="action-buttons">
    <button class="add-button" title="Add New">+</button>
        <img src={profileicon} alt="Profile" class="profile-icon" />
    </div>
</nav>

<!-- page -->
<div class="page-container">
    <div class="content">
        <div id="recipe-container">
            <div class="recipe-header">
                <!-- title -->
                <h1>{article_title}</h1>
                <!-- buttons -->
                <div class="reaction-buttons">
                    <button 
                        on:click|preventDefault={() => updateReaction("like")}
                        class:userReacted={userReaction === "like"}
                    >👍 {likes || 0}</button>
                    <button 
                        on:click|preventDefault={() => updateReaction("dislike")}
                        class:userReacted={userReaction === "dislike"}
                    >👎 {dislikes || 0}</button>
                </div>
                <button class="print-button" on:click={() => printRecipe()}>🖨️ Print Recipe</button>

                <div class="share-container">
                    <button class="share-button" on:click={toggleShareOptions} >🔗 Share Recipe</button>
                    {#if showShareMenu}
                        <div class="share-options">
                            <button class="whatsapp" on:click={() => shareOn("whatsapp")}> WhatsApp </button>
                            <button class="facebook" on:click={() => shareOn("facebook")}> Facebook </button>
                            <button class="twitter" on:click={() => shareOn("twitter")}> Twitter </button>
                            <div class="copy-link">
                                <input type="text" value={currentURL} readonly />
                                <button on:click={copyLink}> Copy</button>
                            </div>
                        </div>
                    {/if}
                </div> 
            </div>
            <!-- meta data -->
            <div class="recipe-meta">
                <p><strong>By:</strong> {username}</p>
                <p><strong>Published:</strong> {date_published}</p>
            </div>
            
            <!-- image -->
            {#if image_path}
                <img src="{image_path}" alt="{article_title}" class="recipe-image"/>
            {/if}

            <!-- content -->
            <h2>Recipe Details</h2>
            <p>{@html article_content}</p>
        </div>

        <!-- comment section -->
        <section class = "comments-section">
            <h2 class="comment-title">Comments</h2>

            {#if isAuthenticated}
                <div class="comment-box">
                    <textarea bind:value={newComment} placeholder="Write a Comment" rows="3"></textarea>
                    <button on:click={addComment} disabled={newComment.trim() === ""}>Post Comment</button>
                </div>
            {:else}
                <p class="login-prompt">Sign In to Comment.</p>
            {/if}
            <!-- comments -->
            <ul class="comments-list">
                {#each comments.slice(0, visibleComments) as comment (comment.id)}
                <li class="comment">
                    <!-- <img src={comment.profilePic} alt="Profile Picture" class="profile-picture"/> -->
                    <div class="comment-content">
                        <strong class="comment-username">{comment.username}</strong>
                        <p class="comment-text">{comment.text}</p>
                        <small class="comment-date">{comment.date}</small>
                        <!-- <button class="reply-button" on:click={() => addReply(comment.id, prompt(`Replying to @${comment.username}: `))}>Reply</button> -->
                        <!-- reply and delete button -->
                        {#if isAuthenticated}
                        <button class="reply-button" on:click={() => {
                                replyingTo = { commentID: comment.id, replyID: null };
                                replyingToUsername = null;
                            }}>Reply</button>
                            {#if comment.username === loggedInUser}
                                <button class="delete-button" on:click={() => deleteComment(comment.id)}>🗑️</button>
                            {/if}
                            {#if replyingTo.commentID === comment.id && replyingTo.replyID === null}
                                <div class="reply-box">
                                    <textarea bind:value={replyText} placeholder="Write Your Reply" rows="2"></textarea>
                                    <button on:click={() => addReply(comment.id)}>Post Reply</button>
                                    <button class="cancel-reply" on:click={() => {replyingTo = {commentID: null, replyID: null}; replyText = ""}}>x</button>
                                </div>
                            {/if}
                        {/if}

                        <!-- replies -->
                        {#each comment.replies.slice(0, visibileReplies[comment.id] ? comment.replies.length : 2) as reply (reply.id)}
                            <div class="reply">
                                <div class="reply-content">
                                    <strong class="comment-username">{reply.username}</strong>
                                    <p class="comment-text">{reply.text}</p>
                                    <small class="comment-date">{reply.date}</small> 
                                    <!-- <button class="reply-button" on:click={() => addReply(comment.id, prompt(`Replying to @${reply.username}: `), reply.username)}>Reply</button> -->
                                    <!-- reply and delete button -->
                                    {#if isAuthenticated}
                                        <button class="reply-button" on:click={() => {
                                            replyingTo = { commentID: comment.id, replyID: reply.id};
                                            replyingToUsername = reply.username;
                                        }}>Reply</button>    
                                        {#if reply.username === loggedInUser}
                                            <button class="delete-button" on:click={() => deleteReply(comment.id, reply.id)}>🗑️</button>
                                        {/if}
                                        {#if replyingTo.commentID === comment.id && replyingTo.replyID === reply.id}
                                        <div class="reply-box">
                                            <textarea bind:value={replyText} placeholder=  "Replying to @{replyingToUsername}" rows="2"></textarea>
                                            <button on:click={() => addReply(comment.id)}>Post Reply</button>
                                            <button class="cancel-reply" on:click={() => {replyingTo = {commentID: null, replyID: null}; replyText = ""}}>x</button>
                                        </div>
                                        {/if}
                                    {/if}
                                </div>
                            </div>
                        {/each}

                        <!-- toggle view -->
                        {#if comment.replies.length > 2}
                            <button class="view-more-replies" on:click={() => toggleReplies(comment.id)}>
                                {visibileReplies[comment.id] ? "Hide Replies" : `View More Replies (${comment.replies.length -2})`}
                            </button>
                        {/if}
                    </div>
                </li>
                {/each}
            </ul>
            <!-- toggle view -->
            {#if comments.length > 7}
                <button class="view-more-comments" on:click={toggleComments}>
                    {commentsExpanded ? "Hide Comments" : `View More Comments (${comments.length - visibleComments})`}
                </button>
            {/if}   
        </section>
    </div>

<aside class="sidebar">
    <div class="latest-recipes">
        <h2 class="latest-recipes-title"> 🔔 Latest Recipes</h2>
        <div class="latest-recipes-container">
            {#each latestRecipes as recipe}
            <div class="latest-recipe" on:click={() => navigateToRecipe(recipe.id)}>
                <!-- <a href={`/recipes/${recipe.id}`}> -->
                    <div class="latest-recipe-overlay">
                        <img src={recipe.image_path} alt={recipe.article_title} class="latest-recipe-image" />
                        <h3 class="latest-recipe-name">{recipe.article_title}: {recipe.date_published}</h3>
                    </div> 
            </div>
            {/each}
        </div>
    </div>
    <div class="liked-recipes">
        <h2 class="liked-recipes-title"> ❤️ Most Liked Recipes </h2>
        <div class="liked-recipes-container">
            {#each mostLikedRecipes as recipe}
            <div class="liked-recipe" on:click={() => navigateToRecipe(recipe.id)}>
                    <div class="liked-recipe-overlay">
                        <img src={recipe.image_path} alt={recipe.article_title} class="liked-recipe-image" />
                        <h3 class="liked-recipe-name">{recipe.article_title}: ❤️{recipe.likes} Likes</h3>
                    </div>
            </div>
            {/each}
        </div>
    </div>
    <section class="newsletter">
        <h2> ✉️ Stay Updated</h2>
        <p class="newsletter-description">Subscribe to receive new recipes and cooking tips!</p>
        {#if isAuthenticated}
            <label>
              <input type="checkbox" bind:checked={isSubscribed} on:change={toggleSubscription} />
              <p class="newsletter-message">I want to recieve updates at <strong>{loggedInUserEmail}</strong></p>
            </label>

            {#if successMessage}
                <p class="success-message">{successMessage}</p>
            {/if}

        {:else}
            <p class="newsletter-login-prompt">Please Log In To Subscribe.</p>
        {/if}
    </section>
</aside>
</div>

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