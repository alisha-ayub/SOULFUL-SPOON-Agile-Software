import { getDatabase } from "./database.js";
import yup from "yup";


export async function getUserProfile(id) {


    const db = await getDatabase(); 
  
    // SQL query with placeholders
    const sql = "SELECT username, firstName, lastName, birthday, Introduction, profilePicture FROM Users where id = ? ";

    try {
      // Execute the SQL query
      const userData = await db.all(sql, id);
  
      return userData; // Return the retrieved data
    } catch (error) {
      console.error("Error fetching User Profile:", error);
      throw error; // Propagate the error to the caller
    } 
  }

// To Update UserProfile
 const updateUserSchema = yup
  .object({
   username: yup.string().optional(),
  firstName: yup.string().optional(),
  lastName: yup.string().optional(),
  birthday: yup.string().optional(),
  Introduction: yup.string().optional(),
  profilePicture:yup.string().optional()
  
  })
  .required();



  export async function updateUserProfile(id, updateData) {
    const validated = updateUserSchema.validateSync(updateData, {
      abortEarly: false,
      stripUnknown: true
    });
  
    const sql = "UPDATE Users SET username =?, firstName= ?, lastName = ?,birthday =?, Introduction = ?, profilePicture = ? WHERE id = ?";
    const db = await getDatabase();
  
    const dbResult = await db.run(sql, validated.username, validated.firstName, validated.lastName, validated.birthday, validated.Introduction, validated.profilePicture, id);
  
    // Return true if changes applied, false otherwise
    return dbResult.changes > 0;
  }