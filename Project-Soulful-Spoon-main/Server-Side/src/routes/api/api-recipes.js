import express from "express";
import { getArticles } from "../../db/users-dao.js";
import { insertArticle } from "../../db/users-dao.js";
import { getArticlelink } from "../../db/getArticlelink.js";
import { getArticleid } from "../../db/getArticlelink.js";
import { patchLikes } from "../../db/getArticlelink.js";

const router = express.Router();



//Setting up a router to post article on the server and then back to the database


  // router.post('/article', async (req, res) => {
  //   try {
  //     const articleData = req.body;
  //     // Validate that required fields are present in the request body
  //     if (!articleData) {
  //       return res.status(400).json({ error: 'Missing required fields in the request body' });
  //     }
  
  //     // Call the insertArticle function to insert the article into the database
  //     else{
  //       const result = await insertArticle(articleData, res);
  
  //     // Assuming insertArticle doesn't return articles, you may want to modify the response accordingly
  //     res.status(201).json({ message: 'Article created successfully' });
  //     }
  //   } catch (error) {
  //     console.error('Error adding article:', error);
  //     res.status(500).json({ error: 'Failed to add article' });
  //   }
  // });



  router.post('/article', async (req, res) => {
    console.log("...post article...");
    try {
      const userData = req.body;
      console.log(userData);
      const articleId = await insertArticle(userData);
      res.status(201).json({ articleId });
    } catch (error) {
        console.error('Error adding article:', error);
        res.status(500).json({ error: 'Failed to add article' });
    }
  });
  


router.get("/", async (req, res) => {
    // Retrieve article_content and article_title from query parameters
  
    
  
    try {
      // Call the getArticles function to retrieve articles
      const articles = await getArticles();
      console.log(articles)
  
      // If no articles are found, send 404 status code
      if (!articles) {
        res.sendStatus(404);
      }
  
      // If articles are found, send them as a response
      res.json(articles);
    } catch (error) {
      console.error("Error fetching articles:", error);
      // Send a 500 status code and an error message as response
      res.status(500).json({ error: "Internal Server Error" });
    }
  });




router.get("/articleid", async(req,res)=>{

let article_id = req.params.id;
  
    console.log(article_id);
  
    try {
      // Call the getArticles function to retrieve articles
      const articles = await getArticlelink(req.params.id);
     console.log(articles);
      // If no articles are found, send 404 status code
      if (!articles) {
        return res.sendStatus(404);
      }
  
      // If articles are found, send them as a response
      res.json(articles);
    } catch (error) {
      console.error("Error fetching articles:", error);
      // Send a 500 status code and an error message as response
      res.status(500).json({ error: "Internal Server Error" });
    }


  });



  router.get("/articleid/:id", async(req,res)=>{

    
      const article_id = req.params.id;
        
      
        try {
          // Call the getArticles function to retrieve articleid
          const article = await getArticleid(article_id);
         
          // If no articleid are found, send 404 status code
          if (!article) {
            return res.sendStatus(404);
          }
      
          // If articleid are found, send them as a response
          res.json(article);
        } catch (error) {
          console.error("Error fetching articles:", error);
          // Send a 500 status code and an error message as response
          res.status(500).json({ error: "Internal Server Error" });
        }
    
    
      });

      router.patch("/:id" , async (req,res) =>{
        try {
            const userUpdated = await patchLikes(req.params.id ,req.body);
            return res.sendStatus(userUpdated ? 204 : 404);
          } catch {
            return res.sendStatus(422);
          }
        });



 


      
  
  export default router;