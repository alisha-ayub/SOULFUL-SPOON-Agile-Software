export async function load ({params, fetch}){
   try{
    //fetch the recipes data from file
    const response = await fetch('/recipes.json');

    //check if fetch request was successful
    if(!response.ok){
        throw new Error('Failed to fetch recipes.json: ${response.status');
    }

    //parse the JSON response ot get list of recipes
    const recipes = await response.json();

    //find the specific recipe that matches the slug from the URL parameters
    const recipe = recipes.find(r => r.id.toLowerCase().trim() === params.slug.toLowerCase().trim());

    //if not matching recipe is found
    if(!recipe){
        return {status: 404, error: new Error("Recipe not found")};
    }
    //return found recipe
    return {recipe};

   }
    catch (error){
        console.error("Error loading recipes:", error.message);
        //return error if fetchin fails 
        return {status: 500, error: new Error("Failed to load recipe")};
    }

}