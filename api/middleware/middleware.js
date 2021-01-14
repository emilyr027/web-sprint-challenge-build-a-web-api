const Actions = require('../actions/actions-model')
const Projects = require('../projects/projects-model')

const validateActionsId = async (req, res, next) {
    const { id } = req.params
    try {
        const action = await Actions.get(id)
        if(!action) {
            res.status(404).json({ message: `action ${id} not found` })
        } else {
            req.action = action
            next()
        }
    } catch(err) {
        res.status(500).json({
            message: 'there was an error validating the id',
            error: err
        })
    }
}
  
const validateAction = async (req, res, next) => {
    try {
        const projects = await Projects.get()
        if(projects.filter(evt => evt.id === req.body.project_id).length > 0) {
            if(!req.body.description || !req.body.notes) {
                res.status(400).json({ message: 'missing required inputs' })
            } else {
                next()
            }
        } else {
            res.status(400).json({ message: `there is no record of project id: ${id} in our system` })
        }
    } catch(err) {
        res.status(400).json({
            message: 'unable to validate project id',
            error: err
        })
    }
}

const validateProjectsId = async (req, res, next) {
    const { id } = req.params
    try {
        const project = await Projects.get(id)
        if(!project) {
            res.status(404).json({ message: `project ${id} not found` })
        } else {
            req.project = project
            next()
        }
    } catch(err) {
        res.status(500).json({
            message: 'there was an error validating the id',
            error: err
        })
    }
}


  module.exports = { validateActionsId, validateAction, validateProjectsId }