const express = require('express');
const cors = require('cors');
const app = express();


app.use(cors({
    origin: (origin, callback) => {
        // Check if the request origin is allowed
        // You can implement your own logic here to validate the origin
        const allowedOrigins = [
            'http://localhost:5173', 'http://127.0.0.1:5173', 
            'http://localhost:3000', 'http://127.0.0.1:3000',
            'http://localhost:8080', 'http://127.0.0.1:8080'
        ];
        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
}));

app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hello, Express.js!');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});

const mysql = require('mysql2');

const connection = mysql.createConnection({
    host: 'sql',
    user: 'admin',
    password: 'admin',
    database: 'flowerDB',
    port: 3306
});

const connectWithRetry = () => {
    return connection.connect((err) => {
        if (err) {
          console.error('Failed to connect to MySQL, retrying in 15 seconds...');
          setTimeout(connectWithRetry, 15000);
        } else {
          console.log('Connected to MySQL!');
        }
    });
};

connectWithRetry();


const sendProducts = (req, res, next) => {
    const sqlQuery = 'SELECT * FROM products';
    connection.query(sqlQuery, (err, results) => {
        if (err) {
          console.error('Erreur lors de l\'exécution de la requête : ' + err.stack);
          return res.status(500).json({ error: 'Erreur de base de données' });
        }
        console.log('Retrieved all products:', results);
        res.json(results);
        next();
    });
};

const SendProductInCart = (req, res, next) => {
    const sqlQuery = 'SELECT * FROM products WHERE inCardQuantity > 0';
    connection.query(sqlQuery, (err, results) => {
        if (err) {
          console.error('Erreur lors de l\'exécution de la requête : ' + err.stack);
          return res.status(500).json({ error: 'Erreur de base de données' });
        }
        console.log('Retrieved products in cart :', results);
        res.json(results);
    });
};

const updateQuantity = (req, res, next) => {
    const prodId = req.body._id;
    const quantity = req.body.oldQuantity - req.body.inCardQuantity;
    const sqlQuery = 'UPDATE products SET quantity = ' + quantity + ' WHERE _id = ' + prodId;
    connection.query(sqlQuery, (err, results) => {
        if (err) {
          console.error('Erreur lors de l\'exécution de la requête : ' + err.stack);
          return res.status(500).json({ error: 'Erreur de base de données' });
        }
        console.log('product updated !:', results);
    });
    const getproductquery = 'SELECT * FROM products WHERE _id = ' + prodId;
    connection.query(getproductquery, (err, results) => {
        if (err) {
          console.error('Erreur lors de l\'exécution de la requête : ' + err.stack);
          return res.status(500).json({ error: 'Erreur de base de données' });
        }
        console.log('Updated product:', results);
        res.json(results);
    });
};

const updateInCard = (req, res, next) => {
    const prodId = req.body._id;
    if (req.body.quantity >= 0 && req.body.inCardQuantity <= req.body.oldQuantity) {
        const sqlQuery = 'UPDATE products SET inCardQuantity = ' + req.body.inCardQuantity + ' WHERE _id = ' + prodId;
        connection.query(sqlQuery, (err, results) => {
            if (err) {
                console.error('Erreur lors de l\'exécution de la requête : ' + err.stack);
                return res.status(500).json({ error: 'Erreur de base de données' });
            }
            console.log('product updated !:', results);
        });
        const getproductquery = 'SELECT * FROM products WHERE _id = ' + prodId;
        connection.query(getproductquery, (err, results) => {
            if (err) {
                console.error('Erreur lors de l\'exécution de la requête : ' + err.stack);
                return res.status(500).json({ error: 'Erreur de base de données' });
            }
            console.log('Updated product:', results);
            res.json(results);
        });
    } else {
        console.log('Invalid inCardQuantity');
        res.status(400).json({ error: 'Invalid inCardQuantity' });
    }
};



app.get('/api/products', sendProducts, (req, res) => {
    const products = res.locals.products;
    res.json(products);
});

app.get('/api/productsInCard', SendProductInCart, (req, res) => {
    const products = res.locals.products;
    res.json(products);
});

app.post('/api/productsUpdateCard/', updateInCard,updateQuantity, (req, res) => {
    console.log('hello')
    const products = res.locals.products;
    res.json(products);
    app.put('/api/sendUpdate/', SendProductInCart, (req, res) => {
        const products = res.locals.products;
        res.json(products);
    });
});

app.post('/api/createProduct', (req, res) => {
    console.log("try to create a new product" + req.body)
    const { name, price, description, image, quantity, category, inCardQuantity, oldQuantity } = req.body;
    console.log("name" + name + "price" + price + "description" + description + "image" + image + "quantity" + quantity + "category" + category + "inCardQuantity" + inCardQuantity + "oldQuantity" + oldQuantity)
    // Check if required fields are present
    if (!name || !price || !description || !image || !quantity || !category || inCardQuantity === undefined) {
        return res.status(400).json({ error: 'Please fill in all required fields.' });
    }

    console.log('Creating product:', req.body);

    // Sanitize and escape user input to prevent SQL injection (you may need to use a library for this)
    const sanitizedName = connection.escape(name);
    const sanitizedDescription = connection.escape(description);
    const sanitizedImage = connection.escape(image);
    const sanitizedCategory = connection.escape(category);

    const sqlQuery = `INSERT INTO products (name, price, description, image, quantity, category, inCardQuantity, oldQuantity) VALUES (${sanitizedName}, ${price}, ${sanitizedDescription}, ${sanitizedImage}, ${quantity}, ${sanitizedCategory}, ${inCardQuantity}, ${quantity})`;

    connection.query(sqlQuery, (err, results) => {
        if (err) {
            console.error('Error executing query: ' + err.stack);
            return res.status(500).json({ error: 'Database error' });
        }

        console.log('Product created:', results);
    });

    const getProductQuery = `SELECT * FROM products WHERE name = ${sanitizedName}`;

    connection.query(getProductQuery, (err, results) => {
        if (err) {
            console.error('Error executing query: ' + err.stack);
            return res.status(500).json({ error: 'Database error' });
        }

        console.log('Created product:', results);
        res.json(results);
    });
});

