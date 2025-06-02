// index.js (Configuración de Dependencias)
const OrderProcessor = require('./OrderProcessor');
const OrderValidator = require('./src/core/OrderValidator');
const OrderCalculator = require('./src/core/OrderCalculator');
const OrderRepository = require('./src/infrastructure/OrderRepository');
const EmailNotifier = require('./src/notifications/EmailNotifier');
const SMSNotifier = require('./src/notifications/SMSNotifier'); // Si existe

// Datos de ejemplo
const orderData = {
    customerEmail: "user@example.com",
    customerPhone: "+1234567890",
    items: [
        { name: "Laptop", price: 1200, quantity: 1 },
        { name: "Mouse", price: 25, quantity: 2 }
    ]
};

// Inyección de dependencias
const processor = new OrderProcessor(
    new OrderValidator(),                 // Validator
    new OrderCalculator(),                // Calculator
    new OrderRepository(),                // Repository
    [new EmailNotifier(), new SMSNotifier()] // Notificadores (Email + SMS)
);

// Ejecutar
try {
    const total = processor.processOrder(orderData);
    console.log(`✅ Orden procesada. Total: $${total}`);
} catch (error) {
    console.error(`❌ Error: ${error.message}`);
}