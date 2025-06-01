const input = document.getElementById("mood-input");
const moodList = document.getElementById("mood-list");
const emojiButtons = document.querySelectorAll(".emoji-btn");
const addButton = document.getElementById("add-mood-btn");
const deleteButton = document.getElementById("delete-moods");

let moods = JSON.parse(localStorage.getItem("moods")) || [];

let selectedEmoji = "";

moods.forEach(mood => {
    addMood(mood.text, mood.emoji, mood.date);
});


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
    if (moodText !== "" && selectedEmoji !== "") {
        const today = new Date();
        const dateString = today.toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric"
        });

        addMood(moodText, selectedEmoji, dateString);

        moods.push({ text: moodText, emoji: selectedEmoji, date: dateString });
        localStorage.setItem("moods", JSON.stringify(moods));

        input.value = "";
        selectedEmoji = "";
        emojiButtons.forEach(btn => btn.classList.remove("selected"));
    } else {
        alert("Please select an emoji and enter a note.");
    }
}

function addMood(text, emoji, date) {
    const li = document.createElement("li");
    li.className = "mood-item";

    li.innerHTML = `
        <span style="font-size: 2rem;">${emoji}</span>
        <div>${text}</div>
        <small style="color: gray;">${date}</small>
    `;
    moodList.appendChild(li);
}

deleteButton.addEventListener("click", deleteMoods);
function deleteMoods() {
    localStorage.clear();
    li.innerHTML = "";
    moods = [];
}