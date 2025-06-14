
const searchIcon = document.getElementById('searchIcon');
const searchInput = document.getElementById('searchInput');

searchIcon.addEventListener('click', () => {
  if (searchInput.style.display === 'none') {
    searchInput.style.display = 'inline-block';
    searchInput.focus();
  } else {
    searchInput.style.display = 'none';
    clearHighlights();
  }
});

function clearHighlights() {
  const mainContent = document.querySelector('.main-content');
  const highlighted = mainContent.querySelectorAll('span.highlight');
  highlighted.forEach(span => {
    const parent = span.parentNode;
    parent.replaceChild(document.createTextNode(span.textContent), span);
    parent.normalize();
  });
}

function highlightText(text) {
  clearHighlights();
  if (!text) return;
  const mainContent = document.querySelector('.main-content');
  const regex = new RegExp(`(${text})`, 'gi');

  function walk(node) {
    if (node.nodeType === 3) { // Text node
      const match = node.data.match(regex);
      if (match) {
        const span = document.createElement('span');
        span.className = 'highlight';
        const frag = document.createDocumentFragment();
        let lastIndex = 0;
        node.data.replace(regex, (m, p1, offset) => {
          const before = node.data.slice(lastIndex, offset);
          if (before) frag.appendChild(document.createTextNode(before));
          const highlightNode = document.createElement('span');
          highlightNode.className = 'highlight';
          highlightNode.textContent = m;
          frag.appendChild(highlightNode);
          lastIndex = offset + m.length;
        });
        const after = node.data.slice(lastIndex);
        if (after) frag.appendChild(document.createTextNode(after));
        node.parentNode.replaceChild(frag, node);
      }
    } else if (node.nodeType === 1 && node.childNodes && !['SCRIPT', 'STYLE', 'NOSCRIPT'].includes(node.tagName)) {
      for (let i = 0; i < node.childNodes.length; i++) {
        walk(node.childNodes[i]);
      }
    }
  }
  walk(mainContent);

  // Scroll to first highlight
  const firstHighlight = mainContent.querySelector('span.highlight');
  if (firstHighlight) {
    firstHighlight.scrollIntoView({ behavior: 'smooth', block: 'center' });
  }
}

searchInput.addEventListener('keydown', (event) => {
  if (event.key === 'Enter') {
    const query = searchInput.value.trim();
    if (query) {
      highlightText(query);
    } else {
      clearHighlights();
    }
  }
});

// Example JavaScript: toggle search icon alert
document.querySelector('.search-icon').addEventListener('click', () => {
  alert('Search function coming soon!');
});

// Modal open and close
const modal = document.getElementById('signInModal');
const btn = document.getElementById('shopNowBtn');
const closeBtn = document.getElementById('closeModal');

btn.onclick = function() {
  modal.style.display = 'block';
}

closeBtn.onclick = function() {
  modal.style.display = 'none';
}

window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = 'none';
  }
}

// Form submission handler
document.getElementById('loginForm').addEventListener('submit', function(event) {
  event.preventDefault();
  const emailPhone = document.getElementById('emailPhone').value;
  const password = document.getElementById('password').value;
  if(emailPhone && password) {
    alert('Logging in with Email/Phone: ' + emailPhone);
    modal.style.display = 'none';
  } else {
    alert('Please fill in all fields.');
  }
});

// Redirect to Google sign-in
document.getElementById('googleSignInBtn').addEventListener('click', function() {
  window.open('https://accounts.google.com/signin', '_blank');
});

// Redirect to Facebook sign-in
document.getElementById('facebookSignInBtn').addEventListener('click', function() {
  window.open('https://www.facebook.com/login.php', '_blank');
});

// Password visibility toggle
const togglePassword = document.getElementById('togglePassword');
const passwordInput = document.getElementById('password');

togglePassword.addEventListener('click', function () {
  const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
  passwordInput.setAttribute('type', type);

  // Toggle eye and eye slash icons
  const eyeSlashIcon = document.getElementById('eyeSlashIcon');
  const eyeIcon = document.getElementById('eyeIcon');

  if (type === 'text') {
    eyeSlashIcon.style.display = 'none';
    eyeIcon.style.display = 'inline';
  } else {
    eyeSlashIcon.style.display = 'inline';
    eyeIcon.style.display = 'none';
  }
});

// Login form validation and auto-submit on password enter if email contains "@"
const loginForm = document.getElementById('loginForm');
const emailPhoneInput = document.getElementById('emailPhone');

loginForm.addEventListener('submit', function (event) {
  event.preventDefault();
  if (!emailPhoneInput.value.includes('@')) {
    alert('Please enter a valid email address containing "@" to log in.');
    return;
  }
  // Redirect to Products page after successful login
  window.location.href = 'Products.html';
});

passwordInput.addEventListener('keydown', function (event) {
  if (event.key === 'Enter') {
    if (emailPhoneInput.value.includes('@')) {
      loginForm.submit();
    } else {
      event.preventDefault();
      alert('Please enter a valid email address containing "@" to log in.');
    }
  }
});
