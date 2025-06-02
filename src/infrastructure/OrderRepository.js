// src/infrastructure/OrderRepository.js
const fs = require('fs');

class OrderRepository {
    save(orderData) {
        fs.writeFileSync('order.json', JSON.stringify(orderData));
    }
}

module.exports = OrderRepository;