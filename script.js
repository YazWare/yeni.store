// --- ELEMENTS ---
const overlay = document.getElementById("overlay");
const bgVideo = document.getElementById("bg-video");
const mainContainer = document.querySelector(".main-container");

// --- TEXTES ANIMES ---
const texts = [
    "yen",
    "i stole this whole layout",
    "epstein didn't kill himself",
    "larp"
];

let currentText = 0;
let currentChar = 0;
let deleting = false;

// --- FONCTION ANIMATION DU TEXTE ---
function animateText() {
    const bio = document.getElementById("bio-text");
    // Force la font San Francisco
    bio.style.fontFamily = "'San Francisco'";

    const text = texts[currentText];

    if (deleting) {
        if (bio.textContent.length > 0) {
            bio.textContent = bio.textContent.slice(0, -1);
            setTimeout(animateText, 50);
        } else {
            deleting = false;
            currentChar = 0;
            currentText = (currentText + 1) % texts.length;
            setTimeout(animateText, 500);
        }
    } else {
        if (bio.textContent.length < text.length) {
            bio.textContent += text[currentChar];
            currentChar++;
            setTimeout(animateText, 80);
        } else {
            deleting = true;
            setTimeout(animateText, 1500);
        }
    }
}

// --- FETCH DISCORD STATUS ---
async function fetchDiscordStatus() {
    try {
        const response = await fetch("https://api.lanyard.rest/v1/users/226575758821294082");
        const data = await response.json();

        if (data.success) {
            const user = data.data;

            document.getElementById("discord-avatar").src =
                `https://cdn.discordapp.com/avatars/${user.discord_user.id}/${user.discord_user.avatar}.png`;

            document.getElementById("discord-username").textContent =
                user.discord_user.global_name || user.discord_user.username;

            document.getElementById("status-indicator").className =
                "status-indicator " + user.discord_status;

            const platform = document.getElementById("status-platform");

            if (user.active_on_discord_desktop) {
                platform.innerHTML = '<i class="fas fa-desktop"></i>';
            } else if (user.active_on_discord_mobile) {
                platform.innerHTML = '<i class="fas fa-mobile-alt"></i>';
            } else if (user.active_on_discord_web) {
                platform.innerHTML = '<i class="fas fa-globe"></i>';
            }

            const activityName = document.getElementById("activity-name");
            const activityState = document.getElementById("activity-state");
            const activityTime = document.getElementById("activity-time");

            if (user.activities && user.activities.length > 0) {
                const activity = user.activities[0];
                activityName.textContent = activity.name;
                activityState.textContent = activity.details 
                    ? activity.details + (activity.state ? " • " + activity.state : "") 
                    : activity.state || "";
                activityTime.textContent = "";
                activityTime.style.display = "none";
            } else {
                activityName.textContent = "Not playing anything";
                activityState.textContent = "";
                activityTime.textContent = "";
                activityTime.style.display = "none";
            }
        }
    } catch (err) {
        console.error("Error fetching Discord status:", err);
    }
}

// --- AJOUT DU STATUS DISCORD DANS LE DOM ---
mainContainer.innerHTML += `
<div class="discord-status">
    <div class="status-avatar">
        <img id="discord-avatar" src="som.jpg">
        <div class="status-indicator" id="status-indicator"></div>
    </div>
    <div class="status-content">
        <div class="status-username" id="discord-username">evvlsevvls</div>
        <div class="status-activity" id="status-activity">
            <i class="fab fa-discord"></i>
            <div class="activity-details">
                <div class="activity-name" id="activity-name">Not playing anything</div>
                <div class="activity-state" id="activity-state"></div>
                <div class="activity-time" id="activity-time"></div>
            </div>
        </div>
    </div>
    <div class="status-platform" id="status-platform"><i class="fas fa-globe"></i></div>
</div>
`;

// --- INITIALISATIONS ---
fetchDiscordStatus();
setInterval(fetchDiscordStatus, 30000); // refresh toutes les 30s

// --- CLICK OVERLAY ---
overlay.addEventListener("click", () => {
    overlay.classList.add("fade-out");
    bgVideo.style.display = "block";
    bgVideo.play();
    bgVideo.muted = false;

    // Start text animation
    animateText();

    // Affiche main container après animation overlay
    setTimeout(() => {
        mainContainer.style.display = "block";
    }, 500);

    // Cache overlay après fade
    setTimeout(() => {
        overlay.style.display = "none";
    }, 800);
});
