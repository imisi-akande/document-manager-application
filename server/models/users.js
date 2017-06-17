import bcrypt from 'bcrypt-nodejs';

module.exports = (sequelize, DataTypes) => {
  const Users = sequelize.define('Users', {
    userName: {
      allowNull: false,
      type: DataTypes.STRING,
      unique: true,
    },
    firstName: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    lastName: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    email: {
      allowNull: false,
      type: DataTypes.STRING,
      unique: true,
      validate: {
        isEmail: true,
      },
    },
    password: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    roleId: {
      allowNull: false,
      type: DataTypes.INTEGER,
      defaultValue: 2,
    }
  },
    {
      classMethods: {
        associate: (models) => {
          Users.belongsTo(models.Roles, {
            onDelete: 'CASCADE',
            foreignKey: 'roleId',
          });

          Users.hasMany(models.Documents, {
            foreignKey: 'authorId',
            onDelete: 'CASCADE',
          });
        },
      },

    /**
     * Hash user's password
     *
     * @method
     * @returns {Void} no return
     */
      instanceMethods: {
        ValidatePassword(password) {
          return bcrypt.compareSync(password, this.password);
        },

    /**
     * Compare plain password to user's hashed password
     *
     * @method
     * @param {String} password
     * @returns {Boolean} password match
     */
        hashPassword(password) {
          return bcrypt.hashSync(password, bcrypt.genSaltSync(8));
        }
      },
      hooks: {
        beforeCreate(user) {
          user.password = user.hashPassword(user.password);
        },
        beforeUpdate(user) {
          user.password = user.hashPassword(user.password);
        }
      }
    });
  return Users;
};
