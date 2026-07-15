import express from "express";
import { requiresAuthentication } from "../../middleware/auth-middleware.js";
import { updateUser} from "../../db/users-dao.js";

const router = express.Router();

//route to get the published article from the user
router.get("/me", requiresAuthentication, (req, res) => {
  return res.json(req.user);
});
 

// route to publish the article from the user
router.patch("/me", requiresAuthentication, async (req, res) => {
  try {
    const userUpdated = await updateUser(req.user.publisher_id, req.body);
    return res.sendStatus(userUpdated ? 204 : 404);
  } catch {
    return res.sendStatus(422);
  }
});



export default router;