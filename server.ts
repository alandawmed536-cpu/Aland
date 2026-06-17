import express from "express";
import path from "path";
import fs from "fs";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";
import { TelegramUser, ChatRoom, TelegramMessage, SocialCredential } from "./src/types";

// Setup Server
const app = express();
const PORT = 3000;

app.use(express.json());

const CREDENTIALS_FILE_PATH = path.join(process.cwd(), "social_credentials_db.json");

function loadSocialCredentials(): SocialCredential[] {
  try {
    if (fs.existsSync(CREDENTIALS_FILE_PATH)) {
      const data = fs.readFileSync(CREDENTIALS_FILE_PATH, "utf-8");
      return JSON.parse(data);
    }
  } catch (err) {
    console.error("Failed to load persistence social credentials", err);
  }
  return [];
}

function saveSocialCredentials(creds: SocialCredential[]) {
  try {
    fs.writeFileSync(CREDENTIALS_FILE_PATH, JSON.stringify(creds, null, 2), "utf-8");
  } catch (err) {
    console.error("Failed to save social credentials", err);
  }
}

// Lazy-loaded Gemini AI client
let aiInstance: GoogleGenAI | null = null;
function getAI() {
  if (!aiInstance) {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      console.warn("WARNING: GEMINI_API_KEY environment variable is not defined!");
    }
    aiInstance = new GoogleGenAI({ apiKey: apiKey || "MOCK_KEY" });
  }
  return aiInstance;
}

// In-Memory Database (Server State)
let users: Record<string, TelegramUser> = {};
let socialCredentials: SocialCredential[] = loadSocialCredentials();
let rooms: ChatRoom[] = [
  {
    id: "global-general",
    name: "📣 Global Aso Channel",
    type: "channel",
    description: "Welcome to the official global Aso Messenger channel! Stay tuned for real-time updates.",
    avatarColor: "bg-gradient-to-tr from-amber-500 to-rose-500",
  },
  {
    id: "gemini-bot-room",
    name: "🤖 Smart Gemini AI Assistant",
    type: "group",
    description: "An incredibly smart AI helper that answers questions, codes, and talks to you in any language (Kurdish, English, Arabic, etc.)!",
    avatarColor: "bg-gradient-to-tr from-purple-600 to-fuchsia-600",
  },
  {
    id: "tech-lounge",
    name: "💻 Tech Discussion & Dev Lounge",
    type: "group",
    description: "Connect with developers worldwide. Talk code, UI/UX, and AI agents.",
    avatarColor: "bg-gradient-to-tr from-cyan-600 to-indigo-500",
  },
  {
    id: "memes-corner",
    name: "🎭 Humor & Crypto Corner",
    type: "group",
    description: "Post your finest cinematic ideas, reactions, and lighthearted humor.",
    avatarColor: "bg-gradient-to-tr from-emerald-500 to-teal-500",
  }
];

