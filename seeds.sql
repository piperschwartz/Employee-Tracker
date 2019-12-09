-- put the insert info in here for the employees, etc

INSERT INTO department (name) 
VALUES ('Sales'), ('HR'), ('Marketing'),('Finance'),('Development'), ('Mangement');

INSERT INTO role (title, salary, department_id) 
VALUES ('General Manager', 200000, 1),
        ('Sales Supervisor', 90000, 2),
         ('Sales', 60000, 2),
         ('HR Lead', 95000, 3),
         ('Marketing Lead', 75000, 4),
         ('Jr Marketing', 45000, 4),
         ('Accountant', 100000, 5),
         ('Full-Stack Web Developer', 150000, 6),
         ('Jr. Web Developer', 60000, 6);
         


INSERT INTO employee(first_name, last_name, role_id, manager_id)
VALUES  ('Melanie', 'Carmichael',1, null),
        ('Roberta', 'Johnson',2, null),
       ('Sam', 'Lucas',2, 2),
       ('Sandra', 'Dee', 2, 2),
       ('Susan', 'Cooper',3, 1),
       ('Leslie', 'Knope',4, null ),
       ('Ron', 'Burgundy',4, 5),
       ('Mildred','Turner',5, 1),
       ('Sydney', 'Klaven',6, null),
       ('Frederick', 'Haven',6, 8);
