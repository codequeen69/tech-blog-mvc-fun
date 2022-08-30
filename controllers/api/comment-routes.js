const router = require('express').Router();
const { Comment } = require('../../models');

//get all comments
router.get('/', (req, res) => {
    Comment.findAll({

    })
        .then(dbCommentData => res.json(dbCommentData))
        .catch(err => {
            console.log(err)
            res.status(500).json(err);
        });
});

//create a comment
router.post('/', (req, res) => {
    //check session to make sure only logged in users can comment
   if (req.session){
    Comment.create({
        comment_text: req.body.comment_text,
        post_id: req.body.post_id,
        //use id from the session
        user_id: req.session.user_id
    })
        .then(dbCommentData => res.json(dbCommentData))
        .catch(err => {
            console.log(err);
            res.status(400).json(err);
        });
    }
});

//update a comment
router.put('/:id', (req, res) => {
    Comment.update({
        where: {
            id: req.params.id
        }
    })
        .then(dbCommentData => {
            if (!dbCommentData) {
                res.status(404).json({ message: 'No comment found with this id' });
                return;
            }
            res.json(dbCommentData);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

//delete a comment
router.delete('/:id', (req, res) => {
    Comment.destroy({
        where: {
            id: req.params.id
        }
    })
        .then(dbCommentData => {
            if (!dbCommentData) {
                res.status(400).json({ message: "No comment with this id found!" });
                return;
            }
            req.json(dbCommentData);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

module.exports = router;