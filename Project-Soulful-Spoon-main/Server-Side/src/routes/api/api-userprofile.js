import { getUserProfile } from "../../db/userprofile.js";
import { updateUserProfile } from "../../db/userprofile.js";
import express  from "express";
const router = express.Router();

router.get("/:id", async (req, res) => {
    // Retrieve article_content and article_title from query parameters
   
    try {
      // Call the getArticles function to retrieve articles
      const userProfile= await getUserProfile(req.params.id, req.query);
  
      // If no articles are found, send 404 status code
      if (!userProfile) {
        return res.sendStatus(404);
      }
  
      // If articles are found, send them as a response
      res.json(userProfile);
    } catch (error) {
      console.error("Error fetching articles:", error);
      // Send a 500 status code and an error message as response
      res.status(500).json({ error: "Internal Server Error" });
    }
  });


  router.patch("/:id" , async (req,res) =>{
    try {
        const userUpdated = await updateUserProfile(req.params.id, req.body);
        return res.sendStatus(userUpdated ? 204 : 404);
      } catch {
        return res.sendStatus(422);
      }
    });


  export default router;