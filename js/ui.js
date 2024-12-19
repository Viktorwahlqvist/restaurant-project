const errorMsg = document.createElement('p');
errorMsg.classList.add('error-msg');
const sectionContainer = document.getElementById('sectionContainer');

// Function to display menu items from the database.
export function displayMenu(db){
    console.log(db);
    
    // Create an unordered list to hold menu items.
    const ul = document.createElement('ul');
    ul.classList.add('food-drink-ul');

    
    /* Iterate over each key-value pair in the given section of the database (db).
    Using Object.entries(db), we destructure each entry into 'key' and 'value',
    allowing access to properties like value.name, value.dsc, etc. */
    for (const[key, value] of Object.entries(db)){
        // Create a subheader (title) for the menu item.
        const subheader = document.createElement('h2');
        subheader.classList.add('food-drink-title');
        subheader.textContent = `${value.name}`;

        // Create an image element for the menu item.
        const image = document.createElement('img');
        image.src = value.img;
        image.alt = `Picture of ${value.dsc}`;
        image.classList.add('food-drink-image');

        // Create a paragraph for the item's rating.
        const rate = document.createElement('p');
        rate.classList.add('food-drink-rate');
        rate.textContent = `Rate : `;
        // Loop to create as many stars as the rating.
        for (let i = 0; i < value.rate; i++) {
            const star = document.createElement("i");
            star.classList.add('bx', 'bxs-star');
            rate.appendChild(star);
        }
        
        // Create a paragraph for the item's description.
        const desc = document.createElement('p');
        desc.textContent = value.dsc;
        desc.classList.add('food-drink-desc');

        // Create a paragraph for the item's price.
        const price = document.createElement('p');
        price.textContent = `Price : ${value.price}Kr`;
        price.classList.add('food-drink-price');

        // Create a paragraph for the item's country of origin.
        const country = document.createElement('p');
        country.textContent = `Country of origin : ${value.country}`;
        country.classList.add('food-drink-country');

        // Create a button for adding the item to the cart.
        const addBtn = document.createElement('button');
        addBtn.setAttribute('aria-label', 'Add item to menu');
        // Create the <i> element for the icon
        const icon = document.createElement("i");
        icon.classList.add("fa-solid", "fa-plus");
        addBtn.appendChild(icon);
        addBtn.classList.add('add-btn');
        addBtn.addEventListener('click', () => {
            // Add the item to the cart when clicked
            addToCart(value); 
        });

        // Create a button for removing the item from the cart.
        const removeBtn = document.createElement('button');
        removeBtn.setAttribute('aria-label', 'Remove from the menu');
        // Create the <i> element for the icon
        const removeIcon = document.createElement("i");
        removeIcon.classList.add("fa-solid", "fa-minus");
        removeBtn.appendChild(removeIcon);
        removeBtn.classList.add('remove-btn');
        removeBtn.addEventListener('click', () => {
            // Remove the item from the cart when clicked
            removeFromCart(value); 
        });

        // Create a list item to hold all menu item information.
        const listItem = document.createElement('li');
        listItem.classList.add('food-drink-li');

        // Create an article to group description, rate, price, and country details.
        const articleContainer = document.createElement('article');
        articleContainer.classList.add('food-drink-container', 'display-info');

        // Append all details (description, rate, price, country) to the article container.
        articleContainer.appendChild(desc);
        articleContainer.appendChild(country);
        articleContainer.appendChild(rate);
        
        // Create a button to toggle the visibility of the article container.
        const infoBtn = document.createElement('button');
        const infoIcon = document.createElement("i");
        infoIcon.classList.add('bx', 'bx-info-circle');
        infoBtn.appendChild(infoIcon);
        infoBtn.classList.add('info-btn');

        // Add an event listener to toggle the visibility of the article container.
        infoBtn.addEventListener('click', () => {
            articleContainer.classList.toggle('display-info'); // Toggle article visibility
            image.classList.toggle('hidden'); // Toggle image visibility
        });

        // Append the subheader, image, and article container to the list item.
        listItem.appendChild(subheader);
        listItem.appendChild(infoBtn);
        listItem.appendChild(image);
        listItem.appendChild(articleContainer);
        listItem.appendChild(price);
        listItem.appendChild(removeBtn);
        listItem.appendChild(addBtn);

        // Append the list item to the unordered list.
        ul.appendChild(listItem);
    }

    // Append the unordered list to the body (replace this with a specific container later).
    sectionContainer.appendChild(ul);
}

