const inquirer = require("inquirer");
require("dotenv").config();
const mysql = require("mysql2");
asTable = require("as-table").configure({ delimiter: " | " });

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

//print Banner to console
console.log(generateASCIIBANNER());

//Define main menu prompt
const mainMenu = () => {
  console.log(); //ensure the promt is starting on a new line
  inquirer
    .prompt([
      {
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
          "Update employee manager",
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
        //switch statement based on choses action
      switch (answers.action) {
        case "view all departments": //formatted table showing department names and department ids
          DisplayTabledResults(
            "SELECT department.id, department.name FROM department"
          );
          break;
        case "view all roles": //presented with the job title, role id, the department that role belongs to, and the salary for that role
          DisplayTabledResults(
            "SELECT role.id, role.title, department.name AS department, role.salary FROM role JOIN department ON role.department_id = department.id"
          );
          break;
        case "view all employees": //presented with a formatted table showing employee data, including employee ids, first names, last names, job titles, departments, salaries, and managers that the employees report to
          DisplayTabledResults(
            "SELECT E.id, E.first_name, E.last_name, role.title, department.name AS department, role.salary, CONCAT(M.first_name,' ',M.last_name) AS Manager  FROM employee E LEFT JOIN employee M ON M.id = E.manager_id JOIN role ON E.role_id = role.id LEFT JOIN department ON role.department_id = department.id"
          );
          break;
        case "add a department": //prompted to enter the name of the department and that department is added to the database
          addDepartment();
          break;
        case "add a role": //prompted to enter the name, salary, and department for the role and that role is added to the database
          addRole();
          break;
        case "add an employee": //prompted to enter the employee’s first name, last name, role, and manager, and that employee is added to the database
          addEmployee();
          break;
        case "update an employee role": //prompted to select an employee to update and their new role and this information is updated in the database
          updateEmployeeRole();
          break;
        case "Update employee manager"://prompted to select an employee to update and their new manager and this information is updated in the database
          updateEmployeeManager();
          break;
        case "View employees by manager": //presented with a formatted table showing employee data - Sorted by Manager
          DisplayTabledResults(
            "SELECT E.id, E.first_name, E.last_name, role.title, department.name AS department, role.salary, CONCAT(M.first_name,' ',M.last_name) AS Manager  FROM employee E LEFT JOIN employee M ON M.id = E.manager_id JOIN role ON E.role_id = role.id LEFT JOIN department ON role.department_id = department.id ORDER BY Manager"
          );
          break;
        case "View employees by department": //presented with a formatted table showing employee data - Sorted by Department
          DisplayTabledResults(
            "SELECT E.id, E.first_name, E.last_name, role.title, department.name AS department, role.salary, CONCAT(M.first_name,' ',M.last_name) AS Manager  FROM employee E LEFT JOIN employee M ON M.id = E.manager_id JOIN role ON E.role_id = role.id LEFT JOIN department ON role.department_id = department.id ORDER BY role.department_id"
          );
          break;
        case "Delete departments": //prompted to select a department to delete, prompted to confirm then delete made to database
          deleteDepartments();
          break;
        case "Delete roles": //prompted to select a role to delete, prompted to confirm then delete made to database
          deleteRoles();
          break;
        case "Delete employees": //prompted to select an employee to delete, prompted to confirm then delete made to database
          deleteEmployee();
          break;
        case "View the utilized budget of a department": //View the total utilized budget of a department—in other words, the combined salaries of all employees in that department.
          displayDepartmentBudget();
          break;
      }
    });
};

const DisplayTabledResults = (sql) => {
  //run sql query on database
    db.query(sql, function (err, results) {
    if (err) { //if error log and exit
      console.log(err);
      return -1;
    }
    //add space in log
    console.log();
    console.log();
    //generate and log table
    console.log(asTable(results));
  });
  //restart inquirer prompt
  mainMenu();
};

const addDepartment = () => {
  //prompt user for department name
    inquirer
    .prompt({
      type: "Input",
      name: "name",
      message: "Enter new Department name?",
    })
    .then((answers) => {
        //insert new department into database
      db.query(
        "INSERT INTO department (name) VALUES (?)",
        answers.name,
        function (err, results) {
          if (err) {//if error log and exit
            console.log(err);
            return -1;
          }
          //confirm success
          console.log(`Added ${answers.name} to the database`);
          //return to main menu
          mainMenu();
        }
      );
    });
};

const addRole = () => {
  // get list of deparetment from database
  db.query(
    "SELECT id as value, name FROM department",
    function (err, departments) {
      if (err) { //if error log and exit
        console.log(err);
        return -1;
      }
      //prompt user for role name, salary and department
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
            //insert new role into database
          db.query(
            "INSERT INTO role (title, salary, department_id) VALUES (?, ?, ?)",
            [answers.title, answers.salary, answers.department_id],
            function (err, results) {
                if (err) { //if error log and exit
                    console.log(err);
                    return -1;
                  }
                  //confirm success
                  console.log(`Added ${answers.title} to the database`);
                  //return to main menu
              mainMenu();
            }
          );
        });
    }
  );
};

