const taskList = document.getElementById('taskList');
const newTaskInput = document.getElementById('newTask');
const addTaskButton = document.getElementById('addTask');

// Load tasks from local storage on page load
loadTasks();

// Event Listener for adding a new task
addTaskButton.addEventListener('click', function() {
  const task = newTaskInput.value;
  if (task) {
    addTask(task); 
    newTaskInput.value = ''; // Clear input field
  }
});

// Function to Add a Task
function addTask(task) {
  const listItem = document.createElement('li');
  listItem.textContent = task;

  // Add a checkbox for completion
  const checkbox = document.createElement('input');
  checkbox.type = 'checkbox';
  checkbox.addEventListener('change', toggleTaskStatus);
  listItem.appendChild(checkbox);

  taskList.appendChild(listItem);
  saveTasks(); // Save to local storage
}

// Toggle task completion
function toggleTaskStatus(event) {
  const checkbox = event.target;
  const listItem = checkbox.parentNode;
  listItem.classList.toggle('completed');
  saveTasks();
}

// Save Tasks to Local Storage
function saveTasks() {
  const tasks = [];
  taskList.childNodes.forEach(listItem => {
    tasks.push({
      text: listItem.textContent.trim(),
      completed: listItem.classList.contains('completed')
    });
  });
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Load Tasks from Local Storage
function loadTasks() {
  const savedTasks =  localStorage.getItem('tasks');
  if (savedTasks) {
    JSON.parse(savedTasks).forEach(task => {
      addTask(task.text);
      // Mark task as completed (if it was saved as such) 
      const listItem = taskList.lastChild;
      if(task.completed) {
        listItem.querySelector('input[type="checkbox"]').checked = true;
        listItem.classList.add('completed');
      }
    });
  }
}
