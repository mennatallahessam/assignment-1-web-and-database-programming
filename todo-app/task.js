// Task class definition
class Task {
    constructor(id, userId, taskText, dateCreated) {
        this.id = id;
        this.userId = userId;
        this.taskText = taskText;
        this.dateCreated = dateCreated;
    }
}

// Handle task form submission and initial load
document.addEventListener('DOMContentLoaded', function() {
    const taskForm = document.getElementById('taskForm');
    if (taskForm) {
        taskForm.addEventListener('submit', function(event) {
            event.preventDefault();
            createTask();
        });
    }
    
    // Check if logged in
    const token = localStorage.getItem('token');
    if (!token && window.location.pathname.includes('tasks.html')) {
        window.location.href = 'login.html';
        return;
    }

    // Load categories and tasks
    loadCategories();
    loadTasks();
});

// Load categories from backend
async function loadCategories() {
    try {
        const response = await fetch('/api/categories');
        const categories = await response.json();
        const categorySelect = document.getElementById('categorySelect');
        
        if (categorySelect) {
            categories.forEach(cat => {
                const option = document.createElement('option');
                option.value = cat.category_id;
                option.textContent = cat.category_name;
                categorySelect.appendChild(option);
            });
        }
    } catch (error) {
        console.error('Error loading categories:', error);
    }
}

// Load tasks from backend
async function loadTasks() {
    const token = localStorage.getItem('token');
    try {
        const response = await fetch('/api/tasks', {
            headers: { 'Authorization': `Bearer ${token}` }
        });
        const tasks = await response.json();
        
        const taskList = document.getElementById('taskList');
        if (taskList) {
            taskList.innerHTML = '';
            tasks.forEach(task => {
                const li = document.createElement('li');
                li.innerHTML = `
                    <span style="${task.is_completed ? 'text-decoration: line-through;' : ''}">
                        ${task.task_description} <strong>(${task.category_name || 'No Category'})</strong>
                    </span>
                    <button onclick="deleteTask(${task.task_id})">Delete</button>
                `;
                taskList.appendChild(li);
            });
        }
    } catch (error) {
        console.error('Error loading tasks:', error);
    }
}

// Create task function
async function createTask() {
    const task_description = document.getElementById('taskText').value;
    const category_id = document.getElementById('categorySelect').value;
    const token = localStorage.getItem('token');
    
    try {
        const response = await fetch('/api/tasks', {
            method: 'POST',
            headers: { 
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({ task_description, category_id })
        });

        if (response.ok) {
            document.getElementById('taskForm').reset();
            loadTasks();
        } else {
            const data = await response.json();
            alert(data.msg || 'Failed to create task');
        }
    } catch (error) {
        console.error('Error:', error);
        alert('An error occurred');
    }
}

// Delete task function
async function deleteTask(id) {
    const token = localStorage.getItem('token');

    try {
        const response = await fetch(`/api/tasks/${id}`, {
            method: 'DELETE',
            headers: { 'Authorization': `Bearer ${token}` }
        });

        if (response.ok) {
            loadTasks();
        }
    } catch (error) {
        console.error('Error:', error);
    }
}
