module.exports = (sequelize, DataTypes) => {
    const product=sequelize.define("Product",{
        name: {
            type: DataTypes.STRING(20),
            allowNull: false//무조건쓰게
        },
        price: {
            type: DataTypes.INTEGER(10),
            allowNull: false//무조건쓰게
        },
        seller: {
            type: DataTypes.STRING(30),
            allowNull: false//무조건쓰게
        },
        description: {
            type: DataTypes.STRING(300),
            allowNull: false//무조건쓰게
        },
        imageUrl: {
            type: DataTypes.STRING(300),
            allowNull: true//없어도됨
        },
        soldout: {
            type: DataTypes.INTEGER(1),
            allowNull: true,//없어도됨
            defaultvalue:0,//soldout이 아니라는뜻 1은 솔드아웃
        }
    });
    return product;
}