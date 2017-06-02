import db from '../../models';

/**
 * SeedData class to populate database with default data
 */
class SeedHelper {

  /**
   * Perform the sequential population of the db
   * @return {Void} - Returns Void
   */
  static init() {
    return db.sequelize.sync({ force: true })
    .then(() => (Promise.all([SeedHelper.populateRoleTable()])), err =>
    );
  }

  /**
   * Populates db with default roles
   * @returns {object} - A Promise object
   */
  static populateRoleTable() {
    const roles = [
      {
        title: 'admin',
        id: 1
      },
    ];
    return db.Roles.bulkCreate(roles);
  }
}

export default SeedHelper; // .init()import db from '../../models';
