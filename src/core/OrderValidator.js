class OrderValidator {
    validate(orderData) {
        if (!orderData.items || orderData.items.length === 0) {
            throw new Error("Order must have at least one item");
        }
    }
}

module.exports = OrderValidator;