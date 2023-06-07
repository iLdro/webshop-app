

const express = require('express');
const cors = require('cors');
const app = express();

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

const product = [{
    id: 1,
    name: 'product1',
    price: 100,
    description: 'product1',
    image: 'product1',
    quantity: 1,
    category: 'product1'
},
{
    id: 2,
    name: 'product2',
    price: 200,
    description: 'product2',
    image: 'product2',
    quantity: 2,
    category: 'product2'
},
{
    id: 3,
    name: 'product3',
    price: 300,
    description: 'product3',
    image: 'product3',
    quantity: 3,
    category: 'product3'
}]

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));

// Path: api\index.js
app.get('/', (req, res) => res.send('API Running'));
app.get('/api/products', (req, res) => res.json(product));


