const gemCounter = document.getElementById("collected-gems");
const gem = document.getElementById("small-diamond");
const soundEffect = new Audio("./sound-effect.wav");
const firstUpgrade = document.getElementById("first-upgrade");
const secondUpgrade = document.getElementById("second-upgrade");
let gems = 0;
let gemsPerClick = 1;
let autoClickEnabled = false;
let autoClickInterval;

// Update the display
function updateGemDisplay() {
    gemCounter.innerHTML = gems;
    checkUpgrades();
}

// Check and enable/disable upgrades based on current gems
function checkUpgrades() {
    // First upgrade (500 gems for double click)
    if (gems >= 500 && !firstUpgrade.classList.contains("purchased")) {
        firstUpgrade.removeAttribute("disabled");
    } else {
        firstUpgrade.setAttribute("disabled", "true");
    }
    
    // Second upgrade (1000 gems for auto-click)
    if (gems >= 1000&& !secondUpgrade.classList.contains("purchased")) {
        secondUpgrade.removeAttribute("disabled");
    } else {
        secondUpgrade.setAttribute("disabled", "true");
    }
}

// Function to simulate a click with all effects
function simulateGemClick() {
    soundEffect.currentTime = 0;
    soundEffect.play();
    
    // Bounce animation
    gem.classList.remove("bounce");
    void gem.offsetWidth;
    gem.classList.add("bounce");

    // Get gem position for diamond spawn
    const gemRect = gem.getBoundingClientRect();
    const centerX = gemRect.left + gemRect.width / 2;
    const centerY = gemRect.top + gemRect.height / 2;
    
    spawnDiamond(centerX, centerY);
}

// Click handler for the gem
gem.addEventListener("click", (event) => {
    gems += gemsPerClick;
    updateGemDisplay();
    simulateGemClick();
});

// First upgrade handler (double gems per click)
firstUpgrade.addEventListener("click", () => {
    if (gems >= 500 && !firstUpgrade.classList.contains("purchased")) {
        gems -= 500;
        gemsPerClick = 2;
        firstUpgrade.classList.add("purchased");
        firstUpgrade.setAttribute("disabled", "true");
        firstUpgrade.textContent = "Purchased!";
        updateGemDisplay();
        alert("Upgrade purchased! You now get 2 gems per click!");
    }
});

// Second upgrade handler (auto-click)
secondUpgrade.addEventListener("click", () => {
    if (gems >= 1000&& !secondUpgrade.classList.contains("purchased")) {
        gems -= 1000;
        secondUpgrade.classList.add("purchased");
        secondUpgrade.setAttribute("disabled", "true");
        secondUpgrade.textContent = "Purchased!";
        updateGemDisplay();
        
        // Enable auto-click with visual and sound effects
        autoClickEnabled = true;
        autoClickInterval = setInterval(() => {
            gems += 1;
            updateGemDisplay();
            simulateGemClick(); // Add effects for each auto-click
        }, 1000); // 1 gem per second
        
        alert("Auto-click purchased! You now get 1 gem per second automatically!");
    }
});

// Diamond burst function
function spawnDiamond(x, y) {
    const diamondContainer = document.createElement("div");
    diamondContainer.classList.add("diamond-container");
    
    const startOffsetX = (Math.random() * 30) - 15;
    const startOffsetY = (Math.random() * 30) - 15;
    
    diamondContainer.style.left = `${x + startOffsetX}px`;
    diamondContainer.style.top = `${y + startOffsetY}px`;

    const randomX = (Math.random() * 200) - 100;
    const randomY = -150 - (Math.random() * 50);
    
    diamondContainer.style.setProperty("--moveX", `${randomX}px`);
    diamondContainer.style.setProperty("--moveY", `${randomY}px`);

    const smallDiamond = document.createElement("img");
    smallDiamond.src = "realdiamond.png";
    smallDiamond.classList.add("gem-popup");

    diamondContainer.appendChild(smallDiamond);
    document.body.appendChild(diamondContainer);

    setTimeout(() => {
        diamondContainer.remove();
    }, 1000);
}

// Initialize
updateGemDisplay();