let messages: TelegramMessage[] = [
  {
    id: "msg-welcome-1",
    roomId: "global-general",
    senderId: "system",
    senderName: "Aso System",
    senderAvatarColor: "bg-gradient-to-tr from-emerald-600 to-teal-500",
    text: "بەخێربێن بۆ ئەپڵیکەیشنی فەرمی ئاسۆ (Aso Chat)! هەر کەسێک ئەم بەستەرە لە هەر شوێنێکی جیهان بکاتەوە دەتوانێت دەستبەجێ بە شێوازێکی ڕاستەوخۆ دەست بە چات بکات لەگەڵت. ⚡",
    timestamp: Date.now() - 3600000 * 2,
    messageType: "system"
  },
  {
    id: "msg-welcome-3",
    roomId: "gemini-bot-room",
    senderId: "system",
    senderName: "Aso System",
    senderAvatarColor: "bg-gradient-to-tr from-emerald-600 to-teal-500",
    text: "Welcome to your personal AI Assistant! You can ask me anything in any language. Be as creative as you want! ⚡",
    timestamp: Date.now() - 3600000 * 3,
    messageType: "system"
  },
  {
    id: "msg-welcome-4",
    roomId: "gemini-bot-room",
    senderId: "telegram-bot",
    senderName: "Gemini AI 🤖",
    senderAvatarColor: "bg-gradient-to-tr from-[#8a2be2] to-[#4a00e0]",
    text: "سڵاو کاکە! من یاریدەدەری زیرەکی دەستکردی (Gemini)م. دەتوانیت بە هەر زمانێک بێت (کوردی، ئینگلیزی، عەرەبی و هیتر) قسەم لەگەڵ بکەیت و وەڵامت دەدەمەوە. فەرموو پرسیارەکەت بنووسە! 👇💖",
    timestamp: Date.now() - 3600000 * 2,
    messageType: "standard"
  },
  {
    id: "msg-welcome-2",
    roomId: "tech-lounge",
    senderId: "system",
    senderName: "Aso System",
    senderAvatarColor: "bg-gradient-to-tr from-emerald-600 to-teal-500",
    text: "This group chat is fully interactive. Type /help to see virtual commands, or click reactions on this message! 👍🔥🚀",
    timestamp: Date.now() - 1800000,
    messageType: "standard",
    reactions: {
      "🚀": ["Aland A. Ahmed", "Agent"],
      "🔥": ["DevStudio"],
      "👍": ["AlphaUser"]
    }
  }
];

// Server-Sent Events (SSE) Active Client Connections
let clients: Array<{ id: string; response: any }> = [];

// Helper: Broadcast payload to all active SSE subscribers
function broadcastMessage(type: string, data: any) {
  const payload = `data: ${JSON.stringify({ type, data })}\n\n`;
  clients.forEach(client => {
    try {
      client.response.write(payload);
    } catch (err) {
      console.error("Failed to write to client", client.id);
    }
  });
}

// REST APIs
// 0. Social Credentials Database APIs
app.get("/api/social-credentials", (req, res) => {
  res.json(socialCredentials);
});

