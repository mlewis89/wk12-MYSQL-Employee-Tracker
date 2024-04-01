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
        ],
      },
    ])
    .then((answers) => {
      switch (answers.action) {
        case "view all departments":
          DisplayResults(
            "SELECT department.id, department.name FROM department"
          );
          break;
        case "view all roles":
          DisplayResults(
            "SELECT role.id, role.title, department.name AS department, role.salary FROM role JOIN department ON role.department_id = department.id"
          );
          break;
        case "view all employees":
          DisplayResults(
            "SELECT E.id, E.first_name, E.last_name, role.title, department.name AS department, role.salary, CONCAT(M.first_name,' ',M.last_name) AS Manager  FROM employee E INNER JOIN employee M ON M.id = E.manager_id JOIN role ON E.role_id = role.id JOIN department ON role.department_id = department.id"
          );
          break;
        case "add a department":
          addDepartment();
          break;
        case "add a role":
          addRole();
          break;
        case "add an employee":
          roles = [];
          managers = [];

          db.query("SELECT role.name FROM role", function (err, results) {
            console.log(results);
            results.forEach((res) => roles.push(res.name));
          });

          db.query("SELECT * FROM employee", function (err, results) {
            results.forEach((res) => managers.push(res.name));
          });

          console.log(roles);
          console.log(managers);

          inquirer
            .prompt([
              {
                type: "Input",
                name: "firstName",
                message: "First Name?",
              },
              {
                type: "Input",
                name: "lastName",
                message: "Last Name?",
              },
              {
                type: "list",
                name: "role",
                message: "please select a role?",
                choices: roles,
              },
              {
                type: "list",
                name: "manager",
                message: "please select a manager?",
                choices: managers,
              },
            ])
            .then((answers) => {
              //**todo** add new role to database
            });
          break;
        case "update an employee role":
          //WHEN I choose to update an employee role
          //  THEN I am prompted to select an employee to update and their new role and this information is updated in the database

          employees = [];
          db.query("SELECT * FROM employee", function (err, results) {
            results.forEach((res) => employees.push(res.name));
          });

          inquirer
            .prompt([
              {
                type: "list",
                name: "employee",
                message: "please select an employee?",
                choices: employees,
              },
            ])
            .then((answers) => {
              //**todo** add new role to database
            });
          break;
      }
    });
};

const DisplayResults = (sql) => {
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
          console.log(answers);
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

//Bonus
//  Update employee managers.
//  View employees by manager.
//  View employees by department.
//  Delete departments, roles, and employees.
//  View the total utilized budget of a department—in other words, the combined salaries of all employees in that department.

mainMenu();
