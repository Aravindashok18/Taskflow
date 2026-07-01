// TaskFlow - Dynamic Kanban Task Manager

const STORAGE_KEY = 'taskflow_tasks';
const THEME_KEY = 'taskflow_theme';

let tasks = [];
let currentFilter = 'all';

// Initialize the app
function init() {
  loadTasks();
  loadTheme();
  setupEventListeners();
  renderTasks();
  updateTaskCounts();
}

// Setup Event Listeners
function setupEventListeners() {
  const addBtn = document.getElementById('add-btn');
  const taskInput = document.getElementById('task-input');
  const themeToggle = document.getElementById('theme-toggle');
  const filterBtns = document.querySelectorAll('.filter-btn');

  addBtn.addEventListener('click', addTask);
  taskInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') addTask();
  });
  themeToggle.addEventListener('click', toggleTheme);
  filterBtns.forEach((btn) => {
    btn.addEventListener('click', (e) => {
      filterBtns.forEach((b) => b.classList.remove('active'));
      e.target.classList.add('active');
      currentFilter = e.target.dataset.priority;
      renderTasks();
    });
  });

  // Setup drag and drop for columns
  const columns = document.querySelectorAll('.column-content');
  columns.forEach((column) => {
    column.addEventListener('dragover', handleDragOver);
    column.addEventListener('drop', handleDrop);
    column.addEventListener('dragleave', handleDragLeave);
  });
}

// Add Task
function addTask() {
  const input = document.getElementById('task-input');
  const taskText = input.value.trim();

  if (!taskText) {
    alert('Please enter a task!');
    return;
  }

  const task = {
    id: Date.now(),
    title: taskText,
    status: 'todo',
    priority: 'medium',
    dueDate: null,
    createdAt: new Date().toISOString(),
  };

  tasks.push(task);
  saveTasks();
  input.value = '';
  renderTasks();
  updateTaskCounts();
}

// Delete Task
function deleteTask(id) {
  if (confirm('Are you sure you want to delete this task?')) {
    tasks = tasks.filter((task) => task.id !== id);
    saveTasks();
    renderTasks();
    updateTaskCounts();
  }
}

// Update Priority
function updatePriority(id) {
  const task = tasks.find((t) => t.id === id);
  if (!task) return;

  const priorities = ['low', 'medium', 'high'];
  const currentIndex = priorities.indexOf(task.priority);
  task.priority = priorities[(currentIndex + 1) % priorities.length];

  saveTasks();
  renderTasks();
}

// Update Status (for manual status change)
function updateStatus(id, newStatus) {
  const task = tasks.find((t) => t.id === id);
  if (task) {
    task.status = newStatus;
    saveTasks();
    updateTaskCounts();
  }
}

// Render Tasks
function renderTasks() {
  const todoColumn = document.getElementById('todo-column');
  const progressColumn = document.getElementById('progress-column');
  const doneColumn = document.getElementById('done-column');

  // Clear columns
  [todoColumn, progressColumn, doneColumn].forEach((col) => (col.innerHTML = ''));

  // Filter tasks
  const filteredTasks =
    currentFilter === 'all'
      ? tasks
      : tasks.filter((t) => t.priority === currentFilter);

  // Separate tasks by status
  const todoTasks = filteredTasks.filter((t) => t.status === 'todo');
  const progressTasks = filteredTasks.filter((t) => t.status === 'progress');
  const doneTasks = filteredTasks.filter((t) => t.status === 'done');

  // Render tasks in each column
  renderColumnTasks(todoColumn, todoTasks);
  renderColumnTasks(progressColumn, progressTasks);
  renderColumnTasks(doneColumn, doneTasks);
}

// Render Column Tasks
function renderColumnTasks(column, columnTasks) {
  if (columnTasks.length === 0) {
    column.innerHTML = `
      <div class="empty-state">
        <div class="empty-state-icon">📭</div>
        <div class="empty-state-text">No tasks here yet</div>
      </div>
    `;
    return;
  }

  columnTasks.forEach((task) => {
    const taskCard = createTaskCard(task);
    column.appendChild(taskCard);
  });
}

