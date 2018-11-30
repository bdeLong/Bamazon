require("dotenv").config();
const mysql = require("mysql");
const inquirer = require("inquirer");
const secrets = require("./secrets.js");
const dismyusernamenotyours = secrets.username;
const dismypasswordnotyours = secrets.mypassword;
let itemId;
let purchaseQuantity;
let itemName;
const connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: dismyusernamenotyours,
  password: dismypasswordnotyours,
  database: "bamazon_db"
});

connection.connect(err => {
  if (err) throw err;
  console.log("connection successful");
  getProducts();
});

const getProducts = () => {
  connection.query(`SELECT * FROM products`,
    (err, rows) => {
      if (err) {
        throw err
      }
      rows.forEach(row => console.log(`Product Id ${row.id}: ${row.product_name} - $${row.price}\n`));
      shop();
    });
}

const shop = () => {
  inquirer.prompt([{
    name: `pickProduct`,
    type: `input`,
    message: `Please enter the ID number of the product you'd wish to purchase`,
  },
  {
    name: `pickQuantity`,
    type: `input`,
    message: `Please enter the quantity of product you'd like to purchase`
  }])
    .then(function (res) {
      itemId = res.pickProduct
      purchaseQuantity = res.pickQuantity
      checkOut();
    });
}

const checkOut = () => {
  connection.query(`SELECT * FROM products WHERE id = ${itemId}`,
    (err, row) => {
      if (err) {
        throw err
      }
      itemName = row[0].product_name;
      itemsInStock = row[0].stock_quantity;
      itemPrice = row[0].price;
      inquirer.prompt({
        name: `confirmOrder`,
        type: `confirm`,
        message: `Your Shopping Cart contains ${purchaseQuantity} order(s) of ${itemName}. Confirm Purchase?`,
      })
        .then(function (res) {
          if (res.confirmOrder) {
            if (purchaseQuantity > itemsInStock) {
              inquirer.prompt({
                name: `rePick`,
                type: `input`,
                message: `You've chosen a quantity that is more than we have in stock.\n Please choose a quantity that is equal too or less than ${itemsInStock}`,
              })
                .then(function (res) {
                  purchaseQuantity = res.rePick;
                  checkOut();
                });
            }
            else {
              console.log(`Your total purchase comes to $${purchaseQuantity * itemPrice}\nThank you for shopping with Bamazon!`);
              connection.query(`UPDATE products SET stock_quantity = (stock_quantity - ${purchaseQuantity}) WHERE id = ${itemId}`,
                (err, row) => {
                  if (err) {
                    throw err
                  }
                });
            }
          }
          else {
            console.log("Yee");
          }
        });
    });
}

