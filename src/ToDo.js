import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './ToDo.css';

function ToDo({ token, username }) {
    const [task, setTask] = useState('');
    const [tasks, setTasks] = useState([]);
    const [isEditing, setIsEditing] = useState(false);
    const [currentTask, setCurrentTask] = useState(null);

    const API_URL = 'https://mjkr94.pythonanywhere.com/api/react/';

    // Set up Axios instance with the Authorization header
    const axiosInstance = axios.create({
        headers: {
            'Authorization': `Token ${token}`
        }
    });

    useEffect(() => {
        // Fetch tasks on component mount
        axiosInstance.get(API_URL)
            .then(response => setTasks(response.data))
            .catch(error => console.error('Error fetching tasks:', error));
    }, [API_URL, token]);

    const handleChange = (event) => {
        setTask(event.target.value);
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        if (task.trim()) {
            if (isEditing) {
                handleUpdateTask(task);
            } else {
                axiosInstance.post(API_URL, { text: task, checked: false })
                    .then(response => setTasks([...tasks, response.data]))
                    .catch(error => console.error('Error adding task:', error));
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
        axiosInstance.delete(`https://mjkr94.pythonanywhere.com/api/delete-item/${taskToRemove.id}/`)
            .then(() => setTasks(tasks.filter((_, i) => i !== index)))
            .catch(error => console.error('Error removing task:', error));
    }

    const toggleComplete = (index) => {
        const newTasks = [...tasks];
        newTasks[index].checked = !newTasks[index].checked;
        setTasks(newTasks);
        axiosInstance.put(`https://mjkr94.pythonanywhere.com/api/update-checkbox/${newTasks[index].id}/`, { checked: newTasks[index].checked })
            .catch(error => console.error('Error updating task status:', error));
    }

    const handleEdit = (task) => {
        setIsEditing(true);
        setTask(task.text);
        setCurrentTask(task);
    }

    const handleUpdateTask = (newText) => {
        axiosInstance.put(`https://mjkr94.pythonanywhere.com/api/edit-item/${currentTask.id}/`, { text: newText })
            .then(() => {
                const updatedTasks = tasks.map((t) =>
                    t.id === currentTask.id ? { ...t, text: newText } : t
                );
                setTasks(updatedTasks);
                setIsEditing(false);
            })
            .catch(error => console.error('Error updating task:', error));
    }

    return (
        <div>
            <div className="todo-header">
                    <div className="text-end">
                        <h2 className="font-weight-bold text-white">{username}</h2>
                    </div>
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
                        key={task.id}
                        className={task.checked ? 'checked' : ''}
                        onClick={() => toggleComplete(index)}
                    >
                        {task.text}
                        <span className='edit' onClick={(e) => { e.stopPropagation(); handleEdit(task); }}><i className="bi bi-pencil-square"></i></span>
                        <span className='close' onClick={(e) => { e.stopPropagation(); handleRemove(index); }}><i className="bi bi-trash"></i></span>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default ToDo;