// Create Task Card
function createTaskCard(task) {
  const card = document.createElement('div');
  card.className = `task-card ${task.priority}`;
  card.draggable = true;
  card.dataset.taskId = task.id;

  const dueDate = task.dueDate ? new Date(task.dueDate) : null;
  const countdownText = getCountdownText(dueDate);
  const countdownClass = getCountdownClass(dueDate);

  card.innerHTML = `
    <div class="task-content">
      <div class="task-title">${escapeHtml(task.title)}</div>
      <div class="task-actions">
        <button class="task-btn" onclick="updatePriority(${task.id})" title="Change Priority">🏷️</button>
        <button class="task-btn delete-btn" onclick="deleteTask(${task.id})" title="Delete">✕</button>
      </div>
    </div>
    <div class="task-meta">
      <span class="priority-badge priority-${task.priority}">${task.priority.toUpperCase()}</span>
      ${dueDate ? `<span class="due-date">📅 <span class="countdown-badge countdown-${countdownClass}">${countdownText}</span></span>` : ''}
    </div>
  `;

  // Drag event listeners
  card.addEventListener('dragstart', handleDragStart);
  card.addEventListener('dragend', handleDragEnd);

  return card;
}

// Drag and Drop Handlers
let draggedTaskId = null;

function handleDragStart(e) {
  draggedTaskId = e.target.closest('.task-card').dataset.taskId;
  e.target.closest('.task-card').classList.add('dragging');
  e.dataTransfer.effectAllowed = 'move';
}

function handleDragEnd(e) {
  e.target.closest('.task-card').classList.remove('dragging');
  draggedTaskId = null;
}

function handleDragOver(e) {
  e.preventDefault();
  e.dataTransfer.dropEffect = 'move';
  e.currentTarget.classList.add('drag-over');
}

function handleDragLeave(e) {
  if (e.currentTarget === e.target) {
    e.currentTarget.classList.remove('drag-over');
  }
}

function handleDrop(e) {
  e.preventDefault();
  const column = e.currentTarget;
  column.classList.remove('drag-over');

  if (draggedTaskId) {
    const newStatus = column.dataset.status;
    updateStatus(parseInt(draggedTaskId), newStatus);
    renderTasks();
    updateTaskCounts();
  }
}

// Update Task Counts
function updateTaskCounts() {
  const todoCount = tasks.filter((t) => t.status === 'todo').length;
  const progressCount = tasks.filter((t) => t.status === 'progress').length;
  const doneCount = tasks.filter((t) => t.status === 'done').length;

  document.getElementById('todo-count').textContent = todoCount;
  document.getElementById('progress-count').textContent = progressCount;
  document.getElementById('done-count').textContent = doneCount;
}

// Theme Toggle
function toggleTheme() {
  const body = document.body;
  const themeIcon = document.querySelector('.theme-icon');
  const isDark = body.classList.toggle('dark-mode');
  themeIcon.textContent = isDark ? '☀️' : '🌙';
  localStorage.setItem(THEME_KEY, isDark ? 'dark' : 'light');
}

function loadTheme() {
  const theme = localStorage.getItem(THEME_KEY);
  const body = document.body;
  const themeIcon = document.querySelector('.theme-icon');

  if (theme === 'dark') {
    body.classList.add('dark-mode');
    themeIcon.textContent = '☀️';
  } else {
    themeIcon.textContent = '🌙';
  }
}

// LocalStorage Functions
function saveTasks() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
}

function loadTasks() {
  const stored = localStorage.getItem(STORAGE_KEY);
  tasks = stored ? JSON.parse(stored) : [];
}

// Utility Functions
function getCountdownText(dueDate) {
  if (!dueDate) return '';

  const now = new Date();
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const due = new Date(dueDate.getFullYear(), dueDate.getMonth(), dueDate.getDate());
  const daysLeft = Math.ceil((due - today) / (1000 * 60 * 60 * 24));

  if (daysLeft < 0) return `Overdue by ${Math.abs(daysLeft)} days`;
  if (daysLeft === 0) return 'Due today';
  if (daysLeft === 1) return 'Due tomorrow';
  return `${daysLeft} days left`;
}

function getCountdownClass(dueDate) {
  if (!dueDate) return '';

  const now = new Date();
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const due = new Date(dueDate.getFullYear(), dueDate.getMonth(), dueDate.getDate());
  const daysLeft = Math.ceil((due - today) / (1000 * 60 * 60 * 24));

  if (daysLeft < 0) return 'overdue';
  if (daysLeft <= 2) return 'urgent';
  return 'normal';
}

function escapeHtml(text) {
  const map = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#039;',
  };
  return text.replace(/[&<>"']/g, (m) => map[m]);
}

// Initialize app when DOM is ready
document.addEventListener('DOMContentLoaded', init);