// Function for adding item to cart.
function addToCart(item){
    // Get the cart from localStorage, or create a new one if it doesn't exist.
    let cart = JSON.parse(localStorage.getItem('cart')) || [];

    // Check if the item already exists in the cart.
    const existingItem = cart.find(cartItem => cartItem.name === item.name);

    // If the item exists, update the quantity with the reference we got from find.
    if (existingItem) {
        existingItem.quantity += 1;
        console.log(`Updated quantity: ${JSON.stringify(cart)}`);
    } else {
        // If the item doesn't exist in the cart, add the item with a quantity of 1.
        item.quantity = 1;
        cart.push(item);
        console.log(`Cart updated: ${JSON.stringify(cart)}`);
    }

    // Update the localStorage with the updated cart.
    localStorage.setItem("cart", JSON.stringify(cart));
}

// Function for removing item from cart.
function removeFromCart(item){
    // Get the cart from localStorage, or create a new one if it doesn't exist.
    let cart = JSON.parse(localStorage.getItem('cart')) || [];

    // Check if the item already exists in the cart.
    const existingItem = cart.find(cartItem => cartItem.name === item.name);

    // If the item exists && quantity is more than 1, update the quantity.
    if (existingItem && existingItem.quantity > 1){
        existingItem.quantity -= 1;
        console.log(`Updated quantity (Removed): ${JSON.stringify(cart)}`);
    }
    // If the item exists and quantity is 1, remove it.
    else if (existingItem){
        const itemIndex = cart.indexOf(existingItem);
        cart.splice(itemIndex, 1);
        console.log('Cart updated (Removed)');
    }
    else {
        console.log('No match');
    }

    // Update the localStorage with the updated cart.
    localStorage.setItem("cart", JSON.stringify(cart));
}

// Function to filter items in the database based on the specified rating.
function filterByRate(rate, db) {
    // Create an array to hold the results.
    const results = [];
    // Loop through all categories in the database, using category names as keys.
    for (const category of Object.keys(db)) {
        // Assign the items of the current category to the variable 'items'.
        const items = db[category];
        // Check that 'items' is an array so we can apply the filter method.
        if (Array.isArray(items)) {
            // Filter 'items' to find those with the same 'rate' value and push them to the 'results' array.
            results.push(...items.filter(item => item.rate === rate));
        }
    }
    return results;
}

// Function for general search across all categories.
function generalSearch(term, db) {
    // Create an array to hold the results.
    const results = [];
    // Ensure that the search term is treated as a string and convert it to lowercase for case-insensitive comparison.
    const lowerTerm = term.toString().toLowerCase();
    // Loop through all categories in the database, using category names as keys.
    for (const category of Object.keys(db)) {
         // Assign the items of the current category to the variable 'items'.
        const items = db[category];
        // Check that 'items' is an array so we can apply the filter method.
        if (Array.isArray(items)) {
            // Filter 'items' to find those with the same item value and push them to the 'results' array.
            results.push(...items.filter(item =>
                Object.values(item).some(value =>
                    value?.toString().toLowerCase().includes(lowerTerm)
                )
            ));
        }
    }
    return results;
}

