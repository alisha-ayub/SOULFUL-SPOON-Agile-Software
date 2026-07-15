import yup from "yup";
import { getDatabase } from "./database.js";
import bcrypt from "bcryptjs";

//--------------------------------------------------------------------------------------------------------------


/**
 * Gets the user with the given username, if it exists.
 *
 * @param {string} username the username to search
 * @returns the user with the matching username, or undefined.
 */
export async function getUserWithUsername(username) {
  const db = await getDatabase();
  const sql = "SELECT * FROM Users WHERE username = ?";

  
  const userData = await db.get(sql, username)
  return userData
}

/**
 * Gets the user with the given username and password, if it exists.
 *
 * @param {string} username the username to search
 * @param {*} password the password to search
 * @returns the user with the given credentials, or undefined.
 */

//------------------------------------------------------------------------------------------------------------------

export async function getUserWithCredentials(username, password) {
  try {
      const db = await getDatabase();
      const sql = "SELECT * FROM Users WHERE username = ?";
      
      const userData = await db.get(sql, username);
      
      if (!userData) {
          // User not found in the database
          return null;
      }

      // Check if userData has a password property before attempting to compare
      if (!userData.password) {
          // Handle the scenario where the password is not found in userData
          return null;
      }

      // Compare the provided password with the hashed password retrieved from the database
      const passwordsMatch = await bcrypt.compare(password, userData.password);

      if (passwordsMatch) {
          // Passwords match, return the user data
          return userData;
      } else {
          // Passwords don't match
          return null;
      }
  } catch (error) {
      // Handle any errors that occur during database retrieval or password comparison
      console.error("Error retrieving user:", error);
      throw error;
  }
}

export async function getArticles() {
  const db = await getDatabase(); 

  // SQL query with placeholders
  const sql = "SELECT * FROM Articles";

  try {
    // Execute the SQL query
    const userData = await db.all(sql);

    return userData; // Return the retrieved data
  } catch (error) {
    console.error("Error fetching articles:", error);
    throw error; // Propagate the error to the caller
  } 
}

//------------------------------------------------------------------------------------------------------------------


export async function insertArticle(articleData) {
  console.log("Function call to addComment...");
  const db = await getDatabase();

  const {  article_content, article_title ,username, likes ,dislikes , date_published} = articleData;
  
  
  const authorQuery = "SELECT username FROM Users WHERE username = ?";
  const authorResult = await db.get(authorQuery, [username]);

  const author_name = authorResult.username;


  const sql = "INSERT INTO Articles (article_content, article_title, author_name ,date_published , likes, dislikes) VALUES (?, ?, ?, date('now') , 0 , 0)";
  const values = [article_content, article_title, author_name, likes,dislikes, date_published];

  try {
    const result = await db.run(sql, values);
    console.log("Comment added:", result);
    return result.lastID;
  } catch (error) {
    console.error("Error adding comment:", error);
    throw error;
  }
}








//--------------------------------------------------------------------------------------------------------------




const updateUserSchema = yup
  .object({
   article_title: yup.string().optional(),
  article_content: yup.string().optional()
  })
  .required();




// Edit and pulbish the article
 
export async function updateUser(publisher_id, updateData) {
  const validated = updateUserSchema.validateSync(updateData, {
    abortEarly: false,
    stripUnknown: true
  });

  const sql = "UPDATE PUBLISH SET article_title = ?, article_content = ? WHERE publisher_id = ?";
  const db = await getDatabase();

  const dbResult = await db.run(sql, validated.article_title, validated.article_content, publisher_id);

  // Return true if changes applied, false otherwise
  return dbResult.changes > 0;
}





