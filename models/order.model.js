const Promise = require("promise");
const helper = require("../helpers/helper.js");

let orders = [
    {
        //dummy values for testing
        "id": 1,
        "buyer": 1, // user id
        "car_id": 1, // car id
        "amount": 82636.62,  // price of car
        "status": "available",  // pending, accepted or rejected
        "date": helper.newDate()
    }
];


const getOrders = () => {
    return new Promise((resolve, reject) => {

        if (orders.length === 0) {
            reject({
                message: "No Orders Available",
                status: 202
            })
        }

        resolve(orders);
    })
};


const createOrder = (newOrder) => {
    return new Promise((resolve, reject) => {
        const id = {
            id: helper.getNewId(orders)
        };
        const date = {
            created_on: helper.newDate()
        };
        newOrder = { 
            ...id, 
            ...date, 
            ...newOrder
        };
        orders.push(newOrder);
        resolve(newOrder);
    })
};

//
const updatePrice = (id, price) => {
    return new Promise ((resolve, reject) => {
        helper.mustBeInArray(orders, id)
        .then(order => {
            const index = orders.findIndex(p => p.id === order.id);
            const id = { 
                id: order.id 
            };
            const owner = {
                owner: order.owner
            };
            const date = {
                created_on: order.created_on,
                updated_on: helper.newDate()
            };

            order.price = price;

            orders[index] = { 
                ...id, 
                ...owner,
                ...date, 
                 };
            resolve(orders);
        })
        .catch(err => reject(err))
})
};




module.exports = {
    getOrders,
    createOrder,
    updatePrice
};