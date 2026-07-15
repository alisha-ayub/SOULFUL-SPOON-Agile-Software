import { getDatabase } from "./database.js";
import yup from "yup";



export async function getArticlelink(article_id) {
    const db = await getDatabase(); 
  
    // SQL query with placeholders
    const sql = "SELECT  article_title, article_content , author_name, date_published FROM Articles WHERE article_id = ?";
  
    try {
      // Execute the SQL query
      const userData = await db.all(sql, article_id);
  
      return userData; // Return the retrieved data
    } catch (error) {
      console.error("Error fetching articles:", error);
      throw error; // Propagate the error to the caller
    } 
  }

  export async function getArticleid(article_id) {
    const db = await getDatabase(); 
  
    // SQL query with placeholders
    const sql = "SELECT article_id from Articles WHERE article_id =?";
  
    try {
      // Execute the SQL query
      const userData = await db.all(sql,article_id);
  
      return userData; // Return the retrieved data
    } catch (error) {
      console.error("Error fetching articles:", error);
      throw error; // Propagate the error to the caller
    } 
  }
  


  const updateUserSchema = yup
  .object({
   likes: yup.number().integer(),
  dislikes: yup.number().integer()
 
  })
  .required();

  export async function patchLikes(article_id, updateData) {
    const validated = updateUserSchema.validateSync(updateData, {
      abortEarly: false,
      stripUnknown: true
    });
   
    const sql = "UPDATE Articles SET likes = ? ,dislikes =? WHERE article_id = ?";
    const db = await getDatabase();
  
    const dbResult = await db.run(sql, validated.likes, validated.dislikes, article_id);
  
    // Return true if changes applied, false otherwise
    return dbResult.changes > 0;
  }

//   export async function insertLikes(likeData) {
//     console.log("Function call to addComment...");
//     const db = await getDatabase();
  
//     const { likes, dislikes } = likeData;
  
//     const sql = "INSERT INTO ARTICLES(likes, dislikes) VALUES (?, ?)";
//     const values = [likes, dislikes];
  
//     try {
//         const result = await db.run(sql, values);
//         console.log("Likes added:", result);
//         return result.lastID;
//     } catch (error) {
//         console.error("Error adding likes:", error);
//         throw error;
//     }
// }


 


