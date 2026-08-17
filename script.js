const products = [
    { id: 1, name: "Vintage Denim Jacket", price: 2500, category: "Jackets", size: "M", condition: "Excellent", image: "images/denim-jacket.jpg" },
    { id: 2, name: "Floral Summer Dress", price: 1800, category: "Dresses", size: "S", condition: "Very Good", image: "images/floral-dress.jpg" },
    { id: 3, name: "Classic Blue Jeans", price: 1600, category: "Jeans", size: "M", condition: "Excellent", image: "images/blue-jeans.jpg" },
    { id: 4, name: "Oversized Cotton T-Shirt", price: 900, category: "T-Shirts", size: "L", condition: "Good", image: "images/cotton-tshirt.jpg" },
    { id: 5, name: "Brown Corduroy Jacket", price: 2200, category: "Jackets", size: "L", condition: "Very Good", image: "images/corduroy-jacket.jpg" },
    { id: 6, name: "Vintage Black Skirt", price: 1400, category: "Skirts", size: "M", condition: "Excellent", image: "images/black-skirt.jpg" },
    { id: 7, name: "Casual Graphic Tee", price: 800, category: "T-Shirts", size: "M", condition: "Good", image: "images/graphic t-shirt.jpg" },
    { id: 8, name: "Classic Beige Trousers", price: 1700, category: "Trousers", size: "M", condition: "Very Good", image: "images/beige-trousers.jpg" },
    { id: 9, name: "Vintage Leather Bag", price: 1900, category: "Bags", size: "Medium", condition: "Excellent", image: "images/vintage leather bag.jpg" },
    { id: 10, name: "Classic White Sneakers", price: 2100, category: "Shoes", size: "42", condition: "Very Good", image: "images/classic white shoes.jpg" },
    { id: 11, name: "Denim Mini Skirt", price: 1300, category: "Skirts", size: "S", condition: "Excellent", image: "images/mini skirt.jpg" },
    { id: 12, name: "Vintage Hoodie", price: 2000, category: "Hoodies", size: "L", condition: "Good", image: "images/hoodie.jpg" },
    { id: 13, name: "Black Oversized Shirt", price: 1200, category: "Shirts", size: "M", condition: "Very Good", image: "images/Black Oversized Shirt.jpg" },
    { id: 14, name: "Classic Brown Boots", price: 2800, category: "Shoes", size: "41", condition: "Excellent", image: "images/Classic Brown Boots.jpg" },
    { id: 15, name: "Floral Vintage Top", price: 1100, category: "Tops", size: "S", condition: "Very Good", image: "images/Floral Vintage Top.jpg" },
    { id: 16, name: "High Waist Mom Jeans", price: 1900, category: "Jeans", size: "M", condition: "Excellent", image: "images/High Waist Mom Jeans.jpg" },
    { id: 17, name: "Vintage Knit Sweater", price: 1750, category: "Sweaters", size: "L", condition: "Good", image: "images/Vintage Knit Sweater.jpg" },
    { id: 18, name: "Canvas Shoulder Bag", price: 1500, category: "Bags", size: "Medium", condition: "Very Good", image: "images/Canvas Shoulder Bag.jpg" },
    { id: 19, name: "Classic Polo Shirt", price: 1000, category: "T-Shirts", size: "M", condition: "Excellent", image: "images/classic polo shirt.jpg" },
    { id: 20, name: "Vintage Cargo Pants", price: 1850, category: "Trousers", size: "L", condition: "Very Good", image: "images/vintage cargo pants.jpg" }
];

const productList = document.getElementById("product-list");
const featuredProducts = document.getElementById("featured-products");
const noProducts = document.getElementById("no-products");

const productObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add("show");
        } else {
            entry.target.classList.remove("show");
        }
    });
}, { threshold: 0.15 });

