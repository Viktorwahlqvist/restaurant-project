// IMPORT DATABAS
import {db} from "./db.js";
import {displayMenu} from "./ui.js";


displayMenu(db.drinks);
displayMenu(db.pizzas);

console.log(`Current cart: ${localStorage.getItem('cart')}`)
