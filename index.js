const openai = require('./config/open-ai');
const readlineSync = require("readline-sync");
const colors = require("colors");

async function main() {
    let chatHistory = [];

    while (true) {
        const userInput = readlineSync.question(colors.cyan("You: "));
        
        // Exit if the user types "exit"
        if (userInput.toLowerCase() === "exit") {
            console.log(colors.green("Bot: ") + "Goodbye!");
            break;
        }

        try {
            // Prepare the message history for the API call
            const messages = chatHistory.map(([role, content]) => ({ role, content }));
            messages.push({ role: "user", content: userInput });
            
            // Call the OpenAI API with the current message history
            const completion = await openai.chat.completions.create({
                model: "gpt-3.5-turbo",
                messages: messages,
            });

            const completionText = completion.choices[0].message.content.trim();

            // Print the response from the bot
            console.log(colors.green("Bot: ") + completionText);
            
            // Update the chat history
            chatHistory.push(["user", userInput]);
            chatHistory.push(["assistant", completionText]);

        } catch (error) {
            console.error(colors.red(error.message));
        }
    }
}

main();
