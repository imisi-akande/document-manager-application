module.exports = (sequelize, DataTypes) => {
  // define mapping between document table and model
  const Documents = sequelize.define('Documents', {
    title: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    access: {
      type: DataTypes.STRING,
      defaultValue: 'public',
      validate: {
        notEmpty: {
          msg: 'This field cannot be empty'
        },
        isIn: {
          args: [
            ['public', 'private', 'role']
          ],
          msg: 'role can only be of public, private or your role'
        }
      }
    },
    authorId: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  },
    {
      classMethods: {
        associate: (models) => {
        // associations can be defined here
          Documents.belongsTo(models.Users, {
            foreignKey: 'authorId',
            onDelete: 'CASCADE',
          });
        },
      },
    });
  return Documents;
};
