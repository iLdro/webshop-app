const express = require('express');
const cors = require('cors');
const app = express();
require('./db');
const bodyParser = require('body-parser');

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
    Product.find({ inCardQuantity: { $gt: 0 } })
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
    console.log('inCardQuantity', req.body);
    if (req.body.quantity >= 0 && req.body.inCardQuantity <= req.body.oldQuantity) {
        Product.findByIdAndUpdate(req.body._id, { inCardQuantity: req.body.inCardQuantity })
            .then(product => {
                console.log('done:', product);
                res.locals.product = product;
                next();
            })
            .catch(err => {
                console.error('Error updating product:', err);
                res.status(500).json({ error: 'Internal Server Error' });
            });
    } else {
        console.log('Invalid inCardQuantity');
        res.status(400).json({ error: 'Invalid inCardQuantity' });
    }
};

const updateQuantity = (req, res, next) => { 
    Product.findByIdAndUpdate(req.body._id, { quantity: req.body.oldQuantity - req.body.inCardQuantity})
    .then(product => {
            console.log("new_quantity",req.body.oldQuantity - req.body.inCardQuantity)  
            console.log('Updated product:', product);
            res.locals.product = product;
            next();
        })
        .catch(err => {
            console.error('Error updating product:', err);
            res.status(500).json({ error: 'Internal Server Error' });
        });

};




app.listen(PORT, () => console.log(`Server started on port ${PORT}`));


app.get('/api/products', sendProducts, (req, res) => {
    const products = res.locals.products;
    res.json(products);
});

app.get('/api/productsInCard', SendProductInCart, (req, res) => {
    const products = res.locals.products;
    res.json(products);
});

app.post('/api/productsUpdateCard/', updateInCard,updateQuantity, (req, res) => {
    const products = res.locals.products;
    res.json(products);
    app.put('/api/sendUpdate/', SendProductInCart, (req, res) => {
        const products = res.locals.products;
        res.json(products);
    });
});

app.post('/api/createProduct', (req, res) => {
    console.log('Creating product:', req.body);
    const product = new Product({
        name: req.body.name,
        price: req.body.price,
        quantity: req.body.quantity,
        inCardQuantity: req.body.inCardQuantity,
        description: req.body.description,
        image: req.body.image,
        category: req.body.category,
        oldQuantity: req.body.quantity
    });
    product.save()
        .then(product => {
            console.log('Created product:', product);
            res.json(product);
        })
        .catch(err => {
            console.error('Error creating product:', err);
            res.status(500).json({ error: 'Internal Server Error' });
        });
}
);

