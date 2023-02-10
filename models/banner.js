module.exports = (sequelize, DataTypes) => {
    const banner=sequelize.define("Banner",{
        imageUrl: {
            type: DataTypes.STRING(300),
            allowNull: false//무조건쓰게
        },
        href: {
            type: DataTypes.STRING(300),
            allowNull: false//무조건쓰게
        }
    });
    return banner;
}