// Function that searches the menu based on the user's input.
export function searchMenu(searchTerm, db) {
    let results = [];
    
    if (!isNaN(searchTerm) && searchTerm.toString().length === 1) {
        // If the search term is a number of length 1, search for rating.
       results = filterByRate(Number(searchTerm), db);
    } else {
        // Otherwise, do a general search.
        results = generalSearch(searchTerm, db);
    }
    // If there are no results, display an error message.
    if (results.length === 0){
        errorMsg.textContent = `Nothing in the menu matches ${searchTerm}`;
        sectionContainer.innerHTML = '';
        sectionContainer.appendChild(errorMsg);
    }
    else {
        // Remove the menu and display search results.
        sectionContainer.innerHTML = '';
        displayMenu(results);
    }
}
// function to display all products the user have added to the list with name, price and table input.
export function displayCheckOut(){
    const backToMenu = document.createElement('button');
    backToMenu.setAttribute('aria-label', 'Back to menu page');
    // Create the <i> element for the icon
    const icon = document.createElement("i");
    icon.classList.add("bx", "bx-arrow-back");
    backToMenu.appendChild(icon);
    backToMenu.classList.add('back-btn');
    // inserBefore, because i want it to appear as firstchild.
    document.body.insertBefore(backToMenu, document.body.firstChild);
    backToMenu.addEventListener('click', () => {
        // Redirect to the menu page when the 'backToMenu' element is clicked.
        location.assign('menu.html');
        
    });
    // Getitem in 'cart' from local storage and assign it to checkout.
    const checkOut = localStorage.getItem('cart');
    if(checkOut){
        let addPrice = 0;
        // parse checkout to an object from a string.
        const cartData = JSON.parse(checkOut);
        const ul = document.createElement('ul');
        ul.classList.add('food-drink-ul-checkout');
        /* Iterate over each key-value pair in cartData.
        Using Object.entries(cartData), we destructure each entry into 'key' and 'value',
        enabling access to properties of each cart item, such as value.name or value.price. */
        for (const[key, value] of Object.entries(cartData)){

            // Product name
            const checkOutName = document.createElement('p');
            checkOutName.textContent = value.name;
            checkOutName.classList.add('checkout-name');

            const checkOutLi = document.createElement('li');
            checkOutLi.classList.add('checkout-li');
            checkOutLi.appendChild(checkOutName);
                // If quantity is more then 1, quantityText will display amount and price
            if (value.quantity > 1){
                const quantityText = document.createElement('p');
                quantityText.textContent = `${value.quantity} x ${value.price}Kr`;
                quantityText.classList.add('checkout-quantity');
                checkOutLi.appendChild(quantityText);
            }
            else {
                // Else productPrice will display the product price.
                const productPrice = document.createElement('p');
                productPrice.textContent = `${value.price}Kr`;
                productPrice.classList.add('product-price');
                checkOutLi.appendChild(productPrice);
            };
            ul.appendChild(checkOutLi);
            // Assign addPrice the total of value.price * value quantity 
            addPrice += value.price * value.quantity;
            
        }
        // Display the total amount
        const totalAmountToPay = document.createElement('p');
        totalAmountToPay.classList.add('totalAmountToPay');
        totalAmountToPay.textContent = `Total amount to pay ${addPrice}Kr`;
        ul.appendChild(totalAmountToPay);
        sectionContainer.appendChild(ul);

        // Input to enter table number.
        const tableInput = document.createElement('input');
        tableInput.classList.add('table-input');
        tableInput.placeholder = 'Enter table number.';
        tableInput.setAttribute('maxlength', '3');
        tableInput.setAttribute('aria-label', 'Type the number of your table so we can serve you');
        tableInput.setAttribute('type', 'number');
        sectionContainer.appendChild(tableInput);

        // Purchase button
        const PurchaseBtn = document.createElement('button');
        PurchaseBtn.classList.add('Purchase-btn');
        PurchaseBtn.textContent = 'Confirm Purchase';
        PurchaseBtn.setAttribute('aria-label', 'Confirm your purchase and complete the order');
        sectionContainer.appendChild(PurchaseBtn);
        // Purchase button eventlistener.
        PurchaseBtn.addEventListener('click', () => {
            // Clear the sectionContainer
            sectionContainer.innerHTML = '';
            // Display the purchase paragraph with entered table number.
            const purchasePara = document.createElement('p');
            purchasePara.classList.add('purchase-para');
            purchasePara.textContent = `Thank you for your order! Your payment has been received.  
            Your food and drinks will be delivered to table number ${tableInput.value}.`;
            sectionContainer.appendChild(purchasePara);

        });

    } else {
        // Else display that the checkout is empty.
        errorMsg.textContent = `Checkout is empty.`;
        document.body.innerHTML = "";
        sectionContainer.appendChild(errorMsg);
        
    };
    
};