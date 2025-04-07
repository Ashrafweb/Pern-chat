import express from "express";
const messageRouter = express.Router();

messageRouter.get("/", (req, res) => {
  res.send("Messages");
});

export default messageRouter;