const addEmployee = () => {
  //get list of roles from database
    db.query(
    "SELECT id AS value, title AS name FROM role",
    function (err, roles) {
        if (err) {//if error log and exit
            console.log(err);
            return -1;
          }
      //get list of employees to select as manager
        db.query(
        "SELECT id AS value, CONCAT(first_name,' ',last_name) AS name FROM employee",
        function (err, managers) {
          if (err) {//if error log and exit
            console.log(err);
            return -1;
          }
          //prompt user for employee information
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
                //insert new empolyee data into database 
              db.query(
                "INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)",
                [
                  answers.first_name,
                  answers.last_name,
                  answers.role_id,
                  answers.manager_id,
                ],
                function (err, results) {
                    if (err) {//if error log and exit
                        console.log(err);
                        return -1;
                      }
                      //confirm success
                      console.log(`Added ${answers.first_name} ${answers.last_name} to the database`);
                  //return to main menu
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
  //get list of roles from database
  db.query(
    "SELECT id AS value, title AS name FROM role",
    function (err, roles) {
        if (err) {//if error log and exit
            console.log(err);
            return -1;
          }
    //get list of employees
      db.query(
        "SELECT id AS value, CONCAT(first_name,' ',last_name) AS name FROM employee",
        function (err, employees) {
          if (err) {//if error log and exit
            console.log(err);
            return -1;
          }
          //prompt user for new employee role
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
                //update employee record in database
              db.query(
                "UPDATE employee SET role_id = ? WHERE id = ?",
                [answers.role_id, answers.employee_id],
                function (err, results) {
                  if (err) {
                    console.log(err);
                    return -1;
                  }
                  //confirm success
                  console.log(`updated the database`);
                  //return to main menu
                  mainMenu();
                }
              );
            });
        }
      );
    }
  );
};

//Bonus functionality
//  Update employee managers.
const updateEmployeeManager = () => {
    //get list of employees
  db.query(
    "SELECT id AS value, CONCAT(first_name,' ',last_name) AS name FROM employee",
    function (err, employees) {
      if (err) {//if error log and exit
        console.log(err);
        return -1;
      }
      //prompt user to select user to update
      inquirer
        .prompt([
          {
            type: "list",
            name: "employee_id",
            message: "please select an employee?",
            choices: employees,
          },
        ])
        .then((answers1) => {
          //prompt user to select new manager
          inquirer
            .prompt([
              {
                type: "list",
                name: "manager_id",
                message: "please select new manager?",
                choices: employees.filter(
                  (employee) => employee.value != answers1.employee_id /*remove previously selected employee from manager list*/
                ),
              },
            ])
            .then((answers2) => {
                //update new manager id to selected employee in ndatabase
              db.query(
                "UPDATE employee SET manager_id = ? WHERE id = ?",
                [answers2.manager_id, answers1.employee_id],
                function (err, results) {
                  if (err) {
                    console.log(err);
                    return -1;
                  }
                  //confirm success
                  console.log(`updated the database`);
                  //return to menu
                  mainMenu();
                }
              );
            });
        });
    }
  );
};

//  Delete departments, roles, and employees.
const deleteDepartments = () => {
  deleteItem("department", "id", "name");
};

const deleteRoles = () => {
  deleteItem("role", "id", "title");
};

const deleteEmployee = () => {
  deleteItem("employee", "id", "CONCAT(first_name,' ',last_name)");
};

//take tablename, id, and text values as SQL strings
const deleteItem = (tableName, id_ColName, text_ColName) => {
  //get list from table
    db.query(
    `SELECT ${id_ColName} AS value, ${text_ColName} AS name FROM ${tableName}`,
    function (err, currentItems) {
      if (err) {
        console.log(err);
        return -1;
      }
      //prompt to select an item to delete
      inquirer
        .prompt([
          {
            type: "list",
            name: "id",
            message: `please select a ${tableName} to delete.`,
            choices: currentItems,
          },
          {
            type: "confirm",
            name: "confirm",
            message: `Are you sure?`,
          },
        ])
        .then((answers) => {
          if (answers.confirm) //test if user really wants to delete the item
          {
            //action delete to database
            db.query(
              `DELETE FROM ${tableName} WHERE ${id_ColName} = ?`,
              [answers.id],
              function (err, results) {
                if (err) {
                  console.log(err);
                  return -1;
                }
                //confirm success
                console.log(`removed from the database`);
                //return to main menu
                mainMenu();
              }
            );
          }
        });
    }
  );
};

//  View the total utilized budget of a department—in other words, the combined salaries of all employees in that department.
const displayDepartmentBudget = () => {
  //get list of departments
    db.query(
    `SELECT id AS value, name FROM department`,
    function (err, departments) {
      if (err) {//if error log and exit
        console.log(err);
        return -1;
      }
      //prompt user to choose a department
      inquirer
        .prompt([
          {
            type: "list",
            name: "department_id",
            message: `please select a department.`,
            choices: departments,
          },
        ])
        .then((answers) => {
            //run query to determine deparment budget
          db.query(
            "SELECT SUM(role.salary) AS budget FROM employee E JOIN role ON E.role_id = role.id LEFT JOIN department ON role.department_id = department.id WHERE department.id = ?",
            [answers.department_id],
            function (err, results) {
              if (err) {
                console.log(err);
                return -1;
              }
              //display result
              console.log();
              console.log();
              console.log(asTable(results));
              //return to main menu
              mainMenu();
            }
          );
        });
    }
  );
};

//run inital prompt
mainMenu();
