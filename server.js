// const {
//   GoogleGenerativeAI,
//   HarmCategory,
//   HarmBlockThreshold,
// } = require("@google/generative-ai");
// require('dotenv').config();
// const readlineSync = require("readline-sync");
// const colors = require("colors");

// const apiKey = process.env.GEMINI_API_KEY;
// const genAI = new GoogleGenerativeAI(apiKey);

// const model = genAI.getGenerativeModel({
//   model: "gemini-1.5-flash",
// });

// const generationConfig = {
//   temperature: 1,
//   topP: 0.95,
//   topK: 64,
//   maxOutputTokens: 8192,
//   responseMimeType: "text/plain",
// };

// async function main() {
//   let chatHistory = [];

//   while (true) {
//     const userInput = readlineSync.question(colors.cyan("You: "));

//     // Exit if the user types "exit"
//     if (userInput.toLowerCase() === "exit") {
//       console.log(colors.green("Bot: ") + "Goodbye!");
//       return;
//     }

//     try {
//       // Prepare the message history for the API call
//       const messages = chatHistory.map(({ role, content }) => ({ role, content }));

//       // Ensure message parts are properly structured with alternating roles
//       const formattedMessages = messages.map((message, index) => ({
//         role: index % 2 === 0 ? "user" : "assistant", // Alternating roles "user" and "assistant"
//         content: message.content,
//         parts: [{ text: message.content }], // Ensure 'text' field is used here
//       }));

//       // Create a new chat session
//       console.log("Starting chat session...");
//       const chatSession = await model.startChat({
//         generationConfig,
//         history: formattedMessages,
//       });

//       // Send the message to the chat session
//       console.log("Sending message to chat session...");
//       const result = await chatSession.sendMessage(userInput);

//       // Extract the response text directly
//       let completionText = '';
//       if (result.response && Array.isArray(result.response.candidates[0].content.parts)) {
//         completionText = result.response.candidates[0].content.parts.map(part => part.text).join('\n').trim();
//       } else {
//         completionText = "No response from the model.";
//       }

//       // Print the response from the bot
//       console.log(colors.green("Bot: ") + completionText);

//       // Update the chat history
//       chatHistory.push({ role: "user", content: userInput });
//       chatHistory.push({ role: "assistant", content: completionText });
//     } catch (error) {
//       console.error(colors.red("Error message: " + error.message));
//       console.error(colors.red("Error stack: " + error.stack));
//     }
//   }
// }

// main();
/*
 * Install the Generative AI SDK
 *
 * $ npm install @google/generative-ai
 *
 * See the getting started guide for more information
 * https://ai.google.dev/gemini-api/docs/get-started/node
 */

const {
  GoogleGenerativeAI,
  HarmCategory,
  HarmBlockThreshold,
} = require("@google/generative-ai");
require('dotenv').config();
const readlineSync = require("readline-sync");
const colors = require("colors");

const apiKey = process.env.GEMINI_API_KEY;
const genAI = new GoogleGenerativeAI(apiKey);

const model = genAI.getGenerativeModel({
  model: "gemini-1.5-flash",
});

const generationConfig = {
  temperature: 1,
  topP: 0.95,
  topK: 64,
  maxOutputTokens: 8192,
  responseMimeType: "text/plain",
};

async function main() {
  console.log(colors.bold.cyan("Welcome to the Chatbot Program!"));
  console.log(colors.bold.cyan("You can start chatting with the bot."));

    const chatHistory = [];
  while (true) {
    const userInput = readlineSync.question(colors.magenta("You: "));
    try {
        // Constructing text by iterating history
        const texts = chatHistory.map(([role, parts]) => ({
            role,
            parts: parts.map(part => ({text: part}))
        }))

        texts.push({role:'user', parts:[{text:userInput}]})

      const chatSession = model.startChat({
        generationConfig,
        history: texts,
      });

      const result = await chatSession.sendMessage(userInput);
      const completionText = result.response.text();
      if (userInput.toLowerCase() === "exit") {
        console.log(colors.yellow("Bot: ") + result.response.text());
        return;
      }

      console.log(colors.yellow("Bot: ") + result.response.text());
      chatHistory.push(["user", [userInput]]);
      chatHistory.push(["model", [completionText]]);
    } catch (error) {
      console.error(colors.red(error));
    }
  }
}

main();
