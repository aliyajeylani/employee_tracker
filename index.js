const inquirer = require("inquirer");
const fs = require("fs");


class Department {

    constructor(id, name) {
        this.id = id;
        this.name = name;
    }

    printInfo() {
        console.log(`New Department: ID is ${this.id} and Name is ${this.name}`);
    }

}

class Role {

    constructor(id, title, department, salary) {
        this.id = id;
        this.title = title;
        this.department = department;
        this.salary = salary;
    }

    printInfo() {
        console.log(`New Role: ID is ${this.id}, Title is ${this.title}, Department is ${this.department} and Salary is ${this.salary}`);
    }

}



class Employee {

    constructor(id, first_name, last_name, title, department, salary, manager) {
        this.id = id;
        this.first_name = first_name;
        this.last_name = last_name;
        this.title = title;
        this.department = department;
        this.salary = salary;
        this.manager = manager;
    }

    printInfo() {
        console.log(`New Role: ID is ${this.id},First Name is ${this.first_name}, Last Name is ${this.last_name}, Title is ${this.title}, Department is ${this.department}, Salary is ${this.salary} and Manager is ${this.manager}`);
    }

}

const department = Department();
const role = Roles();
const employee = Employee;


const newDepartmentList = [];
const newRoleList = [];
const newManagerList = [];

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
        choices: ["Engineering", "Finances", "Legal", "Sales", newDepartmentList],
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
        choices: ["John Doe", "Mike Chan", "Ashley Rodriguez", "Kevin Tupik", "Accountant", "Kunal Singh", "Malia Brown", newManagerList],
        name: 'employee_manager',

    }

]

const updateEmployeeRole = [

    {
        type: 'list',
        message: "Which employee's role do you want to update?",
        choices: ["John Doe", "Mike Chan", "Ashley Rodriguez", "Kevin Tupik", "Accountant", "Kunal Singh", "Malia Brown", newManagerList],
        name: 'update_employee',
    },

    {
        type: 'list',
        message: "Which role do you want to assign the selected employee?",
        choices: ["Salesperson", "Lead Engineer", "Software Engineer", "Account Manager", "Accountant", "Legal Team Lead", "Lawyer", "Sales Lead", newRoleList],
        name: 'update_employee_role',
    },

]




// function writeToFile(file, data) {

//     fs.writeFile(file, generatePage(data), (err) =>
//         err ? console.log(err) : console.log('Success'));

// };


function init() {
    inquirer.prompt(initialQuestion)
        .then(response => {
            console.log(response);
            // const manager = new Manager(
            //     response.manager_name,
            //     response.manager_id,
            //     response.manager_email,
            //      response.manager_officeNumber);
            // employeeArray.push(manager)


            // repeatTeamQuestion();


        })



}

init();

// function repeatTeamQuestion() {

//     inquirer.prompt(teamQuestion)
//         .then(response => {
//             console.log(response);


//             if (response.team_member == "Engineer") {

//                 inquirer.prompt(engineerQuestions)
//                     .then(response => {
//                         const engineer = new Engineer(
//                             response.engineer_name,
//                             response.engineer_id,
//                             response.engineer_email,
//                             response.engineer_github);
//                         employeeArray.push(engineer)


//                         repeatTeamQuestion();
//                     })
//             } else if (response.team_member == "Intern") {
//                 inquirer.prompt(internQuestions)
//                     .then(response => {
//                         const intern = new Intern(
//                             response.intern_name,
//                             response.intern_id,
//                             response.intern_email,
//                             response.intern_school);
//                         employeeArray.push(intern);

//                         repeatTeamQuestion();
//                     })
//             } else {
//                 console.log(employeeArray);
//                 console.log(employeeArray.length);
//                 writeToFile("./dist/index.html", employeeArray);

//                 return;
//             }



//         })

// }
