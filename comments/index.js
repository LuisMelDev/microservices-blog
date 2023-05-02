const express = require("express");
const cors = require("cors");
const { randomBytes } = require("crypto");

const app = express();

app.use(express.json());
app.use(cors('*'));

const comments = {};

app.get("/posts/:id/comments", (req, res) => {
    const id = req.params.id;

    res.send(comments[id] || []);
});
app.post("/posts/:id/comments", (req, res) => {
    const idPost = req.params.id;

    const id = randomBytes(4).toString("hex");
    const { content } = req.body;
    const newComments = comments[idPost] || []

    newComments.push({ id, content });
    comments[idPost] = newComments

    res.status(201).send(newComments);
});

app.listen(4001, () => {
    console.log("listening 4001");
});
