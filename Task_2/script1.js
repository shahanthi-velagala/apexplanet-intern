// Contact Form Validation
document.getElementById("contactForm").addEventListener("submit", function (e) {
  e.preventDefault();
  const name = document.getElementById("name").value.trim();
  const email = document.getElementById("email").value.trim();
  const message = document.getElementById("message").value.trim();
  const formMessage = document.getElementById("formMessage");

  const emailPattern = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/;

  if (!name || !email || !message) {
    formMessage.textContent = "Please fill in all fields.";
    return;
  }

  if (!emailPattern.test(email)) {
    formMessage.textContent = "Enter a valid email.";
    return;
  }

  formMessage.style.color = "green";
  formMessage.textContent = "Form submitted successfully!";
  this.reset(); // clear form
});

// To-Do List
function addTodo() {
  const input = document.getElementById("todoInput");
  const task = input.value.trim();
  const list = document.getElementById("todoList");

  if (task === "") return;

  const li = document.createElement("li");
  li.innerHTML = `${task} <button onclick="removeTodo(this)">Delete</button>`;
  list.appendChild(li);
  input.value = "";
}

function removeTodo(button) {
  button.parentElement.remove();
}