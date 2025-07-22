// Injects the reusable footer into the page
const footerHTML = `
<footer class="footer">
  <div class="footer-content">
    <span>Developed by tigpy &middot; <a href="https://github.com/tigpy/DIET_BMI_PROJECT" target="_blank">GitHub Repo</a></span>
    <span>Contact: <a href="mailto:contact@healthdiet.com">contact@healthdiet.com</a></span>
  </div>
</footer>
`;

document.addEventListener('DOMContentLoaded', () => {
  const footerDiv = document.createElement('div');
  footerDiv.innerHTML = footerHTML;
  document.body.appendChild(footerDiv);
});
