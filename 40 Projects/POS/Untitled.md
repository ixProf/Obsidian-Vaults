---
title: "Untitled"
aliases: []
type: project
status: active
domain: backend-engineering
tags: [project, backend-engineering]
created: 2026-09-21
updated: 2026-09-21
source:
related: []
---
Here is the complete **Role & Permission Breakdown** for all employee roles in the **RestaurantPOS** system:

---

### 📊 Role Permission Matrix

| Feature / Action | 👑 Manager | 🍽️ Waiter | 👨‍🍳 Chef | 💳 Cashier | 📦 Inventory Manager |
| :--- | :---: | :---: | :---: | :---: | :---: |
| **Manage Employees & Roles** | ✅ | ❌ | ❌ | ❌ | ❌ |
| **Sales & Financial Reports** | ✅ | ❌ | ❌ | ❌ | ❌ |
| **Issue Refunds & Apply Discounts** | ✅ | ❌ | ❌ | ❌ | ❌ |
| **Create / Update / Delete Tables** | ✅ | ❌ | ❌ | ❌ | ❌ |
| **Create / Update / Delete Menu & Categories** | ✅ | ❌ | ❌ | ❌ | ❌ |
| **Create & Submit Orders** | ✅ | ✅ | ❌ | ❌ | ❌ |
| **Add / Remove Order Items** | ✅ | ✅ | ❌ | ❌ | ❌ |
| **Transfer Table Orders** | ✅ | ✅ | ❌ | ❌ | ❌ |
| **Update Order Item Status (Preparing / Ready / Served)** | ✅ | ✅ | ✅ | ✅ | ❌ |
| **Toggle Menu Item Availability (In Stock / Out)** | ✅ | ❌ | ✅ | ❌ | ❌ |
| **Process Customer Payments & Print Invoices** | ✅ | ❌ | ❌ | ✅ | ❌ |
| **View Payment History** | ✅ | ❌ | ❌ | ✅ | ❌ |
| **Ingredient & Stock Adjustments (Restock / Waste)** | ✅ | ❌ | ❌ | ❌ | ✅ |
| **Manage Recipes (Attach Ingredients to Menu Items)** | ✅ | ❌ | ❌ | ❌ | ✅ |
| **View Low-Stock Alerts & Inventory Overview** | ✅ | ❌ | ❌ | ❌ | ✅ |

---

### 👑 1. Manager (`Manager`)
> **Superuser with full administrative and operational control.**

* **What They CAN Do:**
  * Manage staff (Create, Update, Deactivate, Delete employees).
  * Access financial analytics, sales reports, and top-selling item metrics.
  * Approve discounts and issue full/partial customer refunds.
  * Configure restaurant table layouts and capacity.
  * Create/Modify menu items, prices, and categories.
  * Perform all operational duties (Order taking, Payments, Inventory adjustments).
* **What They CANNOT Do:**
  * *N/A (Full access to all system endpoints).*

---

### 🍽️ 2. Waiter (`Waiter`)
> **Front-of-house staff responsible for dining tables and guest service.**

* **What They CAN Do:**
  * Create draft orders and add/remove order items.
  * Submit orders to the kitchen/bar.
  * Mark orders and items as `Served`.
  * Cancel draft orders or active order items (with reason).
  * Transfer active orders between tables (e.g. customer changing tables).
  * Update table status (`Occupied`, `Cleaning`, `Available`).
* **What They CANNOT Do:**
  * Process bill payments or issue refunds.
  * Apply discounts.
  * View sales reports or financial data.
  * Modify ingredient stocks or menu prices.

---

### 👨‍🍳 3. Chef (`Chef`)
> **Kitchen staff focused on food preparation and menu item stock toggles.**

* **What They CAN Do:**
  * View incoming submitted orders in real-time (via SignalR Kitchen Display System).
  * Update order & item status (`Submitted` -> `Preparing` -> `Ready`).
  * Toggle menu item status (e.g. mark an item as "Unavailable / 86'd" when ingredient runs out during service).
* **What They CANNOT Do:**
  * Create, edit, or cancel customer orders.
  * Process cash/card payments.
  * Perform manual inventory adjustments or view financial reports.

---

### 💳 4. Cashier (`Cashier`)
> **Checkout staff focused on handling payment transactions, invoices, and receipts.**

* **What They CAN Do:**
  * Process payments (Cash, Credit Card, Mobile Pay).
  * Generate and print customer invoices and receipts.
  * View payment transaction history.
  * View order details for billing.
* **What They CANNOT Do:**
  * Apply discounts or issue refunds without Manager approval (`[Authorize(Roles = "Manager")]`).
  * Create or modify order items.
  * Modify inventory levels or employee accounts.

---

### 📦 5. Inventory Manager (`InventoryManager`)
> **Back-of-house staff managing raw ingredients, stock levels, and supply chains.**

* **What They CAN Do:**
  * Create, update, and track raw ingredients and stock units (kg, liters, pcs).
  * Perform manual stock adjustments (`Restock`, `Waste/Spoilage`, `Audit Correction`).
  * Monitor low-stock threshold alerts.
  * Configure recipe item requirements for menu items (e.g. 200g beef per Burger).
* **What They CANNOT Do:**
  * Process customer payments or billing.
  * Access financial sales reports.
  * Manage employee accounts or alter menu prices.