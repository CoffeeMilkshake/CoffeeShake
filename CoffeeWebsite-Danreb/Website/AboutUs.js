function showMore() {
  const featuredSection = document.querySelector('.featured-section');
  if (featuredSection) {
    featuredSection.scrollIntoView({ behavior: 'smooth', block: 'center' });
    // Removed highlight as per user request
  }
}

function handleFormSubmit(event) {
  event.preventDefault();
  const moreInfo = document.getElementById('moreInfoText').value.trim();
  if (moreInfo) {
    alert('You entered: ' + moreInfo);
    // You can add further processing here
    document.getElementById('moreInfoForm').reset();
    document.getElementById('moreInfoForm').style.display = 'none';
  } else {
    alert('Please enter some text.');
  }
}

document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('moreInfoForm');
  form.addEventListener('submit', handleFormSubmit);
});
