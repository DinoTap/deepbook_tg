const TelegramBot = require("node-telegram-bot-api");

const token = "8435456912:AAFCy0z9RXkuMKSYb1nhFgv15JRJ17NFQ1M";
const bot = new TelegramBot(token, { polling: true });

bot.onText(/\/start/, (msg) => {
  console.log('chat')
  const chatId = msg.chat.id;
  const username = msg.from.username || msg.from.first_name;

  console.log(chatId, username);

  const webAppUrl = `https://deepbook-browser.vercel.app/`;
  const deepbookBrowser = `https://deepbook-browser.vercel.app/`
  const opts = {
    reply_markup: {
      inline_keyboard: [
        [{ text: "Open Deepbook Browser", web_app: { url: webAppUrl } },{ text: "Crypto Browser", web_app: { url: webAppUrl } }],
        [
          {
            text: "Subscribe to the channel",
            url: "https://t.me/deepbook_announcement",
          },
        ],
        [{ text: "How to Use Deepbook", callback_data: "deepbook_guide" }],
      ],
    },
  };

  // Send image first
  bot.sendPhoto(chatId, 'https://ibb.co/VcWhdjrf', {
    caption: `🌐 Welcome to Deepbook 🌐
Your advanced crypto browser on Telegram, built for the decentralized web.

✨ Key Features:

🔍 Decentralized Search
Search the web with privacy-first approach and crypto-native features.

🌉 Multi-Chain Support
Access dApps across multiple blockchains directly from your browser.

🔒 Privacy & Security
Browse with enhanced privacy protection and secure crypto transactions.

💎 DeFi Integration
Seamlessly interact with DeFi protocols and crypto services.

🚀 Fast & Lightweight
Optimized for speed and efficiency in the Telegram environment.

🤖 AI-Powered
Enhanced browsing experience with AI assistance for crypto research.

———

🌐 Quick Links:
[Website](https://deepbookai.io/) | [Community](https://t.me/deepbook_community) | [Twitter](https://x.com/deepbook) `,
    parse_mode: 'Markdown',
    ...opts
  });
});

bot.on("callback_query", (callbackQuery) => {
  const msg = callbackQuery.message;
  const chatId = msg.chat.id;

  if (callbackQuery.data === "deepbook_guide") {
    bot.sendMessage(
      chatId,
      `🌐 How to Use Deepbook Browser

🔍 Search & Browse
• Use the search bar to find websites and dApps
• Navigate with privacy-first approach
• Access crypto-native websites seamlessly

🌉 Multi-Chain Access
• Connect to different blockchains
• Access DeFi protocols directly
• Swap tokens across chains

🔒 Security Features
• Enhanced privacy protection
• Secure crypto transactions
• No tracking or data collection

💎 DeFi Integration
• Connect your wallet
• Interact with smart contracts
• Access decentralized applications

🚀 Tips for Best Experience
• Keep your browser updated
• Use secure connections
• Verify dApp URLs before connecting

📱 Mobile Optimized
• Fast loading on mobile devices
• Touch-friendly interface
• Optimized for Telegram

/help to get this guide`
    );
  }
});

console.log("Telegram bot is running...");