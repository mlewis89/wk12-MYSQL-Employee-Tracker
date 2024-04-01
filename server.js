const inquirer = require("inquirer");
require("dotenv").config();
const mysql = require("mysql2");

// Connect to database
const db = mysql.createConnection(
  {
    host: "localhost",
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
  },
  console.log(`Connected to the ${process.env.DB_NAME} database.`)
);

const generateASCIIBANNER = () =>
  `----------------------------------------------------------------------------------------------------------------
|                                                                                                               |
|    _____                    _                              __  __ __                                          |
|   | ____| _ __ ____  _ ___ | | _____  _   _  ___  ___     |  /   /  |  __ _  _ ___    __ _   __ _  ___  _ _   |
|   |  _|  | '_ ' _  || '_  || ||  _  || | | |/ _ |/ _ |    |  ,   ,  | / _' || '_  | / _' | / _' |/ _ || '__|  |
|   | |___ | | | | | || |_| || || |_| || |_| || __/| __/    | | | | | || (_| || | | || |_| || |_| || __/| |     |
|   |_____||_| |_| |_|| .___||_||___ /  .__, ||___||___|    |_| |_| |_| __,__||_| |_|  __,_|| __, ||___||_|     |
|                     |_|               |___/                                                |___/              |
|                                                                                                               |
|                                                                                                               |  
-----------------------------------------------------------------------------------------------------------------`;

console.log(generateASCIIBANNER());

//WHEN I start the application
//  THEN I am presented with the following options: view all departments, view all roles, view all employees, add a department, add a role, add an employee, and update an employee role
const mainMenu = () => {
  inquirer
    .prompt([
      {
        //license,
        type: "list",
        name: "action",
        message: "What would you like to do?",
        choices: [
          "view all departments",
          "view all roles",
          "view all employees",
          "add a department",
          "add a role",
          "add an employee",
          "update an employee role",
          "Update employee managers",
          "View employees by manager",
          "View employees by department",
          "Delete departments",
          "Delete roles",
          "Delete employees",
          "View the utilized budget of a department",
        ],
      },
    ])
    .then((answers) => {
      switch (answers.action) {
        case "view all departments":
          DisplayTabledResults(
            "SELECT department.id, department.name FROM department"
          );
          break;
        case "view all roles":
          DisplayTabledResults(
            "SELECT role.id, role.title, department.name AS department, role.salary FROM role JOIN department ON role.department_id = department.id"
          );
          break;
        case "view all employees":
          DisplayTabledResults(
            "SELECT E.id, E.first_name, E.last_name, role.title, department.name AS department, role.salary, CONCAT(M.first_name,' ',M.last_name) AS Manager  FROM employee E LEFT JOIN employee M ON M.id = E.manager_id JOIN role ON E.role_id = role.id LEFT JOIN department ON role.department_id = department.id"
          );
          break;
        case "add a department":
          addDepartment();
          break;
        case "add a role":
          addRole();
          break;
        case "add an employee":
          addEmployee();
          break;
        case "update an employee role":
          updateEmployeeRole();
          break;
        case "Update employee managers":
            updateEmployeeManager();
          break;
        case "View employees by manager":
            DisplayTabledResults(
                "SELECT E.id, E.first_name, E.last_name, role.title, department.name AS department, role.salary, CONCAT(M.first_name,' ',M.last_name) AS Manager  FROM employee E LEFT JOIN employee M ON M.id = E.manager_id JOIN role ON E.role_id = role.id LEFT JOIN department ON role.department_id = department.id"
              );
          break;
        case  "View employees by department":
            DisplayTabledResults(
                "SELECT E.id, E.first_name, E.last_name, role.title, department.name AS department, role.salary, CONCAT(M.first_name,' ',M.last_name) AS Manager  FROM employee E LEFT JOIN employee M ON M.id = E.manager_id JOIN role ON E.role_id = role.id LEFT JOIN department ON role.department_id = department.id"
              );
          break;
        case  "Delete departments":
            deleteDepartments();
            break;
        case  "Delete roles":
            deleteRoles();
            break;
        case  "Delete employees":
            deleteEmployee();
            break;
        case  "View the utilized budget of a department":
          break;
      }
    });
};

const DisplayTabledResults = (sql) => {
  db.query(sql, function (err, results) {
    console.log("");
    console.table(results);
  });
  mainMenu();
};

const addDepartment = () => {
  //WHEN I choose to add a department
  //  THEN I am prompted to enter the name of the department and that department is added to the database

  inquirer
    .prompt({
      type: "Input",
      name: "name",
      message: "New Department name?",
    })
    .then((answers) => {
      db.query(
        "INSERT INTO department (name) VALUES (?)",
        answers.name,
        function (err, results) {
          console.log(`Added ${answers.name} to the database`);
          mainMenu();
        }
      );
    });
};

const addRole = () => {
  let departments = [];
  db.query(
    "SELECT id as value, name FROM department",
    function (err, departments) {
      inquirer
        .prompt([
          {
            type: "Input",
            name: "title",
            message: "New role name?",
          },
          {
            type: "Input",
            name: "salary",
            message: "what is the salary?",
          },
          {
            type: "list",
            name: "department_id",
            message: "please select a department?",
            choices: departments,
          },
        ])
        .then((answers) => {
          db.query(
            "INSERT INTO role (title, salary, department_id) VALUES (?, ?, ?)",
            [answers.title, answers.salary, answers.department_id],
            function (err, results) {
              console.log(`Added ${answers.title} to the database`);
              mainMenu();
            }
          );
        });
    }
  );
};

