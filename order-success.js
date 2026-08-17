const order =
    JSON.parse(
        localStorage.getItem("lastOrder")
    );

if (!order) {

    alert("No order found.");

    window.location.href =
        "index.html";
}

document.getElementById("order-id").textContent =
    order.orderId;

document.getElementById("order-status").textContent =
    order.status;

document.getElementById("order-date").textContent =
    order.date;

document.getElementById("customer-name").textContent =
    order.customer.name;

document.getElementById("customer-phone").textContent =
    order.customer.phone;

document.getElementById("customer-email").textContent =
    order.customer.email;

document.getElementById("customer-city").textContent =
    order.customer.city;

document.getElementById("customer-address").textContent =
    order.customer.address;

document.getElementById("customer-postal").textContent =
    order.customer.postalCode;

document.getElementById("payment-method").textContent =
    order.paymentMethod;

const productsContainer =
    document.getElementById("ordered-products");

productsContainer.innerHTML = "";

order.products.forEach(product => {

    const price =
        Number(product.price) || 0;

    const quantity =
        Number(product.quantity) || 1;

    const itemTotal =
        price * quantity;

    productsContainer.innerHTML += `

        <div class="ordered-product">

            <div class="ordered-product-info">

                <img
                    src="${product.image}"
                    alt="${product.name}"
                >

                <div>

                    <h4>
                        ${product.name}
                    </h4>

                    <p>
                        Quantity: ${quantity}
                    </p>

                </div>

            </div>

            <strong>
                Rs. ${itemTotal.toLocaleString()}
            </strong>

        </div>

    `;
});

document.getElementById("order-subtotal").textContent =
    `Rs. ${order.subtotal.toLocaleString()}`;

document.getElementById("order-delivery").textContent =
    `Rs. ${order.delivery.toLocaleString()}`;

document.getElementById("order-discount").textContent =
    `- Rs. ${order.discount.toLocaleString()}`;

document.getElementById("order-total").textContent =
    `Rs. ${order.total.toLocaleString()}`;