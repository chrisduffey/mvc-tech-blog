const router = require("express").Router();
const {BlogPost, Comment, User } =require("../../models");

router.post("/", async (req, res) => {
    try{
        console.log("success");
        const comment = await Comment.create({
            comment_body: req.body.comment_body,
            blogPost_id: req.body.blogPost_id,
            user_id: req.session.user_id || req.body.user_id,
        });

        res.status(200).json(comment);
    } catch (err) {
        console.error(err);
        res.status(500).json(err);
    }
});

router.get("/", async (req, res) => {
    try {
        const commentData = await Comment.findAll ({
            include: [
                {
                    model: User,
                    attributes: ["username"],
                },
                {
                    model: BlogPost, 
                    attributes: ["id"],
                },
            ],
        });
        res.status(200).json(commentData);
    }catch (err) {
        res.status(500).json(err);
    }
});

router.put("/", async (req, res) => {
    try{
        const updatedComment = await Comment.update(req.body, {
            where:{
                id: req.params.id,
            },
        });
        if (!updatedComment[0]) {
            res.status(400).json({message:"There are no comments with this ID."});
            return;
        }
        console.log("Successfully updated");
        res.status(200).json(updatedComment);
    }catch (err) {
        res.status(500).json(err);
    }
});

router.delete("/:id", async (req, res) => {
    try{
        const comment = await Comment.destroy({
            where: {
                id: req.params.id,
            },
        });
        if (!comment) {
            res.status(404).json({message:"There are no comments with this ID." });
            return;
        }
        res.status(200).json(comment);
    }catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;