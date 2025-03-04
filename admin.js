function fetchOrders() {
    fetch("http://localhost:3000/api/orders")
        .then(response => response.json())
        .then(orders => {
            const orderTable = document.getElementById("orderTable");
            orderTable.innerHTML = "";
            orders.forEach(order => {
                orderTable.innerHTML += `
                    <tr>
                        <td>${order.id}</td>
                        <td>${order.table_number}</td>
                        <td>${JSON.parse(order.items).map(item => `${item.name} (${item.quantity})`).join(", ")}</td>
                        <td><button onclick="deleteOrder(${order.id})">Delete</button></td>
                    </tr>`;
            });
        })
        .catch(error => console.error("Error:", error));
}

function deleteOrder(orderId) {
    fetch(`http://localhost:3000/api/orders/${orderId}`, { method: "DELETE" })
        .then(response => response.json())
        .then(() => {
            alert("Order deleted!");
            fetchOrders();
        })
        .catch(error => console.error("Error:", error));
}

document.addEventListener("DOMContentLoaded", fetchOrders);
