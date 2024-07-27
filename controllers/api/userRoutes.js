const router = require("express").Router();
const { User } =require("../../models");

router.post("/", async (req, res) => {
    try {
        const userData = await User.create(req.body);

        req.session.save(()=> {
            req.session.user_id = userData.id;
            req.session.logged_in = true;

            res.status(200).json(userData);
        });
    }catch(err) {
        res.status(400).json(err);
    }
});

router.post("/login", async (req, res) => {
    try {
        const userData = await User.findone({where: {email: req.body.email}});

        if(!userData) {
            console.log("no user found");
            res.status(400).json({message: "The email or password you have used is invalid."});
            return;
        }

        const password= await userData.checkPassword(req.body.password);

        if (!password) {
            console.log("password does not match");
            res.status(400).json({message: "The email or password you have used is invalid."});
            return;
        }
        req.session.save(() => {
            req.seesion.user_id =userData.id;
            req.session.logged_in =true;
            
            res.json({user: userData, message: "Welcome !!"});
        });
    }catch (err) {
        res.status(400).json(err);
    }
});

router.post("/logout", (req, res) => {
    if (req.session.logged_in) {
        req.session.destroy(() => {
            res.status(204).end();
        });
    }else {
        res.status(404).end();
    }
});

module.exports=router;