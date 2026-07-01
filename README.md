# 📋 TaskFlow - Dynamic Kanban Task Manager

A modern, responsive Kanban-style task manager built with **HTML5**, **CSS3**, and **JavaScript ES6+**. Organize your tasks efficiently with drag-and-drop functionality, priority tagging, and persistent local storage.

## ✨ Features

### Core Functionality
- **📝 Kanban Board**: Three columns - To Do, In Progress, and Done
- **🎯 Drag & Drop**: Easily move tasks between columns using intuitive drag-and-drop
- **💾 Local Storage**: Tasks persist across browser sessions - no backend required
- **🏷️ Priority Tagging**: Assign tasks as High, Medium, or Low priority
- **📅 Due Date Tracking**: Visual countdown badges showing days remaining
- **🎨 Dark/Light Theme**: Toggle between themes with persistent preference
- **🔍 Priority Filtering**: Filter tasks by priority level or view all tasks
- **✅ Task Management**: Add, delete, and update tasks seamlessly

### User Interface
- Clean, modern design with gradient accents
- Responsive layout that works on desktop, tablet, and mobile
- Smooth animations and transitions
- Emoji-enhanced visual hierarchy
- Task counters for each column
- Empty state messaging

## 🚀 Getting Started

### Prerequisites
No installation required! TaskFlow runs entirely in the browser.

### Installation

1. Clone the repository:
```bash
git clone https://github.com/Aravindashok18/TaskFlow.git
cd TaskFlow
```

2. Open `index.html` in your web browser:
```bash
open index.html
# or
start index.html
```

3. Start managing your tasks!

## 📖 Usage

### Adding Tasks
1. Type your task in the input field at the top
2. Click the **+ Add Task** button or press **Enter**
3. Task appears in the "To Do" column

### Managing Tasks
- **Move Task**: Drag a task card to another column
- **Change Priority**: Click the 🏷️ button to cycle through priority levels
- **Delete Task**: Click the ✕ button to remove a task

### Filtering
- Click filter buttons to view tasks by priority:
  - **All**: Show all tasks
  - **High**: Red priority tasks
  - **Medium**: Orange priority tasks
  - **Low**: Green priority tasks

### Theme
- Click the moon/sun icon in the header to toggle between light and dark modes
- Your preference is saved automatically

## 🛠️ Technologies Used

- **HTML5**: Semantic markup and structure
- **CSS3**: 
  - CSS Grid for responsive layout
  - CSS Custom Properties (variables) for theming
  - Flexbox for component layout
  - Smooth transitions and animations
- **JavaScript ES6+**: 
  - Modern syntax and features
  - LocalStorage API for data persistence
  - HTML5 Drag and Drop API
  - Event delegation and handling

## 💾 Data Storage

Tasks are stored in the browser's LocalStorage with the key `taskflow_tasks`. Each task object contains:

```javascript
{
  id: timestamp,
  title: string,
  status: 'todo' | 'progress' | 'done',
  priority: 'low' | 'medium' | 'high',
  dueDate: ISO string or null,
  createdAt: ISO string
}
```

Theme preference is stored in `taskflow_theme`.

## 🎨 Customization

Modify the CSS variables in `styles.css` to customize colors:

```css
:root {
  --primary-color: #6366f1;
  --secondary-color: #ec4899;
  --success-color: #10b981;
  --warning-color: #f59e0b;
  --danger-color: #ef4444;
  /* ... more variables ... */
}
```

## 📱 Responsive Design

- **Desktop**: Full 3-column grid layout
- **Tablet**: 2-column or 1-column layout
- **Mobile**: Single column with full-width cards

## 🔒 Browser Compatibility

- Chrome/Edge 60+
- Firefox 55+
- Safari 12+
- Mobile browsers (iOS Safari, Chrome Mobile)

## 📝 Future Enhancements

- [ ] Due date picker
- [ ] Task categories/tags
- [ ] Recurring tasks
- [ ] Task descriptions/notes
- [ ] Search functionality
- [ ] Export tasks to CSV
- [ ] Keyboard shortcuts
- [ ] Multiple boards
- [ ] Cloud sync option
- [ ] Time tracking

## 🐛 Known Issues

None at this time. Please report any bugs via GitHub Issues.

## 📄 License

MIT License - Feel free to use this project for personal or commercial purposes.

## 👨‍💻 Author

**Aravind Ashok**
- GitHub: [@Aravindashok18](https://github.com/Aravindashok18)

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📞 Support

If you encounter any issues or have suggestions, please open a GitHub Issue.

---

**Enjoy using TaskFlow! 🚀**