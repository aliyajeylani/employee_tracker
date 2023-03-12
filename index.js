const { response } = require("express");
const inquirer = require("inquirer");
const mysql = require('mysql2');
// const CTable = require("console.table");



// connect to database
const db = mysql.createConnection(
    {
        host: 'localhost',
        // MySQL username,
        user: 'root',
        // MySQL password
        password: 'codingbootcamp',
        database: 'company_db'
    },
    console.log(`Connected to the company_db database.`)
);



const initialQuestion = [
    {
        type: 'list',
        message: "What would you like to do?",
        choices: ["Add Employee", "Update Employee Role", "View All Roles", "Add Role", "View All Departments", "Add Department", "Quit", "View All Employees"],
        name: 'initial_question',

    }
]



const addDepartmentQuestion = [

    {
        type: 'input',
        message: "What is the name of the department?",
        name: 'department_name',

    }

]

// const addRoleQuestion = [

//     {
//         type: 'input',
//         message: "What is the name of the role?",
//         name: 'role_name',

//     },

//     {
//         type: 'input',
//         message: "What is the salary of the role?",
//         name: 'role_salary',

//     },

//     {
//         type: 'list',
//         message: "Which department does the role belong to?",
//         choices: departments,
//         name: 'role_department',

//     }



// ]

const addEmployeeQuestion = [

    {
        type: 'input',
        message: "What is the employee's first name?",
        name: 'employee_first_name',

    },


    {
        type: 'input',
        message: "What is the employee's last name?",
        name: 'employee_last_name',

    },

    {
        type: 'list',
        message: "What is the employee's role?",
        choices: ["Salesperson", "Lead Engineer", "Software Engineer", "Account Manager", "Accountant", "Legal Team Lead", "Lawyer", "Sales Lead"],
        name: 'employee_role',

    },

    {
        type: 'list',
        message: "Who is the employee's manager?",
        choices: ["John Doe", "Mike Chan", "Ashley Rodriguez", "Kevin Tupik", "Accountant", "Kunal Singh", "Malia Brown"],
        name: 'employee_manager',

    }

]

const updateEmployeeRole = [

    {
        type: 'list',
        message: "Which employee's role do you want to update?",
        choices: ["John Doe", "Mike Chan", "Ashley Rodriguez", "Kevin Tupik", "Accountant", "Kunal Singh", "Malia Brown"],
        name: 'update_employee',
    },

    {
        type: 'list',
        message: "Which role do you want to assign the selected employee?",
        choices: ["Salesperson", "Lead Engineer", "Software Engineer", "Account Manager", "Accountant", "Legal Team Lead", "Lawyer", "Sales Lead"],
        name: 'update_employee_role',
    },

]





function init() {

    repeatedQuestion();

};

function repeatedQuestion() {

    inquirer.prompt(initialQuestion).then(response => {

        const questionSelected = response.initial_question;
        switch (questionSelected) {

            case 'Add Department':
                addDepartment();
                break;
            case 'Add Role':
                addRole();
                break;
            case 'Add Employee':
                addEmployee();
                break;
            case 'View Departments':
                viewDepartments();
                break;
            case 'View Roles':
                viewRoles();
                break;
            case 'View Employees':
                viewEmployees();
                break;
            case 'Update Role':
                updatRole();
                break;
            default:
                console.log(`Sorry, we are out of`);
        }

    });




}







function addDepartment() {

    inquirer.prompt(addDepartmentQuestion)
        .then(response => {

            // console.log(response.department_name);

            //Query database
            db.query(`INSERT INTO departments (name) VALUES (?)`, response.department_name, function (err, results) {
                if (err) {
                    console.log(err);
                }
                console.log(results);
            });


        });

};

var departments = [];

function addRole() {



    db.query(`SELECT id, name AS title FROM departments`, function (err, results) {
        if (err) {
            console.log(err);
        }

        departments.push(results);
        console.log(departments);

        var finalDepartment = [];

        for (let i = 0; i < departments.length; i++) {

            finalDepartment += departments[i].toString();

            console.log(finalDepartment);
        }


    });


};



const addRoleQuestion = [


    {
        type: 'input',
        message: "What is the name of the role?",
        name: 'role_name',

    },

    {
        type: 'input',
        message: "What is the salary of the role?",
        name: 'role_salary',

    },

    {
        type: 'list',
        message: "Which department does the role belong to?",
        choices: departments,
        name: 'role_department',

    }



]



inquirer.prompt(addRoleQuestion)
    .then(response => {


        console.log(response.role_name, response.role_salary, response.role_department);

        //Query database
        db.query('INSERT INTO roles (title,salary) VALUES (?)', response.role_name, response.role_salary, response.role_department, function (err, results) {
            if (err) {
                console.log(err);
            }
            console.log(results);
        });

    });





function addEmployee() {

    inquirer.prompt(addEmployeeQuestion)
        .then(response => {


            console.log(response.employee_first_name, response.employee_last_name, response.employee_last_name, response.employee_role, response.employee_manager);


            //Query database
            db.query('INSERT INTO roles(first_name,last_name ) VALUES (?)', response.employee_first_name, response.employee_last_name, response.employee_last_name, response.employee_role, response.employee_manager, function (err, results) {
                if (err) {
                    console.log(err);
                }
                console.log(results);
            });



            repeatedQuestion();
        });


}


function updatRole() {




}



function viewDepartments() {

    //Query database
    db.query('SELECT * FROM departments', function (err, results) {
        if (err) {
            console.log(err);
        }
        console.log(results);
    });


}


function viewRoles() {


    //Query database
    db.query(`SELECT * FROM roles) `, function (err, results) {
        if (err) {
            console.log(err);
        }
        console.log(results);
    });


}



function viewEmployees() {

    //Query database
    db.query(`SELECT * FROM employees) `, function (err, results) {

        if (err) {
            console.log(err);
        }
        console.log(results);
    });



}



function quit() {

    return;


}




init();


