function showSection(id) {
  const sections = document.querySelectorAll(".content-section");
  sections.forEach(section => section.classList.remove("active"));
  document.getElementById(id).classList.add("active");
}

// To-Do List
function addTask() {
  const input = document.getElementById("todo-input");
  const task = input.value.trim();
  if (task) {
    const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks.push(task);
    localStorage.setItem("tasks", JSON.stringify(tasks));
    input.value = "";
    displayTasks();
  }
}

function displayTasks() {
  const list = document.getElementById("todo-list");
  const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  list.innerHTML = "";
  tasks.forEach((task, index) => {
    const li = document.createElement("li");
    li.textContent = task;
    li.onclick = () => {
      tasks.splice(index, 1);
      localStorage.setItem("tasks", JSON.stringify(tasks));
      displayTasks();
    };
    list.appendChild(li);
  });
}

displayTasks();

// Product Listing (with local images)
const products = [
  { name: "T-shirt", category: "clothes", price: 299, image: "T-shirt.jpg" },
  { name: "Jeans", category: "clothes", price: 799, image: "jeans.jpg" },
  { name: "Laptop", category: "electronics", price: 45999, image: "laptop.jpg" },
  { name: "Smartphone", category: "electronics", price: 15999, image: "smartphone.jpg" },
  { name: "Dress", category: "clothes", price: 499, image: "dress.jpg" },
  { name: "Headphones", category: "electronics", price: 999, image: "headphones.jpg" },
  { name: "Shoes", category: "clothes", price: 1200, image: "shoes.jpg" },
  { name: "Smartwatch", category: "electronics", price: 2999, image: "smartwatch.jpg" },
  { name: "Jacket", category: "clothes", price: 1500, image: "jacket.jpg" },
  { name: "Tablet", category: "electronics", price: 9999, image: "tablet.jpg" }
];

function filterProducts() {
  const category = document.getElementById("filter").value;
  const sort = document.getElementById("sort").value;
  let filtered = [...products];

  if (category !== "all") {
    filtered = filtered.filter(p => p.category === category);
  }

  if (sort === "asc") {
    filtered.sort((a, b) => a.price - b.price);
  } else if (sort === "desc") {
    filtered.sort((a, b) => b.price - a.price);
  }

  const list = document.getElementById("product-list");
  list.innerHTML = "";
  filtered.forEach(p => {
    list.innerHTML += `
      <div class="product">
        <img src="${p.image}" alt="${p.name}">
        <h4>${p.name}</h4>
        <p>₹${p.price}</p>
      </div>
    `;
  });
}

filterProducts();
