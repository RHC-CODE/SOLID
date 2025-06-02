const OrderValidator = require('./src/core/OrderValidator');
const OrderCalculator = require('./src/core/OrderCalculator');
const OrderRepository = require('./src/infrastructure/OrderRepository'); // Nueva importación

class OrderProcessor {
    constructor(orderData) {
        this.orderData = orderData;
        this.validator = new OrderValidator();
        this.calculator = new OrderCalculator();
        this.repository = new OrderRepository(); // Inyectar repositorio
    }

    // ¡Eliminar el método saveOrder() original!

    sendConfirmationEmail() {
        console.log(`Sending email to ${this.orderData.customerEmail}...`);
    }

    processOrder() {
        this.validator.validate(this.orderData);
        const total = this.calculator.calculateTotal(this.orderData);
        this.repository.save(this.orderData); // Usar repositorio externo
        this.sendConfirmationEmail();
        return total;
    }
}