const express = require('express');
const cors = require('cors');
const app = express();
require('./db');
const bodyParser = require('body-parser');

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

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json())
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
    Product.find({inCardQuantity: {$gt: 0}})
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
    Product.findOneAndUpdate({ _id: req.body._id }, { inCardQuantity: req.body.inCardQuantity + 1 })
        .then(products => {
            console.log('Retrieved products:', products);
            res.locals.products = products;
            next();
        })
        .catch(err => {
            console.error('Error retrieving products:', err);
            res.status(500).json({ error: 'Internal Server Error' });
        });
}
    
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));


app.get('/api/products', sendProducts, (req, res) => {
    const products = res.locals.products;
    res.json(products);
});

app.get('/api/productsInCard', SendProductInCart, (req, res) => {
    const products = res.locals.products;
    res.json(products);
}); 

app.post('/api/productsUpdateCard/',updateInCard, (req, res) => {
    const products = res.locals.products;
    res.json(products);
    app.put('/api/sendUpdate/',SendProductInCart, (req, res) => {
        const products = res.locals.products;
        res.json(products);
    });    
});