function displayProducts(items, container) {
    if (!container) return;

    container.innerHTML = "";

    items.forEach(product => {
        const card = document.createElement("article");
        card.className = "product-card";

        card.innerHTML = `
<div class="product-image">
<img src="${product.image}" alt="${product.name}">
</div>
<div class="product-info">
<p class="product-category">${product.category}</p>
<h3>${product.name}</h3>
<p class="product-price">Rs. ${product.price.toLocaleString()}</p>
<div class="product-details">
<span>Size: ${product.size}</span>
<span>${product.condition}</span>
</div>
<div class="product-actions">
<button class="details-btn" onclick="viewDetails(${product.id})">View Details</button>
<button class="cart-btn" onclick="addToCart(${product.id})">Add to Cart</button>
</div>
</div>`;

        container.appendChild(card);
        productObserver.observe(card);
    });
}

displayProducts(products, productList);
displayProducts(products.slice(0, 4), featuredProducts);

let cart = JSON.parse(localStorage.getItem("thriftCart")) || [];

function addToCart(id) {
    const product = products.find(item => item.id === id);
    if (!product) return;

    const item = cart.find(item => item.id === id);

    if (item) {
        item.quantity++;
    } else {
        cart.push({ ...product, quantity: 1 });
    }

    saveCart();

    const count = document.getElementById("cart-count");

    if (count) {
        count.classList.remove("bump");
        void count.offsetWidth;
        count.classList.add("bump");
    }

    alert(product.name + " added to cart");
}

function saveCart() {
    localStorage.setItem("thriftCart", JSON.stringify(cart));
    updateCartCount();
    displayCart();
}

function updateCartCount() {
    const count = document.getElementById("cart-count");

    if (!count) return;

    count.textContent = cart.reduce((total, item) => total + item.quantity, 0);
}

function displayCart() {
    const cartItems = document.getElementById("cart-items");
    const cartTotal = document.getElementById("cart-total");
    const emptyCart = document.getElementById("empty-cart");

    if (!cartItems) return;

    cartItems.innerHTML = "";

    if (cart.length === 0) {
        if (emptyCart) emptyCart.style.display = "block";
        if (cartTotal) cartTotal.textContent = "Rs. 0";
        return;
    }

    if (emptyCart) emptyCart.style.display = "none";

    let total = 0;

    cart.forEach(item => {
        total += item.price * item.quantity;

        const div = document.createElement("div");
        div.className = "cart-item";

        div.innerHTML = `
<div class="cart-item-image">
<img src="${item.image}" alt="${item.name}">
</div>
<div class="cart-item-info">
<h4>${item.name}</h4>
<p>Rs. ${item.price.toLocaleString()}</p>
<div class="quantity-controls">
<button onclick="decreaseQuantity(${item.id})">−</button>
<span>${item.quantity}</span>
<button onclick="increaseQuantity(${item.id})">+</button>
</div>
<p>Rs. ${(item.price * item.quantity).toLocaleString()}</p>
<button class="remove-cart-item" onclick="removeFromCart(${item.id})">Remove</button>
</div>`;

        cartItems.appendChild(div);
    });

    if (cartTotal) {
        cartTotal.textContent = "Rs. " + total.toLocaleString();
    }
}

function increaseQuantity(id) {
    const item = cart.find(item => item.id === id);

    if (item) {
        item.quantity++;
        saveCart();
    }
}

function decreaseQuantity(id) {
    const item = cart.find(item => item.id === id);

    if (!item) return;

    if (item.quantity > 1) {
        item.quantity--;
    } else {
        cart = cart.filter(item => item.id !== id);
    }

    saveCart();
}

function removeFromCart(id) {
    cart = cart.filter(item => item.id !== id);
    saveCart();
}

function viewDetails(id) {
    const product = products.find(item => item.id === id);

    if (!product) return;

    const detailsModal = document.getElementById("details-modal");
    const detailsImage = document.getElementById("details-image");
    const detailsCategory = document.getElementById("details-category");
    const detailsName = document.getElementById("details-name");
    const detailsPrice = document.getElementById("details-price");
    const detailsSize = document.getElementById("details-size");
    const detailsCondition = document.getElementById("details-condition");
    const detailsCart = document.getElementById("details-cart");

    if (!detailsModal) return;

    detailsImage.src = product.image;
    detailsImage.alt = product.name;
    detailsCategory.textContent = product.category;
    detailsName.textContent = product.name;
    detailsPrice.textContent = "Rs. " + product.price.toLocaleString();
    detailsSize.textContent = product.size;
    detailsCondition.textContent = product.condition;

    detailsCart.onclick = function () {
        addToCart(product.id);
    };

    detailsModal.classList.add("active");
}

