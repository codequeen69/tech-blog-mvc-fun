const Comment = require('./Comment');
const Post = require('./Post');
const User = require('./User');

//a user can have many posts
User.hasMany(Post,{
    foreignKey: 'user_id'
});

//A post can only belong to one user
Post.belongsTo(User,{
    foreignKey: 'user_id'
});

//a comment can only belong to one user
Comment.belongsTo(User,{
    foreignKey: 'user_id'
});

//a comment will belong to single post
Comment.belongsTo(Post, {
    foreignKey: 'post_id'
});

//a user can have many comments
User.hasMany(Comment,{
    foreignKey: 'user_id'
});

//there can be many comments on one post
Post.hasMany(Comment,{
    foreignKey: 'post_id'
});