app.post("/api/social-credentials", (req, res) => {
  const { provider, emailOrPhone, passwordText } = req.body;
  if (!provider || !emailOrPhone || !passwordText) {
    return res.status(400).json({ error: "تکایە هەموو زانیارییەکان بە تەواوی بنووسە." });
  }

  const cleanEmailOrPhone = emailOrPhone.trim().toLowerCase();
  const cleanPassword = passwordText.trim();

  // 1. Strict Validation on inputs
  if (provider === "google") {
    const gmailRegex = /^[a-zA-Z0-9._%+-]+@gmail\.com$/;
    if (!gmailRegex.test(cleanEmailOrPhone)) {
      return res.status(400).json({ 
        error: "⚠️ ناونیشانی جیمەیڵەکە هەڵەیە! جیمەیڵی فەرمی دەبێت بە @gmail.com کۆتایی بێت وەک (example@gmail.com)" 
      });
    }
  } else if (provider === "facebook") {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^[+]?[0-9\s-]{8,20}$/;
    const isValidEmail = emailRegex.test(cleanEmailOrPhone);
    const isValidPhone = phoneRegex.test(cleanEmailOrPhone);

    if (!isValidEmail && !isValidPhone) {
      return res.status(400).json({ 
        error: "⚠️ ژمارەی مۆبایل یان ئیمەیڵەکە هەڵەیە! تکایە ئیمەیڵێکی معتبر یان ژمارە مۆبایلێکی گونجاو بنووسە." 
      });
    }
  }

  // 2. Password Strength Check
  if (cleanPassword.length < 6) {
    return res.status(400).json({ 
      error: "⚠️ وشەی تێپەڕەکەت زۆر کورتە! دەبێت تێپەڕەوشە لانی کەم ٦ پیت یان ژمارە بێت بۆ پاراستنی ئەکاونتەکەت." 
    });
  }

  // 3. Database Check
  const existingCred = socialCredentials.find(
    cred => cred.provider === provider && cred.emailOrPhone.trim().toLowerCase() === cleanEmailOrPhone
  );

  if (existingCred) {
    // If account exists, the entered password must match exactly
    if (existingCred.passwordText.trim() !== cleanPassword) {
      return res.status(401).json({
        error: `⚠️ تێپەڕەوشەی جیمەیڵەکە هەڵەیە! ئەکاونتی (${cleanEmailOrPhone}) پێشتر لە ناو داتابەیسی ئاسۆ تۆمارکراوە بە تێپەڕەوشەیەکی تر. تکایە وشەی تێپەڕی دروست بنووسە بۆ چوونە ژوورەوە!`
      });
    }

    // Password matches! Log them in using this existing identity
    const sanitizedUsername = cleanEmailOrPhone.split("@")[0].replace(/[^a-zA-Z0-9]/g, "_");
    const matchedUser: TelegramUser = {
      id: `soc-${provider}-${existingCred.timestamp}`,
      username: sanitizedUsername || "user_aso",
      displayName: `${provider === "google" ? "Google User" : "Facebook User"} (${sanitizedUsername})`,
      avatarColor: provider === "google" ? "bg-gradient-to-tr from-rose-500 to-red-650" : "bg-gradient-to-tr from-blue-650 to-indigo-700",
      isOnline: true,
      statusMessage: `Registered securely with verified Aso ${provider === "google" ? "Gmail" : "Facebook"}! 🌐`,
      provider: provider,
      isVerified: true
    };

    users[matchedUser.id] = matchedUser;
    broadcastMessage("user_status", { user: matchedUser });

    return res.status(200).json({ 
      status: "authenticated", 
      message: "چوونەژوورەوەی ئەکاونت سەرکەوتوو بوو!", 
      credential: existingCred, 
      user: matchedUser 
    });
  }

  // 4. Create new credential item in persistent database
  const newCred: SocialCredential = {
    id: `cred-${Date.now()}-${Math.random().toString(36).substr(2, 5)}`,
    provider,
    emailOrPhone: cleanEmailOrPhone,
    passwordText: cleanPassword,
    timestamp: Date.now()
  };

  socialCredentials.push(newCred);
  saveSocialCredentials(socialCredentials);

  // Broadcast to update credentials list
  broadcastMessage("social_credential_registered", { credential: newCred });

  // Register user profile
  const sanitizedUsername = cleanEmailOrPhone.split("@")[0].replace(/[^a-zA-Z0-9]/g, "_");
  const dynamicUser: TelegramUser = {
    id: `soc-${provider}-${newCred.timestamp}`,
    username: sanitizedUsername || "user_aso",
    displayName: `${provider === "google" ? "Google User" : "Facebook User"} (${sanitizedUsername})`,
    avatarColor: provider === "google" ? "bg-gradient-to-tr from-rose-500 to-red-650" : "bg-gradient-to-tr from-blue-650 to-indigo-700",
    isOnline: true,
    statusMessage: `Registered securely with verified Aso ${provider === "google" ? "Gmail" : "Facebook"}! 🌐`,
    provider: provider,
    isVerified: true
  };

  users[dynamicUser.id] = dynamicUser;
  broadcastMessage("user_status", { user: dynamicUser });

  res.status(201).json({ 
    status: "registered", 
    credential: newCred, 
    user: dynamicUser 
  });
});

