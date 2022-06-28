const Product = require('../models/product')
const products = require('../data/products')
const connectDatabase = require('../config/database')
// Connection to database
connectDatabase();
const seedProducts = async () => {
    try{
        await Product.deleteMany();
        console.log('Product deleted successfully')
        await Product.insertMany(products);
        console.log('Product inserted successfully')
        process.exit()
    } catch(error){
        console.log(error.message)
        process.exit()
    }
}
seedProducts()