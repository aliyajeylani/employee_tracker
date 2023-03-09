INSERT INTO departments (id, name)
VALUES (1, "Sales"),
VALUES (2, "Engineering"),
VALUES (3, "Finance"),
VALUES (4, "Legal"),
   
       
INSERT INTO roles (id, title, department, salary)
VALUES (1, "Sales Lead", "Sales", "100000"),
VALUES (2, "Salesperson", "Sales", "80000"),
VALUES (3, "Lead Engineer", "Engineering", "150000"),
VALUES (4, "Software Engineer", "Engineering", "120000"),
VALUES (5, "Account Manager", "Finance", "160000"),
VALUES (6, "Accountant", "Finance", "125000"),
VALUES (7, "Legal Team Lead", "Legal", "250000"),
VALUES (8, "Lawyer", "Legal", "190000"),



INSERT INTO employees (id, first_name, last_name, title, department, salary, manager)
VALUES (1, "John", "Doe", "Sales Lead", "Sales", "100000", "null"),
VALUES (2, "Mike", "Chan", "Salesperson", "Sales", "80000", "John Doe"),
VALUES (3, "Ashley", "Rodriquez", "Lead Engineer", "Engineering", "150000", "null"),
VALUES (4, "Kevin", "Tupik", "Software Engineer", "Engineering", "120000", "Ashley Rodriquez"),
VALUES (5, "Kunal", "Sing", "Account Manager", "Finance", "160000", "null"),
VALUES (6, "Malia", "Brown", "Accountant", "Finance", "125000", "Kunal Singh"),
VALUES (7, "Sarah", "Lourd", "Legal Team Lead", "Legal", "250000", "null"),
VALUES (8, "Tom", "Allen", "Lawyer", "Legal", "190000", "Sarah Lourd"),