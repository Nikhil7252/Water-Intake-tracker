// Select DOM Elements
const goalInput = document.getElementById("goal");
const glassesInput = document.getElementById("glasses");
const calculateButton = document.getElementById("calculate");
const percentage = document.getElementById("percentage");
const remained = document.getElementById("remained");
const liters = document.getElementById("liters");
const statusMessage = document.getElementById("status-message");

// Constants
const glassCapacity = 0.25; // 250 ml = 0.25 liters

// Add Event Listener to the Calculate Button
calculateButton.addEventListener("click", () => {
  const goal = parseFloat(goalInput.value);
  const glassesDrunk = parseInt(glassesInput.value);

  // Validate inputs
  if (isNaN(goal) || goal <= 0) {
    alert("Please enter a valid daily water goal in liters.");
    return;
  }

  if (isNaN(glassesDrunk) || glassesDrunk < 0) {
    alert("Please enter a valid number of glasses you have drunk.");
    return;
  }

  // Calculate total water drunk and remaining water
  const totalDrunk = glassesDrunk * glassCapacity; // Liters
  const remainingWater = Math.max(0, goal - totalDrunk); // Liters

  // Update the big cup
  updateBigCup(goal, totalDrunk);

  // Update status message
  if (remainingWater > 0) {
    const glassesRemaining = Math.ceil(remainingWater / glassCapacity);
    statusMessage.innerText = `You still need to drink ${glassesRemaining} more glasses to reach your goal.`;
  } else {
    statusMessage.innerText = "Congratulations! You've reached your goal!";
  }
});

function updateBigCup(goal, totalDrunk) {
  const percentageDrunk = Math.min((totalDrunk / goal) * 100, 100); // Cap at 100%

  // Update the percentage bar
  if (percentageDrunk > 0) {
    percentage.style.visibility = "visible";
    percentage.style.height = `${(percentageDrunk / 100) * 330}px`; // Adjust height dynamically
    percentage.innerText = `${Math.round(percentageDrunk)}%`;
  } else {
    percentage.style.visibility = "hidden";
    percentage.style.height = 0;
  }

  // Update the remaining water display
  const remainingWater = Math.max(0, goal - totalDrunk).toFixed(2);
  if (remainingWater > 0) {
    remained.style.visibility = "visible";
    liters.innerText = `${remainingWater}L`;
  } else {
    remained.style.visibility = "hidden";
    liters.innerText = "";
  }
}
