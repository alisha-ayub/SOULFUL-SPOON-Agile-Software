import {  insertLikes,getLikes} from "../../db/likes.js";

import express from 'express';


const router = express.Router();

router.post('/', async (req, res) => {
    console.log("...post comment...");
    try {
      const likeData = req.body;
      console.log(likeData);
      const Likeid = await insertLikes(likeData);
      res.status(201).json({ Likeid});
    } catch (error) {
        console.error('Error adding comment:', error);
        res.status(500).json({ error: 'Failed to add comment' });
    }
  });


  router.get("/:id", async (req, res) => {
    console.log("Like id: " + req.params.id);
    try {
      const likes = await getLikes(req.params.id);
      console.log("...got comments...");
      console.log(likes);
      res.status(200).json({ likes});
    } catch (error) {
      console.error("Error fetching likes:", error);
      res.status(500).json({ error: "Failed to fetch likes" });
    }
  });

  export default router;
  