const detailsModal = document.getElementById("details-modal");
const closeDetails = document.getElementById("close-details");

if (closeDetails && detailsModal) {
    closeDetails.addEventListener("click", function () {
        detailsModal.classList.remove("active");
    });
}

if (detailsModal) {
    detailsModal.addEventListener("click", function (event) {
        if (event.target === detailsModal) {
            detailsModal.classList.remove("active");
        }
    });
}

const searchInput = document.getElementById("search-input");

if (searchInput) {
    searchInput.addEventListener("input", function () {
        const text = this.value.toLowerCase().trim();

        const filtered = products.filter(product =>
            product.name.toLowerCase().includes(text) ||
            product.category.toLowerCase().includes(text)
        );

        displayProducts(filtered, productList);

        if (noProducts) {
            noProducts.style.display = filtered.length === 0 ? "block" : "none";
        }
    });
}

const menuBtn = document.getElementById("menu-btn");
const navLinks = document.getElementById("nav-links");

if (menuBtn && navLinks) {
    menuBtn.addEventListener("click", function () {
        navLinks.classList.toggle("active");
        menuBtn.classList.toggle("open");
    });

    navLinks.querySelectorAll("a").forEach(link => {
        link.addEventListener("click", function () {
            navLinks.classList.remove("active");
            menuBtn.classList.remove("open");
        });
    });
}

const heroSlider = document.querySelector(".hero-slider");
const heroImages = document.querySelectorAll(".hero-slider img");
let currentSlide = 0;

if (heroSlider && heroImages.length) {
    setInterval(function () {
        currentSlide++;

        if (currentSlide >= heroImages.length) {
            currentSlide = 0;
        }

        heroSlider.style.transform = `translateX(-${currentSlide * 100}%)`;
    }, 3500);
}

const searchIcon = document.getElementById("search-icon");
const categoryMenu = document.getElementById("category-menu");

if (searchIcon && categoryMenu) {
    searchIcon.addEventListener("click", function (event) {
        event.stopPropagation();
        categoryMenu.classList.toggle("active");
    });
}

document.addEventListener("click", function (event) {
    if (categoryMenu && !categoryMenu.contains(event.target) && event.target !== searchIcon) {
        categoryMenu.classList.remove("active");
    }
});

function showCategory(category) {
    const filtered = products.filter(product =>
        product.category.toLowerCase() === category.toLowerCase()
    );

    displayProducts(filtered, productList);

    if (noProducts) {
        noProducts.style.display = filtered.length === 0 ? "block" : "none";
    }

    if (categoryMenu) {
        categoryMenu.classList.remove("active");
    }

    document.getElementById("shop").scrollIntoView({
        behavior: "smooth"
    });
}

const sections = document.querySelectorAll(".section-heading,.simple-section");

const sectionObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add("show");
        }
    });
}, { threshold: 0.15 });

sections.forEach(section => {
    sectionObserver.observe(section);
});

const preloader = document.getElementById("preloader");

window.addEventListener("load", function () {
    setTimeout(function () {
        if (preloader) {
            preloader.classList.add("hide");
        }
    }, 1200);
});

const navbar = document.getElementById("main-navbar");

window.addEventListener("scroll", function () {
    if (!navbar) return;

    if (window.scrollY > 30) {
        navbar.classList.add("scrolled");
    } else {
        navbar.classList.remove("scrolled");
    }
});

document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener("click", function (event) {
        const target = document.querySelector(this.getAttribute("href"));

        if (target) {
            event.preventDefault();
            target.scrollIntoView({
                behavior: "smooth"
            });
        }
    });
});

updateCartCount();
displayCart();










