// Write your "actions" router here!
const express = require('express')
const Actions = require('./actions-model')
const router = express.Router();

const { validateActionId, validateAction } = 

router.get('/', async (req, res, next) => {
    try {
        const data = await Actions.get()
        res.status(200).json(data)
    } catch(err) {
        next(err)
    }
})

router.get('/:id', validateActionId, async (req, res) => {
    res.status(200).json(req.action)
  })

router.post('./', validateAction, async (req, res, next) => {
    try {
        const data = await Actions.insert(req.body)
        res.status(201).json(data)
    } catch(err) {
        next(err)
    }
})

router.put('/:id', validateActionId, async (req, res, next) => {
    try {
        const { id } = req.params
        const data = req.body
        if(Object.keys(data).length > 0) {
            const edits = await Actions.update(id, data)
            res.status(200).json(edits)
        } else {
            res.status(400).json({ message: 'more data needed'})
        }
    } catch(err) {
        next(err)
    }
})

router.delete('/:id', validateActionId, async (req, res, next) => {
    try {
        const { id } = req.params
        const deleteAction = await Actions.remove(id)
        res.status(200).json({ 
            message: `Action ${id} has been deleted`, 
            delete: deleteAction})
    } catch(err) {
        next(err)
    }
})

module.exports = router