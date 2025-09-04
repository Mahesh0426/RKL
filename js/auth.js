// Get users from localStorage
function getUsers() {
  return JSON.parse(localStorage.getItem("users")) || [];
}

// Save users
function saveUsers(users) {
  localStorage.setItem("users", JSON.stringify(users));
}

// Sign up user
function signupUser(e) {
  e.preventDefault();
  const name = document.getElementById("signupName").value;
  const email = document.getElementById("signupEmail").value;
  const password = document.getElementById("signupPassword").value;
  const role = document.getElementById("signupRole").value;

  let users = getUsers();
  if (users.find((u) => u.email === email)) {
    alert("Email already exists!");
    return;
  }

  users.push({ name, email, password, role });
  saveUsers(users);
  alert("Account created! Please login.");
  window.location.href = "login.html";
}

// Login user
function loginUser(e) {
  e.preventDefault();
  const email = document.getElementById("loginEmail").value;
  const password = document.getElementById("loginPassword").value;

  let users = getUsers();
  let user = users.find((u) => u.email === email && u.password === password);

  if (user) {
    localStorage.setItem("loggedInUser", JSON.stringify(user));
    window.location.href = "dashboard.html";
  } else {
    alert("Invalid email or password.");
  }
}

// Check authentication
function checkAuth() {
  let user = JSON.parse(localStorage.getItem("loggedInUser"));
  if (!user) {
    window.location.href = "login.html";
  }
}

// Logout
function logout() {
  localStorage.removeItem("loggedInUser");
  window.location.href = "login.html";
}
