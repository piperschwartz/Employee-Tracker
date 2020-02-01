var mysql = require("mysql");
var inquirer = require("inquirer");
var cTable = require("console.table");



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


//function to provide the list of options
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
    //this calls the functions below
    .then(function(answer) {
      switch (answer.action) {
      case "View All Employees":
        viewAllEmployees();
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

      case "Update Employee":
       updateEmp();
         break;
      
      case "Update Role":
        updateRole();
        break;

      case "Update Manager":
        updateManager();
        break;
    
      }
    });
}
//function to view all the employees
function viewAllEmployees() {
  connection.query("SELECT first_name, last_name, role_id, manager_id FROM employee", function(err,res) {
    if (err) throw err;
    console.table(res);
    runSearch();
  }
  )
}
 //function to search all the departments
function departmentSearch() {
 connection.query("SELECT name FROM department", function (err, res) {
   if (err) throw err;
   console.table(res);
   runSearch();
 }) 
}
//function to search all the roles
function roleSearch() {
  connection.query("SELECT title, salary, department_id FROM role", function (err, res) {
    if (err) throw err;
    console.table(res);
    runSearch();
  })
}
//add employees with their first and last name, rold ID,  manager ID
function addEmp() {
  inquirer
   .prompt([
    {
      type: "input",
      name:"firstName",
      message: "First Name:"
    }, 
    {
      type: "input",
      name:"lastName",
      message: "Last Name:"
    },
    {
      type: "input",
      name:"roleId",
      message: "Role ID:"
    },
    {
      type: "input",
      name:"managerID",
      message: "Manager ID:"
    }
   ])
   .then((res) => {
     connection.query(
       "INSERT INTO employee SET ?",
       {
         first_name: res.firstName,
         last_name: res.lastName,
         role_id: res.roleId,
         manager_id: res.managerID
       },
       function (err,res) {
         if (err) throw err;
         console.log("Hello I added a new employee to the team!");
         runSearch();       
        }
     )
   })
}
// function to add a new department
function addDepart() {
  inquirer
  .prompt([
    {
      type: "input",
      name: "nameDepart",
      message: "Department:"
    }

  ])
  .then((res) => {
    connection.query(
      "INSERT INTO department SET ?",
      {
        name: res.nameDepart
      },
      function (err, res) {
        if (err) throw err;
        console.log("New Department");
        runSearch();
      }
    )
 
  })
}
// function to add a role
function addRole() {
  inquirer
  .prompt([
    {
      type: "input",
      name: "newRole",
      message: "New Role:"
    },
    {
      type: "input",
      name: "salary",
      message: "Salary:",
    },
    {
      type: "input",
      name: "departID",
      message: "Department ID:"
    }

  ])
  .then((res) => {
    connection.query(
      "INSERT INTO role SET ?",
      {
        title: res.newRole,
        salary: res.salary,
        department_id: res.departID
      },
      function (err, res) {
        if (err) throw err;
        console.log("New Role");
        runSearch();
      }
    )
 
  })
}
// update current employees and their names, role, manager ID
function updateEmp() {
  connection.query("SELECT * FROM employee", function (err, results) {
    if (err) throw err;

    inquirer
    .prompt ([ {
      type: "list",
      name: "option",
      choices: function() {
        var empToUpdate =  [];
        for (var i = 0; i < results.length; i++) {
          empToUpdate.push(results[i].id + " " + results[i].first_name + " " + results[i].last_name);
        }
        return empToUpdate;
      },
      message: "Which employee do you want to update?"
      },

      {
        type: "input",
        name: "updateFirstName",
        message: "Updated First Name:"
      },
      {
        type: "input",
        name: "updateLastName",
        message: "Updated Last Name:"
      },
      {
        type: "input",
        name: "updateEmpRole",
        message: "Updated Role:"
      },
      {
        type: "input",
        name: "updateMgmt",
        message: "Manager Update:"
      },


    ])
    .then((res) => {
      var fullFLname = res.option.split("");
      var id = fullFLname[0];
      connection.query(
        "UPDATE employee SET ? WHERE ?",
        [ 
          {
            first_name: res.updateFirstName,
            last_name: res.updateLastName,
            role_id: res.updateEmpRole,
            manager_id: res.updateMgmt

          },
          {
            id: id
          },
          function(err,res) {
            if (err) throw (err);
            console.log("it worked, employee update is complete.")
            runSearch();
          }

        ]
      )
    }
    )
  })

}
// update roles
function updateRole() {
  connection.query("SELECT * FROM role", function (err, results) {
    if (err) throw err;

    inquirer
    .prompt ([ {
      type: "list",
      name: "option",
      choices: function() {
        var roleUpdate =  [];
        for (var i = 0; i < results.length; i++) {
          roleUpdate.push(results[i].id + " " + results[i].title + " " + results[i].salary + " " + results[i].department_id);
        }
        return roleUpdate;
      },
      message: "Which role do you want to update?"
      },

      {
        type: "input",
        name: "roleTitle",
        message: "Updated Role:"
      },
      {
        type: "input",
        name: "roleSalary",
        message: "Updated Salary:"
      },
      {
        type: "input",
        name: "roleDepartID",
        message: "Updated Department ID:"
      },
  
    ])
    .then((res) => {
      var roleInfo = res.option.split("");
      var id = roleInfo[0];
      connection.query(
        "UPDATE role SET ? WHERE ?",
        [ 
          {
            title: res.roleTitle,
            salary: res.roleSalary,
            department_id: res.roleDepartID,
        

          },
          {
            id: id
          },
          function(err,res) {
            if (err) throw (err);
            console.log("it worked, role update is complete.")
            runSearch();
          }

        ]
      )
    }
    )
  })
}
//update managers
function updateManager() {
  connection.query("SELECT * FROM employee", function (err, results) {
    if (err) throw err;

    inquirer
    .prompt ([ {
      type: "list",
      name: "option",
      choices: function() {
        var mgmtUpdate =  [];
        for (var i = 0; i < results.length; i++) {
          mgmtUpdate.push(results[i].id + " " + results[i].first_name + " " + results[i].last_name + " " + results[i].manager_id + " " + results[i].salary);
        }
        return mgmtUpdate;
      },
      message: "Which manager do you want to update?"
      },

      {
        type: "input",
        name: "managerFn",
        message: "Manager First Name:"
      },
      {
        type: "input",
        name: "managerLn",
        message: "Manager Last Name:"
      },
      {
        type: "input",
        name: "mgmtID",
        message: "Manager ID"
      },
      {
        type: "input",
        name: "mgmtSal",
        message: "Manager Salary"
      },
  
    ])
    .then((res) => {
      var managerUpdated = res.option.split("");
      var id = managerUpdated[0];
      connection.query(
        "UPDATE employee SET ? WHERE ?",
        [ 
          {
            first_name: res.managerFn,
            last_name: res.managerLn,
            manager_id: res.mgmtID,
            salary: res.mgmtSalary
        

          },
          {
            id: id
          },
          function(err,res) {
            if (err) throw (err);
            console.log("it worke yo");
            runSearch();
      
          }

        ]
      )
    }
    )
  })
}