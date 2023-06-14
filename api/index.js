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

const sendProducts = (req, res, next) => {
    Product.find({})
        .then(products => {
            console.log('Retrieved products:', products);
            res.locals.products = products;
            next();
        })
        .catch(err => {
            console.error('Error retrieving products:', err);
            res.status(500).json({ error: 'Internal Server Error' });
        });
};


const SendProductInCart = (req, res, next) => {
    Product.find({inCard: true})
        .then(products => {
            console.log('Retrieved products:', products);
            res.locals.products = products;
            next();
        })
        .catch(err => {
            console.error('Error retrieving products:', err);
            res.status(500).json({ error: 'Internal Server Error' });
        });
};

const updateInCard = (req, res, next) => {
    const { id } = req.params.id;
    Product.findOneAndUpdate({ _id: id }, { $set: { inCard: {$not :'inCard'} } })
    .then(product => {
        console.log('Updated product:', product);
        res.locals.product = product;
        next();
    })
    .catch(err => {
        console.error('Error updating product:', err);
        res.status(500).json({ error: 'Internal Server Error' });
    });
};




app.get('/api/products', sendProducts, (req, res) => {
    const products = res.locals.products;
    res.json(products);
});

app.get('/api/productsInCard', SendProductInCart, (req, res) => {
    const products = res.locals.products;
    res.json(products);
});

app.post('/api/productsUpdateCard/:id', updateInCard, (req, res) => {
    const product = res.locals.product;
    res.json(product);
});

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
