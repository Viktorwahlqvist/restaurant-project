// IMPORT DATABAS AND DISPLAY FUNCTION
import {db} from "./db.js";
import {displayMenu, searchMenu} from "./ui.js";

// Display menu, function from ui.js
displayMenu(db.drinks);
displayMenu(db.bbqs);
displayMenu(db.steaks);

/* Create search input, add placeholder, maxlength, aria-label for accessibility,
class for styling, etc.*/
const searchInput = document.createElement('input');
searchInput.placeholder = 'Enter rating, country or name.';
searchInput.setAttribute('maxlength', '100');
searchInput.setAttribute('aria-label', 'Search for rating, country, or name');
searchInput.classList.add('search-input');
// Create a section to hold the input, add a class for styling
const inputSection = document.createElement('section');
inputSection.classList.add('input-section');
// Append the search input to the container
inputSection.appendChild(searchInput);
// Insert the container at the top of the body
document.body.insertBefore(inputSection, document.body.firstChild);
/* Add event listener to the search input,
calls searchMenu function from ui.js to filter the menu based on input*/
searchInput.addEventListener('input', () =>{
    //Calls searchMenu to filter and display search results
    searchMenu(searchInput.value, db)
})




