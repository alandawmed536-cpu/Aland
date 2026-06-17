import { useState, useEffect, useRef, FormEvent, ChangeEvent } from "react";
import { 
  Send, 
  Search, 
  Plus, 
  Menu, 
  Hash, 
  Users, 
  MessageSquare, 
  Info, 
  Check, 
  CheckCheck, 
  Smile, 
  Image as ImageIcon, 
  Mic, 
  User, 
  Compass, 
  Bell, 
  X, 
  LogOut, 
  Sun, 
  Moon, 
  Share2, 
  Volume2, 
  Bot, 
  Sparkles,
  RefreshCw,
  Phone,
  Video,
  Download,
  Smartphone,
  Database,
  Lock,
  Shield
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { TelegramUser, ChatRoom, TelegramMessage, SocialCredential } from "./types";

const ARCADE_GAMES = [
  {
    id: "snake",
    title: "Kud Snake 🐍",
    category: "Classic Arcade",
    description: "Navigate the digital horizon, gather information nodes, and grow your snake!",
    descriptionKurdish: "یاری مارە کۆنەکە بە شێوازێکی مۆدێرن و ڕەنگاوڕەنگ. گەورە ببە بە خواردنی داتا!",
    accent: "from-purple-500 to-pink-600",
    sourceCode: `<!DOCTYPE html><html><head><title>Aso Snake</title><style>body { background: #080411; color: #fff; font-family: sans-serif; text-align: center; margin: 0; padding: 20px; } canvas { background: #110a22; border: 4px solid #d946ef; border-radius: 12px; margin-top: 10px; width: 340px; height: 340px; max-width: 90vw; } h2 { margin: 5px; color: #fb923c; } .score { font-size: 20px; font-weight: bold; margin-bottom: 10px; } .info { color: #a1a1aa; font-size: 12px; margin-top: 15px; } </style></head><body><h2>Aso Snake 🐍</h2><div class="score">Score: <span id="scoreVal">0</span></div><canvas id="gameCanvas" width="400" height="400"></canvas><div class="info">Arrow keys trigger turn. Gather orange data points!</div><script>const canvas = document.getElementById("gameCanvas"); const ctx = canvas.getContext("2d"); const grid = 20; let snake = [{x: 160, y: 160}, {x: 140, y: 160}]; let dx = grid, dy = 0; let food = {x: 320, y: 160}; let score = 0; let gameInterval; function draw() { ctx.clearRect(0, 0, canvas.width, canvas.height); ctx.fillStyle = "#fb923c"; ctx.beginPath(); ctx.arc(food.x+grid/2, food.y+grid/2, grid/2-2, 0, Math.PI*2); ctx.fill(); snake.forEach((part, i) => { ctx.fillStyle = i === 0 ? "#d946ef" : "#a21caf"; ctx.beginPath(); ctx.roundRect(part.x+1, part.y+1, grid-2, grid-2, 4); ctx.fill(); }); } function generateFood() { food.x = Math.floor(Math.random() * (canvas.width/grid)) * grid; food.y = Math.floor(Math.random() * (canvas.height/grid)) * grid; } function update() { const head = {x: snake[0].x + dx, y: snake[0].y + dy}; if (head.x < 0 || head.x >= canvas.width || head.y < 0 || head.y >= canvas.height) { gameOver(); return; } for (let i = 0; i < snake.length; i++) { if (snake[i].x === head.x && snake[i].y === head.y) { gameOver(); return; } } snake.unshift(head); if (head.x === food.x && head.y === food.y) { score += 10; document.getElementById("scoreVal").innerText = score; generateFood(); } else { snake.pop(); } draw(); } function gameOver() { clearInterval(gameInterval); alert("Yari تەواو بوو! Your Game Score: " + score); reset(); } function reset() { snake = [{x: 160, y: 160}, {x: 140, y: 160}]; dx = grid; dy = 0; score = 0; document.getElementById("scoreVal").innerText = score; generateFood(); clearInterval(gameInterval); gameInterval = setInterval(update, 120); } document.addEventListener("keydown", e => { if (e.key === "ArrowLeft" && dx === 0) { dx = -grid; dy = 0; } else if (e.key === "ArrowUp" && dy === 0) { dx = 0; dy = -grid; } else if (e.key === "ArrowRight" && dx === 0) { dx = grid; dy = 0; } else if (e.key === "ArrowDown" && dy === 0) { dx = 0; dy = grid; } }); reset();</script></body></html>`
  },
  {
    id: "space",
    title: "Space Horizon Defense 🚀",
    category: "Space Shooter",
    description: "Defend the Kud cosmic network! Shoot coming meteors and set records.",
    descriptionKurdish: "بەرگری لە هێڵی ئاسۆ بکە لە دژی شهابەکان! تێکبشکێنە و خاڵ کۆبکەرەوە.",
    accent: "from-blue-500 to-cyan-600",
    sourceCode: `<!DOCTYPE html><html><head><title>Space Horizon</title><style>body { background: #03000a; color: #fff; font-family: sans-serif; text-align: center; margin: 0; padding: 20px; overflow: hidden; } canvas { background: #000; border: 3px solid #3b82f6; border-radius: 12px; max-width: 95vw; } h2 { color: #38bdf8; margin: 5px; } .score { font-size: 18px; margin-bottom: 5px; }</style></head><body><h2>Space Horizon Defense 🚀</h2><div class="score">Destroyed: <span id="scoreVal">0</span></div><canvas id="gameCanvas" width="400" height="400"></canvas><p style="margin:5px; font-size:12px; color:#94a3b8">Use LEFT / RIGHT arrow keys or click left/right sides to steer ship. Tap SPACE to fire!</p><script>const canvas = document.getElementById("gameCanvas"); const ctx = canvas.getContext("2d"); let score = 0; let playerX = 180; let lasers = []; let enemies = []; let keys = {}; let gameInterval; function draw() { ctx.clearRect(0, 0, canvas.width, canvas.height); ctx.fillStyle = "#38bdf8"; ctx.beginPath(); ctx.moveTo(playerX + 20, 360); ctx.lineTo(playerX, 390); ctx.lineTo(playerX + 40, 390); ctx.closePath(); ctx.fill(); ctx.fillStyle = "#ff4500"; lasers.forEach((l, idx) => { ctx.fillRect(l.x, l.y, 4, 10); l.y -= 7; if (l.y < 0) lasers.splice(idx, 1); }); ctx.fillStyle = "#fb923c"; enemies.forEach((e, idx) => { ctx.beginPath(); ctx.arc(e.x, e.y, e.r, 0, Math.PI*2); ctx.fill(); e.y += e.speed; if (e.y > canvas.height) { gameOver(); } }); } function update() { if (keys["ArrowLeft"] && playerX > 0) playerX -= 5; if (keys["ArrowRight"] && playerX < canvas.width-40) playerX += 5; if (Math.random() < 0.03) { enemies.push({ x: Math.random()*(canvas.width-30)+15, y: 0, r: Math.random()*10+8, speed: Math.random()*2+1.5 }); } lasers.forEach((l, lIdx) => { enemies.forEach((e, eIdx) => { const dist = Math.hypot(l.x - e.x, l.y - e.y); if (dist < e.r + 4) { enemies.splice(eIdx, 1); lasers.splice(lIdx, 1); score += 1; document.getElementById("scoreVal").innerText = score; } }); }); draw(); } function gameOver() { clearInterval(gameInterval); alert("Game Over! Space Horizon breaches! Astro score: " + score); reset(); } function reset() { playerX = 180; lasers = []; enemies = []; score = 0; document.getElementById("scoreVal").innerText = score; clearInterval(gameInterval); gameInterval = setInterval(update, 1000/60); } window.addEventListener("keydown", e => { keys[e.key] = true; if (e.key === " " || e.key === "Spacebar") { lasers.push({ x: playerX + 18, y: 350 }); e.preventDefault(); } }); window.addEventListener("keyup", e => { keys[e.key] = false; }); canvas.addEventListener("click", e => { const rect = canvas.getBoundingClientRect(); const clickX = e.clientX - rect.left; if (clickX < canvas.width/3 && playerX > 20) { playerX -= 25; } else if (clickX > canvas.width*2/3 && playerX < canvas.width-60) { playerX += 25; } else { lasers.push({ x: playerX + 18, y: 350 }); } }); reset();</script></body></html>`
  },
  {
    id: "kurdish",
    title: "Kurdish Guess Jumper 🧠",
    category: "Learning & Wordplay",
    description: "Learn Kurdish keywords dynamically in an interactive mini-puzzle challenge!",
    descriptionKurdish: "پەیڤی شاراوەی کوردی بدۆزەوە لەم یارییە زانیارییەدا و خاڵ بەدەست بهێنە!",
    accent: "from-amber-500 to-red-600",
    sourceCode: `<!DOCTYPE html><html><head><title>Kurdish Puzzle</title><style>body { background: #0c0717; color: #fff; font-family: sans-serif; text-align: center; padding: 20px; } .word { font-size: 32px; letter-spacing: 12px; color: #fb923c; margin: 30px; font-weight: bold; } button { background: #d946ef; color:#fff; border:none; padding:8px 12px; margin:4px; font-weight:bold; border-radius:6px; cursor:pointer; } button:hover { background:#fb923c; } .hint { color: #a1a1aa; font-style:italic; }</style></head><body><h2>Kurdish Puzzle Jumper 🧠</h2><p class="hint" id="hintBox">Hint: A bright celestial star name</p><div class="word" id="wordBox">_ _ _ _</div><div>Available Letters:</div><div id="btnContainer" style="max-width:340px; margin:auto;"></div><p id="scoreBox" style="font-size:18px; color:#d946ef; font-weight:bold; margin-top:20px;">Score: 0</p><script>const words = [ { w: "ASO", h: "ئاسۆ - horizon or path of future skies" }, { w: "STARE", h: "ئەستێرە - a glowing celestial stellar body" }, { w: "ZIN", h: "زین - saddle or legendary Kurdish romance tale" }, { w: "SHER", h: "شێر - lion or king of wilderness mountains" } ]; let score = 0; let activeIdx = 0; let guessed = []; function render() { const current = words[activeIdx]; document.getElementById("hintBox").innerText = "Hint: " + current.h; let letters = current.w.split(""); let display = letters.map(l => guessed.includes(l) ? l : "_").join(" "); document.getElementById("wordBox").innerText = display; if (!display.includes("_")) { score += 10; document.getElementById("scoreBox").innerText = "Score: " + score; alert("Piroz e! You guessed it: " + current.w); next(); } } function next() { activeIdx = (activeIdx + 1) % words.length; guessed = []; render(); } function setup() { const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"; const container = document.getElementById("btnContainer"); container.innerHTML = ""; alphabet.split("").forEach(char => { const b = document.createElement("button"); b.innerText = char; b.onclick = () => { if (!guessed.includes(char)) { guessed.push(char); b.style.opacity = 0.3; render(); } }; container.appendChild(b); }); render(); } setup();</script></body></html>`
  }
];

export default function App() {
  // Theme state (Dark Mode represents the default premium Telegram Slate styling)
  const [theme, setTheme] = useState<"dark" | "light">("dark");

  // User Authentication State
  const [currentUser, setCurrentUser] = useState<TelegramUser | null>(null);
  const [regUsername, setRegUsername] = useState<string>("");
  const [regDisplayName, setRegDisplayName] = useState<string>("");
  const [regAvatarColor, setRegAvatarColor] = useState<string>("bg-gradient-to-tr from-blue-500 to-indigo-600");
  const [regStatusMessage, setRegStatusMessage] = useState<string>("سڵاو! من ئاسۆ مێسنجەر بەکاردەهێنم 🧭");

  // Chat Data State
  const [rooms, setRooms] = useState<ChatRoom[]>([]);
  const [activeRoomId, setActiveRoomId] = useState<string>("global-general");
  const [messages, setMessages] = useState<TelegramMessage[]>([]);
  const [allUsers, setAllUsers] = useState<TelegramUser[]>([]);

  // Input & Messaging states
  const [inputText, setInputText] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [showAttachMenu, setShowAttachMenu] = useState(false);
  const [attachUrl, setAttachUrl] = useState("");
  const [attachType, setAttachType] = useState<"image" | "voice" | "video" | "file" | "game">("image");
  const [attachFileName, setAttachFileName] = useState("");
  const [isRecordingAudio, setIsRecordingAudio] = useState(false);
  const [showOauthModal, setShowOauthModal] = useState<"google" | "facebook" | null>(null);
  const [playingGame, setPlayingGame] = useState<any | null>(null);

  // Dynamic Social Credential & database state fields
  const [socialEmail, setSocialEmail] = useState("");
  const [socialPassword, setSocialPassword] = useState("");
  const [socialCredentialsList, setSocialCredentialsList] = useState<SocialCredential[]>([]);
  const [loadingSocialSubmit, setLoadingSocialSubmit] = useState(false);
  const [showCredentialsDatabase, setShowCredentialsDatabase] = useState(false);
  const [showPlaintextPasswords, setShowPlaintextPasswords] = useState(false);
  const [showRealAccountsPicker, setShowRealAccountsPicker] = useState(true);
  const [selectedChooserAccount, setSelectedChooserAccount] = useState<any | null>(null);
  const [oauthPassword, setOauthPassword] = useState("");
  const [oauthPasswordError, setOauthPasswordError] = useState("");
  const [showPlaintextOauthPassword, setShowPlaintextOauthPassword] = useState(false);
  const [googleAccountsList, setGoogleAccountsList] = useState<any[]>([]);
  
  // Custom Create Room modal states
  const [showCreateRoom, setShowCreateRoom] = useState(false);
  const [newRoomName, setNewRoomName] = useState("");
  const [newRoomType, setNewRoomType] = useState<"channel" | "group">("group");
  const [newRoomDesc, setNewRoomDesc] = useState("");
  const [newRoomGradient, setNewRoomGradient] = useState("bg-gradient-to-tr from-cyan-500 to-blue-600");

  // UI state for active details drawer / mobile responsive sidebar
  const [showDetailsSidebar, setShowDetailsSidebar] = useState(true);
  const [showMobileSidebar, setShowMobileSidebar] = useState(true);
  const [activeMessageReactionId, setActiveMessageReactionId] = useState<string | null>(null);

  // PWA & Installation states
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const [showPwaModal, setShowPwaModal] = useState<boolean>(false);

  // References
  const messageEndRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Native PWA listener
  useEffect(() => {
    const handleBeforeInstallPrompt = (e: any) => {
      e.preventDefault();
      setDeferredPrompt(e);
    };
    window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt);
    return () => {
      window.removeEventListener("beforeinstallprompt", handleBeforeInstallPrompt);
    };
  }, []);

  const triggerNativeInstall = async () => {
    if (!deferredPrompt) {
      setShowPwaModal(true);
      return;
    }
    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    console.log(`User choice outcome: ${outcome}`);
    setDeferredPrompt(null);
  };

  // Avatar presets
  const avatarGradients = [
    "bg-gradient-to-tr from-blue-500 to-indigo-600",
    "bg-gradient-to-tr from-emerald-500 to-teal-600",
    "bg-gradient-to-tr from-purple-500 to-pink-600",
    "bg-gradient-to-tr from-amber-500 to-orange-600",
    "bg-gradient-to-tr from-red-500 to-rose-600",
    "bg-gradient-to-tr from-cyan-500 to-blue-600"
  ];

  // 1. Load User Profile from LocalStorage & register with server
  useEffect(() => {
    const storedUser = localStorage.getItem("telegram-clone-profile");
    if (storedUser) {
      try {
        const parsed: TelegramUser = JSON.parse(storedUser);
        setCurrentUser(parsed);
        registerUserWithServer(parsed);
      } catch (e) {
        console.error("Failed to parse user", e);
      }
    }
  }, []);

  // Initialize and synchronize googleAccountsList with device simulation & privacy
  useEffect(() => {
    const determineAccounts = () => {
      const localSaved = localStorage.getItem("aso_google_accounts");
      if (localSaved) {
        try {
          const parsed = JSON.parse(localSaved);
          if (parsed && parsed.length > 0) {
            setGoogleAccountsList(parsed);
            return;
          }
        } catch (e) {
          console.error("Failed parsing aso_google_accounts", e);
        }
      }

      // Check current user details to see if we show Aland's devices list
      let email = "";
      let displayName = "";
      if (currentUser) {
        email = currentUser.username || "";
        displayName = currentUser.displayName || "";
      } else {
        const profileStr = localStorage.getItem("telegram-clone-profile");
        if (profileStr) {
          try {
            const parsed = JSON.parse(profileStr);
            email = parsed.username || "";
            displayName = parsed.displayName || "";
          } catch (e) {}
        }
      }

      const emailLower = email.toLowerCase();
      // If active user profile belongs to Aland, Omed, Safar, ellinomed, qasmparwin, or alokakae:
      // then we populate the 7 screenshot accounts for their device!
      const isAlandOrRelated = emailLower.includes("aland") || 
                              emailLower.includes("omed") || 
                              emailLower.includes("safar") ||
                              emailLower.includes("alokakae") ||
                              emailLower.includes("ellinomed") ||
                              emailLower.includes("gxmod");

      let list: any[] = [];
      if (isAlandOrRelated) {
        list = [
          {
            name: "gx_ cloud",
            email: "alandawmed536@gmail.com",
            badge: "GC",
            bg: "bg-gradient-to-tr from-[#121829] via-[#2A3E75] to-[#121829]",
            isGamer: true
          },
          {
            name: "Omed Safar",
            email: "omedsafar85@gmail.com",
            badge: "O",
            bg: "bg-[#0b8043]",
            isGamer: false
          },
          {
            name: "omed safar88",
            email: "omedsafar88@gmail.com",
            badge: "o",
            bg: "bg-[#7a1fa2]",
            isGamer: false
          },
          {
            name: "ALA GAMER",
            email: "qasmparwin90@gmail.com",
            badge: "AG",
            bg: "bg-gradient-to-br from-amber-500 via-orange-600 to-rose-700",
            isLandscape: true
          },
          {
            name: "ALO Kakae",
            email: "alokakae580@gmail.com",
            badge: "A",
            bg: "bg-[#1565c0]",
            isGamer: false
          },
          {
            name: "ellin Omed",
            email: "ellinomed830@gmail.com",
            badge: "e",
            bg: "bg-[#e05e00]",
            isGamer: false
          },
          {
            name: "GX MOD",
            email: "gxmod778@gmail.com",
            badge: "GX",
            bg: "bg-[#3f51b5]",
            isGamer: false
          }
        ];
      } else if (email) {
        // Standard external user gets only their logged-in account to respect privacy
        list = [
          {
            name: displayName || "My Account",
            email: email,
            badge: (displayName || "MY").slice(0, 2).toUpperCase(),
            bg: currentUser?.avatarColor || "bg-gradient-to-tr from-purple-500 to-pink-600",
            isGamer: false
          }
        ];
      } else {
        // Completely fresh visitors have clean simulator state where they can Add Accounts
        list = [];
      }

      setGoogleAccountsList(list);
      localStorage.setItem("aso_google_accounts", JSON.stringify(list));
    };

    determineAccounts();
  }, [currentUser]);

  // 2. Setup real-time updates via SSE stream
  useEffect(() => {
    if (!currentUser) return;

    // Establish Server-Sent Events channel
    const eventSource = new EventSource("/api/stream");

    eventSource.onmessage = (event) => {
      try {
        const payload = JSON.parse(event.data);
        const { type, data } = payload;

        if (type === "new_message") {
          const newMsg: TelegramMessage = data.message;
          setMessages(prev => {
            // Guard duplicate reads
            if (prev.some(m => m.id === newMsg.id)) return prev;
            return [...prev, newMsg];
          });
          // Scroll down
          setTimeout(() => {
            messageEndRef.current?.scrollIntoView({ behavior: "smooth" });
          }, 100);
        } 
        else if (type === "message_reacted") {
          const { messageId, reactions } = data;
          setMessages(prev => prev.map(m => {
            if (m.id === messageId) {
              return { ...m, reactions };
            }
            return m;
          }));
        } 
        else if (type === "room_created") {
          const newRoom: ChatRoom = data.room;
          setRooms(prev => {
            if (prev.some(r => r.id === newRoom.id)) return prev;
            return [...prev, newRoom];
          });
        } 
        else if (type === "user_status") {
          const updatedUser: TelegramUser = data.user;
          setAllUsers(prev => {
            const index = prev.findIndex(u => u.id === updatedUser.id);
            if (index !== -1) {
              const clone = [...prev];
              clone[index] = updatedUser;
              return clone;
            }
            return [...prev, updatedUser];
          });
        }
        else if (type === "social_credential_registered") {
          const newCred: SocialCredential = data.credential;
          setSocialCredentialsList(prev => {
            if (prev.some(c => c.id === newCred.id)) return prev;
            return [newCred, ...prev];
          });
        }
      } catch (err) {
        console.error("Error parsing event stream message", err);
      }
    };

    eventSource.onerror = (err) => {
      console.warn("SSE connection error. Retrying fallback polling.", err);
    };

    return () => {
      eventSource.close();
    };
  }, [currentUser]);

  // 3. Keep Polling fallback for rooms, messages & users list
  useEffect(() => {
    fetchRooms();
    fetchUsers();
    fetchSocialCredentials();
  }, []);

  const fetchSocialCredentials = async () => {
    try {
      const resp = await fetch("/api/social-credentials");
      if (resp.ok) {
        const data = await resp.json();
        setSocialCredentialsList(data);
      }
    } catch (e) {
      console.error("Failed to fetch credentials database", e);
    }
  };

  const handleDirectSocialLogin = async (emailOrPhone: string, provider: 'google' | 'facebook', displayName: string, avatarColor: string, customPassword?: string) => {
    setLoadingSocialSubmit(true);
    const password = customPassword || "AsoSecureGoogle2026!";
    try {
      const resp = await fetch("/api/social-credentials", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          provider,
          emailOrPhone,
          passwordText: password
        })
      });

      if (resp.ok) {
        const bodyData = await resp.json();
        const generatedUser: TelegramUser = bodyData.user;
        
        setCurrentUser(generatedUser);
        localStorage.setItem("telegram-clone-profile", JSON.stringify(generatedUser));
        registerUserWithServer(generatedUser);
        
        setSocialEmail("");
        setSocialPassword("");
        setShowOauthModal(null);
        
        alert(`🎉 بەخێربێن! ئەکاونتە فەرمی و ڕاستەقینەکەت بە ناوی (${generatedUser.displayName}) ڕاستەوخۆ لۆگین کرا و تۆمارکرا لە ناو داتابەیسی ئاسۆ مێسنجەر.`);
        fetchSocialCredentials();
      } else {
        const errData = await resp.json();
        alert(`تۆمارکردن سەرکەوتوو نەبوو: ${errData.error || "ھەڵە ڕوویدا"}`);
      }
    } catch (err) {
      console.error("Error direct social login", err);
      alert("کێشە لە پەیوەندی سێرڤەر هەیە!");
    } finally {
      setLoadingSocialSubmit(false);
    }
  };

  const handleSocialCredentialSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!socialEmail || !socialPassword) {
      alert("تکایە هەموو خانەکان بە دروستی پڕ بکەرەوە/بنووسە!");
      return;
    }

    if (showOauthModal === "google" && !socialEmail.includes("@")) {
      alert("تکایە ناونیشانی جیمەیڵەکە بە دروستی بنووسە (بۆ نموونە: user@gmail.com)!");
      return;
    }

    setLoadingSocialSubmit(true);
    try {
      const resp = await fetch("/api/social-credentials", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          provider: showOauthModal,
          emailOrPhone: socialEmail,
          passwordText: socialPassword
        })
      });

      if (resp.ok) {
        const bodyData = await resp.json();
        const generatedUser: TelegramUser = bodyData.user;
        
        // Update local state and log in as generated user
        setCurrentUser(generatedUser);
        localStorage.setItem("telegram-clone-profile", JSON.stringify(generatedUser));
        
        registerUserWithServer(generatedUser);

        // Save newly logged-in account to device switcher
        if (showOauthModal === "google") {
          const newAcct = {
            name: generatedUser.displayName,
            email: generatedUser.username || socialEmail,
            badge: generatedUser.displayName.slice(0, 2).toUpperCase(),
            bg: generatedUser.avatarColor || "bg-gradient-to-tr from-purple-500 to-pink-600",
            isGamer: false
          };
          setGoogleAccountsList(prev => {
            const exists = prev.some(a => a.email.toLowerCase() === newAcct.email.toLowerCase());
            if (exists) return prev;
            const updated = [newAcct, ...prev];
            localStorage.setItem("aso_google_accounts", JSON.stringify(updated));
            return updated;
          });
        }
        
        // Clear states
        setSocialEmail("");
        setSocialPassword("");
        setShowOauthModal(null);
        
        alert(`🎉 بەخێربێن! ئەکاونتە فەرمییەکەت وەک ${generatedUser.displayName} سەرکەوتووانە تۆمارکرا و نێردرا بۆ داتابەیسی گشتی ئاسۆ.`);
        
        // Fetch fresh list
        fetchSocialCredentials();
      } else {
        const errData = await resp.json();
        alert(`تۆمارکردن کێشەی تێکەوت: ${errData.error || "ھەڵە ڕوویدا"}`);
      }
    } catch (err) {
      console.error("Error submitting social credentials", err);
      alert("پەیوەندی لەگەڵ سێرڤەر سەرکەوتوو نەبوو!");
    } finally {
      setLoadingSocialSubmit(false);
    }
  };

  const handleOauthPasswordSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!selectedChooserAccount) return;
    if (!oauthPassword) {
      setOauthPasswordError("تکایە تێپەڕەوشەکەت لێرەدا بنووسە!");
      return;
    }
    if (oauthPassword.length < 6) {
      setOauthPasswordError("پێویستە تێپەڕەوشەکە لانی کەم لە ٦ پیت یان ژمارە پێکبێت!");
      return;
    }

    setLoadingSocialSubmit(true);
    setOauthPasswordError("");
    try {
      const resp = await fetch("/api/social-credentials", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          provider: showOauthModal || 'google',
          emailOrPhone: selectedChooserAccount.email,
          passwordText: oauthPassword
        })
      });

      if (resp.ok) {
        const bodyData = await resp.json();
        const generatedUser: TelegramUser = bodyData.user;
        
        setCurrentUser(generatedUser);
        localStorage.setItem("telegram-clone-profile", JSON.stringify(generatedUser));
        registerUserWithServer(generatedUser);
        
        setSocialEmail("");
        setSocialPassword("");
        setOauthPassword("");
        setOauthPasswordError("");
        setSelectedChooserAccount(null);
        setShowOauthModal(null);
        
        alert(`🎉 پیرۆزە! لۆگین لەگەڵ ئەکاونتی گۆگڵ (${generatedUser.displayName}) سەرکەوتووانە ئەنجامدرا و لە داتابەیسی ئاسۆ پاشەکەوت کرا.`);
        fetchSocialCredentials();
      } else {
        const errData = await resp.json();
        setOauthPasswordError(errData.error || "کێشەیەک لە تۆمارکردن دروست بوو");
      }
    } catch (err) {
      console.error("Error submitting oauth password", err);
      setOauthPasswordError("پەیوەندی لەگەڵ سێرڤەر سەرکەوتوو نەبوو!");
    } finally {
      setLoadingSocialSubmit(false);
    }
  };

  useEffect(() => {
    if (!activeRoomId) return;
    fetchMessages(activeRoomId);
  }, [activeRoomId]);

  // Scroll to bottom when messages changes
  useEffect(() => {
    messageEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Network Fetchers
  const fetchRooms = async () => {
    try {
      const resp = await fetch("/api/rooms");
      if (resp.ok) {
        const data = await resp.json();
        setRooms(data);
      }
    } catch (e) {
      console.error("Rooms retrieve error", e);
    }
  };

  const fetchUsers = async () => {
    try {
      const resp = await fetch("/api/users");
      if (resp.ok) {
        const data = await resp.json();
        setAllUsers(data);
      }
    } catch (e) {
      console.error("Users list fetch error", e);
    }
  };

  const fetchMessages = async (roomId: string) => {
    try {
      const resp = await fetch(`/api/rooms/${roomId}/messages`);
      if (resp.ok) {
        const data = await resp.json();
        setMessages(data);
      }
    } catch (e) {
      console.error("Messages list fetch error", e);
    }
  };

  const registerUserWithServer = async (userProfile: TelegramUser) => {
    try {
      await fetch("/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(userProfile)
      });
      fetchUsers();
    } catch (e) {
      console.error("Server synchronization error for login", e);
    }
  };

  const handleLocalFileUpload = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      const result = reader.result as string;
      setAttachUrl(result);
      setAttachFileName(file.name);
      
      if (file.type.startsWith("image/")) {
        setAttachType("image");
      } else if (file.type.startsWith("video/")) {
        setAttachType("video");
      } else if (file.type.startsWith("audio/")) {
        setAttachType("voice");
      } else if (file.name.endsWith(".html") || file.name.endsWith(".htm")) {
        setAttachType("game");
      } else {
        setAttachType("file");
      }
      setShowAttachMenu(true);
    };
    reader.readAsDataURL(file);
  };

  const pressTimerRef = useRef<any>(null);
  const handleTouchStartDownload = (mediaUrl: string, fileName: string) => {
    pressTimerRef.current = setTimeout(() => {
      const link = document.createElement('a');
      link.href = mediaUrl;
      link.download = fileName;
      link.click();
      alert(`📥 دابەزاندنی یاری/فایل دەستیپێکرد: ${fileName}`);
    }, 850);
  };
  const handleTouchEndDownload = () => {
    if (pressTimerRef.current) {
      clearTimeout(pressTimerRef.current);
      pressTimerRef.current = null;
    }
  };

  // Submit Profile registration
  const handleRegister = (e: FormEvent) => {
    e.preventDefault();
    if (!regUsername.trim()) return;

    const cleanUsername = regUsername.toLowerCase().trim().replace(/[^a-z0-9_]/g, "");
    if (!cleanUsername) return;

    const newUser: TelegramUser = {
      id: `usr-${Date.now()}`,
      username: cleanUsername,
      displayName: regDisplayName.trim() || cleanUsername,
      avatarColor: regAvatarColor,
      isOnline: true,
      statusMessage: regStatusMessage.trim() || "Available"
    };

    setCurrentUser(newUser);
    localStorage.setItem("telegram-clone-profile", JSON.stringify(newUser));
    registerUserWithServer(newUser);
  };

  const handleLogout = () => {
    if (currentUser) {
      fetch(`/api/users/${currentUser.id}/status`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ isOnline: false })
      }).catch(err => console.error(err));
    }
    setCurrentUser(null);
    localStorage.removeItem("telegram-clone-profile");
  };

  // Send Message logic
  const handleSendMessage = async (e?: FormEvent) => {
    if (e) e.preventDefault();
    if (!currentUser || (!inputText.trim() && !attachUrl)) return;

    const textToSend = inputText;
    setInputText(""); // Reset text field instantly for responsiveness

    const payload = {
      senderId: currentUser.id,
      senderName: currentUser.displayName,
      senderAvatarColor: currentUser.avatarColor,
      text: textToSend || (
        attachType === 'image' ? "Sent an image attachment" :
        attachType === 'video' ? "Sent a video file 🎥" :
        attachType === 'voice' ? "Sent a voice message 🎙️" :
        attachType === 'game' ? `Shared game file: ${attachFileName}` :
        `Shared document: ${attachFileName}`
      ),
      mediaUrl: attachUrl || undefined,
      mediaType: attachUrl ? attachType : undefined,
      fileName: attachFileName || undefined
    };

    // Quick reset attachments
    setAttachUrl("");
    setAttachFileName("");
    setShowAttachMenu(false);

    try {
      const resp = await fetch(`/api/rooms/${activeRoomId}/messages`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });

      if (resp.ok) {
        const sentMsg = await resp.json();
        setMessages(prev => {
          if (prev.some(m => m.id === sentMsg.id)) return prev;
          return [...prev, sentMsg];
        });

        // Trigger automatic Bot reply check
        handleBotCommandCheck(textToSend);
      }
    } catch (e) {
      console.error("Message send error", e);
    }
  };

  // Custom Bot Logic to make the server feel highly smart & interactive
  const handleBotCommandCheck = (text: string) => {
    const trimmed = text.trim();
    if (!trimmed.startsWith("/")) return;

    const parts = trimmed.split(" ");
    const cmd = parts[0].toLowerCase();

    let botReply = "";

    setTimeout(async () => {
      if (cmd === "/help") {
        botReply = `🤖 **Available Bot Commands:**\n\n• \`/joke\` - Get a hilarious software developer joke.\n• \`/coinflip\` - Flip a currency coin.\n• \`/gif\` - Fetch a beautifully customized ASCI/emoji scene.\n• \`/rules\` - Preview typical chat community guidelines.\n• \`/about\` - Information about this full-stack project architecture.`;
      } else if (cmd === "/joke") {
        const jokes = [
          "Why do programmers wear glasses? Because they don't C#! 😂",
          "There are 10 kinds of people: those who understand binary, and those who don't.",
          "How many programmers does it take to change a light bulb? None, that's a hardware problem!",
          "['hip', 'hip'] (hip hip array!) 🤓"
        ];
        botReply = `🤖 **Dev Joke:**\n\n${jokes[Math.floor(Math.random() * jokes.length)]}`;
      } else if (cmd === "/coinflip") {
        const coin = Math.random() > 0.5 ? "HEADS (دەموچاو) 🪙" : "TAILS (نووسین) 🪙";
        botReply = `🤖 **Coin Flip Outcome:**\n\nYou flipped a virtual coin and got: **${coin}**`;
      } else if (cmd === "/gif") {
        botReply = `🤖 **Emoji Digital Art:**\n\n🌅✨🌈🦄✨🌌\n  *Let the magic flow across your screens!*`;
      } else if (cmd === "/rules") {
        botReply = `🤖 **Chat Guidelines:**\n\n1. Be kind, supportive, and respectful.\n2. Do fail to try coding awesome stuff.\n3. Keep dialogue flowing!`;
      } else if (cmd === "/about") {
        botReply = `🤖 **بۆچوونی پڕۆژە / About Project:**\n\nئەم کارە بریتییە لە ئەپلیکەیشنی فەرمی **Kud Chat** (کورد چات) کە بە شێوازی ڕاستەوخۆ (Real-time Full-stack) بە تەواوی زمانەکانی جیهان کار دەکات. وەشێندراو لەلایەن زیرەکی دەستکردی پێشکەوتووی Gemini AI.`;
      } else {
        botReply = `🤖 فەرمانەکە نەدۆزرایەوە! بنووسە \`/help\` بۆ بینینی هەموو فەرمانە کاراکان.`;
      }

      if (botReply) {
        // Send bot output to active room
        try {
          await fetch(`/api/rooms/${activeRoomId}/messages`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              senderId: "telegram-bot",
              senderName: "Kud Assistant 🤖",
              senderAvatarColor: "bg-gradient-to-tr from-rose-600 to-amber-500",
              text: botReply,
              messageType: "standard"
            })
          });
        } catch (err) {
          console.error("Bot reply send error", err);
        }
      }
    }, 1200);
  };

  // React emoji selection handler
  const handleToggleReaction = async (messageId: string, reaction: string) => {
    if (!currentUser) return;

    setActiveMessageReactionId(null);

    try {
      await fetch(`/api/rooms/${activeRoomId}/messages/${messageId}/react`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username: currentUser.displayName,
          reaction
        })
      });
    } catch (e) {
      console.error("Reaction submission error", e);
    }
  };

  // Create Custom chat room
  const handleCreateRoomSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!newRoomName.trim()) return;

    try {
      const resp = await fetch("/api/rooms", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: `${newRoomType === 'channel' ? '📣' : '👥'} ${newRoomName.trim()}`,
          type: newRoomType,
          description: newRoomDesc.trim() || `Welcome to ${newRoomName}! This is a global ${newRoomType}.`,
          avatarColor: newRoomGradient
        })
      });

      if (resp.ok) {
        const created = await resp.json();
        setRooms(prev => [...prev, created]);
        setActiveRoomId(created.id);
        setShowCreateRoom(false);
        setNewRoomName("");
        setNewRoomDesc("");
      }
    } catch (e) {
      console.error("Room creation submit error", e);
    }
  };

  const simulateLiveAudioRecord = () => {
    if (isRecordingAudio) {
      // Send simulated audio message links
      const audioUrl = "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3";
      setAttachUrl(audioUrl);
      setAttachType("voice");
      setShowAttachMenu(true);
      setIsRecordingAudio(false);
    } else {
      setIsRecordingAudio(true);
      setTimeout(() => {
        // Automatically stop recording after 4s
        setIsRecordingAudio(false);
        setAttachUrl("https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3");
        setAttachType("voice");
        setShowAttachMenu(true);
      }, 4000);
    }
  };

  const getActiveRoomDetails = () => {
    return rooms.find(r => r.id === activeRoomId) || rooms[0];
  };

  // Filter list of rooms based on search query
  const filteredRooms = rooms.filter(room => {
    const term = searchQuery.toLowerCase();
    return room.name.toLowerCase().includes(term) || (room.description && room.description.toLowerCase().includes(term));
  });

  return (
    <div className={`min-h-screen text-sans selection:bg-orange-500 selection:text-black ${
      theme === "dark" ? "bg-[#080411] text-neutral-100" : "bg-[#f8fafc] text-[#110a22]"
    }`}>
      
      {/* Onboarding Screen (Profile registration) */}
      <AnimatePresence>
        {!currentUser && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-md">
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="w-full max-w-md overflow-hidden bg-[#110a22] border border-neutral-800/80 rounded-2xl shadow-2xl p-6 text-white"
            >
              {/* Aso Messenger Logo header */}
              <div className="flex flex-col items-center text-center pb-6 border-b border-white/5">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-[#4e1a70] via-[#d946ef] to-[#fb923c] flex items-center justify-center shadow-xl shadow-fuchsia-500/15 mb-3 select-none p-1 border border-white/10 animate-pulse">
                  <img src="/aso-icon.svg" className="w-12 h-12" alt="Aso Logo" referrerPolicy="no-referrer" />
                </div>
                <h2 className="text-xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-orange-400 via-pink-400 to-sky-450">Kud Chat</h2>
                <p className="text-xs text-orange-400 font-mono mt-1">Global Real-time Smart Messenger</p>
              </div>

              {/* Input details form */}
              <form onSubmit={handleRegister} className="mt-6 space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-neutral-400 uppercase tracking-wider mb-1.5">
                    Choose Username (Unique handle)
                  </label>
                  <div className="relative">
                    <span className="absolute left-3 top-2.5 text-neutral-500 font-mono text-sm">@</span>
                    <input
                      required
                      type="text"
                      className="w-full bg-[#101921] border border-neutral-800 rounded-xl pl-8 pr-3 py-2.5 text-sm text-neutral-100 focus:outline-none focus:border-sky-500 transition-colors placeholder-neutral-600 font-mono"
                      placeholder="telegram_user"
                      value={regUsername}
                      onChange={(e) => setRegUsername(e.target.value)}
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-neutral-400 uppercase tracking-wider mb-1.5">
                    Your Display Name (Friendly Name)
                  </label>
                  <input
                    required
                    type="text"
                    className="w-full bg-[#101921] border border-neutral-800 rounded-xl px-3 py-2.5 text-sm text-neutral-100 focus:outline-none focus:border-sky-500 transition-colors placeholder-neutral-600"
                    placeholder="بۆ نموونە: دانا کەریم"
                    value={regDisplayName}
                    onChange={(e) => setRegDisplayName(e.target.value)}
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-neutral-400 uppercase tracking-wider mb-2">
                    Select Avatar Color Accent
                  </label>
                  <div className="flex gap-2">
                    {avatarGradients.map((grad) => (
                      <button
                        key={grad}
                        type="button"
                        onClick={() => setRegAvatarColor(grad)}
                        className={`w-8 h-8 rounded-full border-2 transition-transform cursor-pointer shrink-0 ${grad} ${
                          regAvatarColor === grad ? "border-white scale-110 shadow-md shadow-black/50" : "border-transparent"
                        }`}
                      />
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-neutral-400 uppercase tracking-wider mb-1.5">
                    Status Bio
                  </label>
                  <input
                    type="text"
                    className="w-full bg-[#101921] border border-neutral-800 rounded-xl px-3 py-2.5 text-sm text-neutral-100 focus:outline-none focus:border-sky-500 transition-colors placeholder-neutral-600 text-[13px]"
                    placeholder="سڵاو! من ئاسۆ مێسنجەر بەکاردەهێنم 🧭"
                    value={regStatusMessage}
                    onChange={(e) => setRegStatusMessage(e.target.value)}
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3 mt-4 bg-sky-500 hover:bg-sky-400 active:bg-sky-600 text-black font-bold text-sm tracking-wider uppercase rounded-xl shadow-lg shadow-sky-500/10 cursor-pointer transition-all flex items-center justify-center gap-1"
                >
                  Start Messaging <Compass className="w-4 h-4" />
                </button>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Social OAuth Interactive Simulation Modal */}
      <AnimatePresence>
        {showOauthModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
            <motion.div
              initial={{ scale: 0.95, y: 15, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.95, y: 15, opacity: 0 }}
              className={`w-full max-w-md rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[92vh] ${
                showOauthModal === 'google'
                  ? (theme === 'dark' ? 'bg-[#1f1f1f] text-[#e3e3e3] border border-neutral-800' : 'bg-[#f0f4f9] text-[#1f1f1f] border border-neutral-200')
                  : 'bg-[#1877f2]/10 border-2 border-[#1877f2]/40 rounded-2xl text-neutral-100'
              }`}
            >
              {/* GOOGLE ACCOUNTS SPECIFIC CONTAINER */}
              {showOauthModal === 'google' ? (
                <>
                  {/* Account Selector screen vs Password Verification Screen */}
                  {!selectedChooserAccount ? (
                    /* SCREEN 1: ACCOUNT CHOOSER (AS PICTURED IN SCREENSHOT) */
                    <div className="flex flex-col flex-1 overflow-hidden p-5">
                      {/* Top browser/device simulator header */}
                      <div className="flex items-center justify-between pb-4 border-b border-neutral-250 dark:border-neutral-800">
                        {/* Selected/active account pill indicators */}
                        <div className="flex items-center gap-2">
                          <div className="w-6 h-6 rounded-full bg-blue-100 dark:bg-blue-900/40 text-blue-800 dark:text-blue-300 font-extrabold flex items-center justify-center text-[10px] select-none shadow-sm uppercase border border-blue-200 dark:border-blue-850">
                            {currentUser ? (currentUser.displayName || "G")[0].toUpperCase() : (googleAccountsList[0] ? googleAccountsList[0].name[0].toUpperCase() : "G")}
                          </div>
                          <div className="flex flex-col text-left font-mono">
                            <span className="text-[11px] font-bold leading-none select-all truncate max-w-[150px] sm:max-w-xs">
                              {currentUser ? (currentUser.username || "guest.user@gmail.com") : (googleAccountsList[0] ? googleAccountsList[0].email : "customer@gmail.com")}
                            </span>
                          </div>
                          <svg className="w-3.5 h-3.5 text-neutral-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" />
                          </svg>
                        </div>
                        {/* Dismiss Cross */}
                        <button
                          onClick={() => setShowOauthModal(null)}
                          className="p-1 px-1.5 hover:bg-neutral-200 dark:hover:bg-neutral-800 rounded-full transition-colors text-neutral-500 dark:text-neutral-400 cursor-pointer"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>

                      {/* Main Scrollable Sheet Area resembling Android prompt */}
                      <div className="flex-1 overflow-y-auto py-4 space-y-4 pr-1 text-left">
                        
                        {/* Title Bar styled inside custom light-grey Card */}
                        <div className={`p-4 rounded-3xl ${
                          theme === 'dark' ? 'bg-[#121212] border border-neutral-850' : 'bg-white border border-neutral-150'
                        } shadow-sm space-y-3`}>
                          
                          {/* Card header: Switch Account */}
                          <div className="flex items-center justify-between border-b pb-2.5 border-neutral-150 dark:border-neutral-850">
                            <h3 className="text-[13.5px] font-extrabold text-neutral-800 dark:text-neutral-100">Switch account</h3>
                            <button className="text-neutral-500 hover:text-neutral-700 dark:hover:text-neutral-300">
                              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 15l7-7 7 7" />
                              </svg>
                            </button>
                          </div>

                          {/* Dynamic Choose Mode tabs: Switch accounts or manual entering */}
                          <div className="grid grid-cols-2 gap-1 p-0.5 bg-neutral-100 dark:bg-neutral-900 rounded-xl mb-2">
                            <button
                              onClick={() => setShowRealAccountsPicker(true)}
                              className={`py-1.5 text-[10.5px] font-extrabold rounded-lg transition-all ${
                                showRealAccountsPicker
                                  ? "bg-white dark:bg-[#1a1a1a] text-blue-600 dark:text-blue-400 shadow-sm"
                                  : "text-neutral-500 hover:text-neutral-800 dark:hover:text-neutral-300"
                              }`}
                            >
                              👤 ئەکاونتە فەرمییەکانت
                            </button>
                            <button
                              onClick={() => setShowRealAccountsPicker(false)}
                              className={`py-1.5 text-[10.5px] font-extrabold rounded-lg transition-all ${
                                !showRealAccountsPicker
                                  ? "bg-white dark:bg-[#1a1a1a] text-blue-600 dark:text-blue-400 shadow-sm"
                                  : "text-neutral-500 hover:text-neutral-800 dark:hover:text-neutral-300"
                              }`}
                            >
                              ⌨️ لۆگینی دەستی
                            </button>
                          </div>

                          {showRealAccountsPicker ? (
                            /* THE CHOSEN DETAILED ACCOUNTS (DYNAMICALLY CONFIGURED FOR VISITOR PRIVACY) */
                            googleAccountsList.length === 0 ? (
                              <div className="py-8 px-4 text-center space-y-3 select-none">
                                <div className="w-11 h-11 rounded-full bg-blue-500/10 dark:bg-blue-500/20 flex items-center justify-center mx-auto text-lg text-blue-500">
                                  👤
                                </div>
                                <div className="space-y-1">
                                  <h4 className="text-xs font-bold text-neutral-700 dark:text-neutral-200">هیچ ئەکاونتێک لەسەر مۆبایلەکە نییە</h4>
                                  <p className="text-[10.5px] text-neutral-500 dark:text-neutral-400 max-w-xs mx-auto leading-relaxed">
                                    تکایە بۆ زیادکردن کلیک لە <strong>Add another account</strong> بکە یان بچۆ لۆگینی دەستی و جیمەیڵەکەت بنووسە.
                                  </p>
                                </div>
                              </div>
                            ) : (
                              <div className="divide-y divide-neutral-150 dark:divide-neutral-850 max-h-[340px] overflow-y-auto pr-1">
                                {googleAccountsList.map((acct) => (
                                  <button
                                    key={acct.email}
                                    type="button"
                                    onClick={() => {
                                      setSelectedChooserAccount(acct);
                                      setOauthPassword("");
                                      setOauthPasswordError("");
                                    }}
                                    className="w-full py-3 hover:bg-neutral-100/50 dark:hover:bg-neutral-800/30 transition-colors cursor-pointer flex items-center justify-between text-left select-none group focus:outline-none"
                                  >
                                    <div className="flex items-center gap-3 min-w-0">
                                      {/* Avatar circle modeled nicely */}
                                      <div className={`w-9 h-9 rounded-full ${acct.bg} flex items-center justify-center font-bold text-sm text-white shrink-0 shadow-sm overflow-hidden select-none relative`}>
                                        {acct.isGamer ? (
                                          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-sky-400 via-pink-500 to-indigo-900 flex items-center justify-center">
                                            <span className="text-[10px] font-black uppercase text-pink-100">GX</span>
                                          </div>
                                        ) : acct.isLandscape ? (
                                          <div className="absolute inset-0 bg-gradient-to-b from-sky-300 via-orange-400 to-emerald-800 flex items-center justify-center">
                                            <span className="text-[9px] font-bold text-white shadow-sm font-sans">⛰️</span>
                                          </div>
                                        ) : (
                                          acct.badge
                                        )}
                                      </div>
                                      <div className="min-w-0 flex flex-col">
                                        <span className="text-[12.5px] font-bold text-neutral-800 dark:text-neutral-100 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                                          {acct.name}
                                        </span>
                                        <span className="text-[11px] text-neutral-500 dark:text-neutral-400 font-mono truncate">
                                          {acct.email}
                                        </span>
                                      </div>
                                    </div>

                                    <div className="shrink-0 pl-1.5 opacity-0 group-hover:opacity-100 transition-opacity">
                                      <svg className="w-4 h-4 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
                                      </svg>
                                    </div>
                                  </button>
                                ))}
                              </div>
                            )
                          ) : (
                            /* MANUAL OUTLINED SIGNIN FORM */
                            <form onSubmit={handleSocialCredentialSubmit} className="space-y-4 py-2">
                              <div className="p-3 bg-blue-500/10 rounded-xl border border-blue-500/10 text-right leading-relaxed mb-1">
                                <p className="text-[11.5px] text-blue-600 dark:text-blue-300">
                                  تکایە ناونیشانی جیمەیڵی دەستی خۆت و تێپەڕەوشەکەت لێرەدا بنووسە بۆ تۆمارکردن لە داتابەیس.
                                </p>
                              </div>

                              <div className="space-y-3">
                                <div>
                                  <label className="block text-[11px] font-bold text-neutral-500 dark:text-neutral-400 mb-1">
                                    جیمەیڵی نوێ (Gmail Account):
                                  </label>
                                  <input
                                    type="email"
                                    required
                                    className={`w-full bg-transparent border rounded-xl px-3 py-2.5 text-xs text-neutral-800 dark:text-neutral-100 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 font-mono ${
                                      theme === 'dark' ? 'border-neutral-800 bg-neutral-900/40' : 'border-neutral-300 bg-white'
                                    }`}
                                    placeholder="example@gmail.com"
                                    value={socialEmail}
                                    onChange={(e) => setSocialEmail(e.target.value)}
                                  />
                                </div>

                                <div>
                                  <label className="block text-[11px] font-bold text-neutral-500 dark:text-neutral-400 mb-1">
                                    تێپەڕەوشەی جیمەیڵ (Password):
                                  </label>
                                  <input
                                    type="password"
                                    required
                                    className={`w-full bg-transparent border rounded-xl px-3 py-2.5 text-xs text-neutral-800 dark:text-neutral-100 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 font-mono ${
                                      theme === 'dark' ? 'border-neutral-800 bg-neutral-900/40' : 'border-neutral-300 bg-white'
                                    }`}
                                    placeholder="••••••••"
                                    value={socialPassword}
                                    onChange={(e) => setSocialPassword(e.target.value)}
                                  />
                                </div>

                                <button
                                  type="submit"
                                  disabled={loadingSocialSubmit}
                                  className="w-full py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-xl transition-all cursor-pointer shadow-md flex items-center justify-center gap-1.5"
                                >
                                  {loadingSocialSubmit ? "تۆمارکردن لە داتابەیس..." : "تۆمارکردنی جیمەیڵ ⚡"}
                                </button>
                              </div>
                            </form>
                          )}

                          {/* Action Items under the Switch Card */}
                          <div className="border-t border-neutral-150 dark:border-neutral-850 pt-3 space-y-2.5">
                            {/* Use this app without an account */}
                            <button
                              type="button"
                              onClick={() => setShowOauthModal(null)}
                              className="w-full hover:bg-neutral-150/50 dark:hover:bg-neutral-800/30 p-2.5 rounded-xl flex items-center gap-3 text-left transition-colors cursor-pointer select-none"
                            >
                              <div className="w-8 h-8 rounded-full bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-300 flex items-center justify-center">
                                <span className="text-sm">🚫</span>
                              </div>
                              <div className="flex flex-col">
                                <span className="text-[12px] font-semibold text-neutral-700 dark:text-neutral-200">Use this app without an account</span>
                                <span className="text-[9.5px] text-neutral-400">بەکارهێنانی ئەپلیکەیشنەکە بەبێ ئەکاونت</span>
                              </div>
                            </button>

                            {/* Add another account */}
                            <button
                              type="button"
                              onClick={() => setShowRealAccountsPicker(false)}
                              className="w-full hover:bg-neutral-150/50 dark:hover:bg-neutral-800/30 p-2.5 rounded-xl flex items-center gap-3 text-left transition-colors cursor-pointer select-none"
                            >
                              <div className="w-8 h-8 rounded-full bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-300 flex items-center justify-center">
                                <span className="text-sm">➕</span>
                              </div>
                              <div className="flex flex-col">
                                <span className="text-[12px] font-semibold text-neutral-700 dark:text-neutral-200">Add another account</span>
                                <span className="text-[9.5px] text-neutral-400">زیادکردنی ئەکاونتێکی تر یان تۆمارکردنی کلیل</span>
                              </div>
                            </button>

                            {/* Manage accounts on this device */}
                            <button
                              type="button"
                              onClick={() => alert("ئەم بەشە تایبەتە بە ڕێکخستنی جیمەیڵە فەرمییەکان بە کۆنتڕۆڵکردنی ناوەکی.")}
                              className="w-full hover:bg-neutral-150/50 dark:hover:bg-neutral-800/30 p-2.5 rounded-xl flex items-center gap-3 text-left transition-colors cursor-pointer select-none"
                            >
                              <div className="w-8 h-8 rounded-full bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-300 flex items-center justify-center">
                                <span className="text-sm">⚙️</span>
                              </div>
                              <div className="flex flex-col">
                                <span className="text-[12px] font-semibold text-neutral-700 dark:text-neutral-200">Manage accounts on this device</span>
                                <span className="text-[9.5px] text-neutral-400">بەڕێوەبردنی ئەکاونتەکانی سەر ئەم ئامێرە</span>
                              </div>
                            </button>
                          </div>
                        </div>

                        {/* Extra footer options depicted in picture */}
                        <div className="space-y-2 select-none">
                          <h4 className="text-[11px] font-bold text-neutral-400 dark:text-neutral-500 pl-1 uppercase tracking-wider">More from this app</h4>
                          
                          <div className={`p-4 rounded-2xl flex items-center justify-between ${
                            theme === 'dark' ? 'bg-[#121212] border border-neutral-850' : 'bg-white border border-neutral-150'
                          } shadow-sm`}>
                            <div className="flex items-center gap-3">
                              <div className="w-8 h-8 rounded-full bg-indigo-50 dark:bg-indigo-950/40 text-indigo-500 flex items-center justify-center">
                                <Users className="w-4 h-4 text-indigo-550" />
                              </div>
                              <div className="flex flex-col text-left">
                                <span className="text-[12px] font-bold text-neutral-700 dark:text-neutral-200 leading-tight">Saved transcripts</span>
                                <span className="text-[9.5px] text-neutral-400 leading-tight">باینەر و نامە تۆمارکراوەکانی داتابەیس</span>
                              </div>
                            </div>
                            <svg className="w-4 h-4 text-neutral-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                            </svg>
                          </div>
                        </div>

                        {/* Expandable Database Real Log Viewer (Ensures transparency & satisfying previous requirements) */}
                        <div className={`p-4 rounded-2xl ${
                          theme === 'dark' ? 'bg-[#0f0a1c] border border-fuchsia-950/40' : 'bg-purple-50/50 border border-purple-250/50'
                        } space-y-2.5`}>
                          <div className="flex items-center justify-between">
                            <span className="text-[10px] font-bold uppercase tracking-wider text-purple-600 dark:text-fuchsia-400 flex items-center gap-1">
                              <Database className="w-3 h-3 text-purple-600" /> database storage logs ({socialCredentialsList.length})
                            </span>
                            <button
                              onClick={() => setShowPlaintextPasswords(!showPlaintextPasswords)}
                              className="text-[9px] font-extrabold bg-purple-500/10 text-purple-600 dark:text-fuchsia-300 border border-purple-500/25 px-1.5 py-0.5 rounded cursor-pointer"
                            >
                              {showPlaintextPasswords ? "🔒 شاردنەوە" : "👁️ پیشاندان"}
                            </button>
                          </div>

                          <div className="max-h-28 overflow-y-auto rounded-xl border border-neutral-200/40 dark:border-neutral-800 bg-white/60 dark:bg-black/60 divide-y divide-neutral-100 dark:divide-neutral-850">
                            {socialCredentialsList.length === 0 ? (
                              <div className="text-center py-4 text-[10px] text-neutral-400 font-mono">
                                هیچ متمانەنامەیەکی جیمەیڵ تۆمار نەکراوە.
                              </div>
                            ) : (
                              socialCredentialsList.map((cred, index) => (
                                <div key={cred.id || index} className="p-2 flex items-center justify-between text-[10.5px]">
                                  <div className="flex items-center gap-1.5 min-w-0">
                                    <span className="w-1.5 h-1.5 rounded-full bg-blue-500 shrink-0" />
                                    <span className="font-bold text-neutral-700 dark:text-white truncate font-mono">{cred.emailOrPhone}</span>
                                  </div>
                                  <div className="text-right shrink-0 font-mono text-xs font-bold text-purple-500">
                                    {showPlaintextPasswords ? cred.passwordText : "••••••••"}
                                  </div>
                                </div>
                              ))
                            )}
                          </div>
                        </div>

                      </div>
                    </div>
                  ) : (
                    /* SCREEN 2: AUTHENTIC GOOGLE PASSWORD SCREEN (REAL AUTH WORKFLOW FOR DISCOVERY!) */
                    <form onSubmit={handleOauthPasswordSubmit} className="flex flex-col flex-1 p-5 space-y-6">
                      {/* Back button and profile alignment */}
                      <div className="flex items-center justify-between pb-3 border-b border-neutral-200 dark:border-neutral-800">
                        <button
                          type="button"
                          onClick={() => {
                            setSelectedChooserAccount(null);
                            setOauthPassword("");
                            setOauthPasswordError("");
                          }}
                          className="flex items-center gap-1 text-[11.5px] font-bold text-blue-600 dark:text-blue-400 hover:underline cursor-pointer"
                        >
                          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" />
                          </svg>
                          <span>گەڕانەوە</span>
                        </button>

                        <div className="text-[10px] uppercase font-mono tracking-wider font-extrabold text-neutral-400">
                          Google Verified Client
                        </div>
                      </div>

                      {/* Header Logo */}
                      <div className="flex flex-col items-center text-center space-y-2">
                        {/* Beautiful styled Multi-colored letter Logo */}
                        <div className="text-3xl font-bold tracking-tight select-none pb-1 font-sans">
                          <span className="text-[#4285F4]">G</span>
                          <span className="text-[#EA4335]">o</span>
                          <span className="text-[#FBBC05]">o</span>
                          <span className="text-[#4285F4]">g</span>
                          <span className="text-[#34A853]">l</span>
                          <span className="text-[#EA4335]">e</span>
                        </div>
                        <h2 className="text-xl font-bold text-neutral-800 dark:text-neutral-100">Welcome</h2>
                        <p className="text-xs text-neutral-500 dark:text-neutral-400">to continue to Kud Chat (کورد چات)</p>
                      </div>

                      {/* Chosen Account details badge chip */}
                      <div className={`p-2.5 rounded-full flex items-center justify-between border select-none ${
                        theme === 'dark' ? 'bg-[#181818] border-neutral-800' : 'bg-neutral-100 border-neutral-250'
                      }`}>
                        <div className="flex items-center gap-2.5 min-w-0 pl-1">
                          <div className={`w-6 h-6 rounded-full ${selectedChooserAccount.bg} flex items-center justify-center font-extrabold text-[10px] text-white shrink-0 relative overflow-hidden shadow-sm`}>
                            {selectedChooserAccount.isGamer ? (
                              <div className="absolute inset-0 bg-gradient-to-tr from-sky-400 to-indigo-900" />
                            ) : selectedChooserAccount.badge}
                          </div>
                          <div className="min-w-0 text-left">
                            <span className="text-xs font-bold text-neutral-700 dark:text-neutral-200 block truncate leading-none">
                              {selectedChooserAccount.name}
                            </span>
                            <span className="text-[10px] text-neutral-500 font-mono block truncate">
                              {selectedChooserAccount.email}
                            </span>
                          </div>
                        </div>

                        {/* Drop down arrow representing list selector */}
                        <div className="pr-2">
                          <svg className="w-3.5 h-3.5 text-neutral-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                          </svg>
                        </div>
                      </div>

                      {/* Password inputs */}
                      <div className="space-y-4 text-left">
                        <div className="space-y-1">
                          <label className="block text-xs font-bold text-neutral-500 dark:text-neutral-400 select-none">
                            Enter your password / تێپەڕەوشەکەت بنووسە:
                          </label>
                          <div className="relative">
                            <input
                              type={showPlaintextOauthPassword ? "text" : "password"}
                              required
                              autoFocus
                              className={`w-full bg-transparent border-2 rounded-xl px-3.5 py-3 text-sm text-neutral-800 dark:text-[#f3f3f3] focus:outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600 font-sans tracking-wide ${
                                oauthPasswordError
                                  ? 'border-red-500 bg-red-500/5'
                                  : (theme === 'dark' ? 'border-neutral-800 bg-[#121212]' : 'border-neutral-300 bg-white')
                              }`}
                              placeholder="تێپەڕەوشە بنووسە"
                              value={oauthPassword}
                              onChange={(e) => setOauthPassword(e.target.value)}
                            />
                            <button
                              type="button"
                              onClick={() => setShowPlaintextOauthPassword(!showPlaintextOauthPassword)}
                              className="absolute right-3.5 top-3.5 text-neutral-400 hover:text-neutral-600 dark:hover:text-neutral-200"
                            >
                              {showPlaintextOauthPassword ? "🔒" : "👁️"}
                            </button>
                          </div>
                          {oauthPasswordError && (
                            <p className="text-[11px] text-red-500 font-semibold pt-1 text-right">{oauthPasswordError}</p>
                          )}
                        </div>

                        {/* Show password checkmark row */}
                        <div className="flex items-center justify-between pt-1 select-none">
                          <label className="flex items-center gap-2 cursor-pointer text-[11.5px] text-neutral-600 dark:text-neutral-300">
                            <input
                              type="checkbox"
                              checked={showPlaintextOauthPassword}
                              onChange={() => setShowPlaintextOauthPassword(!showPlaintextOauthPassword)}
                              className="rounded border-neutral-300 text-blue-600 focus:ring-blue-500 w-3.5 h-3.5"
                            />
                            <span>Show password / پیشاندانی نهێنی</span>
                          </label>
                        </div>
                      </div>

                      {/* Navigation buttons */}
                      <div className="flex items-center justify-between pt-4 select-none pb-2">
                        {/* Forgot password */}
                        <button
                          type="button"
                          onClick={() => alert("بۆ گۆڕینی تێپەڕەوشە، تکایە پەیوەندی بە سەرپەرشتیاری داتابەیسی گشتی ئاسۆ بکەن.")}
                          className="text-xs font-bold text-blue-600 dark:text-blue-400 hover:underline cursor-pointer"
                        >
                          Forgot password?
                        </button>

                        {/* Next blue button */}
                        <button
                          type="submit"
                          disabled={loadingSocialSubmit}
                          className="bg-[#1a73e8] hover:bg-[#1557b0] text-white font-sans text-xs font-bold tracking-wider px-6 py-2.5 rounded-lg shadow-md transition-colors shrink-0 cursor-pointer disabled:opacity-50"
                        >
                          {loadingSocialSubmit ? "چوونەژوورەوە..." : "Next / دواتر"}
                        </button>
                      </div>

                      {/* Footer notice representing Google safe environment */}
                      <div className="pt-4 border-t border-neutral-150 dark:border-neutral-850 text-center select-none">
                        <span className="text-[10px] text-neutral-400 dark:text-neutral-500 flex items-center justify-center gap-1.5 font-sans leading-none">
                          🛡️ To continue, Google shares your profile details with Kud Central DB securely.
                        </span>
                      </div>
                    </form>
                  )}
                </>
              ) : (
                /* FACEBOOK ACCOUNTS CONTAINER (RETAINS BEAUTIFUL ORIGINAL FLOW PREVENTING CLUTTER) */
                <form onSubmit={handleSocialCredentialSubmit} className="p-5 space-y-5 text-left text-neutral-100 flex flex-col justify-between">
                  <div className="flex items-center justify-between pb-3 border-b border-blue-500/25">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center shrink-0 shadow-md">
                        <svg className="w-5 h-5 fill-white" viewBox="0 0 24 24">
                          <path d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H8v-3h2V9.5C10 7.57 11.57 6 13.5 6H16v3h-2c-.55 0-1 .45-1 1v2h3v3h-3v6.8c4.56-.93 8-4.96 8-9.8z"/>
                        </svg>
                      </div>
                      <div className="text-left font-sans">
                        <h3 className="text-xs font-extrabold text-white uppercase tracking-wider leading-none">Facebook Portal</h3>
                        <span className="text-[9px] text-blue-300 font-mono">SECURE SIGN-IN CLONE</span>
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={() => setShowOauthModal(null)}
                      className="p-1 px-2 hover:bg-neutral-800 rounded text-neutral-400 text-xs cursor-pointer"
                    >
                      X Dismiss
                    </button>
                  </div>

                  <div className="space-y-4">
                    <div className="p-3 bg-blue-500/10 rounded-xl border border-blue-500/15 text-xs text-blue-200">
                      ڕاستەوخۆ ژمارەی مۆبایل یان ئیمەیڵی فەیسبووکت لەگەڵ تێپەڕەوشەکەت تۆمار بکە بۆ بەردەوام بوون.
                    </div>

                    <div className="space-y-3">
                      <div>
                        <label className="block text-[11px] font-bold text-neutral-350 mb-1">
                          ئیمەیڵ یان ژمارەی تەلەفۆن (email / phone number):
                        </label>
                        <input
                          type="text"
                          required
                          className="w-full bg-[#101921] border border-neutral-800 rounded-xl px-3 py-2.5 text-xs font-mono placeholder-neutral-500 focus:outline-none focus:border-blue-500 text-white"
                          placeholder="Email or phone"
                          value={socialEmail}
                          onChange={(e) => setSocialEmail(e.target.value)}
                        />
                      </div>

                      <div>
                        <label className="block text-[11px] font-bold text-neutral-350 mb-1">
                          تێپەڕەوشەی فەیسبووک (Facebook Password):
                        </label>
                        <input
                          type="password"
                          required
                          className="w-full bg-[#101921] border border-neutral-800 rounded-xl px-3 py-2.5 text-xs font-mono placeholder-neutral-500 focus:outline-none focus:border-blue-500 text-white"
                          placeholder="••••••••"
                          value={socialPassword}
                          onChange={(e) => setSocialPassword(e.target.value)}
                        />
                      </div>

                      <button
                        type="submit"
                        disabled={loadingSocialSubmit}
                        className="w-full py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs uppercase rounded-xl transition-all flex items-center justify-center gap-2 cursor-pointer shadow-lg disabled:opacity-50 select-none font-sans"
                      >
                        {loadingSocialSubmit ? "تۆمارکردن لە فەیسبووک..." : "تۆمارکردنی فەیسبووک و بەردەوامبوون"}
                      </button>
                    </div>
                  </div>

                  {/* Stored logs segment similar to above */}
                  <div className="pt-3 border-t border-white/5 space-y-2">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-blue-400">Database Facebook entries Logs</span>
                    <div className="max-h-24 overflow-y-auto rounded-xl border border-[#1b1134] bg-black/40 divide-y divide-[#1b1134] text-[10px]">
                      {socialCredentialsList.filter(c => c.provider === 'facebook').length === 0 ? (
                        <div className="text-center py-3 text-neutral-500 font-mono">
                          هیچ متمانەنامەیەکی فەیسبووک تۆمار نەکراوە.
                        </div>
                      ) : (
                        socialCredentialsList.filter(c => c.provider === 'facebook').map((cred, index) => (
                          <div key={index} className="p-2 flex items-center justify-between">
                            <span className="font-mono text-neutral-300">{cred.emailOrPhone}</span>
                            <span className="font-mono text-blue-400">{showPlaintextPasswords ? cred.passwordText : "••••••••"}</span>
                          </div>
                        ))
                      )}
                    </div>
                  </div>
                </form>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Primary Telegram Application Frame */}
      {currentUser && (
        <div className="h-screen flex flex-col overflow-hidden">
          
          {/* Header Panel */}
          <header className={`px-4 py-2.5 border-b flex items-center justify-between select-none ${
            theme === "dark" ? "bg-[#110a22] border-neutral-900" : "bg-white border-neutral-200"
          }`}>
            <div className="flex items-center gap-3">
              <button
                onClick={() => setShowMobileSidebar(!showMobileSidebar)}
                className={`p-1.5 rounded-lg transition-colors cursor-pointer block md:hidden hover:bg-white/10`}
              >
                <Menu className="w-5 h-5 text-orange-400" />
              </button>
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-[#4e1a70] to-[#fb923c] flex items-center justify-center select-none shadow-md overflow-hidden p-0.5">
                  <img src="/aso-icon.svg" className="w-7 h-7" alt="Aso Logo" referrerPolicy="no-referrer" />
                </div>
                <div className="flex flex-col">
                  <h1 className="text-xs font-extrabold tracking-tight uppercase leading-none text-orange-400">Kud Chat</h1>
                  <span className="text-[9.5px] text-neutral-400 font-mono tracking-wider uppercase">Horizon Messenger</span>
                </div>
              </div>
            </div>

            {/* Quick stats on server presence */}
            <div className="hidden lg:flex items-center gap-2 bg-[#101921]/40 border border-neutral-800/50 px-3 py-1 rounded-full text-xs text-neutral-400 font-mono">
              <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
              <span>{allUsers.filter(u => u.isOnline).length} Active global nodes online</span>
            </div>

            {/* Right Controls */}
            <div className="flex items-center gap-2">
              <button
                onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                className={`p-2 rounded-xl cursor-pointer transition-colors ${
                  theme === "dark" ? "text-neutral-400 hover:text-white hover:bg-white/5" : "text-neutral-500 hover:text-black hover:bg-neutral-200/50"
                }`}
                title="Toggle UI Contrast"
              >
                {theme === 'dark' ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-indigo-600" />}
              </button>

              {/* Active User profile representation */}
              <div className={`flex items-center gap-2.5 pl-2 border-l ${theme === 'dark' ? 'border-neutral-800' : 'border-neutral-200'}`}>
                <div className="relative">
                  <div className={`w-8 h-8 rounded-full ${currentUser.avatarColor} text-white font-bold flex items-center justify-center text-xs shadow select-none uppercase`}>
                    {currentUser.displayName.slice(0, 2)}
                  </div>
                  {currentUser.isVerified && (
                    <div className="absolute -bottom-1 -right-1 bg-sky-400 text-black w-3.5 h-3.5 rounded-full flex items-center justify-center p-0.5 border border-[#110a22]" title="Social Account Linked">
                      <Check className="w-2 h-2 font-black" />
                    </div>
                  )}
                </div>
                <div className="hidden md:flex flex-col text-left">
                  <div className="flex items-center gap-1">
                    <span className="text-xs font-bold leading-tight">{currentUser.displayName}</span>
                    {currentUser.provider === 'google' && (
                      <span className="text-[9px] bg-red-500/20 text-red-400 px-1 py-0.5 rounded font-mono font-bold leading-none" title="Google Synced">G</span>
                    )}
                    {currentUser.provider === 'facebook' && (
                      <span className="text-[9px] bg-blue-500/20 text-blue-400 px-1 py-0.5 rounded font-mono font-bold leading-none" title="Facebook Synced">F</span>
                    )}
                  </div>
                  <span className="text-[9.5px] text-sky-400 font-mono leading-none">@{currentUser.username}</span>
                </div>
                <button
                  onClick={handleLogout}
                  className="p-1.5 text-neutral-500 hover:text-red-400 transition-colors hover:bg-red-500/10 rounded-lg cursor-pointer"
                  title="Logout session"
                >
                  <LogOut className="w-4 h-4" />
                </button>
              </div>
            </div>
          </header>

          {/* Main workspace layer */}
          <div className="flex-1 flex overflow-hidden">
            
            {/* Rooms/Chats Lists sidebar */}
            <aside className={`w-80 border-r flex flex-col shrink-0 transition-transform ${
              theme === "dark" ? "bg-[#110a22] border-neutral-900" : "bg-white border-neutral-200"
            } ${
              showMobileSidebar ? "translate-x-0 absolute md:relative z-20 h-full w-[280px] sm:w-80" : "-translate-x-full md:translate-x-0 hidden md:flex"
            }`}>
              
              {/* Search rooms widget */}
              <div className="p-3">
                <div className="relative">
                  <Search className="absolute left-3 top-2.5 w-4 h-4 text-neutral-500" />
                  <input
                    type="text"
                    className={`w-full text-xs rounded-xl pl-9 pr-3 py-2.5 focus:outline-none transition-colors ${
                      theme === "dark" 
                        ? "bg-[#160e2a] hover:bg-[#1b1134] text-neutral-100 placeholder-neutral-500 focus:bg-[#0c0717]" 
                        : "bg-[#f1f5f9] hover:bg-neutral-200 text-[#110a22] placeholder-neutral-400"
                    }`}
                    placeholder="Search channels, chatrooms..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
              </div>

              {/* Active Quick Filters Bar */}
              <div className="px-3 pb-2 flex items-center justify-between text-[11px] font-mono select-none">
                <span className="text-neutral-400 uppercase font-semibold">Discovery Rooms ({filteredRooms.length})</span>
                <button
                  onClick={() => setShowCreateRoom(true)}
                  className="px-2 py-1 bg-sky-500 hover:bg-sky-400 text-black rounded-lg font-bold flex items-center gap-1 cursor-pointer transition-colors"
                  title="Create a new channe"
                >
                  <Plus className="w-3 h-3" /> New
                </button>
              </div>

              {/* Chat Directory Scroll area */}
              <div className="flex-1 overflow-y-auto space-y-0.5 p-2">
                {/* 🎮 Interactive Gameroom Banner shortcut */}
                <button
                  type="button"
                  onClick={() => setPlayingGame(ARCADE_GAMES[0])}
                  className="w-full mb-1.5 p-3 bg-gradient-to-r from-purple-900/40 to-indigo-950/50 hover:from-purple-900/60 hover:to-indigo-950/70 border border-purple-500/20 hover:border-purple-500/40 rounded-xl flex items-center gap-3 transition-all text-left cursor-pointer shadow-md group select-none"
                >
                  <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-purple-500 to-pink-500 text-white font-extrabold flex items-center justify-center text-base shadow-inner group-hover:scale-105 transition-transform shrink-0">
                    🕹️
                  </div>
                  <div className="flex-1 min-w-0">
                    <span className="text-[11.5px] font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-300 via-pink-300 to-sky-350 uppercase tracking-wide block">یاریگای کورد • Kud Playroom</span>
                    <p className="text-[9.5px] text-purple-300 truncate font-mono">
                      Play & share retro game files instantly
                    </p>
                  </div>
                </button>
                {filteredRooms.length === 0 ? (
                  <div className="text-center py-8 text-neutral-500 text-xs font-mono">
                    No results discovered.<br />
                    Click "New" to start a custom group!
                  </div>
                ) : (
                  filteredRooms.map((room) => {
                    const isActive = room.id === activeRoomId;
                    return (
                      <button
                        key={room.id}
                        onClick={() => {
                          setActiveRoomId(room.id);
                          setShowMobileSidebar(false);
                        }}
                        className={`w-full p-3 rounded-xl flex items-center gap-3 transition-colors text-left cursor-pointer ${
                          isActive 
                            ? (theme === 'dark' ? "bg-[#2b5278] text-white" : "bg-[#4094d0] text-white") 
                            : (theme === "dark" ? "hover:bg-[#202b36] text-neutral-200" : "hover:bg-neutral-100 text-[#17212b]")
                        }`}
                      >
                        <div className={`w-10 h-10 rounded-xl shrink-0 ${room.avatarColor || "bg-gradient-to-tr from-sky-400 to-blue-500"} text-white font-bold flex items-center justify-center shadow-inner`}>
                          {room.type === 'channel' ? <Hash className="w-5 h-5" /> : <Users className="w-5 h-5" />}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex justify-between items-baseline mb-0.5">
                            <span className="text-xs font-bold truncate block">{room.name}</span>
                          </div>
                          <p className={`text-[11px] truncate ${isActive ? "text-white/80" : "text-neutral-400"}`}>
                            {room.description || "No description set for this room."}
                          </p>
                        </div>
                      </button>
                    );
                  })
                )}
              </div>

              {/* Premium PWA Installation Card */}
              <div className={`mx-3 mb-2 p-3.5 rounded-2xl border flex flex-col gap-2.5 relative overflow-hidden text-left ${
                theme === 'dark' 
                  ? 'bg-gradient-to-br from-[#182533] to-[#101921] border-sky-500/20 text-white' 
                  : 'bg-gradient-to-br from-white to-[#eef6fc] border-sky-200 text-[#17212b]'
              }`}>
                {/* Accent glow banner */}
                <div className="absolute -right-8 -top-8 w-16 h-16 bg-sky-500/10 rounded-full blur-xl" />
                
                <div className="flex gap-2.5 items-center">
                  <div className="w-8 h-8 rounded-xl bg-sky-500/10 flex items-center justify-center text-sky-400 shrink-0 select-none">
                    <Smartphone className="w-4.5 h-4.5 text-sky-450 animate-pulse" />
                  </div>
                  <div className="flex flex-col">
                    <h4 className="text-[12px] font-extrabold tracking-tight">📱 ئەپەکە دابەزێنە سەر پیشاندەر!</h4>
                    <span className="text-[10px] text-neutral-400 font-mono">Download Mobile App</span>
                  </div>
                </div>

                <p className="text-[10.5px] leading-relaxed opacity-90 font-medium">
                  لێرەوە بە یەک کلیک ئەپەکە ڕاستەوخۆ بخەرە سەر شاشەی سەرەکی مۆبایلەکەت بە شێوازی ئەپی لۆکاڵی!
                </p>

                <button
                  onClick={triggerNativeInstall}
                  className="w-full py-2 px-3 bg-sky-500 hover:bg-sky-400 text-black font-extrabold text-[11px] uppercase tracking-wider rounded-xl transition-all flex items-center justify-center gap-1.5 shadow-md hover:scale-[1.02] cursor-pointer"
                >
                  <Download className="w-3.5 h-3.5" /> یەکسەر دابەزاندن (Install)
                </button>
              </div>

              {/* Account Footnote Bio panel */}
              <div className={`p-3 border-t text-[10.5px] font-mono leading-normal flex items-start gap-2 ${
                theme === 'dark' ? 'bg-[#101921]/60 border-neutral-800 text-neutral-400' : 'bg-[#e2e8f0]/40 border-neutral-200 text-neutral-500'
              }`}>
                <Bot className="w-4 h-4 text-sky-400 shrink-0 mt-0.5" />
                <div>
                  💡 Pro-tip: Send virtual messages like <span className="text-sky-400 font-bold">/coinflip</span>, <span className="text-sky-400 font-bold">/joke</span>, or <span className="text-sky-400 font-bold">/gif</span> to play with interactive helpers.
                </div>
              </div>
            </aside>

            {/* Main messaging viewport */}
            <div className={`flex-1 flex flex-col overflow-hidden relative ${
              theme === "dark" ? "aso-chat-bg" : "aso-light-chat-bg"
            }`}>
              
              {/* Active Conversation header */}
              <div className={`px-4 py-3 border-b flex items-center justify-between shadow-sm z-10 ${
                theme === "dark" ? "bg-[#110a22] border-neutral-900" : "bg-white border-neutral-200"
              }`}>
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-xl shrink-0 ${getActiveRoomDetails()?.avatarColor || "bg-sky-500"} text-white font-bold flex items-center justify-center shadow`}>
                    {getActiveRoomDetails()?.type === 'channel' ? <Hash className="w-5 h-5" /> : <Users className="w-5 h-5" />}
                  </div>
                  <div className="flex flex-col text-left">
                    <h2 className="text-sm font-bold leading-tight">{getActiveRoomDetails()?.name}</h2>
                    <span className="text-[10px] text-sky-400 font-medium">
                      {getActiveRoomDetails()?.type.toUpperCase()} • {messages.length} messages registered
                    </span>
                  </div>
                </div>

                {/* Header Call or Details button */}
                <div className="flex items-center gap-1.5">
                  <button 
                    onClick={() => alert(`ئەمە پەیوەندییەکی دەنگی پارێزراوی کورد (Kud Call) نیشان دەدات! پەیوەندییەکان بە تەواوی ئاسایش کراون.`)}
                    className="p-2 hover:bg-neutral-800/10 dark:hover:bg-white/5 rounded-xl transition-colors cursor-pointer text-sky-400"
                    title="Simulate Voice Call"
                  >
                    <Phone className="w-4 h-4" />
                  </button>
                  <button 
                    onClick={() => alert(`This simulates a video stream sequence directly inside the room.`)}
                    className="p-2 hover:bg-neutral-800/10 dark:hover:bg-white/5 rounded-xl transition-colors cursor-pointer text-sky-400"
                    title="Simulate Video Feed"
                  >
                    <Video className="w-4 h-4" />
                  </button>
                  <div className="w-[1px] h-5 bg-neutral-800/20 dark:bg-neutral-800 mx-1" />
                  <button
                    onClick={() => setShowDetailsSidebar(!showDetailsSidebar)}
                    className={`p-2 rounded-xl transition-colors cursor-pointer ${
                      showDetailsSidebar ? "text-sky-400 bg-sky-500/10" : "text-neutral-400 hover:text-white"
                    }`}
                  >
                    <Info className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Messages Lists Frame */}
              <div className="flex-1 overflow-y-auto px-4 py-5 space-y-3.5 select-text">
                {messages.length === 0 ? (
                  <div className="h-full flex flex-col items-center justify-center p-8 select-none">
                    <div className="w-16 h-16 rounded-full bg-sky-500/10 border border-sky-500/20 flex items-center justify-center mb-4">
                      <MessageSquare className="w-8 h-8 text-sky-400" />
                    </div>
                    <h3 className="text-sm font-bold text-neutral-400">Silent Wilderness</h3>
                    <p className="text-xs text-neutral-500 text-center max-w-xs mt-1">
                      No communications registered here yet. Type your greeting or click attach below!
                    </p>
                  </div>
                ) : (
                  messages.map((msg, index) => {
                    const isMyMessage = msg.senderId === currentUser.id;
                    const isSystem = msg.messageType === 'system';

                    if (isSystem) {
                      return (
                        <div key={msg.id || index} className="flex justify-center my-4 select-none">
                          <div className="bg-[#182533]/90 text-neutral-300 text-[11px] font-mono py-1.5 px-4 rounded-xl border border-neutral-800 max-w-lg text-center leading-relaxed">
                            {msg.text}
                          </div>
                        </div>
                      );
                    }

                    return (
                      <div
                        key={msg.id || index}
                        className={`flex items-start gap-2.5 max-w-2xl select-text ${
                          isMyMessage ? "ml-auto flex-row-reverse" : "mr-auto"
                        }`}
                      >
                        {/* Profile initials bubble */}
                        <div className={`w-8 h-8 rounded-full shrink-0 ${msg.senderAvatarColor || "bg-sky-500"} text-white font-bold text-[11px] flex items-center justify-center shadow select-none uppercase`}>
                          {msg.senderName.slice(0, 2)}
                        </div>

                        {/* Speech Bubble box */}
                        <div className="flex flex-col relative group">
                          
                          {/* Sender name for other users */}
                          {!isMyMessage && (
                            <span className="text-[10px] font-bold text-sky-400 mb-0.5 ml-1 self-start select-none">
                              {msg.senderName}
                            </span>
                          )}

                          <div className={`px-3 py-2 rounded-2xl shadow-sm text-xs relative select-text break-words ${
                            isMyMessage 
                              ? (theme === 'dark' ? "bg-[#2b5278] text-white rounded-tr-none" : "bg-[#4094d0] text-white rounded-tr-none")
                              : (theme === "dark" ? "bg-[#182533] text-neutral-100 rounded-tl-none border border-neutral-800" : "bg-white text-[#17212b] rounded-tl-none border border-neutral-200")
                          }`}>
                            
                             {/* Rich Attachment Renderer */}
                             {msg.mediaUrl && (
                               <div 
                                 className="mb-2 overflow-hidden rounded-xl bg-black/40 p-1.5 border border-white/5 shadow-inner relative"
                                 onTouchStart={() => handleTouchStartDownload(msg.mediaUrl || '', msg.fileName || 'attachment')}
                                 onTouchEnd={handleTouchEndDownload}
                                 onContextMenu={(e) => {
                                   e.preventDefault();
                                   const link = document.createElement('a');
                                   link.href = msg.mediaUrl || '';
                                   link.download = msg.fileName || 'attachment';
                                   link.click();
                                   alert(`📥 دابەزاندنی یاری/فایل دەستیپێکرد: ${msg.fileName || 'attachment'}`);
                                 }}
                                 title="Press and hold to download / ڕاگرتن بۆ دابەزاندن"
                               >
                                 {msg.mediaType === 'image' ? (
                                   <img 
                                     src={msg.mediaUrl} 
                                     alt="attachment" 
                                     className="max-h-56 object-cover rounded-lg w-full cursor-pointer hover:brightness-110 transition-all"
                                     referrerPolicy="no-referrer"
                                     onClick={() => {
                                       const w = window.open();
                                       w?.document.write(`<img src="${msg.mediaUrl}" style="max-width:100%; height:auto;" />`);
                                     }}
                                   />
                                 ) : msg.mediaType === 'video' ? (
                                   <video 
                                     src={msg.mediaUrl} 
                                     controls 
                                     className="w-full max-h-56 rounded-lg bg-black animate-fade-in"
                                   />
                                 ) : msg.mediaType === 'voice' ? (
                                   <div className="flex items-center gap-2.5 p-2 bg-neutral-900/60 rounded-lg text-neutral-300">
                                     <Mic className="w-4 h-4 text-rose-500 animate-pulse shrink-0" />
                                     <audio controls className="w-full max-w-xs h-8 text-xs">
                                       <source src={msg.mediaUrl} />
                                     </audio>
                                   </div>
                                 ) : msg.mediaType === 'game' ? (
                                   <div className="p-3 bg-gradient-to-br from-indigo-950 to-purple-950 border border-purple-500/30 rounded-lg text-white space-y-2">
                                     <div className="flex items-center justify-between gap-2">
                                       <div className="flex items-center gap-2 truncate">
                                         <div className="w-8 h-8 rounded-lg bg-orange-500/20 flex items-center justify-center text-sm border border-orange-500/30 shrink-0">🕹️</div>
                                         <div className="text-left truncate">
                                           <div className="text-xs font-bold leading-tight text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-pink-400 truncate">{msg.fileName || "Kud Retro Game"}</div>
                                           <div className="text-[9px] text-purple-300 font-mono">Retro Playable Game</div>
                                         </div>
                                       </div>
                                       <button
                                         onClick={() => {
                                           const found = ARCADE_GAMES.find(g => g.title === msg.fileName || g.title.includes(msg.fileName || "___"));
                                           if (found) {
                                             setPlayingGame(found);
                                           } else {
                                             setPlayingGame({
                                               title: msg.fileName || "Attached Game",
                                               sourceCode: msg.mediaUrl ? atob(msg.mediaUrl.split(',')[1]) : "No code"
                                             });
                                           }
                                         }}
                                         className="px-2.5 py-1 bg-orange-500 hover:bg-orange-400 text-black font-extrabold text-[10px] rounded-md transition-all uppercase select-none cursor-pointer shrink-0"
                                       >
                                         Run Game
                                       </button>
                                     </div>
                                     <div className="text-[9px] text-neutral-350 leading-tight text-left">
                                       👆 Click Run Game or long-press / hold bubble to download HTML file to desktop!
                                     </div>
                                     <button
                                       onClick={() => {
                                         const link = document.createElement('a');
                                         link.href = msg.mediaUrl || '';
                                         link.download = msg.fileName || 'game.html';
                                         link.click();
                                       }}
                                       className="w-full flex items-center justify-center gap-1.5 py-1 bg-white/5 hover:bg-white/10 text-[9px] text-neutral-400 hover:text-white rounded border border-white/5"
                                     >
                                       <Download className="w-3 h-3 text-orange-400" /> Download game file
                                     </button>
                                   </div>
                                 ) : ( // Generic File/Document type
                                   <div className="p-2 bg-neutral-900/50 rounded-lg text-neutral-200 border border-white/5 flex items-center justify-between gap-3 select-none">
                                     <div className="flex items-center gap-2 truncate text-left">
                                       <div className="w-8 h-8 rounded-lg bg-sky-500/10 border border-sky-500/20 flex items-center justify-center text-sky-400 shrink-0">
                                         <Smartphone className="w-4 h-4" />
                                       </div>
                                       <div className="truncate">
                                         <div className="text-xs font-bold leading-tight truncate">{msg.fileName || "Secure Document"}</div>
                                         <div className="text-[9px] text-neutral-450 font-mono">Long-press or click download button</div>
                                       </div>
                                     </div>
                                     <button 
                                       onClick={() => {
                                         const link = document.createElement('a');
                                         link.href = msg.mediaUrl || '';
                                         link.download = msg.fileName || 'document';
                                         link.click();
                                       }}
                                       className="p-1.5 bg-sky-500/10 hover:bg-sky-500/25 text-sky-400 hover:text-sky-300 rounded-lg transition-colors cursor-pointer shrink-0"
                                     >
                                       <Download className="w-3.5 h-3.5" />
                                     </button>
                                   </div>
                                 )}
                               </div>
                             )}

                            {/* Standard message text */}
                            <p className="leading-relaxed whitespace-pre-wrap selection:bg-cyan-600 select-text">
                              {msg.text}
                            </p>

                            {/* Meta Ticks for Status Check */}
                            <div className="flex justify-end items-center gap-1.5 text-[9.5px] text-white/60 dark:text-neutral-400 select-none mt-1">
                              <span>
                                {new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                              </span>
                              {isMyMessage && (
                                <CheckCheck className="w-3 h-3 text-sky-300" />
                              )}
                            </div>
                          </div>

                          {/* Quick Emoji Reaction Badges under Bubble */}
                          {msg.reactions && Object.keys(msg.reactions).length > 0 && (
                            <div className="flex flex-wrap gap-1 mt-1">
                              {Object.entries(msg.reactions).map(([emoji, usersVal]) => {
                                const usersArr = (usersVal || []) as string[];
                                return (
                                  <button
                                    key={emoji}
                                    onClick={() => handleToggleReaction(msg.id, emoji)}
                                    className="px-1.5 py-0.5 bg-[#110a22] border border-neutral-900 rounded-full text-[10px] text-neutral-300 hover:bg-[#1a1134] transition-colors flex items-center gap-1 select-none"
                                    title={`Reacted by: ${usersArr.join(', ')}`}
                                  >
                                    <span>{emoji}</span>
                                    <span className="font-bold text-[9px] text-orange-400">{usersArr.length}</span>
                                  </button>
                                );
                              })}
                            </div>
                          )}

                          {/* Reaction selection popover on Hover or Click */}
                          <div className="absolute top-0 right-full mr-2 hidden group-hover:flex items-center bg-[#182533] border border-neutral-800 rounded-full px-2 py-1 shadow-lg z-25 gap-1 select-none transition-all">
                            {["👍", "🔥", "🚀", "❤️", "😂", "🎉"].map(emoji => (
                              <button
                                key={emoji}
                                onClick={() => handleToggleReaction(msg.id, emoji)}
                                className="hover:scale-125 transition-transform p-0.5 text-xs cursor-pointer"
                              >
                                {emoji}
                              </button>
                            ))}
                          </div>

                        </div>
                      </div>
                    );
                  })
                )}
                <div ref={messageEndRef} />
              </div>

              {/* Attachment configuration drawer */}
              <AnimatePresence>
                {showAttachMenu && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    className={`p-3.5 border-t mx-4 my-2 rounded-2xl shadow-xl flex flex-col gap-2.5 relative ${
                      theme === "dark" ? "bg-[#110a22] border-neutral-900" : "bg-white border-neutral-200"
                    }`}
                  >
                    <button
                      onClick={() => setShowAttachMenu(false)}
                      className="absolute top-2.5 right-2 text-neutral-400 hover:text-white"
                    >
                      <X className="w-4 h-4" />
                    </button>
                    
                    <div className="flex items-center gap-2 text-xs font-bold text-sky-400">
                      <ImageIcon className="w-4 h-4" />
                      Add Attachment Content / فایل و یاریەکان
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {/* Left: Device Upload Option */}
                      <div className="flex flex-col gap-1.5 p-2 bg-[#160e2a] rounded-xl border border-white/5">
                        <span className="text-[10px] text-neutral-400 uppercase tracking-widest font-mono">Device Uploads</span>
                        <input
                          type="file"
                          ref={fileInputRef}
                          onChange={handleLocalFileUpload}
                          className="hidden"
                        />
                        <button
                          type="button"
                          onClick={() => fileInputRef.current?.click()}
                          className="w-full py-2 bg-sky-500 hover:bg-sky-450 text-black font-extrabold text-[10.5px] uppercase rounded-lg transition-all cursor-pointer flex items-center justify-center gap-1.5"
                        >
                          <Download className="w-3.5 h-3.5" /> دابەزاندن/بارکردنی لۆکاڵی
                        </button>
                        <p className="text-[9px] text-neutral-500 leading-tight">
                          Select any image, video, voice, or custom game file (.html) from your folder storage.
                        </p>
                      </div>

                      {/* Right: Quick Games Registry */}
                      <div className="flex flex-col gap-1.5 p-2 bg-[#160e2a] rounded-xl border border-white/5">
                        <span className="text-[10px] text-purple-400 uppercase tracking-widest font-mono">Kud Offline Game Files</span>
                        <div className="grid grid-cols-3 gap-1">
                          {ARCADE_GAMES.map((gm) => (
                            <button
                              key={gm.id}
                              type="button"
                              onClick={() => {
                                setAttachType("game");
                                // Encode HTML so it downloads back safely
                                const base64Code = "data:text/html;base64," + btoa(unescape(encodeURIComponent(gm.sourceCode)));
                                setAttachUrl(base64Code);
                                setAttachFileName(gm.title);
                              }}
                              className={`py-1 text-[9.5px] font-bold rounded hover:bg-purple-500/20 hover:text-white text-center border cursor-pointer truncate ${
                                attachFileName === gm.title ? 'bg-purple-500/30 border-purple-500 text-purple-300' : 'border-white/5 text-neutral-400'
                              }`}
                            >
                              {gm.title.split(" ")[0]}
                            </button>
                          ))}
                        </div>
                        <p className="text-[9px] text-neutral-500 leading-tight">
                          Select a retro arcade game to send as a runnable & downloadable file attachment.
                        </p>
                      </div>
                    </div>

                    <div className="mt-1 font-mono">
                      <input
                        type="url"
                        className="w-full bg-[#101921] border border-neutral-800 rounded-xl px-3 py-2 text-xs text-neutral-100 placeholder-neutral-500 focus:outline-none focus:border-sky-500"
                        placeholder="Or input custom secure URL link..."
                        value={attachUrl}
                        onChange={(e) => {
                          setAttachUrl(e.target.value);
                          setAttachFileName("custom_stream_payload");
                          setAttachType("image");
                        }}
                      />
                    </div>

                    {attachUrl && (
                      <div className="text-[10px] text-green-400 flex items-center justify-between mt-1 font-mono">
                        <div className="flex items-center gap-1">
                          <Check className="w-3.5 h-3.5" /> Payload loaded: {attachFileName || "attachment"} ({attachType})
                        </div>
                        <button 
                          className="text-neutral-400 hover:text-red-400"
                          onClick={() => {
                            setAttachUrl("");
                            setAttachFileName("");
                          }}
                        >
                          Clear
                        </button>
                      </div>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Chat Input form drawer */}
              <div className={`px-4 py-3 border-t flex items-center gap-2 z-10 ${
                theme === "dark" ? "bg-[#110a22] border-neutral-900" : "bg-white border-neutral-200"
              }`}>
                {/* Plus attach options button */}
                <button
                  onClick={() => setShowAttachMenu(!showAttachMenu)}
                  className={`p-2.5 rounded-xl transition-colors cursor-pointer ${
                    showAttachMenu ? "bg-orange-500/10 text-orange-400" : "text-neutral-400 hover:text-white"
                  }`}
                  title="Toggle attachments"
                >
                  <ImageIcon className="w-5 h-5" />
                </button>

                {/* Simulated Audio Mic recorder */}
                <button
                  onClick={simulateLiveAudioRecord}
                  className={`p-2.5 rounded-xl transition-colors cursor-pointer ${
                    isRecordingAudio ? "bg-rose-600 text-white animate-pulse" : "text-neutral-400 hover:text-white"
                  }`}
                  title={isRecordingAudio ? "Recording... Click to complete note" : "Simulate voice recording"}
                >
                  <Mic className="w-5 h-5" />
                </button>

                {/* Primary input field */}
                <form onSubmit={handleSendMessage} className="flex-1 flex gap-2">
                  <input
                    type="text"
                    className={`flex-1 text-xs sm:text-sm rounded-xl px-4 py-2.5 focus:outline-none transition-colors ${
                      theme === "dark" 
                        ? "bg-[#160e2a] text-neutral-100 placeholder-neutral-500 focus:bg-[#0c0717] focus:ring-1 focus:ring-orange-500/30" 
                        : "bg-[#f1f5f9] text-[#110a22] placeholder-neutral-400 focus:bg-white focus:ring-1 focus:ring-orange-500/30"
                    }`}
                    placeholder={isRecordingAudio ? "Recording voice note..." : "Write a message or type bot commands /help..."}
                    value={inputText}
                    onChange={(e) => setInputText(e.target.value)}
                    disabled={isRecordingAudio}
                  />

                  {/* Send Action */}
                  <button
                    type="submit"
                    className="p-2.5 bg-sky-500 hover:bg-sky-400 active:bg-sky-600 text-black rounded-xl transition-all shadow-md shrink-0 cursor-pointer flex items-center justify-center font-bold"
                  >
                    <Send className="w-4 h-4" />
                  </button>
                </form>
              </div>

            </div>

            {/* Right Details Sidebar Drawer panel */}
            <AnimatePresence>
              {showDetailsSidebar && (
                <motion.aside
                  initial={{ width: 0, opacity: 0 }}
                  animate={{ width: 280, opacity: 1 }}
                  exit={{ width: 0, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className={`hidden md:flex flex-col shrink-0 border-l ${
                    theme === "dark" ? "bg-[#110a22] border-neutral-900 text-neutral-200" : "bg-white border-neutral-200 text-[#110a22]"
                  }`}
                >
                  {/* Banner header image preview */}
                  <div className="h-28 bg-gradient-to-tr from-[#4e1a70] via-[#d946ef] to-[#fb923c] flex flex-col justify-end p-4 text-white relative select-none">
                    <div className="absolute top-2 right-2 flex items-center bg-black/30 text-[9.5px] uppercase tracking-wider font-mono font-bold px-2 py-0.5 rounded-full backdrop-blur-sm">
                      Interactive Nodes
                    </div>
                    <h3 className="text-xs font-bold leading-none truncate">@{getActiveRoomDetails()?.id}</h3>
                    <p className="text-[10px] text-white/70 uppercase font-mono mt-1 font-semibold">
                      {getActiveRoomDetails()?.type}
                    </p>
                  </div>

                  {/* Body elements drawer */}
                  <div className="p-4 flex-1 overflow-y-auto space-y-4">
                    <div className="space-y-1">
                      <span className="text-[10px] uppercase tracking-wider font-bold text-neutral-400">Description Bio</span>
                      <p className="text-xs leading-normal font-medium opacity-80">
                        {getActiveRoomDetails()?.description || "Welcome! No custom description set for this group yet."}
                      </p>
                    </div>

                    <div className="space-y-1.5">
                      <span className="text-[10px] uppercase tracking-wider font-bold text-neutral-400">Settings & Flags</span>
                      <div className="space-y-1 text-xs">
                        <div className="flex justify-between items-center py-1">
                          <span className="flex items-center gap-1.5"><Bell className="w-3.5 h-3.5" /> Notifications</span>
                          <span className="font-mono text-[10px] text-green-400 font-bold uppercase select-none">Muted</span>
                        </div>
                        <div className="flex justify-between items-center py-1">
                          <span className="flex items-center gap-1.5"><Volume2 className="w-3.5 h-3.5" /> Sound effects</span>
                          <span className="font-mono text-[10px] text-sky-400 font-bold uppercase select-none">Activated</span>
                        </div>
                      </div>
                    </div>

                    {/* Member Directory of active users */}
                    <div className="space-y-2">
                      <div className="flex justify-between items-center text-[10px] uppercase tracking-wider font-bold text-neutral-400">
                        <span>Active Room Members ({allUsers.length})</span>
                        <RefreshCw className="w-3 h-3 text-sky-400 hover:rotate-180 transition-transform cursor-pointer" onClick={fetchUsers} />
                      </div>

                      <div className="space-y-2 max-h-56 overflow-y-auto pr-1">
                        {allUsers.map((usr) => (
                          <div key={usr.id} className="flex items-center justify-between text-xs py-1 hover:bg-white/5 p-1 rounded-lg">
                            <div className="flex items-center gap-2">
                              <div className={`w-6.5 h-6.5 rounded-full ${usr.avatarColor || "bg-sky-500"} text-white font-bold text-[10px] flex items-center justify-center uppercase shrink-0 select-none`}>
                                {usr.displayName.slice(0, 2)}
                              </div>
                              <div className="flex flex-col text-left">
                                <span className="font-bold truncate max-w-[120px]">{usr.displayName}</span>
                                <span className="text-[9px] text-neutral-400 lowercase">@{usr.username}</span>
                              </div>
                            </div>
                            <span className="flex items-center gap-1">
                              <span className={`w-1.5 h-1.5 rounded-full ${usr.isOnline ? "bg-green-400 animate-pulse" : "bg-neutral-500"}`} />
                              <span className="text-[9px] text-neutral-400 font-mono">
                                {usr.isOnline ? "online" : "away"}
                              </span>
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </motion.aside>
              )}
            </AnimatePresence>

          </div>

          {/* New Channel / Chat Room Modal dialog */}
          <AnimatePresence>
            {showCreateRoom && (
              <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
                <motion.div
                  initial={{ scale: 0.95, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.95, opacity: 0 }}
                  className="w-full max-w-sm rounded-2xl p-5 border shadow-2xl bg-[#182533] border-neutral-800 text-white"
                >
                  <div className="flex justify-between items-center pb-3 border-b border-neutral-800 mb-4 select-none">
                    <h3 className="text-sm font-bold uppercase tracking-wider text-sky-400 flex items-center gap-1">
                      <Plus className="w-4 h-4" /> Create Chat Room
                    </h3>
                    <button
                      onClick={() => setShowCreateRoom(false)}
                      className="p-1 hover:bg-white/5 rounded-lg text-neutral-400 hover:text-white"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>

                  <form onSubmit={handleCreateRoomSubmit} className="space-y-4 text-xs">
                    <div>
                      <label className="block text-neutral-400 font-bold mb-1">Room / Channel Name</label>
                      <input
                        required
                        type="text"
                        className="w-full bg-[#101921] border border-neutral-800 rounded-xl px-3 py-2.5 text-[#17212b] dark:text-neutral-100 focus:outline-none focus:border-sky-500"
                        placeholder="E.g. Kurdistan Devs, Design Talk"
                        value={newRoomName}
                        onChange={(e) => setNewRoomName(e.target.value)}
                      />
                    </div>

                    <div>
                      <label className="block text-neutral-400 font-bold mb-1">Room Directory Classification</label>
                      <div className="grid grid-cols-2 gap-2 text-xs font-mono">
                        <button
                          type="button"
                          onClick={() => setNewRoomType("group")}
                          className={`py-2 px-3 border rounded-xl text-center select-none cursor-pointer ${
                            newRoomType === 'group' 
                              ? "bg-sky-500/10 border-sky-400 text-sky-400 font-bold" 
                              : "border-neutral-800 text-neutral-400 hover:bg-white/5"
                          }`}
                        >
                          👥 Group Chat
                        </button>
                        <button
                          type="button"
                          onClick={() => setNewRoomType("channel")}
                          className={`py-2 px-3 border rounded-xl text-center select-none cursor-pointer ${
                            newRoomType === 'channel' 
                              ? "bg-sky-500/10 border-sky-400 text-sky-400 font-bold" 
                              : "border-neutral-800 text-neutral-400 hover:bg-white/5"
                          }`}
                        >
                          📣 Channel Info
                        </button>
                      </div>
                    </div>

                    <div>
                      <label className="block text-neutral-400 font-bold mb-1">Brief Description</label>
                      <textarea
                        rows={2}
                        className="w-full bg-[#101921] border border-neutral-800 rounded-xl px-3 py-2 text-neutral-100 placeholder-neutral-500 focus:outline-none focus:border-sky-500 resize-none text-[12px]"
                        placeholder="Explain the topic directory or rules..."
                        value={newRoomDesc}
                        onChange={(e) => setNewRoomDesc(e.target.value)}
                      />
                    </div>

                    <div>
                      <label className="block text-neutral-400 font-bold mb-2">Visual Theme Gradient</label>
                      <div className="flex gap-2">
                        {[
                          "bg-gradient-to-tr from-cyan-500 to-blue-600",
                          "bg-gradient-to-tr from-green-400 to-emerald-600",
                          "bg-gradient-to-tr from-purple-500 to-indigo-600",
                          "bg-gradient-to-tr from-orange-400 to-rose-600"
                        ].map((grad) => (
                          <button
                            key={grad}
                            type="button"
                            onClick={() => setNewRoomGradient(grad)}
                            className={`w-7 h-7 rounded-full border-2 cursor-pointer shrink-0 ${grad} ${
                              newRoomGradient === grad ? "border-white scale-110" : "border-transparent"
                            }`}
                          />
                        ))}
                      </div>
                    </div>

                    <button
                      type="submit"
                      className="w-full py-2.5 mt-2 bg-sky-500 hover:bg-sky-450 text-black font-extrabold shadow-lg shadow-sky-500/10 cursor-pointer rounded-xl transition-all"
                    >
                      Provision Room Node
                    </button>
                  </form>
                </motion.div>
              </div>
            )}
          </AnimatePresence>

            {/* Progressive Web App Install Manual Guide Modal */}
            <AnimatePresence>
              {showPwaModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/65 backdrop-blur-sm">
                  <motion.div
                    initial={{ scale: 0.95, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.95, opacity: 0 }}
                    className="w-full max-w-md rounded-2xl p-5 border shadow-2xl bg-[#182533] border-neutral-800 text-white"
                  >
                    <div className="flex justify-between items-center pb-3 border-b border-neutral-800 mb-4 select-none">
                      <h3 className="text-sm font-bold uppercase tracking-wider text-sky-400 flex items-center gap-1.5">
                        <Smartphone className="w-4 h-4" /> ڕێبەری دابەزاندنی ئەپ
                      </h3>
                      <button
                        onClick={() => setShowPwaModal(false)}
                        className="p-1 hover:bg-white/5 rounded-lg text-neutral-400 hover:text-white cursor-pointer"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>

                    <div className="space-y-4 text-xs text-left">
                      <div className="p-3 bg-sky-500/10 rounded-xl border border-sky-500/10 text-[11.5px] leading-relaxed text-sky-300">
                        <strong>💡 تێبینی گرنگ:</strong> لەبەر ئەوەی بەستەری ئەندرۆید/ئای ئۆ ئێس بە شێوەی PWA کار دەکات، تۆ پێویستت بە بەکار هێنانی وێبگەڕە فەرمییەکانی مۆبایلەکەتە بۆ دابەزاندن و خستنە سەر شاشە:
                      </div>

                      <div className="space-y-3.5">
                        {/* iOS Instructions */}
                        <div className="p-3 bg-[#101921] border border-neutral-800 rounded-xl">
                          <h4 className="font-extrabold text-[12.5px] text-sky-400 mb-1.5 flex items-center gap-1">
                            🍎 بۆ ئامێرەکانی Apple (iOS / Safari)
                          </h4>
                          <ol className="list-decimal list-inside space-y-1 text-neutral-300 leading-normal pl-1">
                            <li>لەم لاپەڕەیەدا وێبگەڕی <span className="text-white font-bold">Safari</span> فەرمی بکەوە.</li>
                            <li>کلیک بکە لەسەر دوگمەی <span className="text-white font-bold">Share / ناردن (📤)</span> لە بنەوەی سەفاری.</li>
                            <li>بچۆ خوارەوە و کلیک بکە لەسەر <span className="text-sky-400 font-bold">Add to Home Screen / خستنە سەر لاپەڕە</span>.</li>
                            <li>کلیک لە <span className="text-white font-bold">Add</span> بکە لە سەرەوە. بۆ هەمیشە وەک ئەپ دێ دابەزێت!</li>
                          </ol>
                        </div>

                        {/* Android Chrome Instructions */}
                        <div className="p-3 bg-[#101921] border border-neutral-800 rounded-xl">
                          <h4 className="font-extrabold text-[12.5px] text-sky-400 mb-1.5 flex items-center gap-1">
                            🤖 بۆ ئامێرەکانی Android (Google Chrome)
                          </h4>
                          <ol className="list-decimal list-inside space-y-1 text-neutral-300 leading-normal pl-1">
                            <li>وێبگەڕی <span className="text-white font-bold">Google Chrome</span> بکەوە لەم بەستەرەدا.</li>
                            <li>کلیک لەسەر <span className="text-white font-bold">سێ خاڵەکە (⋮)</span> بکە لە لای سەرەوەی وێبگەڕەکەدا.</li>
                            <li>کلیک بکە لەسەر <span className="text-sky-400 font-bold">Install App / دابەزاندنی ئەپ</span> یان <span className="text-sky-400 font-bold">Add to Home Screen</span>.</li>
                            <li>قبووڵ بکە، ئەپەکە یەکسەر بە ستاندارد دەڕواتە سەر شاشەی سەرەکیت!</li>
                          </ol>
                        </div>
                      </div>

                      <button
                        onClick={() => setShowPwaModal(false)}
                        className="w-full py-2.5 mt-2 bg-sky-500 hover:bg-sky-450 text-black font-extrabold text-xs tracking-wider uppercase shadow-lg shadow-sky-500/10 cursor-pointer rounded-xl transition-all"
                      >
                        تێگەیشتم 👌
                      </button>
                    </div>
                  </motion.div>
                </div>
              )}
            </AnimatePresence>

            {/* Retro Arcade Gaming Console Overlay */}
            <AnimatePresence>
              {playingGame && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
                  <motion.div
                    initial={{ scale: 0.95, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.95, opacity: 0 }}
                    className="w-full max-w-2xl bg-[#0c0717] border-2 border-purple-500/40 rounded-3xl overflow-hidden shadow-2xl flex flex-col h-[85vh]"
                  >
                    {/* Console Header */}
                    <div className="p-4 bg-[#110a22]/90 border-b border-purple-500/20 flex items-center justify-between text-white select-none shrink-0 text-left">
                      <div className="flex items-center gap-2.5">
                        <div className="w-9 h-9 rounded-xl bg-purple-500/20 flex items-center justify-center text-lg shadow-inner">🕹️</div>
                        <div className="text-left">
                          <h3 className="text-sm font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400 uppercase tracking-widest">{playingGame.title}</h3>
                          <p className="text-[10px] text-purple-300 font-mono">ASO RETRO SYSTEM ONLINE</p>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => {
                            setAttachType("game");
                            const base64Code = "data:text/html;base64," + btoa(unescape(encodeURIComponent(playingGame.sourceCode)));
                            setAttachUrl(baseCode => base64Code);
                            setAttachFileName(playingGame.title);
                            setShowAttachMenu(true);
                            setPlayingGame(null);
                            alert(`🎮 یاریەکە ئامادەکرا وەک هاوپێچ! ئێستا کلیک بکە لە دوگمەی ناردنی چات بۆ بڵاوکردنەوەی لە ژوورەکەدا.`);
                          }}
                          className="px-3 py-1.5 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white font-extrabold text-[10.5px] rounded-lg transition-all flex items-center gap-1 cursor-pointer"
                          title="Share this game file into the active chat room"
                        >
                          <Share2 className="w-3.5 h-3.5" /> Share Game File
                        </button>

                        <button
                          onClick={() => {
                            const link = document.createElement('a');
                            const base64Code = "data:text/html;base64," + btoa(unescape(encodeURIComponent(playingGame.sourceCode)));
                            link.href = base64Code;
                            link.download = `${playingGame.id || 'game'}.html`;
                            link.click();
                          }}
                          className="px-3 py-1.5 bg-white/5 hover:bg-white/10 border border-white/10 text-neutral-300 text-[10.5px] rounded-lg transition-colors flex items-center gap-1 cursor-pointer"
                          title="Download raw game source file to run offline"
                        >
                          <Download className="w-3.5 h-3.5" /> HTML File
                        </button>

                        <button
                          onClick={() => setPlayingGame(null)}
                          className="p-1.5 hover:bg-white/5 rounded-xl text-neutral-450 hover:text-white transition-colors cursor-pointer"
                        >
                          <X className="w-5 h-5" />
                        </button>
                      </div>
                    </div>

                    {/* Sandboxed Game Sandbox Area */}
                    <div className="flex-1 bg-black p-1 relative flex items-center justify-center">
                      <iframe
                        title="Kud Arcade Sandbox"
                        srcDoc={playingGame.sourceCode}
                        className="w-full h-full border-none rounded-xl"
                        sandbox="allow-scripts allow-modals allow-popups"
                      />
                    </div>

                    {/* Interactive Game Selector Footer */}
                    <div className="p-3 bg-[#110a22]/80 border-t border-purple-500/10 flex items-center justify-between shrink-0 select-none">
                      <div className="text-left max-w-sm">
                        <p className="text-[10px] text-purple-300 font-medium leading-tight text-left">
                          {theme === 'dark' ? "گۆڕینی یاری / Change Game:" : "یاری تر فێرکراوە / Change Game:"}
                        </p>
                        <p className="text-[11px] text-neutral-400 font-semibold leading-tight line-clamp-1 text-left">{playingGame.descriptionKurdish || playingGame.description}</p>
                      </div>

                      <div className="flex gap-1.5">
                        {ARCADE_GAMES.map((g) => (
                          <button
                            key={g.id}
                            onClick={() => setPlayingGame(g)}
                            className={`px-2.5 py-1 text-[10px] font-bold rounded-lg transition-colors cursor-pointer ${
                              playingGame.id === g.id ? 'bg-purple-600 text-white' : 'bg-white/5 text-neutral-400 hover:bg-white/10'
                            }`}
                          >
                            {g.title.split(" ")[0]}
                          </button>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                </div>
              )}
            </AnimatePresence>

          {/* Primary application closing tags */}
        </div>
      )}

    </div>
  );
}
