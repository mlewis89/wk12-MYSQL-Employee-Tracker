const inquirer = require('inquirer');
require('dotenv').config();
const mysql = require('mysql2');

// Connect to database
const db = mysql.createConnection({
    host: 'localhost',
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
},
    console.log(`Connected to the ${process.env.DB_NAME} database.`)
);

const generateASCIIBANNER = () =>
    `-----------------------------------------------------------------------------------------------
|   ________                          __                                                       |
|  |        \                        |  \                                                      |
|  | $$$$$$$$ ______ ____    ______  | $$  ______   __    __   ______    ______                |
|  | $$__    |      \    \  /      \ | $$ /      \ |  \  |  \ /      \  /      \               |
|  | $$  \   | $$$$$$\$$$$\|  $$$$$$\| $$|  $$$$$$\| $$  | $$|  $$$$$$\|  $$$$$$\              |
|  | $$$$$   | $$ | $$ | $$| $$  | $$| $$| $$  | $$| $$  | $$| $$    $$| $$    $$              |
|  | $$_____ | $$ | $$ | $$| $$__/ $$| $$| $$__/ $$| $$__/ $$| $$$$$$$$| $$$$$$$$              |
|  | $$     \| $$ | $$ | $$| $$    $$| $$ \$$    $$ \$$    $$ \$$     \ \$$     \              |
|   \$$$$$$$$ \$$  \$$  \$$| $$$$$$$  \$$  \$$$$$$  _\$$$$$$$  \$$$$$$$  \$$$$$$$              |
|                          | $$                    |  \__| $$                                  |
|                          | $$                     \$$    $$                                  |
|                           \$$                      \$$$$$$                                   |
|   __       __                                                                                |
|  |  \     /  \                                                                               |
|  | $$\   /  $$  ______   _______    ______    ______    ______    ______                     |
|  | $$$\ /  $$$ |      \ |       \  |      \  /      \  /      \  /      \                    |
|  | $$$$\  $$$$  \$$$$$$\| $$$$$$$\  \$$$$$$\|  $$$$$$\|  $$$$$$\|  $$$$$$\                   |
|  | $$\$$ $$ $$ /      $$| $$  | $$ /      $$| $$  | $$| $$    $$| $$   \$$                   |
|  | $$ \$$$| $$|  $$$$$$$| $$  | $$|  $$$$$$$| $$__| $$| $$$$$$$$| $$                         |
|  | $$  \$ | $$ \$$    $$| $$  | $$ \$$    $$ \$$    $$ \$$     \| $$                         |
|   \$$      \$$  \$$$$$$$ \$$   \$$  \$$$$$$$ _\$$$$$$$  \$$$$$$$ \$$                         |
|                                             |  \__| $$                                       |
|                                                                                              |
------------------------------------------------------------------------------------------------`;

const ASCIIBanner = generateASCIIBANNER();

console.log(ASCIIBanner);

//WHEN I start the application
//  THEN I am presented with the following options: view all departments, view all roles, view all employees, add a department, add a role, add an employee, and update an employee role
inquirer
    .prompt([{
        //license, 
        type: 'list',
        name: 'action',
        message: 'What would you like to do?',
        choices: ['view all departments', 'view all roles', 'view all employees', 'add a department', 'add a role', 'add an employee', 'update an employee role']
    }])
    .then((answers) => { 
        switch (answers.action) {
            case 'view all departments':
                viewAll_Departments();
                break;
            case 'view all roles':
                viewAll_Roles();
                break;
            case 'view all employees':
                viewAll_Employees();
                break;
            case 'add a department':
                add_Department()
                break;
            case 'add a role':
                add_Role();
                break;
            case 'add an employee':
                add_Employee();
                break;
            case 'update an employee role':
                update_Employee();
                break;
        }
    }
    );

//WHEN I choose to view all departments
//  THEN I am presented with a formatted table showing department names and department ids
const viewAll_Departments = ()=>{

};


//WHEN I choose to view all roles
//  THEN I am presented with the job title, role id, the department that role belongs to, and the salary for that role
const viewAll_Roles = ()=>{
    
};

//WHEN I choose to view all employees
//  THEN I am presented with a formatted table showing employee data, including employee ids, first names, last names, job titles, departments, salaries, and managers that the employees report to
const viewAll_Employees = ()=>{
    
};

//WHEN I choose to add a department
//  THEN I am prompted to enter the name of the department and that department is added to the database
const add_Department = ()=>{
    inquirer
    .prompt([{
        //license, 
        type: 'Input',
        name: 'name',
        message: 'New Department name?'
    }])
    .then((answers) => { 
        //**todo** add new deparment to database
        }
    );
    
};

//WHEN I choose to add a role
//  THEN I am prompted to enter the name, salary, and department for the role and that role is added to the database
const add_Role = ()=>{
    //TODO - popuplate from database;
    departments = [];

    inquirer
    .prompt([{
        type: 'Input',
        name: 'name',
        message: 'New role name?'
    },
    {
        type: 'Input',
        name: 'salary',
        message: 'what is the salary?'
    },
    {
        //license, 
        type: 'list',
        name: 'department',
        message: 'please select a department?',
        choices: departments 
    }])
    .then((answers) => { 
        //**todo** add new role to database
        }
    );
    
};

//WHEN I choose to add an employee
//  THEN I am prompted to enter the employee’s first name, last name, role, and manager, and that employee is added to the database
const add_Employee = ()=>{
    //TODO - popuplate from database;
    roles = [];
    managers = [];

    inquirer
    .prompt([{
        type: 'Input',
        name: 'firstName',
        message: 'First Name?'
    },
    {
        type: 'Input',
        name: 'lastName',
        message: 'Last Name?'
    },
    {
        //license, 
        type: 'list',
        name: 'role',
        message: 'please select a role?',
        choices: roles 
    }
    {
        //license, 
        type: 'list',
        name: 'manager',
        message: 'please select a manager?',
        choices: managers
    }])
    .then((answers) => { 
        //**todo** add new role to database
        }
    );
    
};


//WHEN I choose to update an employee role
//  THEN I am prompted to select an employee to update and their new role and this information is updated in the database
const update_Employee = ()=>{
    
};

//Bonus
//  Update employee managers.
//  View employees by manager.
//  View employees by department.
//  Delete departments, roles, and employees.
//  View the total utilized budget of a department—in other words, the combined salaries of all employees in that department.


