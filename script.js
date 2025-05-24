const input = document.getElementById("mood-input");
const moodList = document.getElementById("mood-list");
const emojiButtons = document.querySelectorAll(".emoji-btn");
const addButton = document.getElementById("add-mood-btn");

let selectedEmoji = "";

emojiButtons.forEach(button => {
    button.addEventListener("click", () => {
        selectedEmoji = button.textContent;
        emojiButtons.forEach(btn => btn.classList.remove("selected"));
        button.classList.add("selected");
    });
});

addButton.addEventListener("click", handleAddMood);

function handleAddMood() {
    const moodText = input.value.trim();
    if (moodText != "") {
        addMood(moodText);
        input.value = "";
    }
    emojiButtons.forEach(btn => btn.classList.remove("selected"));
    selectedEmoji = "";
}

function addMood(text) {
    const li = document.createElement("li");
    li.className = "mood-item";

    const today = new Date();
    const dateString = today.toISOString().split('T')[0];

    li.innerHTML = `<span>${selectedEmoji} ${text} ${dateString}</span>`;

    moodList.appendChild(li);
}