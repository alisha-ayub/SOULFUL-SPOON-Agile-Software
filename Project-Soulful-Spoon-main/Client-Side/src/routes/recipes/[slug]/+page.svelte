<script>
    import ArticleDetail from "$lib/components/Articles/ArticleDetail.svelte";
    export let data;
</script>

<svelte:head>
    <title>{data.recipe.article_title}</title>
    <script src="https://cdn.botpress.cloud/webchat/v2.2/inject.js">
  </script><script src="https://files.bpcontent.cloud/2025/02/25/06/20250225063934-HGA74MAU.js"></script>
  </svelte:head>

<!-- article details -->
{#if data?.recipe}
<ArticleDetail
    id={data.recipe.id}
    article_title={data.recipe.article_title}
    article_content={data.recipe.article_content}
    username={data.recipe.username}
    likes={data.recipe.likes}
    dislikes={data.recipe.dislikes}
    date_published={data.recipe.date_published}
    image_path={data.recipe.image_path}
/>
{:else}
    <p>Loading Recipe...</p>
{/if}