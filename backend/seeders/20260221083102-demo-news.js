'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert('News', [
      {
        title: 'Breaking News: AI takes over coding',
        content: 'In a shocking turn of events, AI agents are now doing all the coding for developers...',
        category: 'Technology',
        image: 'https://images.unsplash.com/photo-1518770660439-4636190af475',
        authorId: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        title: 'Sports Update: Championship Finals',
        content: 'The finals are here and the teams are ready to fight for the trophy...',
        category: 'Sports',
        image: 'https://images.unsplash.com/photo-1504450758481-7338eba7524a',
        authorId: 2,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ]);
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete('News', null, {});
  }
};
