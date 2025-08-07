import React, { useState, useEffect } from 'react'

const API_URL = "http://localhost:3000/tasks"

function App() {
    const [tasks, setTasks] = useState([])
    const [addTask, setAddTask] = useState({title: '', description: ''})

    const fetchTasks = async () => {
        const response = await fetch(API_URL)
        const data = await response.json()
        setTasks(data)
    }

    // Add a task
    const handleAddTask = async (e) => {
        e.preventDefault();
        const response = await fetch(API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(addTask)
        })
        const data = await response.json()
        setTasks([...tasks, data])

        // Reset addTask
        setAddTask({title: '', description: ''})
    }

    const handleOnChange = (e, info) => {
        const value = e.target.value;

        if (info === 'title') {
            setAddTask({ ...addTask, title: value })
        } else if(info === 'description') {
            setAddTask({ ...addTask, description: value })
        }
    }

    useEffect(() => {
        fetchTasks()
    }, [])

    console.log(tasks)

    return (
        <div className="tasks-container">
            <div className="add-task">
                <h1>Task Manager</h1>
                <form  onSubmit={ handleAddTask }>
                    <label htmlFor="title">Title:</label>
                    <input id="title" required={true} value={addTask.title} onChange={ (e) => handleOnChange(e, "title") } />
                    <label htmlFor="description">Description:</label>
                    <input id="description" value={addTask.description} onChange={ (e) => handleOnChange(e, "description") } />
                    <div className="btn-container">
                        <button type="submit">Add Task</button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default App