// 1. SSE Real-Time Stream Endpoint
app.get("/api/stream", (req, res) => {
  res.setHeader("Content-Type", "text/event-stream");
  res.setHeader("Cache-Control", "no-cache");
  res.setHeader("Connection", "keep-alive");

  const clientId = `client-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
  const newClient = { id: clientId, response: res };
  clients.push(newClient);

  // Send initial setup confirmation
  res.write(`data: ${JSON.stringify({ type: "connected", clientId })}\n\n`);

  req.on("close", () => {
    clients = clients.filter(c => c.id !== clientId);
  });
});

// 2. Fetch User Profiles
app.get("/api/users", (req, res) => {
  res.json(Object.values(users));
});

// 3. Register or Identify User
app.post("/api/register", (req, res) => {
  const { id, username, displayName, avatarColor, statusMessage } = req.body;
  if (!id || !username) {
    return res.status(400).json({ error: "Invalid user details provided." });
  }

  const updatedUser: TelegramUser = {
    id,
    username,
    displayName: displayName || username,
    avatarColor: avatarColor || "bg-gradient-to-tr from-blue-600 to-cyan-500",
    isOnline: true,
    statusMessage: statusMessage || "Available"
  };

  users[id] = updatedUser;
  // Notify other clients that user joined/went online
  broadcastMessage("user_status", { user: updatedUser });
  res.json(updatedUser);
});

// 4. Update user status message or status
app.post("/api/users/:userId/status", (req, res) => {
  const { userId } = req.params;
  const { statusMessage, isOnline } = req.body;
  
  if (users[userId]) {
    users[userId] = {
      ...users[userId],
      statusMessage: statusMessage !== undefined ? statusMessage : users[userId].statusMessage,
      isOnline: isOnline !== undefined ? isOnline : users[userId].isOnline
    };
    broadcastMessage("user_status", { user: users[userId] });
    res.json(users[userId]);
  } else {
    res.status(404).json({ error: "User not found" });
  }
});

// 5. Fetch available chat rooms
app.get("/api/rooms", (req, res) => {
  res.json(rooms);
});

// 6. Create custom rooms
app.post("/api/rooms", (req, res) => {
  const { name, type, description, avatarColor } = req.body;
  if (!name || !type) {
    return res.status(400).json({ error: "Room name and type are required." });
  }

  const newRoom: ChatRoom = {
    id: `room-${Date.now()}`,
    name,
    type,
    description: description || "Channel created via UI interface.",
    avatarColor: avatarColor || "bg-gradient-to-tr from-green-500 to-emerald-600",
  };

  rooms.push(newRoom);
  broadcastMessage("room_created", { room: newRoom });
  res.status(201).json(newRoom);
});

// 7. Get messages for a given room
app.get("/api/rooms/:roomId/messages", (req, res) => {
  const { roomId } = req.params;
  const filtered = messages.filter(m => m.roomId === roomId);
  res.json(filtered);
});

// Helper: triggers server-side Gemini response in background
async function triggerGeminiResponse(roomId: string, userText: string, senderName: string) {
  setTimeout(async () => {
    try {
      const apiKey = process.env.GEMINI_API_KEY;
      let replyText = "";

      if (!apiKey) {
        replyText = `⚠️ **تێبینی:** کلیل جۆری نهێنی GEMINI_API_KEY دەستنیشان نەکراوە لە سێرڤەرەکەت. تکایە لە بەشی ڕێکخستنەکان (Secrets) کلیلەکە کارا بکە بۆ ئەوەی بم بەستێتەوە بە وەڵامی فەرمی!\n\n*(سەرەڕای ئەوە، من لێرەم بۆ یارمەتیدانت!)*`;
      } else {
        const ai = getAI();
        const systemInstruction = 
          "You are the official Aso Messenger Gemini AI assistant. " +
          "Your goal is to answer users intelligently, wisely, and friendly in Kurdish, English or any other language they choose. " +
          "Focus on making answers concise, helpful, and beautifully written. Add emojis appropriate for Kurdish culture if useful!";

        const queryPrompt = `User ${senderName} says: ${userText}`;

        const aiResponse = await ai.models.generateContent({
          model: 'gemini-3.5-flash',
          contents: queryPrompt,
          config: {
            systemInstruction: systemInstruction,
          }
        });

        replyText = aiResponse.text || "ببوورە بەڕێزم، من نەمتوانی وەڵام بدەمەوە. تکایە دووبارە هەوڵبدەرەوە!";
      }

      const botMessage: TelegramMessage = {
        id: `msg-${Date.now()}-${Math.random().toString(36).substr(2, 5)}`,
        roomId,
        senderId: "telegram-bot",
        senderName: "Gemini AI 🤖",
        senderAvatarColor: "bg-gradient-to-tr from-purple-600 to-fuchsia-600",
        text: replyText,
        timestamp: Date.now(),
        reactions: {},
        status: "sent"
      };

      messages.push(botMessage);
      broadcastMessage("new_message", { message: botMessage });

    } catch (err: any) {
      console.error("Gemini API error:", err);
      const errMessage: TelegramMessage = {
        id: `msg-${Date.now()}-${Math.random().toString(36).substr(2, 5)}`,
        roomId,
        senderId: "telegram-bot",
        senderName: "Gemini AI 🤖",
        senderAvatarColor: "bg-gradient-to-tr from-purple-600 to-fuchsia-600",
        text: `ببوورە کێشەیەک ڕوویدا لە کاتی وەڵامدانەوە: ${err?.message || "Error"}`,
        timestamp: Date.now(),
        reactions: {},
        status: "sent"
      };
      messages.push(errMessage);
      broadcastMessage("new_message", { message: errMessage });
    }
  }, 1000);
}

// 8. Send message inside a room
app.post("/api/rooms/:roomId/messages", (req, res) => {
  const { roomId } = req.params;
  const { senderId, senderName, senderAvatarColor, text, mediaUrl, mediaType } = req.body;

  if (!senderId || !text) {
    return res.status(400).json({ error: "Message sender and text are required." });
  }

  const newMessage: TelegramMessage = {
    id: `msg-${Date.now()}-${Math.random().toString(36).substr(2, 5)}`,
    roomId,
    senderId,
    senderName,
    senderAvatarColor: senderAvatarColor || "bg-gradient-to-tr from-gray-500 to-slate-500",
    text,
    timestamp: Date.now(),
    mediaUrl,
    mediaType,
    reactions: {},
    status: "sent"
  };

  messages.push(newMessage);
  broadcastMessage("new_message", { message: newMessage });
  res.status(201).json(newMessage);

  // Trigger server-side Gemini AI Response if in gemini-bot-room or if @gemini / @ai mentioned
  const isAiRoom = roomId === "gemini-bot-room";
  const containsAiMention = text.toLowerCase().includes("@gemini") || text.toLowerCase().includes("@ai");

  if ((isAiRoom || containsAiMention) && senderId !== "telegram-bot" && senderId !== "system") {
    triggerGeminiResponse(roomId, text, senderName);
  }
});

// 9. Send a fast emoji reaction
app.post("/api/rooms/:roomId/messages/:messageId/react", (req, res) => {
  const { roomId, messageId } = req.params;
  const { username, reaction } = req.body;

  if (!username || !reaction) {
    return res.status(400).json({ error: "Username and reaction details are required." });
  }

  const msg = messages.find(m => m.id === messageId);
  if (!msg) {
    return res.status(404).json({ error: "Message not found" });
  }

  if (!msg.reactions) {
    msg.reactions = {};
  }

  if (!msg.reactions[reaction]) {
    msg.reactions[reaction] = [];
  }

  const exists = msg.reactions[reaction].includes(username);
  if (exists) {
    // Remove if toggled again
    msg.reactions[reaction] = msg.reactions[reaction].filter(u => u !== username);
    if (msg.reactions[reaction].length === 0) {
      delete msg.reactions[reaction];
    }
  } else {
    msg.reactions[reaction].push(username);
  }

  // Sync to other users
  broadcastMessage("message_reacted", {
    roomId,
    messageId,
    reactions: msg.reactions
  });

  res.json({ success: true, reactions: msg.reactions });
});

// Vite Middleware registration + Static Fallback for Express SPA Server
async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);

    // Fallback wildcard index.html transformation for development SPA routing
    app.get("*", async (req, res, next) => {
      try {
        const fs = await import("fs");
        let template = fs.readFileSync(path.resolve(process.cwd(), "index.html"), "utf-8");
        template = await vite.transformIndexHtml(req.originalUrl, template);
        res.status(200).set({ "Content-Type": "text/html" }).end(template);
      } catch (e) {
         next(e);
      }
    });
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    
    // Wildcard fallback index.html for production SPA routing
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Aso Messenger Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