const addEmployee = () => {
  roles = [];
  managers = [];

  db.query(
    "SELECT id AS value, title AS name FROM role",
    function (err, roles) {
      db.query(
        "SELECT id AS value, CONCAT(first_name,' ',last_name) AS name FROM employee",
        function (err, managers) {
          //managers.push(NULL);
          inquirer
            .prompt([
              {
                type: "Input",
                name: "first_name",
                message: "First Name?",
              },
              {
                type: "Input",
                name: "last_name",
                message: "Last Name?",
              },
              {
                type: "list",
                name: "role_id",
                message: "please select a role?",
                choices: roles,
              },
              {
                type: "list",
                name: "manager_id",
                message: "please select a manager?",
                choices: managers,
              },
            ])
            .then((answers) => {
              db.query(
                "INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)",
                [
                  answers.first_name,
                  answers.last_name,
                  answers.role_id,
                  answers.manager_id,
                ],
                function (err, results) {
                  console.log(
                    `Added ${answers.first_name} ${answers.last_name} to the database`
                  );
                  mainMenu();
                }
              );
            });
        }
      );
    }
  );
};

const updateEmployeeRole = () => {
  //WHEN I choose to update an employee role
  //  THEN I am prompted to select an employee to update and their new role and this information is updated in the database

  employees = [];
  db.query(
    "SELECT id AS value, title AS name FROM role",
    function (err, roles) {
      db.query(
        "SELECT id AS value, CONCAT(first_name,' ',last_name) AS name FROM employee",
        function (err, employees) {
          inquirer
            .prompt([
              {
                type: "list",
                name: "employee_id",
                message: "please select an employee?",
                choices: employees,
              },
              {
                type: "list",
                name: "role_id",
                message: "please select new role?",
                choices: roles,
              },
            ])
            .then((answers) => {
              db.query(
                "UPDATE employee SET role_id = ? WHERE id = ?",
                [answers.role_id, answers.employee_id],
                function (err, results) {
                  console.log(`updated the database`);
                  mainMenu();
                }
              );
            });
        }
      );
    }
  );
};

//Bonus
//  Update employee managers.
const updateEmployeeManager = () => {
  db.query(
    "SELECT id AS value, CONCAT(first_name,' ',last_name) AS name FROM employee",
    function (err, employees) {
      inquirer
        .prompt([
          {
            type: "list",
            name: "employee_id",
            message: "please select an employee?",
            choices: employees,
          },
          {
            type: "list",
            name: "manager_id",
            message: "please select new manager?",
            choices:  //TODO filter last answer from list.
          },
        ])
        .then((answers) => {
          db.query(
            "UPDATE employee SET manager_id = ? WHERE id = ?",
            [answers.manager_id, answers.employee_id],
            function (err, results) {
              console.log(`updated the database`);
              mainMenu();
            }
          );
        });
    }
  );
};

//  View employees by manager.
//  View employees by department.
//  Delete departments, roles, and employees.
const deleteDepartments = () => {
    db.query(
        "SELECT id AS value, name FROM department",
        function (err, departments) {
          inquirer
            .prompt([
              {
                type: "list",
                name: "department_id",
                message: "please select a department to delete.",
                choices: departments,
              },
              {
                type: "confirm",
                name: "confirm",
                message: `Are you sure?`,
              }
            ])
            .then((answers) => {
              if(answers.confirm)
                db.query(
                "DELETE * FROM department WHERE id = ?",
                [answers.department_id],
                function (err, results) {
                  console.log(`removed from the database`);
                  mainMenu();
                }
              );
            });
        }
      );
};

const deleteRoles = () => {
    db.query(
        "SELECT id AS value, title AS name FROM role",
        function (err, roles) {
          inquirer
            .prompt([
              {
                type: "list",
                name: "role_id",
                message: "please select a role to delete.",
                choices: roles,
              },
              {
                type: "confirm",
                name: "confirm",
                message: `Are you sure you want to delete ${answers.role_id}?`,
              }
            ])
            .then((answers) => {
              if(answers.confirm)
                db.query(
                "DELETE * FROM role WHERE id = ?",
                [answers.role_id],
                function (err, results) {
                  console.log(`removed from the database`);
                  mainMenu();
                }
              );
            });
        }
      );};

const deleteEmployee = () => {
    db.query(
        "SELECT id AS value, CONCAT(first_name,' ',last_name) AS name FROM role",
        function (err, employees) {
          inquirer
            .prompt([
              {
                type: "list",
                name: "_id",
                message: "please select a role to delete.",
                choices: employees,
              },
              {
                type: "confirm",
                name: "confirm",
                message: `Are you sure?`,
              }
            ])
            .then((answers) => {
              if(answers.confirm)
                db.query(
                "DELETE * FROM employee WHERE id = ?",
                [answers.employee_id],
                function (err, results) {
                  console.log(`removed from the database`);
                  mainMenu();
                }
              );
            });
        }
      );
    };


//  View the total utilized budget of a department—in other words, the combined salaries of all employees in that department.
const displayDepartmentBudget = () => {};

mainMenu();
