// Get all the stars and other DOM elements
const stars = document.querySelectorAll('.star');
const reviewText = document.getElementById('reviw-text');
const submitButton = document.getElementById('submit-reviw');
const reviewsList = document.getElementById('reviws-list');

let rating = 0; // Keeps track of the selected rating
let hasReviewed = false; // Flag to keep track if the user has already left a review

// Function to update the display of stars based on the rating
function updateStarsDisplay() {
    stars.forEach(star => {
        const starValue = parseInt(star.getAttribute('data-value')); // Get the value of each star
        if (starValue <= rating) {
            star.classList.add('filled'); // Add class for filled star
        } else {
            star.classList.remove('filled'); // Remove class for empty star
        }
    });
}

// Add event listeners to each star
stars.forEach(star => {
    star.addEventListener('click', function() {
        if (hasReviewed) return; // If the user has already submitted a review, prevent selecting stars
        rating = parseInt(star.getAttribute('data-value')); // Set the rating
        updateStarsDisplay(); // Update the stars visually based on the selected rating
    });
});

// Add event listener to the Submit button
submitButton.addEventListener('click', function() {
    if (hasReviewed) {
        alert('You have already submitted a review. You can only submit one review.'); // Inform the user if they have already submitted a review
        return; // If the user has already left a review, do nothing
    }

    // Check if a rating is selected and if the review text is not empty
    if (rating === 0 || reviewText.value.trim() === '') {
        alert('Please select a rating and write a review.'); // Prompt the user if no rating or review is provided
        return; // If no rating is selected or no review is written, do nothing
    }

    // Create a new div for the review
    const reviewItem = document.createElement('div');
    reviewItem.classList.add('reviw-item');
    reviewItem.innerHTML = `
        <strong>Rating: ${rating} Stars</strong>
        <p>${reviewText.value}</p>
    `;

    // Add the new review to the list
    reviewsList.appendChild(reviewItem);

    // Set the flag to true to indicate the user has submitted a review
    hasReviewed = true;

    // Disable the Submit button so the user cannot submit more reviews
    submitButton.disabled = false;

    // Clear the textarea and reset the rating
    reviewText.value = '';
    rating = 0;
    updateStarsDisplay(); // Update the stars display to show that no rating is selected anymore
});
