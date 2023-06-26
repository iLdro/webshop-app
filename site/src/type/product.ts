export interface Product {
    _id: string;
    name: string;
    price: number;
    description: string;
    image: string;
    quantity: number;
    category: string;
    inCardQuantity: number;   
    oldQuantity: number; 
}