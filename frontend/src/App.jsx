import React, { useState, useEffect } from 'react'
import { RiDeleteBinLine } from 'react-icons/ri'
import { IoIosRadioButtonOff } from 'react-icons/io'
import { IoCheckmarkCircle } from 'react-icons/io5'

const API_URL = "http://localhost:3000/tasks"

function App() {
    const [tasks, setTasks] = useState([])
    const [addTask, setAddTask] = useState({title: '', description: ''})
    const [filter, setFilter] = useState('All')
    const filters = ['All', 'Completed', 'Incomplete']

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

    // Update/Toggle completed status
    const handelStatus = async (task) => {
        const response = await fetch(`${API_URL}/${task._id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ completed: !task.completed })
        })
        const data = await response.json()
        setTasks(tasks.map(tsk => tsk._id === data._id ? { ...data } : tsk))
    }

    // Delete a task
    const handleDelete = async (taskId) => {
        await fetch(`${API_URL}/${taskId}`, {
            method: 'DELETE'
        })
        setTasks(tasks.filter(task => task._id !== taskId));
    }

    // Filter tasks
    const handleFilter = (filter) => {
        return tasks.filter(task => filter === 'All' ? true : filter === 'Completed' ? task.completed : !task.completed)
    }

    const filteredTasks = handleFilter(filter)

    useEffect(() => {
        fetchTasks()
    }, [])

    // console.log(filteredTasks)

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
            <div className="display-task">
                <div className="filters-container">
                    {filters.map((f, index) => (
                        <div className={`filter ${f === filter ? 'active' : '' }`} onClick={() => setFilter(f)} key={index}>{f}</div>
                    ))}
                </div>
                {filteredTasks.map((task) => (
                    <div className="task" key={task._id}>
                        <div className="status">
                            <div className="icon" onClick={() => handelStatus(task)}>
                                { task.completed ? <IoCheckmarkCircle size={24} color="#008000" /> : <IoIosRadioButtonOff size={24} /> }
                            </div>
                        </div>
                        <div className={`task-info ${task.completed ? 'completed' : '' }`}>
                            <h2>{task.title}</h2>
                            {task.description !== '' ? <p>{task.description}</p> : ''}
                        </div>
                        <div className="delete">
                            <div className="icon delete-icon" onClick={() => handleDelete(task._id)}>
                                <RiDeleteBinLine size={20} />
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default App