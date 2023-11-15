db.createCollection('produits');

db.produits.insertMany([
    {
        name: 'Rose',
        price: 13.99,
        description: 'Beautiful red rose',
        image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c4/Pink_rose_%287837959486%29.jpg/1200px-Pink_rose_%287837959486%29.jpg',
        quantity: 100,
        category: 'Flowers',
        inCardQuantity: 0,
        oldQuantity: 100
    },
    {
        name: 'Tulip',
        price: 9.99,
        description: 'Colorful tulip',
        image: 'https://www.floraldesigninstitute.com/cdn/shop/articles/Tulip-Single-Rounded-299x315.jpg?v=1651708280',
        quantity: 150,
        category: 'Flowers',
        inCardQuantity: 0,
        oldQuantity: 150
    },
    {
        name: 'Sunflower',
        price: 14.99,
        description: 'Bright sunflower',
        image: 'https://media.istockphoto.com/id/927047528/vector/sunflower-flower-isolated.jpg?s=612x612&w=0&k=20&c=PO0VpgkzCmtCeke0pjZpOUhmIvAKQ-_IqFcgmt9swMs=',
        quantity: 80,
        category: 'Flowers',
        inCardQuantity: 0,
        oldQuantity: 80
    },
    {
        name: 'Lily',
        price: 18.99,
        description: 'Elegant white lily',
        image: 'https://media.istockphoto.com/id/183384405/es/foto/lily-aislado.jpg?s=612x612&w=0&k=20&c=BdN9C43Sa2l-_Da9CrMzoshdE61KuI0Bet4QUKlxj6s=',
        quantity: 120,
        category: 'Flowers',
        inCardQuantity: 0,
        oldQuantity: 120
    },
    {
        name: 'Daisy',
        price: 7.99,
        description: 'Delicate white daisy',
        image: 'https://media.istockphoto.com/id/182838201/photo/daisy-on-white-with-clipping-path.jpg?s=612x612&w=0&k=20&c=Km5MQM4a_Lc-okFrlMp3EyZfb-dLVhHOJct3DnjOaAQ=',
        quantity: 200,
        category: 'Flowers',
        inCardQuantity: 0,
        oldQuantity: 200
    },
    {
        name: 'Orchid',
        price: 22.99,
        description: 'Exotic purple orchid',
        image: 'https://www.ikea.com/es/en/images/products/fejka-artificial-potted-plant-orchid-white__0748880_pe745269_s5.jpg?f=s',
        quantity: 90,
        category: 'Flowers',
        inCardQuantity: 0,
        oldQuantity: 90
    }
]);
