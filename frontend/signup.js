async function signup() {
  const name = document.getElementById("name").value.trim();
  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value.trim();

  if (!name || !email || !password) {
    alert("Fill all fields");
    return;
  }

  if (password.length < 6) {
    alert("Password minimum 6 characters");
    return;
  }

  try {
    const response = await fetch("http://localhost:3000/api/auth/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ name, email, password })
    });

    const data = await response.json();

    if (!response.ok) {
      alert(data.message || "Signup failed");
      return;
    }

    alert("Signup successful");
    window.location.href = "login.html";
  } catch (err) {
    console.error(err);
    alert("Server unavailable");
  }
}
