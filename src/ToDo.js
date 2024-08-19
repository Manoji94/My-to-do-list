import React, { useState } from 'react';
import './ToDo.css';

function ToDo() {
    const [task, setTask] = useState('');
    const [tasks, setTasks] = useState([
        { text: 'Hit the gym', completed: false },
        { text: 'Pay bills', completed: true },
        { text: 'Buy eggs', completed: false },
        { text: 'Read a book', completed: false },
        { text: 'Organize office', completed: false },
    ]);
    const [isEditing, setIsEditing] = useState(false);
    const [currentTask, setCurrentTask] = useState(null);

    const handleChange = (event) => {
        setTask(event.target.value);
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        if (task.trim()) {
            if (isEditing) {
                handleUpdateTask(task);
            } else {
                setTasks([...tasks, { text: task, completed: false }]);
            }
            setTask('');
            setIsEditing(false);
        }
    }

    const handleRemove = (index) => {
        const taskToRemove = tasks[index];
        if (taskToRemove === currentTask) {
            setIsEditing(false);
            setTask('');
        }
        setTasks(tasks.filter((_, i) => i !== index));
    }

    const toggleComplete = (index) => {
        const newTasks = [...tasks];
        newTasks[index].completed = !newTasks[index].completed;
        setTasks(newTasks);
    }

    const handleEdit = (task) => {
        setIsEditing(true);
        setTask(task.text);
        setCurrentTask(task);
    }

    const handleUpdateTask = (newText) => {
        const updatedTasks = tasks.map((t) =>
            t === currentTask ? { ...t, text: newText } : t
        );
        setTasks(updatedTasks);
        setIsEditing(false);
    }

    return (
        <div>
            <div className="todo-header">
                <h1>Listify</h1>
                <form onSubmit={handleSubmit}>
                    <input
                        type='text'
                        value={task}
                        onChange={handleChange}
                        placeholder='Enter a new task' />
                    <span className="addBtn" onClick={handleSubmit}>
                        {isEditing ? 'Update' : 'Add'}
                    </span>
                </form>
            </div>
            <ul>
                {tasks.map((task, index) => (
                    <li
                        key={index}
                        className={task.completed ? 'checked' : ''}
                        onClick={() => toggleComplete(index)}
                    >
                        {task.text}
                        <span className='edit' onClick={(e) => { e.stopPropagation(); handleEdit(task); }}>EDIT</span>
                        <span className='close' onClick={(e) => { e.stopPropagation(); handleRemove(index); }}>x</span>
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default ToDo;
