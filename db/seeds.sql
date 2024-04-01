INSERT INTO department (name)
VALUES ("Admin"),
       ("Sales"),
       ("Engineering"),
       ("Operations");

INSERT INTO role (title, salary, department_id)
VALUES ("Receptionist", 70000 , 1),
       ("Human Resourses", 90000 , 1),
       ("Accounting", 70000 , 1),
       ("Sales Assitant", 900000 , 2),
       ("Sales Manager", 120000 , 2),
       ("Engineering Manager", 120000 , 3),
       ("Design Engineer", 100000 , 3),
       ("Software Engineer", 110000 , 3),
       ("Process Engineer", 90000 , 3),
       ("Warehouse Manager", 100000 , 4),
       ("Truck Driver", 80000 , 4);
       
INSERT INTO employee (id, first_name, last_name, role_id, manager_id)
VALUES (1,"Dylan","Knight", 1, 2),
       (2,"Juliette","Munoz", 2, NULL),
       (3,"Barrett","Russo", 3, NULL),
       (4,"Nataly","Fischer", 4, 5),
       (5,"Shayna","Jensen", 5, NULL),
       (6,"Urijah","Barton", 6, 6),
       (7,"Eddie","Boyle", 7, 6),
       (8,"Hayley","Burns", 8, 6),
       (9,"Keenan","Mayer", 9, NULL),
       (10,"Marin","Haynes", 10, 9);