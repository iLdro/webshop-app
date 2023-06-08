const express = require('express');
const cors = require('cors');
const app = express();
require('./db');

app.use(cors({
    origin: (origin, callback) => {
        // Check if the request origin is allowed
        // You can implement your own logic here to validate the origin
        const allowedOrigins = ['http://localhost:5173', 'http://127.0.0.1:5173'];
        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
}));

const PORT = process.env.PORT || 5000;

const Product = require('./schema/produit');

Product.find({})
    .then(products => {
        console.log('Retrieved products:', products);
        var productsJSON = JSON.stringify(products);

        app.get('/', (req, res) => res.send('API Running'));
        app.get('/api/products', (req, res) => res.json(productsJSON));

        app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
    })
    .catch(err => {
        console.error('Error retrieving products:', err);
    });
