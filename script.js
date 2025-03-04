// script.js - Handles customer order placement

let orderItems = [];

function addItem() {
    const itemName = document.getElementById('itemName').value;
    const itemQuantity = document.getElementById('itemQuantity').value;
    if (itemName && itemQuantity) {
        orderItems.push({ name: itemName, quantity: itemQuantity });
        displayOrder();
    }
}

function displayOrder() {
    const orderList = document.getElementById('orderList');
    orderList.innerHTML = '';
    orderItems.forEach((item, index) => {
        orderList.innerHTML += `<li>${item.name} - ${item.quantity} <button onclick="removeItem(${index})">Remove</button></li>`;
    });
}

function removeItem(index) {
    orderItems.splice(index, 1);
    displayOrder();
}

function placeOrder() {
    const tableNumber = document.getElementById('tableNumber').value;
    if (!tableNumber || orderItems.length === 0) {
        alert('Please enter table number and add items.');
        return;
    }
    fetch('http://localhost:3000/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ table_number: tableNumber, items: orderItems })
    }).then(response => response.json()).then(data => {
        alert('Order placed successfully!');
        orderItems = [];
        displayOrder();
    }).catch(error => console.error('Error:', error));
}
