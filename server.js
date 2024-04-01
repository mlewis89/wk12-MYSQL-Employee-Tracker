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
          viewAll('department');
          break;
        case "view all roles":
            viewAll('role') ; 
          break;
        case "view all employees":
            viewAll('employee');
          break;
        case "add a department":
          add_Department();
          break;
        case "add a role":
          add_Role();
          break;
        case "add an employee":
          add_Employee();
          break;
        case "update an employee role":
          update_Employee();
          break;
      }
    })
};

const viewAll = (table) => {
    db.query(`SELECT * FROM ${table}`,(err, results) => {
      console.table(results);
    });
    mainMenu();
  };

//WHEN I choose to view all departments
//  THEN I am presented with a formatted table showing department names and department ids
const viewAll_Departments = () => {
  db.query("SELECT * FROM department", function (err, results) {
    console.table(results);
  });
};

//WHEN I choose to view all roles
//  THEN I am presented with the job title, role id, the department that role belongs to, and the salary for that role
const viewAll_Roles = () => {
  db.query("SELECT * FROM role", function (err, results) {
    console.table(results);
  });
};

//WHEN I choose to view all employees
//  THEN I am presented with a formatted table showing employee data, including employee ids, first names, last names, job titles, departments, salaries, and managers that the employees report to
const viewAll_Employees = () => {
  db.query("SELECT * FROM employee", function (err, results) {
    console.table(results);
  });
};

//WHEN I choose to add a department
//  THEN I am prompted to enter the name of the department and that department is added to the database
const add_Department = () => {
  inquirer
    .prompt([
      {
        //license,
        type: "Input",
        name: "name",
        message: "New Department name?",
      },
    ])
    .then((answers) => {
      //**todo** add new deparment to database
    });
};

//WHEN I choose to add a role
//  THEN I am prompted to enter the name, salary, and department for the role and that role is added to the database
const add_Role = () => {
  //TODO - popuplate from database;
  let departments = [];
  db.query("SELECT * FROM department", function (err, results) {
    results.forEach((res) => departments.push(res.name));
  });

  inquirer
    .prompt([
      {
        type: "Input",
        name: "name",
        message: "New role name?",
      },
      {
        type: "Input",
        name: "salary",
        message: "what is the salary?",
      },
      {
        //license,
        type: "list",
        name: "department",
        message: "please select a department?",
        choices: departments,
      },
    ])
    .then((answers) => {
      //**todo** add new role to database
    });
};

//WHEN I choose to add an employee
//  THEN I am prompted to enter the employee’s first name, last name, role, and manager, and that employee is added to the database
const add_Employee = () => {
  //TODO - popuplate from database;
  roles = [];
  managers = [];

  db.query("SELECT * FROM role", function (err, results) {
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
};

//WHEN I choose to update an employee role
//  THEN I am prompted to select an employee to update and their new role and this information is updated in the database
const update_Employee = () => {
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
};

//Bonus
//  Update employee managers.
//  View employees by manager.
//  View employees by department.
//  Delete departments, roles, and employees.
//  View the total utilized budget of a department—in other words, the combined salaries of all employees in that department.

mainMenu();
