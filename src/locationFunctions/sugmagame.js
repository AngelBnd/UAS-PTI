import { useState } from "react";

// Fungsi lama
export function sugma41(setStats) {
    setStats((prev) => ({
        ...prev,
        hungerBar: prev.hungerBar + 3,
    }));
    console.log("Sugma4 button");
}

export function sugma42(setStats) {
    console.log("Sugma4 button");
}

// Game Q&A baru
const questions = [
  {
    question: "Apa ibu kota Indonesia?",
    options: ["Jakarta", "Bandung", "Surabaya"],
    correct: "Jakarta"
  },
  {
    question: "Berapa 5 + 3?",
    options: ["6", "8", "10"],
    correct: "8"
  },
  {
    question: "Siapa penemu lampu pijar?",
    options: ["Einstein", "Newton", "Edison"],
    correct: "Edison"
  }
];

export function sugmaGameQA(setStats) {
  const container = document.createElement("div");
  container.style.padding = "20px";

  const randomIndex = Math.floor(Math.random() * questions.length);
  const current = questions[randomIndex];

  const questionText = document.createElement("p");
  questionText.textContent = current.question;
  container.appendChild(questionText);

  current.options.forEach((opt) => {
    const button = document.createElement("button");
    button.textContent = opt;
    button.style.margin = "5px";
    button.onclick = () => {
      if (opt === current.correct) {
        setStats((prev) => ({
          ...prev,
          hungerBar: prev.hungerBar + 5
        }));
        alert("Benar! Hunger meningkat.");
      } else {
        alert("Salah! Tidak ada perubahan.");
      }
      container.remove();
    };
    container.appendChild(button);
  });

  document.body.appendChild(container);
}