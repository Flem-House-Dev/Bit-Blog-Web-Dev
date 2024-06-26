const User = require('./User');
const Blog = require('./Blog');

User.hasMany(Blog, {
    foreignKey: 'id',
    onDelete: 'CASCADE'
});

Blog.belongsTo(User, {
    foreignKey: 'id'
});

module.exports = { User, Blog };