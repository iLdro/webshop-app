SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";

CREATE TABLE produits (
    id INTEGER NOT NULL AUTO_INCREMENT,
    name VARCHAR(50) NOT NULL,
    price REAL NOT NULL,
    description VARCHAR(200) NOT NULL,
    image VARCHAR(200) NOT NULL,
    quantity INTEGER NOT NULL,
    category VARCHAR(50) NOT NULL,
    inCardQuantity INTEGER NOT NULL,
    oldQuantity INTEGER NOT NULL,
    PRIMARY KEY (id)
);

-- Insert example data
INSERT INTO produits (name, price, description, image, quantity, category, inCardQuantity, oldQuantity)
VALUES 
    ('Rose', 13.99, 'Beautiful red rose', 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c4/Pink_rose_%287837959486%29.jpg/1200px-Pink_rose_%287837959486%29.jpg', 100, 'Flowers', 0, 100),
    ('Tulip', 9.99, 'Colorful tulip', 'https://www.floraldesigninstitute.com/cdn/shop/articles/Tulip-Single-Rounded-299x315.jpg?v=1651708280', 150, 'Flowers', 0, 150),
    ('Sunflower', 14.99, 'Bright sunflower', 'https://media.istockphoto.com/id/927047528/vector/sunflower-flower-isolated.jpg?s=612x612&w=0&k=20&c=PO0VpgkzCmtCeke0pjZpOUhmIvAKQ-_IqFcgmt9swMs=', 80, 'Flowers', 0, 80),
    ('Lily', 18.99, 'Elegant white lily', 'https://media.istockphoto.com/id/183384405/es/foto/lily-aislado.jpg?s=612x612&w=0&k=20&c=BdN9C43Sa2l-_Da9CrMzoshdE61KuI0Bet4QUKlxj6s=', 120, 'Flowers', 0, 120),
    ('Daisy', 7.99, 'Delicate white daisy', 'https://media.istockphoto.com/id/182838201/photo/daisy-on-white-with-clipping-path.jpg?s=612x612&w=0&k=20&c=Km5MQM4a_Lc-okFrlMp3EyZfb-dLVhHOJct3DnjOaAQ=', 200, 'Flowers', 0, 200),
    ('Orchid', 22.99, 'Exotic purple orchid', 'https://www.ikea.com/es/en/images/products/fejka-artificial-potted-plant-orchid-white__0748880_pe745269_s5.jpg?f=s', 90, 'Flowers', 0, 90);

COMMIT;
