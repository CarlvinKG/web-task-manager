const express = require('express')
const router = express.Router()
const Task = require('../models/task')

// Get all tasks
router.get('/', async (req, res) => {
    try {
        const tasks = await Task.find()
        res.json(tasks)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})

// Create a task
router.post('/', async (req, res) => {
    const task = new Task({
        title: req.body.title,
        description: req.body.description
    })

    try {
        const newTask = await task.save()
        res.status(201).json(newTask)
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
})

// Update status
router.put('/:id', getTask, async (req, res) => {
    if (req.body.completed != null) {
        res.task.completed = req.body.completed
    }

    try {
        const updatedTask = await res.task.save()
        res.json(updatedTask)
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
})

// Delete a task
router.delete('/:id', getTask, async (req, res) => {
    try {
        await res.task.deleteOne()
        res.json({ message: "Task deleted" })
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})

async function getTask(req, res, next) {
    let task

    try {
        task = await Task.findById(req.params.id)
        if (task === null) {
            return res.status(404).json({ message: 'Task not found' })
        }
    } catch (error) {
        return res.status(500).json({ message: error.message })
    }

    res.task = task
    next()
}

module.exports = router