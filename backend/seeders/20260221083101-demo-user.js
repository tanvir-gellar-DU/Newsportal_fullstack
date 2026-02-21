'use strict';
const bcrypt = require('bcryptjs');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const hashedPassword = await bcrypt.hash('password123', 10);
    return queryInterface.bulkInsert('Users', [
      {
        name: 'Tanvir',
        email: 'admin@newsportal.com',
        password: hashedPassword,
        role: 'admin',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Tasin',
        email: 'editor@newsportal.com',
        password: hashedPassword,
        role: 'editor',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Sample User',
        email: 'user@newsportal.com',
        password: hashedPassword,
        role: 'user',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ]);
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete('Users', null, {});
  }
};
