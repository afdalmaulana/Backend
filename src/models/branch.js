// const { DataTypes } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
    const Branches = sequelize.define(
        'Branches',
        {
            branchName: {
                type: DataTypes.STRING,
            },
            address : {
                type : DataTypes.STRING,
            },  
        },
        {},

    );
    return Branches;
}