/*  ABOUT US - LEARN MORE */

const learnMoreBtn = document.getElementById("learnMoreBtn");
const aboutMore = document.getElementById("aboutMore");

if (learnMoreBtn && aboutMore) {

    learnMoreBtn.addEventListener("click", function () {

        if (aboutMore.style.display === "block") {

            aboutMore.style.display = "none";
            learnMoreBtn.textContent = "Learn More";

        } else {

            aboutMore.style.display = "block";
            learnMoreBtn.textContent = "Show Less";

        }

    });

}

// CONTACT US - SAVE DATA TO LOCAL STORAGE

const contactForm = document.getElementById("contactForm");

if (contactForm) {

    contactForm.addEventListener("submit", function (event) {

        event.preventDefault();

        const nameInput = contactForm.querySelector(
            'input[name="name"], #contactName, #name'
        );

        const emailInput = contactForm.querySelector(
            'input[name="email"], #contactEmail, #email'
        );

        const messageInput = contactForm.querySelector(
            'textarea[name="message"], #contactMessage, #message'
        );

        const name = nameInput ? nameInput.value.trim() : "";
        const email = emailInput ? emailInput.value.trim() : "";
        const message = messageInput ? messageInput.value.trim() : "";


        // =========================
        // EMPTY FIELD VALIDATION
        // =========================

        if (name === "" || email === "" || message === "") {

            alert("Please fill in all fields.");

            return;
        }


        // =========================
        // NAME VALIDATION
        // =========================

        const namePattern = /^[A-Za-z\s]+$/;

        if (!namePattern.test(name)) {

            alert("Please enter a valid name.");

            nameInput.focus();

            return;
        }


        if (name.length < 2) {

            alert("Name must contain at least 2 characters.");

            nameInput.focus();

            return;
        }


        // =========================
        // EMAIL VALIDATION
        // =========================

        const emailPattern =
            /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!emailPattern.test(email)) {

            alert("Please enter a valid email address.");

            emailInput.focus();

            return;
        }


        // =========================
        // MESSAGE VALIDATION
        // =========================

        if (message.length < 10) {

            alert(
                "Message must contain at least 10 characters."
            );

            messageInput.focus();

            return;
        }


        // =========================
        // GET EXISTING MESSAGES
        // =========================

        let contactMessages =
            JSON.parse(
                localStorage.getItem("contactMessages")
            ) || [];

        const newMessage = {

            id: Date.now(),

            name: name,

            email: email,

            message: message,

            date: new Date().toLocaleString()

        };

        contactMessages.push(newMessage);

        localStorage.setItem(
            "contactMessages",
            JSON.stringify(contactMessages)
        );

        alert(
            "Thank you! Your message has been sent successfully."
        );

        contactForm.reset();

    });

}



// PERSONALIZATION//

function welcomeUser() {

    const nameInput = document.getElementById("userName");
    const nameSection = document.getElementById("nameSection");
    const welcomeSection = document.getElementById("welcomeSection");
    const welcomeText = document.getElementById("welcomeText");

    const name = nameInput.value.trim();

    if (name === "") {
        alert("Please enter your name.");
        return;
    }

    // Save name
    localStorage.setItem("userName", name);

    // Hide name section
    if (nameSection) {
        nameSection.style.display = "none";
    }

    // Show welcome section
    if (welcomeSection) {
        welcomeSection.style.display = "flex";
    }

    // Show welcome text
    if (welcomeText) {
        welcomeText.textContent = "Welcome, " + name + "!";
    }
}


//  START SHOPPING//

function goToHome() {

    const welcomeSection =
        document.getElementById("welcomeSection");

    if (welcomeSection) {
        welcomeSection.style.display = "none";
    }

    window.location.href = "#home";
}

//email alert//
document.getElementById("newsletterForm").addEventListener("submit", function (event) {

    event.preventDefault();

    alert("Thank you! You have successfully subscribed to our newsletter.");

    this.reset();

});
// DATE + TIME//

