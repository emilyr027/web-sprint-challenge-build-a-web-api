// Write your "projects" router here!
const express = require('express')
const Projects = require('./projects-model')
const router = express.Router()

const { validateProjectId } = require('../middleware/middleware')

router.get('/', async (req, res, next) => {
    try {
        const data = await Projects.get()
        res.status(200).json(data)
    } catch(err) {
        next(err)
    }
})

router.get('/:id', validateProjectId, async (req, res) => {
    res.status(200).json(req.project)
  })

router.get('/:id/actions', validateProjectId, async (req, res, next) => {
    try {
        const { id } = req.params
        const data = await Projects.getProjectActions(id)
        res.status(200).json(data)
    } catch(err) {
        next(err)
    }
  })

router.post('/', async (req, res, next) => {
    if (!req.body.name || !req.body.description) {
        res.status(400).json({ message: 'missing name or description'})
    } else {
        try {
           const data = await Projects.insert(req.body)
           res.status(201).json(data) 
        } catch(err) {
            next(err)
        }
    }
  })

router.put('/:id', validateProjectId, async (req, res, next) => {
    try {
        const { id } = req.params
        const data = req.body
        if(Object.keys(data).length > 0) {
            const edits = await Projects.update(id, data)
            res.status(200).json(edits)
        } else {
            res.status(400).json({ message: 'more data needed to edit project'})
        }
    } catch(err) {
        next(err)
    }
})

router.delete('/:id', validateProjectId, async (req, res, next) => {
    try {
        const { id } = req.params
        const data = await Projects.remove(id)
        res.status(200).json({ 
            message: `Project ${id} has been deleted`, 
            delete: data})
    } catch(err) {
        next(err)
    }
})
module.exports = router