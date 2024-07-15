const OpenAI = require("openai")
const dotenv = require("dotenv")
dotenv.config()

const openai = new OpenAI({
  apiKey: process.env['OPENAI_API_KEY'], // This is the default and can be omitted
});

module.exports = openai;
// ./config/open-ai.js

// const OpenAI = require('openai');
// const dotenv = require('dotenv');
// dotenv.config();

// const openai = new OpenAI({
//   apiKey: process.env.OPENAI_API_KEY,
//   // You can set other configuration options here if needed
// });

// async function createChatCompletion(params) {
//   try {
//     const response = await openai.chat.completions.create(params);
//     return response.data;
//   } catch (error) {
//     throw error;
//   }
// }

// module.exports = {
//   createChatCompletion,
// };
