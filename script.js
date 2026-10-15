
// --------------------------------------------------
// SCENES
// Read through the comments below to see what this section does
//
// TO CUSTOMIZE THIS SECTION
// 1) add fields for each scene, as relevant, to match your mockup
// 2) customize the scenes to fit your story
// 3) add any new fields to the function below
// --------------------------------------------------

// First, we create a variable for the current scene being displayed
let currentScene = "bedroom";

// Then, we create an object that stores the data for each scene,
const scenes = {
  // See "backyard" for the first example
  bedroom: {
    title: "Finally home from school!",
    image: "Bed.jpg",
    text: "You just came home from school and lots of work has been loaded up on you from your classes, your kinda stressted out about the things you have to get done. But you can decide to make decisions and actions that would help you feel better mentally that will help achieve your main objctive which is to finish all of your tasks. ",
    // you can choose how many choices to include
    // each choice can have text, an action, and/or nextScene
    choices: [
      {
        text: "Drink water (+5 energy, -5 pressure)",
      },
      {
        text: "Eat a snack (+5 energy, -5 pressure)",
      },
      {
        text: "Take a break (+5 energy)",
      },
      {
        text: "Take a nap (+10 pressure)",
      },
      {
          text: "Go to the livingroom",
          nextScene: "livingroom"
      },
      {
          text: "Go outside",
          nextScene: "outside"
      },
        {
          text: "Go to the kitchen",
          nextScene: "kitchen"
      },
        {
          text: "Go to the garage",
          nextScene: "garage"
      },
    ]
  },

  livingroom: {
    title: "Location: Entrance",
    image: "Interviewee:Neighbor",
    text: "well what I remember...",
    choices: [
      {
        text: "Watch tv (+5 energy, -5 pressure)",
      },
      {
        text: "Eat a snack (+5 energy, -5 pressure)",
      },
      {
        text: "Take a break (+5 energy)",
      },
      {
        text: "Take a nap (+10 pressure)",
      },
      {
          text: "Go to the bedroom",
          nextScene: "bedroom"
      },
      {
          text: "Go outside",
          nextScene: "outside"
      },
        {
          text: "Go to the kitchen",
          nextScene: "kitchen"
      },
        {
          text: "Go to the garage",
          nextScene: "garage"
      },
    ]
  },

  hallway: {
    title: "The Hallway",
    text: "The hallway is dark and silent.",
    choices: [
      {
        text: "backyard",
        nextScene: "lockedDoor"
      }
    ]
  },

   lockedDoor: {
    title: "The Locked Door",
    text: "The door handle doesn't move.",
    choices: [
      {
        text: "Try to open it",
        action: unlockDoor
      },
      {
        text: "Go back",
        nextScene: "backyard"
      }
    ]
  },

   solution: {
    title: "The solution",
    text: "You solved the mystery!",
    
  }
};

// --------------------------------------------------
// UPDATE SCENES
// Read through the comments below to see what this section does
//
// TO CUSTOMIZE THIS SECTION
// 1) add a new const variable for each new field you added above
// Make sure to match the ids used in your mock up with the fields 
// 2) set the .textContent of each variable to the corresponding field in the scene object
// Use sceneTitle as a model
// --------------------------------------------------

// First, we create variables to hold the references to the HTML elements
// Technically you could just use document.getElementById('id-name') 
// in the function itself, but that would be very wordy 
// and make the code harder to read
const sceneTitle = document.getElementById("scene-title");
const sceneText = document.getElementById("scene-text");
const choicesContainer = document.getElementById("choices-container");
const sceneImage = document.getElementById("scene-image");

// Then, we create a function to update the scene,
function updateScene(sceneName) {

  //This update the variable currentScene with the new scene passed as a parameter
  currentScene = sceneName;

  //This accesses the scene object based on the scene name
  const scene = scenes[sceneName];

  // Here, for each html element, you change the textContent to match
  // the appropriate text from the scene object
  sceneTitle.textContent = scene.title;
  sceneText.textContent = scene.text;
  sceneImage.src = scene.image;

  // Clear the old buttons before creating new ones
  choicesContainer.innerHTML = "";

  // Loop through each choice in the scene, connecting an action and nextScene if included
  scene.choices.forEach(function (choice) {
    const button = document.createElement("button");

    button.textContent = choice.text;

    button.addEventListener("click", function () {
      if (choice.action) {
        choice.action();
      }

      if (choice.nextScene) {
        updateScene(choice.nextScene);
      }
    });

    choicesContainer.appendChild(button);
  });
}

// This updates the screen with the current scene
updateScene(currentScene);


// --------------------------------------------------
// HEALTH
// Read through the comments below to see what this section does
//
// TO CUSTOMIZE THIS SECTION
// Either customize the name from health to steps, stress, etc...
// OR
// create a copy of each step for each additional state you want to track throughout the game
// --------------------------------------------------

// Create a variable for health
let health = 100;

// Display current health
const healthDisplay = document.getElementById("health-display");

// Create a function to update health 
function updateHealth(amount) {
  health += amount;
  healthDisplay.textContent = health;
}

// This refreshes the health display
updateHealth(0);

// --------------------------------------------------
// INVENTORY
// Read through the comments below to see what this section does
//
// For now, you are probably leaving this section as is. 
// --------------------------------------------------

// Create a variable for inventory
let inventory = [];

// Display current inventory
const inventoryDisplay = document.querySelector("#inventory-display");
const messageDisplay = document.getElementById("message-display");

// Create a function to update inventory 
function pickUpItem(itemName) {
    // Add itemName to the inventory array
    // Show the updated inventory on the page
  inventory.push(itemName);
  inventoryDisplay.textContent = inventory.join(", ");
}

// --------------------------------------------------
// CONDITIONAL 
// Depending on how you want to implement the conditional logic, you may 
// simply adjust the names below or you may need to expand upon this section
// --------------------------------------------------

// Create a function that checks if the inventory contains one item and if so shows the win condition scene.
function unlockDoor() {
  if (inventory.includes("brass key")) {
    updateScene("solution");
  } else {
    messageDisplay.textContent = "The door is locked.";
  }
}

