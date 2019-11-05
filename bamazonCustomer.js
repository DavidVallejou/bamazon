var inquirer = require('inquirer');
var mysql = require('mysql');
var Table = require('cli-table');
var connection = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: 'password',
    database: 'bamazon_db'
});


connection.connect(function(err) {
    if (err) throw err;
    console.log("connected as id " + connection.threadId);
    displayInventory();    
    
  });
  function displayInventory() {
    queryStr = 'SELECT * FROM products';
    connection.query(queryStr, function(err, data) {
        if (err) throw err;

        var table = new Table({
            head: ['item_id', 'product_name','department_name','price','stock_quantity']
          , colWidths: [10, 20,20,10,10]
        });
        
        for (var i = 0; i < data.length; i++) {
           table.push(
              [data[i].item_id, data[i].product_name, data[i].department_name, data[i]. price,data[i].stock_quantity] 
           );
            
        }

        // )}
        console.log('Existing Inventory: ');
        console.log('...................\n');
        var strOut = '';
        for (var i = 0; i < data.length; i++) {
            strOut = '';
            strOut += 'Item ID: ' + data[i].item_id;
            strOut += 'Product Name: ' + data[i].product_name;
            strOut += 'Department: ' + data[i].department_name;
            strOut += 'Price: $' + data[i].price;
            strOut += 'Quantity: ' + data[i].stock_quantity + '\n';
            console.log(strOut);
        }
        console.log(table.toString());
        console.log("---------------------------------------------------------------------\n");
          start();
    })
  }
  function start() {  
    
    inquirer
      .prompt([          
        {
        
        type: "input",
        name: "productId",
        message: "Please Enter the Product ID"
      },
      
    {
        type: "input",
        name: "units",
        message: "How Many Units Do You Need?"
    }
    ])
      .then(function(answer) {
          var itemId= answer.productId;
          var units= answer.units;
        connection.query("SELECT * FROM products WHERE ?", {item_id:itemId},
        function(err, res) {
        if (err) throw err;
        if (res.length ===0) {
        console.log("ERROR!!!, ITEM ID DOES NOT EXIST,PLEASE ENTER A VALID ITEM ID\n");
        displayInventory();
        }
        else{
            if(units<=res[0].stock_quantity){
        console.log("Your item is in stock and has been placed!\n")
        var updateQuantity ="UPDATE products SET stock_quantity = " + (res[0].stock_quantity-units)
                            +" WHERE item_id = " + itemId;
        
           connection.query(updateQuantity,function(err, data){
            if (err) throw err;
            console.log("TOTAL COST OF YOUR ORDER IS - $ " + res[0].price * units );
            console.log("Thank you for your purchase !\n");
            console.log("****************************************************************\n");
            purchaseItem();
           });                 
        }
        else{
            console.log("SORRY, INSUFFICIANT QUANTITY!!\n"+"PLEASE ENTER A VALID QUANTITY\n"+"WE HAVE ONLY AVAILABE "+ res[0].stock_quantity + "   OF ITEM : " + res[0].product_name +"\n");
            
            purchaseItem();
        }
        }
         
        
      });
  });
}
 
function purchaseItem(){
    inquirer.prompt([
        {
          type: "confirm",
          message: " Want to keep shopping" ,
          name: "confirm" 
        }
    ]).then(function(res){
        if(res.confirm){
            console.log("........................................................\n");
            displayInventory();
        }
        else{
            console.log("Happy Shopping!")
            connection.end();
        }
    })
}
  
  