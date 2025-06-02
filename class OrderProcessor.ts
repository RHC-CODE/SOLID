const OrderValidator = require('./src/core/OrderValidator');  // Nueva importación

class OrderProcessor {
    constructor(orderData) {
        this.orderData = orderData;
        this.validator = new OrderValidator();  // Validador inyectado
    }

    // ¡Se eliminó el método validateOrder()!

    calculateTotal() {
        return this.orderData.items.reduce((sum, item) => sum + item.price * item.quantity, 0);
    }

    saveOrder() {
        const fs = require('fs');
        fs.writeFileSync('order.json', JSON.stringify(this.orderData));
    }

    sendConfirmationEmail() {
        console.log(`Sending email to ${this.orderData.customerEmail}...`);
    }

    processOrder() {
        this.validator.validate(this.orderData);  // Usa el validador externo
        const total = this.calculateTotal();
        this.saveOrder();
        this.sendConfirmationEmail();
        return total;
    }
}

// Ejemplo de uso (opcional, si estaba en el original)
const orderData = {
    customerEmail: "user@example.com",
    items: [
        { name: "Laptop", price: 1200, quantity: 1 },
        { name: "Mouse", price: 25, quantity: 2 }
    ]
};

const processor = new OrderProcessor(orderData);
console.log("Total:", processor.processOrder());