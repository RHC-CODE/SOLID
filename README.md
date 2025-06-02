
# 📦 Refactorización SOLID del Módulo OrderProcessor

Acontiluacion se presenta el  documento que  detalla el proceso de refactorización del archivo `OrderProcessor.js`, aplicando los principios **SOLID** para mejorar la escalabilidad, mantenibilidad y desacoplamiento del sistema.

---

## 📌 Estado Inicial del Código

```javascript
class OrderProcessor {
    constructor(orderData) {
        this.orderData = orderData;
    }

    validateOrder() {
        if (!this.orderData.items || this.orderData.items.length === 0) {
            throw new Error("Order must have at least one item");
        }
    }

    calculateTotal() {
        return this.orderData.items.reduce(
            (sum, item) => sum + (item.price * item.quantity), 
            0
        );
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
```

### ❌ Problemas Identificados

- Violación del Principio de Responsabilidad Única (SRP).
- Alto acoplamiento.
- Dificultad para escalar o testear partes específicas del proceso.

---

## ✅ Refactorización Aplicando SOLID

### 🔹 Paso 1: Separar la Validación

📁 `src/core/OrderValidator.js`

```javascript
class OrderValidator {
    validate(orderData) {
        if (!orderData.items || orderData.items.length === 0) {
            throw new Error("Order must have at least one item");
        }
    }
}
module.exports = OrderValidator;
```

---

### 🔹 Paso 2: Separar el Cálculo del Total

📁 `src/core/OrderCalculator.js`

```javascript
class OrderCalculator {
    calculateTotal(orderData) {
        return orderData.items.reduce(
            (sum, item) => sum + (item.price * item.quantity), 
            0
        );
    }
}
module.exports = OrderCalculator;
```

---

### 🔹 Paso 3: Separar la Persistencia

📁 `src/infrastructure/OrderRepository.js`

```javascript
const fs = require('fs');

class OrderRepository {
    save(orderData) {
        fs.writeFileSync('order.json', JSON.stringify(orderData));
    }
}
module.exports = OrderRepository;
```

---

### 🔹 Paso 4: Sistema de Notificaciones

#### Interfaz base

📁 `src/notifications/Notifier.js`

```javascript
class Notifier {
    sendConfirmation(orderData) {
        throw new Error("Método 'sendConfirmation()' debe ser implementado");
    }
}
module.exports = Notifier;
```

#### Implementación de Email

📁 `src/notifications/EmailNotifier.js`

```javascript
const Notifier = require('./Notifier');

class EmailNotifier extends Notifier {
    sendConfirmation(orderData) {
        console.log(`[Email] Enviado a: ${orderData.customerEmail}`);
    }
}
module.exports = EmailNotifier;
```

---

### 🔹 Paso 5: Refactorización Final de OrderProcessor

📄 `OrderProcessor.js`

```javascript
class OrderProcessor {
    constructor(validator, calculator, repository, notifiers = []) {
        this.validator = validator;
        this.calculator = calculator;
        this.repository = repository;
        this.notifiers = notifiers;
    }

    processOrder(orderData) {
        this.validator.validate(orderData);
        const total = this.calculator.calculateTotal(orderData);
        this.repository.save(orderData);

        this.notifiers.forEach(notifier => {
            notifier.sendConfirmation(orderData);
        });

        return total;
    }
}
module.exports = OrderProcessor;
```

---

### 🔹 Composición de Dependencias

📄 `index.js`

```javascript
const OrderProcessor = require('./OrderProcessor');
const OrderValidator = require('./src/core/OrderValidator');
const OrderCalculator = require('./src/core/OrderCalculator');
const OrderRepository = require('./src/infrastructure/OrderRepository');
const EmailNotifier = require('./src/notifications/EmailNotifier');

const orderData = {
    customerEmail: "user@example.com",
    items: [
        { name: "Laptop", price: 1200, quantity: 1 },
        { name: "Mouse", price: 25, quantity: 2 }
    ]
};

const processor = new OrderProcessor(
    new OrderValidator(),
    new OrderCalculator(),
    new OrderRepository(),
    [new EmailNotifier()]
);

try {
    const total = processor.processOrder(orderData);
    console.log(`✅ Orden procesada. Total: $${total}`);
} catch (err) {
    console.error(`❌ Error: ${err.message}`);
}
```

---

## 📁 Estructura Final del Proyecto

```
SOLID/
├── OrderProcessor.js
├── index.js
└── src/
    ├── core/
    │   ├── OrderValidator.js
    │   └── OrderCalculator.js
    ├── infrastructure/
    │   └── OrderRepository.js
    └── notifications/
        ├── Notifier.js
        └── EmailNotifier.js
```

---

## 🧠 Principios SOLID Aplicados

| Principio | Aplicación Concreta |
|----------|----------------------|
| **SRP** | Separación de validación, cálculo, persistencia y notificación |
| **OCP** | Nuevos tipos de notificación se pueden agregar sin modificar `OrderProcessor` |
| **LSP** | `EmailNotifier` implementa la interfaz sin romper su contrato |
| **ISP** | Interfaces pequeñas y específicas (`Notifier`) |
| **DIP** | `OrderProcessor` depende de abstracciones, no implementaciones |

---
