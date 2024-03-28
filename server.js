const inquirer = require('inquirer');
require('dotenv').config();
const mysql =  require('mysql2');

// Connect to database
const db = mysql.createConnection({
        host: 'localhost',
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME
    },
    console.log(`Connected to the ${process.env.DB_NAME} database.`)
);

/*const ASCIIBanner = "-----------------------------------------------------------------------------------------------\r\n
|   ________                          __                                                       |\r\n
|  |        \                        |  \                                                      | \r\n
|  | $$$$$$$$ ______ ____    ______  | $$  ______   __    __   ______    ______                |\r\n
|  | $$__    |      \    \  /      \ | $$ /      \ |  \  |  \ /      \  /      \               | \r\n
|  | $$  \   | $$$$$$\$$$$\|  $$$$$$\| $$|  $$$$$$\| $$  | $$|  $$$$$$\|  $$$$$$\              | \r\n
|  | $$$$$   | $$ | $$ | $$| $$  | $$| $$| $$  | $$| $$  | $$| $$    $$| $$    $$              | \r\n
|  | $$_____ | $$ | $$ | $$| $$__/ $$| $$| $$__/ $$| $$__/ $$| $$$$$$$$| $$$$$$$$              | \r\n
|  | $$     \| $$ | $$ | $$| $$    $$| $$ \$$    $$ \$$    $$ \$$     \ \$$     \              | \r\n
|   \$$$$$$$$ \$$  \$$  \$$| $$$$$$$  \$$  \$$$$$$  _\$$$$$$$  \$$$$$$$  \$$$$$$$              | \r\n
|                          | $$                    |  \__| $$                                  | \r\n
|                          | $$                     \$$    $$                                  | \r\n
|                           \$$                      \$$$$$$                                   | \r\n
|   __       __                                                                                | \r\n
|  |  \     /  \                                                                               | \r\n
|  | $$\   /  $$  ______   _______    ______    ______    ______    ______                     | \r\n
|  | $$$\ /  $$$ |      \ |       \  |      \  /      \  /      \  /      \                    | \r\n
|  | $$$$\  $$$$  \$$$$$$\| $$$$$$$\  \$$$$$$\|  $$$$$$\|  $$$$$$\|  $$$$$$\                   | \r\n
|  | $$\$$ $$ $$ /      $$| $$  | $$ /      $$| $$  | $$| $$    $$| $$   \$$                   | \r\n
|  | $$ \$$$| $$|  $$$$$$$| $$  | $$|  $$$$$$$| $$__| $$| $$$$$$$$| $$                         | \r\n
|  | $$  \$ | $$ \$$    $$| $$  | $$ \$$    $$ \$$    $$ \$$     \| $$                         | \r\n
|   \$$      \$$  \$$$$$$$ \$$   \$$  \$$$$$$$ _\$$$$$$$  \$$$$$$$ \$$                         | \r\n
|                                             |  \__| $$                                       | \r\n
|                                                                                              | \r\n
------------------------------------------------------------------------------------------------"*/

const ASCIIBanner = "------------------Employee Mananger--------"

console.log(ASCIIBanner);

//WHEN I start the application
//  THEN I am presented with the following options: view all departments, view all roles, view all employees, add a department, add a role, add an employee, and update an employee role



//WHEN I choose to view all departments
//  THEN I am presented with a formatted table showing department names and department ids
//WHEN I choose to view all roles
//  THEN I am presented with the job title, role id, the department that role belongs to, and the salary for that role
//WHEN I choose to view all employees
//  THEN I am presented with a formatted table showing employee data, including employee ids, first names, last names, job titles, departments, salaries, and managers that the employees report to
//WHEN I choose to add a department
//  THEN I am prompted to enter the name of the department and that department is added to the database
//WHEN I choose to add a role
//  THEN I am prompted to enter the name, salary, and department for the role and that role is added to the database
//WHEN I choose to add an employee
//  THEN I am prompted to enter the employee’s first name, last name, role, and manager, and that employee is added to the database
//WHEN I choose to update an employee role
//  THEN I am prompted to select an employee to update and their new role and this information is updated in the database
//Bonus
//  Update employee managers.
//  View employees by manager.
//  View employees by department.
//  Delete departments, roles, and employees.
//  View the total utilized budget of a department—in other words, the combined salaries of all employees in that department.