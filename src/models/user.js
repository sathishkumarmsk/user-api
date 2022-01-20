export default (sequelize, DataTypes) => {
    const User = sequelize.define(
        'user', {
            id: {
                type: DataTypes.INTEGER,
                unique: true,
                primaryKey: true,
                autoIncrement: true,
            },
            email: {
                type: DataTypes.STRING,
                unique: true,

            },
            password: DataTypes.STRING,
            verified: {
                type: DataTypes.BOOLEAN,
                defaultValue: false,
            },
            blocked: {
                type: DataTypes.BOOLEAN,
                defaultValue: false,
            }
        },
        {
            timestamps: true,
            freezeTableName: true,
        },
    );
    return User;
}