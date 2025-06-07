// Dark Mode Toggle
const toggleDarkMode = () => {
  document.body.classList.toggle('dark-mode');
  const currentMode = document.body.classList.contains('dark-mode') ? 'Dark' : 'Light';
  localStorage.setItem('theme', currentMode);
};

// Load saved theme on page load
window.addEventListener('DOMContentLoaded', () => {
  const savedTheme = localStorage.getItem('theme');
  if (savedTheme === 'Dark') {
    document.body.classList.add('dark-mode');
  }
});

// Add event listener to button
document.getElementById('dark-mode-toggle').addEventListener('click', toggleDarkMode);

// Load saved theme preference
window.addEventListener('DOMContentLoaded', () => {
  const savedTheme = localStorage.getItem('theme');
  if (savedTheme && savedTheme === 'Dark') {
    document.body.classList.add('dark-mode');
  }
});

// Task Completion with Strikethrough
const taskList = document.querySelectorAll('.projects-card ul li');
taskList.forEach(task => {
  task.addEventListener('click', () => {
    task.classList.toggle('completed');
  });
});

// Clear All Tasks
const clearAllTasks = () => {
  const tasks = document.querySelectorAll('.projects-card ul li');
  tasks.forEach(task => task.remove());
};

// Add Event Listeners for Actions
document.getElementById('dark-mode-toggle').addEventListener('click', toggleDarkMode);
document.getElementById('clear-all-btn').addEventListener('click', clearAllTasks);

// Style for completed tasks
const style = document.createElement('style');
style.innerHTML = `
  .completed {
    text-decoration: line-through;
    color: #999;
  }
  .dark-mode {
    background-color: #333;
    color: #f4f4f4;
  }
  .dark-mode header {
    background-color: #111;
  }
  .dark-mode .btn {
    background: #16a085;
  }
  .dark-mode .btn:hover {
    background: #1abc9c;
  }
`;
document.head.appendChild(style);
