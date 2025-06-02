const OrderValidator = require('./src/core/OrderValidator');
const OrderCalculator = require('./src/core/OrderCalculator');
const OrderRepository = require('./src/infrastructure/OrderRepository');
const EmailNotifier = require('./src/notifications/EmailNotifier'); // Nueva importación

class OrderProcessor {
    constructor(orderData) {
        this.orderData = orderData;
        this.validator = new OrderValidator();
        this.calculator = new OrderCalculator();
        this.repository = new OrderRepository();
        this.notifier = new EmailNotifier(); // Inyectar notificador
    }

    // ¡Eliminar el método sendConfirmationEmail() original!

    processOrder() {
        this.validator.validate(this.orderData);
        const total = this.calculator.calculateTotal(this.orderData);
        this.repository.save(this.orderData);
        this.notifier.sendConfirmation(this.orderData); // Usar notificador externo
        return total;
    }
}