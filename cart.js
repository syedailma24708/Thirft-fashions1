const deliveryCharge = 250;
const discount = 500;

let cart = JSON.parse(localStorage.getItem("thriftCart")) || [];

const productsContainer =
    document.getElementById("checkout-products");

const subtotalElement =
    document.getElementById("subtotal");

const deliveryElement =
    document.getElementById("delivery");

const discountElement =
    document.getElementById("discount");

const totalElement =
    document.getElementById("total");

function loadCheckout() {

    cart = JSON.parse(localStorage.getItem("thriftCart")) || [];

    productsContainer.innerHTML = "";

    let subtotal = 0;

    if (cart.length === 0) {

        productsContainer.innerHTML = `
            <div class="empty-cart">
                Your cart is empty.
            </div>
        `;

        subtotalElement.textContent = "Rs. 0";
        deliveryElement.textContent = "Rs. 0";
        discountElement.textContent = "- Rs. 0";
        totalElement.textContent = "Rs. 0";

        return;
    }

    cart.forEach((product, index) => {

        const price = Number(product.price) || 0;

        const quantity =
            Number(product.quantity) || 1;

        subtotal += price * quantity;

        productsContainer.innerHTML += `

            <div class="checkout-product">

                <div class="product-info">

                    <img
                        src="${product.image}"
                        alt="${product.name}"
                    >

                    <div>

                        <h4>
                            ${product.name}
                        </h4>

                        <div class="quantity-control">

                            <button
                                type="button"
                                class="quantity-btn"
                                onclick="decreaseQuantity(${index})">

                                −

                            </button>

                            <span class="quantity">
                                ${quantity}
                            </span>

                            <button
                                type="button"
                                class="quantity-btn"
                                onclick="increaseQuantity(${index})">

                                +

                            </button>

                        </div>

                    </div>

                </div>

                <strong>
                    Rs. ${(price * quantity).toLocaleString()}
                </strong>

            </div>

        `;
    });

    const total =
        subtotal + deliveryCharge - discount;

    subtotalElement.textContent =
        `Rs. ${subtotal.toLocaleString()}`;

    deliveryElement.textContent =
        `Rs. ${deliveryCharge.toLocaleString()}`;

    discountElement.textContent =
        `- Rs. ${discount.toLocaleString()}`;

    totalElement.textContent =
        `Rs. ${total.toLocaleString()}`;
}

function increaseQuantity(index) {

    if (!cart[index]) {
        return;
    }

    cart[index].quantity =
        (Number(cart[index].quantity) || 1) + 1;

    localStorage.setItem(
        "thriftCart",
        JSON.stringify(cart)
    );

    loadCheckout();
}

function decreaseQuantity(index) {

    if (!cart[index]) {
        return;
    }

    cart[index].quantity =
        (Number(cart[index].quantity) || 1) - 1;

    if (cart[index].quantity <= 0) {
        cart.splice(index, 1);
    }

    localStorage.setItem(
        "thriftCart",
        JSON.stringify(cart)
    );

    loadCheckout();
}

function placeOrder() {

    if (cart.length === 0) {

        alert("Your cart is empty!");

        return;
    }

    const billingSection =
        document.getElementById("billing-section");

    const paymentSection =
        document.getElementById("payment-section");

    if (!billingSection || !paymentSection) {
        return;
    }

    billingSection.style.display = "block";
    paymentSection.style.display = "block";

    billingSection.scrollIntoView({
        behavior: "smooth",
        block: "start"
    });
}

function confirmOrder() {

    if (cart.length === 0) {
        alert("Your cart is empty!");
        return;
    }

    const customerName =
        document.getElementById("customer-name").value.trim();

    const customerPhone =
        document.getElementById("customer-phone").value.trim();

    const customerEmail =
        document.getElementById("customer-email").value.trim();

    const customerCity =
        document.getElementById("customer-city").value.trim();

    const customerAddress =
        document.getElementById("customer-address").value.trim();

    const customerPostal =
        document.getElementById("customer-postal").value.trim();

    if (!customerName) {
        alert("Please enter your full name.");
        return;
    }

    if (!/^[A-Za-z\s]{3,50}$/.test(customerName)) {
        alert("Please enter a valid name using letters only.");
        return;
    }

    if (!customerPhone) {
        alert("Please enter your phone number.");
        return;
    }

    if (!/^03[0-9]{9}$/.test(customerPhone.replace(/\s/g, ""))) {
        alert("Please enter a valid Pakistani phone number.");
        return;
    }

    if (!customerEmail) {
        alert("Please enter your email address.");
        return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(customerEmail)) {
        alert("Please enter a valid email address.");
        return;
    }

    if (!customerCity) {
        alert("Please enter your city.");
        return;
    }

    if (!/^[A-Za-z\s]{2,40}$/.test(customerCity)) {
        alert("Please enter a valid city name.");
        return;
    }

    if (!customerAddress) {
        alert("Please enter your complete address.");
        return;
    }

    if (customerAddress.length < 5) {
        alert("Please enter a valid complete address.");
        return;
    }

    if (!customerPostal) {
        alert("Please enter your postal code.");
        return;
    }

    if (!/^[0-9]{5}$/.test(customerPostal)) {
        alert("Please enter a valid 5-digit postal code.");
        return;
    }

    const selectedPayment =
        document.querySelector(
            'input[name="payment"]:checked'
        );

    if (!selectedPayment) {
        alert("Please select a payment method.");
        return;
    }

    const subtotal =
        cart.reduce((sum, product) => {

            const price =
                Number(product.price) || 0;

            const quantity =
                Number(product.quantity) || 1;

            return sum + (price * quantity);

        }, 0);

    const total =
        subtotal + deliveryCharge - discount;

    const order = {

        orderId:
            "THR-" + Date.now(),

        customer: {

            name:
                customerName,

            phone:
                customerPhone,

            email:
                customerEmail,

            city:
                customerCity,

            address:
                customerAddress,

            postalCode:
                customerPostal

        },

        products:
            cart,

        subtotal:
            subtotal,

        delivery:
            deliveryCharge,

        discount:
            discount,

        total:
            total,

        paymentMethod:
            selectedPayment.value,

        date:
            new Date().toLocaleString(),

        status:
            "Placed"
    };

    localStorage.setItem(
        "lastOrder",
        JSON.stringify(order)
    );

    localStorage.removeItem("thriftCart");

    window.location.href =
        "order-success.html";
}

loadCheckout();