const router = require('express').Router();
const { User, Post, Comment } = require('../../models');


//GET /api/users
router.get('/', (req, res) => {
    User.findAll({
        attributes: { exclude: ['password'] }
    })
        .then(dbUserData => res.json(dbUserData))
        .catch(err => {
            console.log(err)
            res.status(500).json(err);
        });
});

//Get a single user
router.get('/:id', (req, res) => {
    User.findOne({
        attributes: {
            exclude: ['password']
        },
        where: {
            id: req.params.id
        },
        include: [
            //so we can see this user's posts
            {
                model: Post,
                attributes: ['id', 'title', 'post_content', 'created_at']
            },
            //so we can see which posts this user commented on
            {
                model: Comment,
                attributes: ['id', 'comment_text', 'created_at'],
                include: {
                    model: Post,
                    attributes: ['title']
                }
            },
        ]
    })
        .then(dbUserData => {
            if (!dbUserData) {
                res.status(404).json({ message: 'No user found with this id!' });
                return;
            }
            res.json(dbUserData);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
})


//POST create a user /api/users
router.post('/', (req, res) => {
    console.log(req.body);
    User.create({
        username: req.body.username,
        password: req.body.password
    })
        .then(dbUserData => res.json(dbUserData))
            .catch(err =>{
                console.log(err);
                res.status(500).json(err);
            });
        
});

//PUT /api/users/idnumber to update
router.put('/:id', (req, res) =>{
    User.update(req.body, {
        individualHooks: true,
        where:{
           id: req.params.id
        }
    })
    .then(dbUserData =>{
        if(!dbUserData[0]){
            res.status(404).json({message: 'No user found with this id!'});
        }
        res.json(dbUserData);
    })
    .catch(err =>{
        console.log(err);
        res.status(500).json(err);
    });
});

//DELETE api/users/idnumber
router.delete('/:id', (res, req) => {
    User.destroy({
        where:{
            id: req.params.id
        }
    })
    .then(dbUserData => {
        if(!dbUserData){
            res.status(404).json({message: 'No user found with this id!'});
        }
        res.json(dbUserData);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

module.exports = router;