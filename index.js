const { response } = require("express");
const inquirer = require("inquirer");
const mysql = require('mysql2');
require("console.table");



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
            case 'View All Departments':
                viewDepartments();
                break;
            case 'View All Roles':
                viewRoles();
                break;
            case 'View All Employees':
                viewEmployees();
                break;
            case 'Update Employee Role':
                updatRole();
                break;
            case 'Quit':
                quit();
                break;
            default:
                console.log(`Sorry, something went wrong! Please try again!`);
        }

    });


}



function addDepartment() {

    inquirer.prompt(addDepartmentQuestion)
        .then(response => {


            //Query database
            db.query(`INSERT INTO departments (name) VALUES (?)`, response.department_name, function (err, results) {
                if (err) {
                    console.log(err);
                }
                console.table(results);
                repeatedQuestion();
            });


        });

};




function addRole() {



    db.promise().query(`SELECT id, name AS title FROM departments`).then(([data]) => {

        var finalDepartment = data.map(({ id, title }) => ({

            name: title,
            value: id

        }));


        inquirer.prompt([


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
                choices: finalDepartment,
                name: 'role_department',

            }



        ])
            .then(response => {


                console.log(response);

                //Query database
                db.query('INSERT INTO roles (title, department_id, salary) VALUES (?, ?, ?)', [response.role_name, response.role_department, response.role_salary], function (err, results) {
                    if (err) {
                        console.log(err);
                    }
                    console.table(results);
                    repeatedQuestion();
                })


            })



    });



};




function addEmployee() {

    db.promise().query(`SELECT * FROM roles`).then(([data]) => {

        console.table(data);

        var finalRole = data.map(({ id, title }) => ({

            name: title,
            value: id

        }));

        db.promise().query(`SELECT * FROM employees`).then(([data]) => {

            console.table(data);

            var finalEmployee = data.map(({ id, employee_first_name }) => ({

                name: employee_first_name,
                value: id

            }));


            inquirer.prompt([
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
                    choices: finalRole,
                    name: 'employee_role',

                },

                {
                    type: 'list',
                    message: "Who is the employee's manager?",
                    choices: finalEmployee,
                    name: 'employee_manager',

                }
            ])
                .then(response => {

                    //Query database
                    db.query('INSERT INTO employees (first_name, last_name, role_id, manager_id ) VALUES (?, ?, ?, ?)', [response.employee_first_name, response.employee_last_name, response.employee_role, response.employee_manager], function (err, results) {
                        if (err) {
                            console.log(err);
                        }
                        console.table(results);
                        repeatedQuestion();
                    });

                })
        })

    })

}

function updatRole() {

    db.promise().query(`SELECT ID, first_name, last_name FROM employees`).then(([data]) => {

        console.table(data);

        var employeeChoices = data.map(({ ID, first_name }) => ({

            name: first_name,
            value: ID

        }));


        db.promise().query(`SELECT ID, title FROM roles`).then(([data]) => {

            console.table(data);

            var roleChoices = data.map(({ ID, title }) => ({

                name: title,
                value: ID

            }));

            inquirer.prompt([

                {
                    type: 'list',
                    message: "Which employee's role do you want to update?",
                    choices: employeeChoices,
                    name: 'update_employee',
                },

                {
                    type: 'list',
                    message: "Which role do you want to assign the selected employee?",
                    choices: roleChoices,
                    name: 'update_employee_role',
                },

            ])

                .then(response => {

                    console.log(response);

                    //Query database
                    db.query(`UPDATE employees SET role_id = ${response.update_employee_role} WHERE id= ${response.update_employee}`, function (err, results) {
                        if (err) {
                            console.log(err);
                        }
                        console.table(results);
                        repeatedQuestion();
                    });

                })


        })
    })

}



function viewDepartments() {

    //Query database
    db.promise().query(`SELECT * FROM departments`).then(([data]) => {

        console.table(data);
        repeatedQuestion();

    })


}


function viewRoles() {


    //Query database
    db.promise().query(`SELECT * FROM roles`).then(([data]) => {

        console.table(data);
        repeatedQuestion();

    })
}



function viewEmployees() {

    //Query database
    db.promise().query(`SELECT * FROM employees`).then(([data]) => {

        console.table(data);
        repeatedQuestion();

    })



}



function quit() {

    return;


}




init();


