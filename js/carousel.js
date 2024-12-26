import { displayWeeklyMenu } from './ui.js'; // Ensure the path is correct
import { db } from './db.js'; // Import your database

// Function to initialize the carousel
export function initializeCarousel() {
    // Get references to buttons
    const weeklyFoodsButton = document.getElementById('weekly-foods');
    const weeklyDrinksButton = document.getElementById('weekly-drinks');

    // Add event listeners to switch carousel content
    weeklyFoodsButton.addEventListener('click', () => {
        // Set active state for buttons
        weeklyFoodsButton.classList.add('active');
        weeklyDrinksButton.classList.remove('active');

        // Display Weekly Foods in the carousel
        displayWeeklyMenu(db.weeklyFoods);
    });

    weeklyDrinksButton.addEventListener('click', () => {
        // Set active state for buttons
        weeklyDrinksButton.classList.add('active');
        weeklyFoodsButton.classList.remove('active');

        // Display Weekly Drinks in the carousel
        displayWeeklyMenu(db.weeklyDrinks);
    });

    // Initialize with Weekly Foods on page load
    document.addEventListener('DOMContentLoaded', () => {
        weeklyFoodsButton.classList.add('active');
        displayWeeklyMenu(db.weeklyFoods);
    });
}
