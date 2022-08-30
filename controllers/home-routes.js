const router = require('express').Router();
const { Post, User, Comment } = require('../models');

//get all posts
router.get('/', (req, res) => {
    Post.findAll({
        attributes: ['id', 'title', 'post_content', 'created_at'],
        order: [['created_at', 'DESC']],
        include: [
            {
                model: Comment,
                attributes: ['id', 'comment_text', 'post_id', 'user_id', 'created_at'],
                include: {
                    model: User,
                    attributes: ['username']
                }
            },
            {
                model: User,
                attributes: ['username']
            }
        ]
    })
        .then(dbPostData => {
            //pass a single post object into the homapge template
            //.get() allows us to get only the properties we want from the
            //Sequelize object
            //map loops over each sequelize post object
            const posts = dbPostData.map(post => post.get({ plain: true }));
            res.render('homepage', {
                 posts,
                 loggedIn: req.session.loggedIn
                 })
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

//render a single post
router.get('/post/:id', (req, res) => {
    Post.findOne({
        where: {
            id: req.params.id
        },
        attributes: ['id', 'title', 'post_content', 'created_at'],
        include: [
            {
                model: Comment,
                attributes: ['id', 'comment_text', 'post_id', 'user_id', 'created_at'],
                include: {
                    model: User,
                    attributes: ['username']
                }
            },
            {
                model: User,
                attributes: ['username']
            }
        ]
    })
        .then(dbPostData => {
            if (!dbPostData) {
                res.status(404).json({ message: 'No post found with this id' });
                return;
            }
            //serialize the data
            const post = dbPostData.get({ plain: true });

            //pass data to template
            res.render('single-post',
                {
                    post,
                    loggedIn: req.session.loggedIn
                });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

//render login page
router.get('/login', (req, res) => {
    if (req.session.loggedIn) {
        res.redirect('/');
        return;
    }
    res.render('login');
});

//render signup page
router.get('/signup', (req, res) => {
    res.render('signup');
});

module.exports = router;
