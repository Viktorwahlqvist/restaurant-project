//Import functions and database objects for displaying the menu and checkout.
import {db} from "./db.js";
import {displayMenu, searchMenu, displayCheckOut} from "./ui.js";

// If user is on menu.html page, display menu, drinks, bbqs and steaks
if (window.location.pathname.endsWith('menu.html')) {
    document.addEventListener('DOMContentLoaded', () => {
        displayMenu(db.drinks);
        displayMenu(db.bbqs);
        displayMenu(db.steaks);
        //Create a button that allows the user to navigate to the checkout page
        const checkOutBtn = document.createElement('button');
        const checkOutIcon = document.createElement("i");
        checkOutIcon.classList.add('bx', 'bx-cart');
        checkOutBtn.appendChild(checkOutIcon);
        checkOutBtn.classList.add('checkout-btn');
        checkOutBtn.classList.remove('display-info');
        checkOutBtn.id = 'CheckoutBtn'
        //Use insertBefore to make sure the button does not appear under the script link
        document.body.insertBefore(checkOutBtn, document.body.firstChild);
        
        //Add an event listener to redirect the user to the checkout page when clicked
        checkOutBtn.addEventListener('click', () => {
            location.assign('checkout.html');
            displayCheckOut();

        });
        //Create an input field for searching the menu
        const searchInput = document.createElement('input');
        searchInput.placeholder = 'Enter rating, country or name.';
        searchInput.setAttribute('aria-label', 'Search for rating, country, or name');
        searchInput.classList.add('search-input');
        //Create a section that holds the search input field
        const inputSection = document.createElement('section');
        inputSection.classList.add('input-section');
        inputSection.appendChild(searchInput);
        //Use insertBefore to make the input section appear at the top of the webpage
        document.body.insertBefore(inputSection, document.body.firstChild);
        //Event listener for the search input to filter the menu based on the input value
        searchInput.addEventListener('input', () => {
            searchMenu(searchInput.value, db);
        });
    });
}

// If user is on checkout.hmtl page, display checkout.
 if (window.location.pathname.endsWith('checkout.html')){
    document.addEventListener('DOMContentLoaded', () => {
    displayCheckOut();
    });
 }