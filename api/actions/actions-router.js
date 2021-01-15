// Write your "actions" router here!
const express = require('express')
const Actions = require('./actions-model')
const router = express.Router()

const { validateActionId, validateAction } = require('../middleware/middleware')

// GET - find all actions
router.get('/', async (req, res, next) => {
    try {
        const data = await Actions.get()
        res.status(200).json(data)
    } catch(err) {
        next(err)
    }
})

// GET - find an action by id
router.get('/:id', validateActionId, async (req, res) => {
    res.status(200).json(req.action)
  })

// POST - add a new action
router.post('/', validateAction, (req, res) => {
    const actionInfo = req.body
    Actions.insert(actionInfo)
    .then((action) => {
      res.status(201).json(action)
    })
    .catch((err) => {
      res.status(500).json({ message: 'error'})
    })
  });

// PUT - edit a specific action based on id
router.put('/:id', validateActionId, async (req, res, next) => {
    try {
        const { id } = req.params
        const data = req.body
        if(Object.keys(data).length > 0) {
            const edits = await Actions.update(id, data)
            res.status(200).json(edits)
        } else {
            res.status(400).json({ message: 'more data needed to edit action'})
        }
    } catch(err) {
        next(err)
    }
})

// DELETE - delete a specific action based on id
router.delete('/:id', validateActionId, async (req, res, next) => {
    try {
        const { id } = req.params
        const data = await Actions.remove(id)
        res.status(200).json({ 
            message: `Action ${id} has been deleted`, 
            delete: data})
    } catch(err) {
        next(err)
    }
})

module.exports = router