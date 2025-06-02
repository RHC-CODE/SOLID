// src/core/OrderCalculator.js
class OrderCalculator {
    calculateTotal(orderData) {
        return orderData.items.reduce(
            (sum, item) => sum + (item.price * item.quantity), 
            0
        );
    }
}

module.exports = OrderCalculator;