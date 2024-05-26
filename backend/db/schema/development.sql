INSERT INTO waste_categories (id, category_name)
VALUES 
  (1, 'paper'),
  (2, 'metal'),
  (3, 'electronic'),
  (4, 'furniture');

INSERT INTO providers (id, email, password, name, organization, phone, address)
VALUES 
 (1, 'admin@recyclepaper.com','abc', 'Smith', 'recyclepaper',1234567890,'1111 Maple Surrey'),
  (2, 'admin@recyclemetal.com','abc', 'John', 'recyclemetal', 2345678901, '1111 Leaf Richmond'),
  (3, 'admin@recycleeletronic.com', 'abc', 'Joseph', 'recycleelectronic', 3456789012, '1111 King Georgetown'),
  (4, 'admin@recyclefurniture.com', 'abc', 'Tom', 'recyclefurniture', 4567890123, '1111 Queen Productionway');
 
INSERT INTO locations (id, town)
VALUES 
  (1, 'Surrey'),
  (2, 'Burnaby'),
  (3, 'Vancouver'),
  (4, 'Richmond');

INSERT INTO users (id, email, password, name, phone, address, town, province, country)
VALUES 
 (1, 'a@yahoo.com','abc', 'Albert', 1112223333,'1111 Maple Surrey', 'Burnaby', 'BC', 'Canada');

INSERT INTO service_options (id, provider_id, location_id, waste_type)
VALUES
(1, 1, 1, 'paper'),
(2, 1, 2, 'paper'),
(3, 1, 3, 'paper'),
(4, 2, 2, 'steel'),
(5, 2, 3, 'steel'),
(6, 2, 4, 'steel'),
(7, 2, 1, 'aluminum'),
(8, 2, 4, 'aluminum'),
(9, 3, 2, 'desktop'),
(10, 3, 3, 'desktop'),
(11, 3, 1, 'laptop'),
(12, 3, 4, 'laptop'),
(13, 3, 1, 'cell phone'),
(14, 3, 2, 'cell phone'),
(15, 3, 3, 'cell phone'),
(16, 3, 4, 'cell phone'),
(17, 3, 3, 'screen'),
(18, 4, 2, 'bed'),
(19, 4, 3, 'table'),
(20, 4, 4, 'chair');

