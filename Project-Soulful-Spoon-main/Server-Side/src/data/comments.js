import { getDatabase } from "../db/database.js";


export async function getcomments(comment_id){
  console.log("Function call to getcomments...");
  const db  = await getDatabase();

  const sql ="SELECT * FROM comments WHERE comment_id = ?";
  const dbresult = await db.get(sql, comment_id)
  console.log(dbresult);
  return dbresult.comment_content;
}

export async function addcomments(commentData) {
  console.log("Function call to addComment...");
  const db = await getDatabase();

  const { article_id, comment_content, commentor_id, date_posted } = commentData;

  const sql = "INSERT INTO comments (article_id, comment_content, commentor_id,date_posted ) VALUES (?, ?, ?,?)";
  const values = [article_id, comment_content, commentor_id,date_posted];

  try {
    const result = await db.run(sql, values);
    console.log("Comment added:", result);
    return result.lastID;
  } catch (error) {
    console.error("Error adding comment:", error);
    throw error;
  }
}



