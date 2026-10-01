async function sendMessage() {
    const input = document.getElementById("userInput");
    const message = input.value.trim();

    if (message === "") {
        return;
    }

    const chatMessages = document.getElementById("chatMessages");

    // Show user's message
    const userMessage = document.createElement("div");
    userMessage.className = "message";
    userMessage.style.background = "#e8f5e9";
    userMessage.textContent = message;

    chatMessages.appendChild(userMessage);

    // Clear input
    input.value = "";

    // Show temporary AI message
    const aiMessage = document.createElement("div");
    aiMessage.className = "message ai-message";
    aiMessage.textContent = "Thinking...";

    chatMessages.appendChild(aiMessage);

    try {
        const response = await fetch("http://127.0.0.1:5000/chat", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                message: message
            })
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.error || "Something went wrong");
        }

        aiMessage.textContent = data.reply;

    } catch (error) {
        aiMessage.textContent =
            "Sorry, I could not connect to Saath right now.";

        console.error(error);
    }

    chatMessages.scrollTop = chatMessages.scrollHeight;
}