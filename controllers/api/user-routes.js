const router = require("express").Router();
const { User, Post, Comment } = require("../../models");

// GET /api/users -- get all users and their associated posts and comments 
router.get("/", (req, res) => {
  
  User.findAll({
    attributes: { exclude: ["password"] },
  })
    .then((dbUserData) => res.json(dbUserData))
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

// GET /api/users/:id that finds a single user by its id and its associated posts and comments
router.get("/:id", (req, res) => {
 
  User.findOne({
    attributes: { exclude: ["password"] },
    
    where: {
      id: req.params.id,
    },
    include: [
      {
       
        model: Post,
        attributes: ["id", "title", "post_content", "created_at"],
      },
      {
       
        model: Comment,
        attributes: ["id", "comment_text", "created_at"],
        include: {
          model: Post,
          attributes: ["title"],
        },
      },
    ],
  })
    
    .then((dbUserData) => {
      if (!dbUserData) {
        res.status(404).json({ message: "No user found with this id" });
        return;
      }
      res.json(dbUserData);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

// POST route that creates a new user and saves it to the database 
router.post("/", (req, res) => {
  
  User.create({
    username: req.body.username,
    email: req.body.email,
    password: req.body.password,
  })
  
    .then((dbUserData) => {
      
      req.session.save(() => {
        
        req.session.user_id = dbUserData.id;
        req.session.username = dbUserData.username;
        req.session.loggedIn = true;

        res.json(dbUserData);
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});
//POST route that allows a user to login to their account 
router.post('/login', (req, res) => {
   
  User.findOne({
    where: {
      email: req.body.email
    }
  }).then(dbUserData => {
    if (!dbUserData) {
      res.status(400).json({ message: 'No user with that email address!' });
      return;
    }

    const validPassword = dbUserData.checkPassword(req.body.password);

    if (!validPassword) {
      res.status(400).json({ message: 'Incorrect password!' });
      return;
    }

    req.session.save(() => {
      
      req.session.user_id = dbUserData.id;
      req.session.username = dbUserData.username;
      req.session.loggedIn = true;

      res.json({ user: dbUserData, message: 'You are now logged in!' });
    });
  });
});
// POST route that allows the user toi logout of their account
router.post("/logout", (req, res) => {
  if (req.session.loggedIn) {
   
    req.session.destroy(() => {
      res.status(204).end();
    });
  } else {
    res.status(404).end();
  }
});

// PUT route that updates a user by its id
router.put("/:id", (req, res) => {
  
  User.update(req.body, {
    individualHooks: true,
    where: {
      id: req.params.id,
    },
  })
    .then((dbUserData) => {
      if (!dbUserData) {
        res.status(404).json({ message: "No user found with this id" });
        return;
      }
      res.json(dbUserData);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});
// DELETE route that deletes a user by its id
router.delete("/:id", (req, res) => {
  User.destroy({
    where: {
      id: req.params.id,
    },
  })
    .then((dbUserData) => {
      if (!dbUserData) {
        res.status(404).json({ message: "No user found with this id" });
        return;
      }
      res.json(dbUserData);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

module.exports = router;