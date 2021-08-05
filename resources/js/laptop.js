// DOM Elements
const selectElement = document.getElementById("select");
const laptopTitleElement = document.getElementById("laptop-title");
const laptopDescriptionElement = document.getElementById("laptop-description");
const laptopPriceElement = document.getElementById("laptop-price");
const laptopFeatures = document.getElementById("features");
const laptopImageElement = document.getElementById("laptop-image");
const laptopStockElement = document.getElementById("laptop-stock");

// DOM Buttons
const buyButton = document.getElementById("buy-button");

// Variables
let laptops = [];
let selectedLaptop;
let baseURL = "https://noroff-komputer-store-api.herokuapp.com/";

// Fetching laptops from api at page load, fill select element with fetched laptops.
fetch(baseURL + "computers")
    .then((response) => response.json())
    .then((data) => (laptops = data))
    .then((laptops) => addLaptopsToSelectElement(laptops));

/**
 * Fills the select element with laptops from an array of laptops.
 * Selects the first laptop in array and renders to webpage.
 * 
 * @param {*} laptops Array of laptops to fill select element with.
 */
const addLaptopsToSelectElement = (laptops) => {
    for (let index = 0; index < laptops.length; index++) {
        let laptop = laptops[index];
        selectElement.options[selectElement.options.length] = new Option(laptop.title, index);
    }

    selectedLaptop = laptops[0];
    renderLaptop(selectedLaptop);
    updateAllBalances();
};

/**
 * Render information about a single laptop onto webpage.
 * Updates elements associated with a laptop.
 * 
 * @param {*} laptop The laptop to get information from and then update page with.
 */
function renderLaptop(laptop) {
    laptopTitleElement.innerText = laptop.title;
    laptopDescriptionElement.innerText = laptop.description;
    laptopPriceElement.innerText = `${laptop.price} SEK`;
    laptopImageElement.src = baseURL + laptop.image;

    let specs = laptop.specs;
    renderSpecs(specs, laptopFeatures);
    updateLaptopStockOnPage();
}

/**
 * Render specs from a laptop onto webpage.
 * Creates paragraph elements containing the laptops different specifications.
 * 
 * @param {*} specs The specifications based on selected laptop.
 * @param {*} parentElement The parent element to add paragraphs to containing every specification.
 */
function renderSpecs(specs, parentElement) {
    parentElement.innerHTML = "";

    specs.forEach((spec) => {
        const specParagraphElement = document.createElement("p");
        specParagraphElement.innerText = spec;

        parentElement.appendChild(specParagraphElement);
    });
}

/**
 * Method for trying to buy a laptop.
 * Checks if bank has sufficient balance and that the laptop is in stock.
 * If it is, the laptop will be bought and the balance will be reduced based on price of laptop.
 * 
 * The laptops stock will also be decreased by 1.
 */
const buyLaptop = () => {
    let laptopPrice = selectedLaptop.price;

    // Check if we can afford laptop with our balance.
    if (bank.getBalance < laptopPrice) {
        alert(`Insufficient funds. You are missing ${laptopPrice - bank.getBalance} SEK.`);
    } else {
        // Check if laptop is in stock.
        if (!isLaptopInStock()) {
            alert("You cannot buy this laptop becase it's not in stock.");
        } else {
            reduceLaptopStock();
            updateLaptopStockOnPage();
            bank.removeFromBalance(laptopPrice);
            alert(`You are now the proud owner of a ${selectedLaptop.title}`);
        }
    }

    updateBankBalanceOnPage();
};

/**
 * Checks whether the laptop is in stock or not.
 * 
 * @returns true if selected laptop is in stock, false if it's not.
 */
function isLaptopInStock() {
    let stock = selectedLaptop.stock;
    return stock >= 1 ? true : false;
}

/**
 * Reduces the selected laptops stock by 1.
 */
function reduceLaptopStock() {
    selectedLaptop.stock -= 1;
}

/**
 * Updates the laptop stock element on webpage.
 * Will change the elements color based on how many laptops there are in stock.
 * 
 * If stock is greater than 10 and the element will be GREEN.
 * 
 * If stock is greater than 5 and the element will be ORANGE.
 * 
 * If stock is less than 5 and the element will be RED.
 */
function updateLaptopStockOnPage() {
    laptopStockElement.innerText = `Items in stock: ${selectedLaptop.stock}`;

    if (selectedLaptop.stock >= 10) {
        laptopStockElement.style.color = "green";
    } else if (selectedLaptop.stock >= 5) {
        laptopStockElement.style.color = "orange";
    } else {
        laptopStockElement.style.color = "red";
    }
}

/* ================================= */
/*          EVENT LISTENERS          */
/* ================================= */

buyButton.addEventListener("click", buyLaptop);

// Will trigger when the selected item from the select element has changed.
selectElement.addEventListener("change", (event) => {
    let selectIndex = selectElement.selectedIndex;
    selectedLaptop = laptops[selectIndex];

    console.log(`SelectedIndex: ${selectIndex} Laptop: ${selectedLaptop.title}`);
    renderLaptop(selectedLaptop);
});

// If error occurs while trying to modify image src, set a placeholder image.
laptopImageElement.addEventListener("error", (event) => {
    console.log(`${event.type}: Loading image.`);
    laptopImageElement.src = "https://edgepharm.com/wp-content/uploads/2020/01/image-placeholder.jpg";
});
