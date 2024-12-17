// IMPORT DATABAS AND DISPLAY FUNCTION
import {db} from "./db.js";
import {displayMenu} from "./ui.js";

// Change this when we have decided the menu
displayMenu(db.drinks);
displayMenu(db.pizzas);
