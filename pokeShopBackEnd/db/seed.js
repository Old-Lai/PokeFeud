const {
    client
} = require("./index")

async function dropTables() {
    try{
        console.log("Starting to drop tables...")

        await client.query(`
            DROP TABLE IF EXISTS products
            DROP TABLE IF EXISTS shopping_carts
            DROP TABLE IF EXISTS users
        `)

        console.log("Finished dropping tables!")
    } catch(e) {
        console.error("Error dropping tables!!!")
        throw error;
    }
}

async function createTables() {
    try{
        console.log("Starting to build tables...")
        
        await client.query(`
            CREATE TABLE users(
                id SERIAL PRIMARY KEY,
                username VARCHAR(255) UNIQUE NOT NULL,
                password VARCHAR(255) NOT NULL,
                email VARCHAR(255) NOT NULL,
                isAdmin BOOLEAN DEFAULT false
            );

            CREATE TABLE shopping_carts(
                id SERIAL PRIMARY KEY,
                "userId" INTEGER REFERENCES users(id) NOT NULL,
                "productList" VARCHAR(255)
            );

            CREATE TABLE products(
                id SERIAL PRIMARY KEY,
                name VARCHAR(255) UNIQUE NOT NULL,
                prodDes VARCHAR(255) NOT NULL,
                dollarAmt FLOAT(8, 2) DEFAULT 0,
                stockCount INTEGER DEFAULT 0
            )
        `)

        console.log("Finished building tables!")
    } catch(e) {
        console.error("Error building tables!!!")
        throw error
    }
}