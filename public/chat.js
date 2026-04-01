let faqData = [];

async function loadFAQ() {
  try {
    const res = await fetch("/data.json");
    faqData = await res.json();
  } catch (err) {
    console.error("Error loading data:", err);
  }
}

function addMessage(text, sender) {
  const chatDiv = document.getElementById("chat");
  const msgDiv = document.createElement("div");
  msgDiv.className = `message ${sender}`;
  msgDiv.innerText = text;
  chatDiv.appendChild(msgDiv);
  chatDiv.scrollTop = chatDiv.scrollHeight;
}

function sendMessage() {
  function sendMessage() {
  const input = document.getElementById("userInput");
  const text = input.value.trim().toLowerCase();
  if (!text) return;

  addMessage(input.value, "user");
  input.value = "";

  const faq = faqData.faq || [];

  // Find multiple matches
  const matches = faq.filter(q => {
    const questionMatch = text.split(" ").some(word =>
    q.question.toLowerCase().includes(word)
);
    const keywordMatch = (q.keywords || []).some(k =>
      text.includes(k.toLowerCase())
    );
    return questionMatch || keywordMatch;
  });

  if (matches.length > 0) {
    matches.slice(0, 3).forEach((match, index) => {
      setTimeout(() => {
        addMessage(match.answer, "bot");
      }, 300 * (index + 1)); // stagger responses
    });
  } else {
    addMessage("Sorry, I couldn't find a relevant answer.", "bot");
  }
}
}

// load FAQ on start
loadFAQ();