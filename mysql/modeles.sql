USE flowerDB;

CREATE TABLE products (
    _id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255),
    price DECIMAL(10, 2),
    description TEXT,
    image VARCHAR(255),
    quantity INT,
    category VARCHAR(255),
    inCardQuantity INT,
    oldQuantity INT
);

INSERT INTO products (name, price, description, image, quantity, category, inCardQuantity, oldQuantity)
VALUES
    ('Rose', 13.99, 'Beautiful red rose', 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c4/Pink_rose_%287837959486%29.jpg/1200px-Pink_rose_%287837959486%29.jpg', 100, 'Flowers', 0, 100),
    ('Tulip', 9.99, 'Colorful tulip', 'https://www.floraldesigninstitute.com/cdn/shop/articles/Tulip-Single-Rounded-299x315.jpg?v=1651708280', 150, 'Flowers', 0, 150),
    ('Orchid', 22.99, 'Exotic purple orchid', 'https://www.ikea.com/es/en/images/products/fejka-artificial-potted-plant-orchid-white__0748880_pe745269_s5.jpg?f=s', 90, 'Flowers', 0, 90);