const {Model, DataTypes} = require('sequelize');
const sequelize = require('../config/connection');
const bcrypt = require('bcrypt');

//create the user model
class User extends Model{
    //set up method to run on instance data (per user) to check password
    checkPassword(loginPW){
        return bcrypt.compareSync(loginPW, this.password);
    }
}

//define the user table columns and configuration
User.init(
    {
        id:{
            type:DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        username:{
            type: DataTypes.STRING,
            allowNull: false,
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
            validate:{
                len:[4]
            }
        }
    },
    {
        //add hooks 
        hooks:{
            async beforeCreate(newUserData){
                newUserData.password = await bcrypt.hash(newUserData.password, 10);
                return newUserData;
            },
            //this sets up beforeUpdate lifecycle hook functionality
            async beforeUpdate(updatedUserData){
                updatedUserData.password = await bcrypt.hash(updatedUserData.password, 10);
                return updatedUserData;
            }
        },

        //passed imported sequelize connection to out database
        sequelize,
        //will not automatically create createdAt/updatedAt timestamp field
        timestamps: false,
        //don't pluralize the name of database table
        freezeTableName:true,
        //use underscored instead of camel case
        underscored: true,
        //so our model name stays lowercase in database
        modelName: 'user'
    }
);

module.exports = User;