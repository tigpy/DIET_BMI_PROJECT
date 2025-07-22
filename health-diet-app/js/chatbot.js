// Predefined Q&A pairs for diet/exercise advice
const advicePairs = [
    { q: /lose weight|weight loss|reduce weight/i, a: "To lose weight, focus on a balanced diet with a calorie deficit and regular exercise like brisk walking, cycling, or swimming." },
    { q: /gain weight|weight gain|increase weight/i, a: "To gain weight, eat more frequent meals with healthy fats, proteins, and whole grains. Strength training can help build muscle mass." },
    { q: /protein/i, a: "Good sources of protein include lean meats, eggs, dairy, beans, and legumes. Aim for a portion at every meal." },
    { q: /vegetarian|vegan/i, a: "A balanced vegetarian or vegan diet should include a variety of vegetables, fruits, whole grains, legumes, nuts, and seeds." },
    { q: /exercise|workout|physical activity/i, a: "Aim for at least 150 minutes of moderate exercise per week. Mix cardio with strength training for best results." },
    { q: /breakfast/i, a: "A healthy breakfast could include oatmeal, fruit, eggs, or yogurt. Avoid sugary cereals." },
    { q: /sugar/i, a: "Limit added sugars. Opt for natural sugars from fruits and check food labels for hidden sugars." },
    { q: /fat/i, a: "Choose healthy fats like olive oil, nuts, and avocados. Limit saturated and trans fats." },
    { q: /hydration|water/i, a: "Drink at least 8 cups of water daily. Hydration is key for metabolism and overall health." },
    { q: /snack/i, a: "Healthy snacks include fruits, nuts, yogurt, or veggie sticks with hummus." },
    { q: /calorie/i, a: "Calorie needs vary by age, gender, and activity. Use a calorie calculator for a personalized estimate." },
    { q: /fiber/i, a: "Eat more fruits, vegetables, whole grains, and legumes to increase fiber intake." },
    { q: /diabetes/i, a: "For diabetes, focus on whole grains, lean proteins, and non-starchy vegetables. Limit sugar and refined carbs." },
    { q: /cholesterol/i, a: "Lower cholesterol by eating more fiber, healthy fats, and reducing saturated fat intake." },
    { q: /default/i, a: "I'm here to help with diet and exercise questions! Please ask me anything about healthy living." }
];

function getAdvice(question) {
    for (const pair of advicePairs) {
        // Skip the default case
        if (pair.q instanceof RegExp && pair.q.source !== 'default' && pair.q.test(question)) {
            return pair.a;
        }
    }
    // Return the default answer
    const defaultPair = advicePairs.find(p => p.q instanceof RegExp && p.q.source === 'default');
    return defaultPair ? defaultPair.a : "I'm here to help with diet and exercise questions!";
}

function renderChat(history) {
    const chatDiv = document.getElementById('chatHistory');
    chatDiv.innerHTML = '';
    history.forEach(msg => {
        const bubble = document.createElement('div');
        bubble.className = 'bubble ' + (msg.sender === 'user' ? 'user' : 'bot');
        bubble.textContent = msg.text;
        chatDiv.appendChild(bubble);
    });
    chatDiv.scrollTop = chatDiv.scrollHeight;
}

function saveChatHistory(history) {
    localStorage.setItem('chatHistory', JSON.stringify(history));
}

function loadChatHistory() {
    return JSON.parse(localStorage.getItem('chatHistory')) || [];
}

document.addEventListener('DOMContentLoaded', function() {
    let chatHistory = loadChatHistory();
    renderChat(chatHistory);
    const form = document.getElementById('chatForm');
    const input = document.getElementById('userInput');
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        const userMsg = input.value.trim();
        if (!userMsg) return;
        chatHistory.push({ sender: 'user', text: userMsg });
        const botReply = getAdvice(userMsg);
        setTimeout(() => {
            chatHistory.push({ sender: 'bot', text: botReply });
            renderChat(chatHistory);
            saveChatHistory(chatHistory);
        }, 400);
        renderChat(chatHistory);
        saveChatHistory(chatHistory);
        input.value = '';
    });
});
