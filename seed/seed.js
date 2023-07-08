const sequelize = require('../config/connection');
const { Book } = require('../models');

const bookData = require('./bookData.json');

const seedDatabase = async () => {
    await sequelize.sync({ force: true });

    const books = await Book.bulkCreate(bookData, {
        individualBooks: true,
        returning: true,
    });

    process.exit(0);
};

seedDatabase();