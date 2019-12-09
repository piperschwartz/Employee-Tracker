var mysql = require("mysql");
var inquirer = require("inquirer");
//var cTable = require("console.table");
var require = require("./employeeApp");

var connection = mysql.createConnection ({
    host: "localhost",

    port: 3306,

    user: "root",
    password: "cleopatra14",
    database: "tracker_db"
});

connection.connect(function(err) {
    if (err) throw err;

    runSearch();
});




function runSearch() {
  inquirer
    .prompt({
      name: "action",
      type: "rawlist",
      message: "What would you like to do?",
      choices: [
        "View All Employees",
        "View All Departments",
        "View All Roles",
        "Add Employee",
        "Add Department",
        "Add Role",
        "Update Employee",
        "Update Role",
        "Update Manager"
      ]
    })
    .then(function(answer) {
      switch (answer.action) {
      case "View All Employees":
        employeeSearch();
        break;

      case "View All Departments":
        departmentSearch();
        break;

      case "View All Roles":
        roleSearch();
        break;

      case "Add Employee":
        addEmp();
        break;

      case "Add Department":
        addDepart();
        break;

      case "Add Role":
        addRole();
        break;  
    
      case "Add Manager":
        addManager();
        break;
    
      }
    });
}

function employeeSearch() {
  inquirer
    .prompt({
      name: "first_name, last_name",
      type: "input",
      message: "What employee would you like to search for?"
    })
    .then(function(answer) {
      var query = "SELECT id, first_name, last_name FROM employee WHERE ?";
      connection.query(query, { first_name: answer.first_name }, function(err, res) {
        for (var i = 0; i < res.length; i++) {
          console.log("id: " + res[i].id + " || First Name: " + res[i].first_name + " || Last Name: " + res[i].last_name);
        }
        runSearch();
      });
    });
};

 



    
