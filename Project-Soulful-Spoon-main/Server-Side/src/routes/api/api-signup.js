import express from "express";
import { signup } from "../../data/signupusers.js";

const router = express.Router();

/**
 * Sending a POST request to /api/signup with valid user data will register a new user and
 * return the JWT auth token set as the "authToken" HTTP-only cookie. In addition, the user's username will be sent back
 * as JSON, in the response. This can be used to display the user's username on the frontend if required.
 *
 * Sending invalid user data will result in an appropriate error response.
 */

router.post("/", async (req, res) => {
  console.log("post request to / ");
  console.log(req.body);
  const userData = req.body;
  console.log(userData);

  try {
    // Calling signup function
    const username = await signup(userData);

    // Returning responses
    res.status(200).json({ username });
  } catch (error) {
    if (error.message === 'Passwords do not match') {
      res.status(400).json({ error: 'password_mismatch' });
    }else if(error.message === "Username already taken") {
      res.status(400).json({ error: 'username_taken' }); 
    } else if (error.message === "Email already taken") {
      res.status(400).json({ error: 'email_taken' });
    } else {
      res.status(500).json({ error: 'signup_fail' });
    }
  }
});

export default router;
