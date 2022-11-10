'use strict';
const fs = require('fs')
/** @type {import('sequelize-cli').Migration} */
module.exports = {
   up (queryInterface, Sequelize) {
    const dataProfile = JSON.parse(fs.readFileSync('./profile.json', 'utf-8')).map(el=>{
      el.createdAt = new Date(),
      el.updatedAt = new Date()
      return el
    })

    return queryInterface.bulkInsert('Profiles', dataProfile, {})
  },

   down (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('Profiles', null, {})
    
  }
};
