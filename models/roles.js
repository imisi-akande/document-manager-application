const RoleSchema = (sequelize, DataTypes) => {
  const Roles = sequelize.define('Roles', {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: {
        args: true,
        msg: 'role already exist'
      },
      validate: {
        is: {
          args: /\w+/g,
          msg: 'Input a valid title'
        },
        notEmpty: {
          msg: 'This field must not be empty'
        }
      }
    }
  },
    {
      classMethods: {
        associate: (models) => {
        // associations can be defined here
          Roles.hasMany(models.Users, {
            foreignKey: 'roleId',
            onDelete: 'CASCADE',
          });
        },
      },
    });
  return Roles;
};
export default RoleSchema;
