// OrderProcessor.js (Versión Final)
class OrderProcessor {
    constructor(validator, calculator, repository, notifiers = []) {
        this.validator = validator;       // OrderValidator inyectado
        this.calculator = calculator;     // OrderCalculator inyectado
        this.repository = repository;     // OrderRepository inyectado
        this.notifiers = notifiers;       // Lista de notificadores (EmailNotifier, SMSNotifier, etc.)
    }

    processOrder(orderData) {
        this.validator.validate(orderData);
        const total = this.calculator.calculateTotal(orderData);
        this.repository.save(orderData);

        // Ejecutar todos los notificadores
        this.notifiers.forEach(notifier => {
            notifier.sendConfirmation(orderData);
        });

        return total;
    }
}

module.exports = OrderProcessor;