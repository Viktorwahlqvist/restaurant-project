// Function to display menu items from the database.
export function displayMenu(db){
    console.log(db);
    
    // Create an unordered list to hold menu items.
    const ul = document.createElement('ul');

    /* Loop through each item in the provided section of the database. 
    depending on the argument passed to the function.*/
    for (const[key, value] of Object.entries(db)){
        // Create a subheader (title) for the menu item.
        const subheader = document.createElement('h2');
        subheader.textContent = `${value.name}`;

        // Create an image element for the menu item.
        const image = document.createElement('img');
        image.src = value.img,
        image.alt = `Picture of ${value.dsc}`;

        // Create a paragraph for the item's rating.
        const rate = document.createElement('p');
        rate.textContent = `Rate : ${value.rate}`;

        // Create a paragraph for the item's description.
        const desc = document.createElement('p');
        desc.textContent = value.dsc;

        // Create a paragraph for the item's price.
        const price = document.createElement('p');
        price.textContent = `Price : ${value.price}Kr`;

        // Create a paragraph for the item's country of origin.
        const country = document.createElement('p');
        country.textContent = `Country of origin : ${value.country}`;

        // Create a button for adding to cart
        const addBtn = document.createElement('button');
        addBtn.textContent = 'Order';
        addBtn.addEventListener('click', () => {
            addToCart(value);
        })
        
        //Create a button for removing from cart.
        const removeBtn = document.createElement('button');
        removeBtn.textContent = 'Remove';
        removeBtn.addEventListener('click', () => {
            removeFromCart(value);
        })

        // Create a list item to hold all menu item information.
        const listItem = document.createElement('li');

        // Create an article to group description, rate, price, and country details.
        const articleContainer = document.createElement('article');

        // Append all details (description, rate, price, country) to the article container.
        articleContainer.appendChild(desc);
        articleContainer.appendChild(rate);
        articleContainer.appendChild(price);
        articleContainer.appendChild(country);
        articleContainer.appendChild(removeBtn);
        articleContainer.appendChild(addBtn);

        // Append the subheader, image, and article container to the list item.
        listItem.appendChild(subheader);
        listItem.appendChild(image);
        listItem.appendChild(articleContainer);

        // Append the list item to the unordered list.
        ul.appendChild(listItem);
    }

    // Append the unordered list to the body (replace this with a specific container later).
    document.body.appendChild(ul);
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

function removeFromCart(item){
     // Get the cart from localStorage, or create a new one if it doesn't exist.
    let cart = JSON.parse(localStorage.getItem('cart')) || [];

    // Check if the item already exists in the cart.
    const existingItem = cart.find(cartItem => cartItem.name === item.name);

    /*If the item exists && quantity is more then 1.
    Update the quantity with the reference we got from find*/
    if (existingItem && existingItem.quantity > 1){
        existingItem.quantity -= 1;
        console.log(`Updated quantity (Removed): ${JSON.stringify(cart)}`);
    }
    /* Else if the item exists and quatity is 1.
    Remove it with the reference we got from find using indefOf and splice. */
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