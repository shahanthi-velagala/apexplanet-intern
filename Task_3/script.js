function checkAnswers() {
  let score = 0;

  const q1 = document.querySelector('input[name="q1"]:checked');
  const q2 = document.querySelector('input[name="q2"]:checked');

  if (q1 && q1.value === "a") score++;
  if (q2 && q2.value === "b") score++;

  document.getElementById("result").textContent = `You got ${score}/2 correct!`;
}

function getJoke() {
  fetch('https://icanhazdadjoke.com/', {
    headers: {
      'Accept': 'application/json'
    }
  })
  .then(response => response.json())
  .then(data => {
    document.getElementById("joke").textContent = data.joke;
  })
  .catch(error => {
    document.getElementById("joke").textContent = "Oops! Couldn't fetch a joke.";
    console.error("Error fetching joke:", error);
  });
}