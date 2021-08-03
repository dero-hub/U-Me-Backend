module.exports = (sequelize, Sequelize ) => {
    const Perm = sequelize.define('permissions', {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true
        },
        
        name: {
            type: Sequelize.STRING
        }
    });
    return Perm;
};