const router = require("express").Router();
const {BlogPost, User, Comment} = require("../models");
const withAuth = require("../utils/auth");

router.get("/", async (req,res)=>{
    try{
        const blogPostData = await BlogPost.findAll({
            include:  [
                {
                    model: User,
                    attributes: ["name"],
                },
                {
                    model: Comment,
                    attributes: ["comment_content"],
                },
            ],            
        });
        const blogPosts = blogPostData.map((blogPost)=>
            blogPost.get({plain: true})
    );

    res.render("homepage", {
        blogPosts,
        logged_in: req.session.logged_in,
    });

    }catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});

router.get("/blogPost/:id",  async (req,res) => {
    try {
        console.log("hit");
        const blogPostData = await BlogPost.findByPk(req.params.id, {
            include: [
                {
                    model: User,
                    attributes: ["name"],

                },
                {
                    model: Comment,
                    // attributes: [User],
                },                
            ],
        });
        console.log("data",blogPostData);
        const blogPost = blogPostData.get({plain:true});
        console.log(blogPost);

        res.render("blogPost", {
            ...blogPost,
            logged_in: req.session.logged_in,
        });
    } catch (err) {
        console.log(err.message);
        res.status(500).json(err);
       
    }
});

router.get ("/dashboard", withAuth, async (req,res)=> {
    try{
        const userData = await User.findByPk(req.session.user_id, {
            attributes: {exclude: ["password"]},
            include: [
                {
                    model: BlogPost,
                    include: [User],
                },
                {
                    model: Comment,
                },
                
            ],
        });
        const user = userData.get ({plain:true});
        console.log(user)
        res.render("dashboard", {
            ...user,
            logged_in:true,
        });
    }catch (err) {
        res.status(500).json(err);
    }
});

router.get("/create", async (req, res) => {
    try{
        if (req.session.logged_in) {
            res.render("create", {
                logged_in: req.session.logged_in,
                userId: req.session.user_id,
            });
            return;
        }else {
            res.redirect("/login");
        }
    }catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});

router.get("/create/:id", async (req, res) => {
    try{
        const blogPostData = await BlogPost.findByPk(req.params.id, {
            include: [
                {
                    model: User,
                    attributes: ["name"],
                },
                
            ],
        });

        const blogPost = blogPostData.get({plain: true});
        console.log(blogPost);

        if (req.session.logged_in) {
            res.render("edit", {
                ...blogPost,
                logged_in: req.session.logged_in,
                userId: req.session.user_id,
            });
            return;
        }else {
            res.redirect("/login");
        }
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});

router.all("/login", (req, res) => {
    if (req.session.logged_in) {
        res.redirect("/dashboard");
        return;
    }
    res.render("login");
});

module.exports = router; 