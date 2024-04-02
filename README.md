

# Bootcamp Challenge Week Twelve - MYSQL: Employee Tracker
[![License](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)


## Description

The purpose of this application is to test my knowledge of MYSQL and Node-j, by producing a simple command line application to as a basic employeer tracker.

This application makes it easy for the user to add, veiw and delete employees, roles and departments withing their company.

During this project I learnt how to make SQL queiries to a MYSYL database. and some more advanced functions within the inquirer package.

## Table of Contents
    
- [User Story](#user-story)
- [Acceptance Criteria](#acceptance-criteria)
- [Installation](#installation)
- [Testing](#testing)
- [Usage](#usage)
- [Screenshots/Video](<#screenshots--video-of-completed-challenge>)
- [License](#license)
- [Credits](#credits)
- [Questions / How to Contribute](#questions--how-to-contribute)

## User Story

```
AS A business owner
I WANT to be able to view and manage the departments, roles, and employees in my company
SO THAT I can organize and plan my business
```

## Acceptance Criteria

```
GIVEN a command-line application that accepts user input
WHEN I start the application
THEN I am presented with the following options: view all departments, view all roles, view all employees, add a department, add a role, add an employee, and update an employee role
WHEN I choose to view all departments
THEN I am presented with a formatted table showing department names and department ids
WHEN I choose to view all roles
THEN I am presented with the job title, role id, the department that role belongs to, and the salary for that role
WHEN I choose to view all employees
THEN I am presented with a formatted table showing employee data, including employee ids, first names, last names, job titles, departments, salaries, and managers that the employees report to
WHEN I choose to add a department
THEN I am prompted to enter the name of the department and that department is added to the database
WHEN I choose to add a role
THEN I am prompted to enter the name, salary, and department for the role and that role is added to the database
WHEN I choose to add an employee
THEN I am prompted to enter the employee’s first name, last name, role, and manager, and that employee is added to the database
WHEN I choose to update an employee role
THEN I am prompted to select an employee to update and their new role and this information is updated in the database
```
## Bonus
add some additional functionality to your application, such as the ability to do the following:

```
Update employee managers.
View employees by manager.
View employees by department.
Delete departments, roles, and employees.
View the total utilized budget of a department—in other words, the combined salaries of all employees in that department.
```

## Installation

Clone the repo to a local folder and then from the terminal inside the main directory, run the following command to install the necessary dependancies.
       
    npm install -y

## Testing

No self tests exist for this application

## Usage
    
Open the terminal in the Root Folder and enter the following command.

    npm run start

Then navigate to the link provided in the command line. 


## GitHub repository
https://github.com/mlewis89/wk12_MYSQL_Employee-Tracker


## Screenshots / Video of Completed Challenge

![completed application](/assets/Capture1.PNG)
![completed application](/assets/Capture2.PNG)
![completed application](/assets/Capture3.PNG)

[Click here to view a video of the application in use](./assets/completedApplication_video.webm)
[google drive link to video](https://drive.google.com/file/d/1eLzEZ9BzxVV-tYIPCIqyJLsWLOhuGEE3/view)

## License
This project is licensed under the MIT.
    
## Questions / How to Contribute
    
If you have any questions about the repo, open an issue. You can veiw my other work on git hub [mlewis89](https://github.com/mlewis89/)

## Credits

Monash University Full Stack Coding bootcamp


---
