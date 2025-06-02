const OrderValidator = require('./src/core/OrderValidator');
const OrderCalculator = require('./src/core/OrderCalculator');  // Nueva importación

class OrderProcessor {
    constructor(orderData) {
        this.orderData = orderData;
        this.validator = new OrderValidator();
        this.calculator = new OrderCalculator();  // Inyectar calculador
    }

    // ¡Eliminar el método calculateTotal() original!

    saveOrder() {
        const fs = require('fs');
        fs.writeFileSync('order.json', JSON.stringify(this.orderData));
    }

    sendConfirmationEmail() {
        console.log(`Sending email to ${this.orderData.customerEmail}...`);
    }

    processOrder() {
        this.validator.validate(this.orderData);
        const total = this.calculator.calculateTotal(this.orderData);  // Usar calculador externo
        this.saveOrder();
        this.sendConfirmationEmail();
        return total;
    }
}