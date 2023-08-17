function darkMode() {
  const colorToggle = document.getElementById('colorToggle');
  const isDarkMode = localStorage.getItem('colorChanged') === 'true';

  if (isDarkMode) {
    applyDarkModeColors();
    colorToggle.checked = true;
  }

  colorToggle.addEventListener('change', function() {
    if (colorToggle.checked) {
      applyDarkModeColors();
      localStorage.setItem('colorChanged', 'true');
    } else {
      applyOriginalColors();
      localStorage.setItem('colorChanged', 'false');
    }
  });

  function applyDarkModeColors() {
    document.documentElement.style.setProperty('--primary-color', '#151d67');
    document.documentElement.style.setProperty('--body-color', 'rgb(23, 22, 22)');
    document.documentElement.style.setProperty('--text-color', '#cacaca');
    document.documentElement.style.setProperty('--title-color', '#e8dddd');
    document.documentElement.style.setProperty('--bg-color', '#6e6d6b');
    document.documentElement.style.setProperty('--card-color', '#1a1c35');
  }

  function applyOriginalColors() {
    document.documentElement.style.setProperty('--primary-color', 'hsl(354, 78%, 60%)');
    document.documentElement.style.setProperty('--body-color', 'hsl(206, 4%, 97%)');
    document.documentElement.style.setProperty('--text-color', 'hsl(0, 0%, 20%)');
    document.documentElement.style.setProperty('--title-color', 'hsl(0, 0%, 10%)');
    document.documentElement.style.setProperty('--bg-color', 'hsl(0, 0%, 100%)');
    document.documentElement.style.setProperty('--card-color', 'hsl(0, 0%, 90%)');
  }
}

document.addEventListener('DOMContentLoaded', function() {
  darkMode();
});
export default darkMode;
