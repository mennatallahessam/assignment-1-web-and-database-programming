// Task class definition
class Task {
    constructor(id, userId, taskText, dateCreated) {
        this.id = id;
        this.userId = userId;
        this.taskText = taskText;
        this.dateCreated = dateCreated;
    }
}

// Handle task form submission
document.addEventListener('DOMContentLoaded', function() {
    const taskForm = document.getElementById('taskForm');
    if (taskForm) {
        taskForm.addEventListener('submit', function(event) {
            event.preventDefault();
            createTask();
        });
    }
});

// Create task function
function createTask() {
    const taskText = document.getElementById('taskText').value;
    
    // Generate a simple ID (in real app, backend would handle this)
    const id = Date.now();
    const userId = 1; // In real app, this would come from the logged-in user
    const dateCreated = new Date().toISOString();
    
    // Create new Task object
    const newTask = new Task(id, userId, taskText, dateCreated);
    
    // Print the object to console
    console.log('Task Object Created:');
    console.log(newTask);
    
    // Optional: Clear the form
    document.getElementById('taskForm').reset();
    
    // Optional: Show success message
    alert('Task created! Check the console to see the Task object.');
}
