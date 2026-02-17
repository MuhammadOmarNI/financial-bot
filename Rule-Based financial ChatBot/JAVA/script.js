// ⚠️ CHANGE THIS if ngrok URL changes
const API_URL = "https://chance-unsuccessful-porter.ngrok-free.dev/chat";

const chatBox = document.getElementById("chat-box");
const userInput = document.getElementById("userInput");

// Add a message bubble
function addMessage(text, sender) {
    const msgDiv = document.createElement("div");
    msgDiv.className = sender === "user" ? "user-message" : "bot-message";
    msgDiv.innerText = text;

    chatBox.appendChild(msgDiv);
    chatBox.scrollTop = chatBox.scrollHeight;
}

// Main function
async function sendMessage() {
    const message = userInput.value.trim();
    if (!message) return;

    // Show user message
    addMessage(message, "user");
    userInput.value = "";

    // Temporary bot typing message
    const typingDiv = document.createElement("div");
    typingDiv.className = "bot-message";
    typingDiv.innerText = "Bot is typing...";
    chatBox.appendChild(typingDiv);
    chatBox.scrollTop = chatBox.scrollHeight;

    try {
        const response = await fetch(API_URL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ message })
        });

        const data = await response.json();

        chatBox.removeChild(typingDiv);

        if (data.response) {
            addMessage(data.response, "bot");
        } else {
            addMessage("⚠️ Unexpected server response.", "bot");
        }

    } catch (error) {
        chatBox.removeChild(typingDiv);
        addMessage("❌ Error connecting to server.", "bot");
        console.error(error);
    }
}
