
module.exports = {
  up : function (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('Users', [{
      first_name : 'John',
      last_name : 'Doe',
      password : 'Iamnew',
      createdAt : new Date(),
      updatedAt : new Date(),
      email : 'johnDoe@test.com'
    }], {});
  },

  down : function (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('Users', [{
      first_name :'John'
    }])
  }
};