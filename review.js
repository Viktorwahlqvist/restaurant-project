// Get references to HTML elements
const reviewText = document.getElementById("review-text");
const submitButton = document.getElementById("submit-review");
const reviewsList = document.getElementById("reviews-list");
const stars = document.querySelectorAll(".star");

// Variable to track selected rating
let rating = 0;

// Variable to track the number of reviews submitted
let reviewCount = 0;

// Function to create a review with stars and text
function createReview(text, rating) {
  const reviewDiv = document.createElement("div");
  reviewDiv.classList.add("review-item");

  const reviewTextElement = document.createElement("p");
  reviewTextElement.textContent = text;

  const reviewRatingElement = document.createElement("p");
  reviewRatingElement.textContent = `Rating: ${rating} stars`;

  reviewDiv.appendChild(reviewTextElement);
  reviewDiv.appendChild(reviewRatingElement);

  return reviewDiv;
}

// Function to handle when a star is clicked
stars.forEach(star => {
  star.addEventListener("click", function() {
    rating = parseInt(star.getAttribute("data-value"));
    updateStarsDisplay();
  });
});

// Update the display of the stars based on the rating
function updateStarsDisplay() {
  stars.forEach(star => {
    if (parseInt(star.getAttribute("data-value")) <= rating) {
      star.classList.add("selected");
    } else {
      star.classList.remove("selected");
    }
  });
}

// Function to handle when the user submits a review
submitButton.addEventListener("click", function() {
  const reviewTextValue = reviewText.value.trim();

  // If the text is not empty and a rating is selected
  if (reviewTextValue && rating > 0) {
    // Check if the user has already submitted two reviews
    if (reviewCount < 2) {
      // Create a new review and add it to the list
      const newReview = createReview(reviewTextValue, rating);
      reviewsList.appendChild(newReview);

      // Increment the review count
      reviewCount++;

      // Clear the textarea and reset rating
      reviewText.value = "";
      rating = 0;
      updateStarsDisplay();

      // Provide feedback to the user
      alert("Your review has been submitted!");

      // Disable the submit button if 2 reviews have been submitted
      if (reviewCount >= 2) {
        submitButton.disabled = true;
        alert("You can only submit two reviews.");
      }
    } else {
      // Inform the user if they have reached the limit of 2 reviews
      alert("You have already submitted two reviews.");
    }
  } else {
    alert("You must write a review and select a rating!");
  }
});

// Enable the submit button again if the user clears the text area
reviewText.addEventListener("input", function() {
  if (reviewText.value.trim() === "") {
    submitButton.disabled = false; // Re-enable the button when the textarea is cleared
  }
});

