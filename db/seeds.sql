INSERT INTO department (name)
VALUES ("Admin"),
       ("Sales"),
       ("Engineering"),
       ("Operations"),

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
       ("Warehouse Manager", 100000 , 4);
       ("Truck Driver", 80000 , 4);
       
INSERT INTO role (first_name, last_name, role_id, manager_id)
VALUES ("Dylan","Knight", 1, 2),
       ("Juliette","Munoz", 2, NULL),
       ("Barrett","Russo", 3, NULL),
       ("Nataly","Fischer", 4, 5),
       ("Shayna","Jensen", 5, NULL),
       ("Urijah","Barton", 6, 6),
       ("Eddie","Boyle", 7, 6),
       ("Hayley","Burns", 8, 6),
       ("Keenan","Mayer", 9, NULL),
       ("Marin","Haynes", 10, 9);