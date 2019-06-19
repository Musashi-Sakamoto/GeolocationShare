const { hashString } = require('../utils/stringUtil');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const password = await hashString('password');
    await queryInterface.bulkInsert('users', [1, 2, 3].map(num => ({
      email: `email${num}${num}${num}@email.com`,
      username: `username${num}`,
      password,
      isVerified: true,
      createdAt: '9999-12-31 23:59:59',
      updatedAt: '9999-12-31 23:59:59'
    })), {});
  },

  down: (queryInterface, Sequelize) => queryInterface.bulkDelete('users', null, {})
};
