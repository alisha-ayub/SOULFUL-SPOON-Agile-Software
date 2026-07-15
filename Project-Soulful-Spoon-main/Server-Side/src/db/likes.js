import { getDatabase } from "./database.js";

export async function getLikes(like_id) {
    console.log("Function call to getcomments...");
    const db = await getDatabase();
  
    const sql = "SELECT * FROM likes WHERE like_id = ?"; // Corrected to use likeid
    const dbresult = await db.get(sql, like_id);
    console.log(dbresult);
    return dbresult;
}

export async function insertLikes(likeData) {
    console.log("Function call to addComment...");
    const db = await getDatabase();
  
    const { likes, dislikes } = likeData;
  
    const sql = "INSERT INTO likes (likes, dislikes) VALUES (?, ?)";
    const values = [likes, dislikes];
  
    try {
        const result = await db.run(sql, values);
        console.log("Likes added:", result);
        return result.lastID;
    } catch (error) {
        console.error("Error adding likes:", error);
        throw error;
    }
}
