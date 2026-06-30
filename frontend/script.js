const messagesContainer = document.getElementById("messages");
const input = document.getElementById("message");
const sendButton = document.getElementById("send");
const historyContainer = document.getElementById("history");

function getToken() {
  return localStorage.getItem("token");
}

function appendMessage(text, type) {
  const msg = document.createElement("div");
  msg.className = `message ${type}`;
  msg.textContent = text;
  messagesContainer.appendChild(msg);
  messagesContainer.scrollTop = messagesContainer.scrollHeight;
}
function loadUserProfile() {
  const name = localStorage.getItem("name");
  const email = localStorage.getItem("email");

  if (name) {
    document.getElementById("username").textContent = name;
    document.getElementById("avatar").textContent = name[0].toUpperCase();
  }

  if (email) {
    document.getElementById("useremail").textContent = email;
  }
}
function goLogin() {
  window.location.href = "login.html";
}

function loadProfile() {
  const token = localStorage.getItem("token");
  const loginBtn = document.getElementById("loginBtn");
  const card = document.getElementById("profileCard");

  if (!token) {
    loginBtn.classList.remove("hidden");
    card.classList.add("hidden");
    return;
  }

  loginBtn.classList.add("hidden");
  card.classList.remove("hidden");

  const name = localStorage.getItem("name");
  const email = localStorage.getItem("email");

  document.getElementById("username").textContent = name || "User";
  document.getElementById("useremail").textContent = email || "";
  document.getElementById("avatar").textContent = name?.[0]?.toUpperCase() || "U";
}

async function sendMessage() {
  const message = input.value.trim();
  if (!message) return;

  const token = getToken();

  if (!token) {
    localStorage.setItem("pendingMessage", message);
    window.location.href = "login.html";
    return;
  }

  appendMessage(message, "user-message");
  input.value = "";

  const loading = document.createElement("div");
  loading.className = "message agent-message";
  loading.textContent = "Thinking...";
  messagesContainer.appendChild(loading);
//   messagesContainer.scrollTop = messagesContainer.scrollHeight;
setTimeout(() => {
  messagesContainer.scrollTo({
    top: messagesContainer.scrollHeight,
    behavior: "smooth"
  });
}, 50);


  try {
    const response = await fetch("http://localhost:3000/api/chat/chat", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${token}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ message })
    });

    const data = await response.json();
    loading.remove();
    appendMessage(data.response || "No response", "agent-message");
    loadHistory();
  } catch (err) {
    console.error(err);
    loading.remove();
    appendMessage("Server unavailable", "agent-message");
  }
}

async function loadHistory() {
  const token = getToken();
  if (!token) return;

  try {
    const response = await fetch("http://localhost:3000/api/chat/history", {
      headers: {
        "Authorization": `Bearer ${token}`
      }
    });

    const data = await response.json();
    historyContainer.innerHTML = "";

    if (!data.length) {
      historyContainer.innerHTML = `<div class="history-item">No chats yet</div>`;
      return;
    }

    const recent = data.slice(-10);
    recent.forEach((item) => {
      if (item.role === "user") {
        const div = document.createElement("div");
        div.className = "history-item";
        div.textContent = item.text;
        historyContainer.appendChild(div);
      }
    });
  } catch (err) {
    console.error("History Error:", err);
  }
}

function clearChat() {
  messagesContainer.innerHTML = `
    <div class="message agent-message">
      Hello 👋 What would you like to do today?
    </div>
  `;
}

function logout() {
 localStorage.removeItem("token");
 localStorage.removeItem("name");
 localStorage.removeItem("email");
 
//localStorage.clear();
  window.location.reload();
}

window.addEventListener("load", async () => {
  const pending = localStorage.getItem("pendingMessage");
  if (pending && getToken()) {
    input.value = pending;
    localStorage.removeItem("pendingMessage");
    sendMessage();
  }
   loadProfile();
  loadHistory();
});

sendButton.addEventListener("click", sendMessage);
input.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    sendMessage();
  }
});


