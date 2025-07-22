// Injects the reusable navbar into the page
const navbarHTML = `
<nav class="navbar">
  <div class="navbar-container">
    <a href="index.html" class="navbar-logo">Health & Diet</a>
    <ul class="navbar-links">
      <li><a href="index.html" data-page="index.html">Home</a></li>
      <li><a href="index.html#bmi" data-page="bmi">BMI Calculator</a></li>
      <li><a href="profile.html#meals" data-page="meals">Meal Log</a></li>
      <li><a href="dietitian.html" data-page="chatbot">Chatbot</a></li>
      <li><a href="profile.html" data-page="profile">Profile</a></li>
      <li><a href="login.html" data-page="login">Login/Register</a></li>
    </ul>
  </div>
</nav>
`;

document.addEventListener('DOMContentLoaded', () => {
  const navDiv = document.createElement('div');
  navDiv.innerHTML = navbarHTML;
  document.body.prepend(navDiv);

  // Highlight active link
  const path = window.location.pathname.split('/').pop();
  document.querySelectorAll('.navbar-links a').forEach(link => {
    if (link.getAttribute('href').split('#')[0] === path) {
      link.classList.add('active');
    }
  });
});