function updateDateTime() {

    const now = new Date();


    // DATE//

    const dateElement =
        document.getElementById("date");

    if (dateElement) {

        const dateOptions = {

            weekday: "short",
            day: "2-digit",
            month: "long",
            year: "numeric"

        };

        dateElement.textContent =
            now.toLocaleDateString(
                "en-GB",
                dateOptions
            );
    }


    // TIME//

    const timeElement =
        document.getElementById("time");

    if (timeElement) {

        timeElement.textContent =
            now.toLocaleTimeString(
                "en-US",
                {
                    hour: "2-digit",
                    minute: "2-digit",
                    second: "2-digit",
                    hour12: true
                }
            );
    }
}


// Run immediately
updateDateTime();


// Update every second
setInterval(
    updateDateTime,
    1000
);


//VISITOR COUNT
let visitorCount =
    localStorage.getItem(
        "websiteVisitorCount"
    );


// First visitor
if (visitorCount === null) {

    visitorCount = 1;

} else {

    visitorCount =
        Number(visitorCount) + 1;
}


// Save visitor count
localStorage.setItem(
    "websiteVisitorCount",
    visitorCount
);


// Display visitor count
const visitorElement =
    document.getElementById(
        "visitorCount"
    );

if (visitorElement) {

    visitorElement.textContent =
        visitorCount;
}


// WORLD MAP //

// Check whether map element exists
const mapElement =
    document.getElementById("map");


if (mapElement) {


    // CREATE MAP //

    const map =
        L.map(
            "map",
            {
                zoomControl: false,
                worldCopyJump: false
            }
        ).setView(
            [20, 0],
            2
        );


    // OPEN STREET MAP //

    L.tileLayer(
        "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
        {
            maxZoom: 19,
            noWrap: true,
            attribution:
                "&copy; OpenStreetMap contributors"
        }
    ).addTo(map);


    // CUSTOM LOCATION PIN //

    const locationIcon =
        L.divIcon({

            className:
                "custom-location-marker",

            html: `
                <div class="location-pin">
                    <div class="pin-circle"></div>
                </div>
            `,

            iconSize: [40, 50],

            iconAnchor: [20, 50],

            popupAnchor: [0, -50]

        });

    // GET VISITOR LOCATION

    fetch("https://ipwho.is/")
        .then(function (response) {

            if (!response.ok) {
                throw new Error("Location API failed");
            }

            return response.json();
        })

        .then(function (data) {

            console.log("Location data:", data);

            if (!data.success) {
                throw new Error("Location data unavailable");
            }

            const city = data.city || "";
            const region = data.region || "";
            const country = data.country || "";

            const lat = Number(data.latitude);
            const lon = Number(data.longitude);

            let locationName = "Location unavailable";

            if (city && region && country) {

                locationName =
                    city + ", " +
                    region + ", " +
                    country;

            } else if (city && country) {

                locationName =
                    city + ", " +
                    country;

            } else if (country) {

                locationName = country;
            }

            // DISPLAY LOCATION

            const locationElement =
                document.getElementById("location");

            if (locationElement) {

                locationElement.textContent =
                    locationName;
            }

            // ADD LOCATION PIN

            if (!isNaN(lat) && !isNaN(lon)) {

                const marker =
                    L.marker(
                        [lat, lon],
                        {
                            icon: locationIcon
                        }
                    ).addTo(map);

                marker.bindPopup(
                    "<b>📍 Visitor Location</b><br>" +
                    locationName
                );

                marker.bindTooltip(
                    locationName,
                    {
                        permanent: true,
                        direction: "top",
                        offset: [0, -48],
                        className: "location-label"
                    }
                );

                map.setView(
                    [lat, lon],
                    6
                );

                console.log(
                    "Pin added at:",
                    lat,
                    lon
                );

            }

        })

        .catch(function (error) {

            console.error(
                "Location error:",
                error
            );

            const locationElement =
                document.getElementById("location");

            if (locationElement) {

                locationElement.textContent =
                    "Location unavailable";
            }
        });


    // FIX MAP SIZE

    setTimeout(function () {

        map.invalidateSize();

    }, 500);
}