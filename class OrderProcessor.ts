class OrderProcessor {
    constructor(orderData) {
        this.orderData = orderData;
    }

    validateOrder() {
        if (!this.orderData.items || this.orderData.items.length === 0) {
            throw new Error("Order must have at least one item");
        }
        if (!this.orderData.customerEmail || !this.orderData.customerEmail.includes('@')) {
            throw new Error("Invalid customer email");
        }
    }

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
        this.validateOrder();
        const total = this.calculateTotal();
        this.saveOrder();
        this.sendConfirmationEmail();
        return total;
    }
}

const orderData = {
    customerEmail: "user@example.com",
    items: [
        { name: "Laptop", price: 1200, quantity: 1 },
        { name: "Mouse", price: 25, quantity: 2 }
    ]
};

const processor = new OrderProcessor(orderData);
console.log("Total:", processor.processOrder());