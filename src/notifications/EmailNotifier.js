// src/notifications/EmailNotifier.js
const Notifier = require('./Notifier');

class EmailNotifier extends Notifier {
    sendConfirmation(orderData) {
        console.log(`[Email] Enviado a: ${orderData.customerEmail}`);
    }
}

module.exports = EmailNotifier;