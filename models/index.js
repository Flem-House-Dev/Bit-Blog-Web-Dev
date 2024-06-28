const User = require('./User');
const Blog = require('./Blog');
const Comment = require('./Comment');
const { blockParams } = require('handlebars');

User.hasMany(Blog, {
    foreignKey: 'id',
    onDelete: 'CASCADE'
});

User.hasMany(Comment, {
    foreignKey: 'id',
    onDelete: 'CASCADE'
})

Blog.belongsTo(User, {
    foreignKey: 'id'
});

Blog.hasMany(Comment, {
    foreignKey: "id",
    onDelete: 'CASCADE'
});

Comment.belongsTo(User, {
    foreignKey: "id",
    onDelete: 'CASCADE'
});

Comment.belongsTo(Blog, {
    foreignKey: "id",
    onDelete: 'CASCADE'
});

module.exports = { User, Blog };