const inquirer = require("inquirer");
const mysql = require('mysql2');
const CTable = require("console.table");



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



const newDepartmentList = [];
const newRoleList = [];
const newEmployeeList = [];

const initialQuestion = [
    {
        type: 'list',
        message: "What would you like to do?",
        choices: ["Add Employee", "Update Employee Role", "View All Roles", "Add Roles", "View All Departments", "Add Department", "Quit", "View All Employees"],
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
        choices: db.query["Engineering", "Finances", "Legal", "Sales", newDepartmentList],
        name: 'role_department',

    }



]

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
        choices: ["Salesperson", "Lead Engineer", "Software Engineer", "Account Manager", "Accountant", "Legal Team Lead", "Lawyer", "Sales Lead", newRoleList],
        name: 'employee_role',

    },

    {
        type: 'list',
        message: "Who is the employee's manager?",
        choices: ["John Doe", "Mike Chan", "Ashley Rodriguez", "Kevin Tupik", "Accountant", "Kunal Singh", "Malia Brown", newEmployeeList],
        name: 'employee_manager',

    }

]

const updateEmployeeRole = [

    {
        type: 'list',
        message: "Which employee's role do you want to update?",
        choices: ["John Doe", "Mike Chan", "Ashley Rodriguez", "Kevin Tupik", "Accountant", "Kunal Singh", "Malia Brown", newEmployeeList],
        name: 'update_employee',
    },

    {
        type: 'list',
        message: "Which role do you want to assign the selected employee?",
        choices: ["Salesperson", "Lead Engineer", "Software Engineer", "Account Manager", "Accountant", "Legal Team Lead", "Lawyer", "Sales Lead", newRoleList],
        name: 'update_employee_role',
    },

]





function init() {

    repeatedQuestion();

};

function repeatedQuestion() {

    inquirer.prompt(initialQuestion)
        .then(response => {
            console.log(response);


            if (response.initial_question == 'Add Department') {
                inquirer.prompt(addDepartmentQuestion)
                    .then(response => {

                        const department = new Department(
                            response.department_name);
                        newDepartmentList.push(department);
                        console.log(newDepartmentList);

                        //Query database
                        db.query('INSERT INTO departments (name) VALUES (?)', response.department_name, function (err, results) {
                            if (err) {
                                console.log(err);
                            }
                            console.log(results);
                        });


                        repeatedQuestion();

                    });

            } else if (response.initial_question == 'Add Roles') {

                db.query('SELECT id AS value, name FROM departments').then()


                inquirer.prompt(addRoleQuestion)
                    .then(response => {

                        const role = new Role(
                            response.role_name,
                            response.role_salary,
                            response.role_department);
                        newRoleList.push(role);

                        //Query database
                        db.query(`INSERT INTO roles(title,salary ) VALUES (${response.role_name}, ${response.role_salary}), `, function (err, results) {
                            if (err) {
                                console.log(err);
                            }
                            console.log(results);
                        });


                        repeatedQuestion();
                    });




            } else if (response.initial_question == 'Add Employee') {

                inquirer.prompt(addEmployeeQuestion)
                    .then(response => {

                        const employee = new Employee(
                            response.employee_first_name,
                            response.employee_last_name,
                            response.employee_role,
                            response.employee_manager);
                        newEmployeeList.push(employee);


                        //Query database
                        db.query(`INSERT INTO roles(first_name,last_name ) VALUES (${response.employee_first_name}, ${response.employee_last_name}, ), `, function (err, results) {
                            if (err) {
                                console.log(err);
                            }
                            console.log(results);
                        });




                        repeatedQuestion();
                    });


            } else if (response.initial_question == 'Update Employee Role') {



                repeatedQuestion();

            } else if (response.initial_question == 'View All Departments') {

                //Query database
                db.query(`SELECT * FROM departments) `, function (err, results) {
                    if (err) {
                        console.log(err);
                    }
                    console.log(results);
                });


                repeatedQuestion();



            } else if (response.initial_question == 'View All Roles') {



                //Query database
                db.query(`SELECT * FROM roles) `, function (err, results) {
                    if (err) {
                        console.log(err);
                    }
                    console.log(results);
                });


                repeatedQuestion();


            } else if (response.initial_question == 'View All Employees') {


                //Query database
                db.query(`SELECT * FROM employees) `, function (err, results) {

                    if (err) {
                        console.log(err);
                    }
                    console.log(results);
                });

                repeatedQuestion();

            } else if (response.initial_question == 'Quit') {


                return;


                //                 console.log(employeeArray.length);
                //                 writeToFile("./dist/index.html", employeeArray);

            }




        })



}

init();


