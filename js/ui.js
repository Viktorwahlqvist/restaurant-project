// Function to display menu items from the database.
export function displayMenu(db){
    console.log(db);
    
    // Create an unordered list to hold menu items.
    const ul = document.createElement('ul');
    ul.classList.add('food-drink-ul');

    // Loop through each item in the provided section of the database. 
    // depending on the argument passed to the function.
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

        // Create a button for adding to cart
        const addBtn = document.createElement('button');
        // Create the <i> element for the icon
        const icon = document.createElement("i");
        icon.classList.add("bx", "bx-cart");
        addBtn.appendChild(icon);
        addBtn.classList.add('add-btn');
        addBtn.addEventListener('click', () => {
            addToCart(value);
        });

        // Create a button for removing from cart
        const removeBtn = document.createElement('button');
        const removeIcon = document.createElement("i");
        removeIcon.classList.add("bx", "bx-trash-alt");
        removeBtn.appendChild(removeIcon);
        removeBtn.classList.add('remove-btn');
        removeBtn.addEventListener('click', () => {
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
            articleContainer.classList.toggle('display-info');
            image.classList.toggle('hidden');
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
    document.getElementById('sectionContainer').appendChild(ul);
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