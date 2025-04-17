import express from 'express'
import { Job } from "../models/JobModel.js";

const router = express.Router();

router.post('/', async (req, res) => {
    try {
        if (
            !req.body.title || !req.body.company || !req.body.location
        ) {
            return res.status(400).send({
                message : "Send all required fields"
            })
        }
        const newJob = {
            title : req.body.title,
            company : req.body.company,
            location : req.body.location
        };
        const job = await Job.create(newJob);
        return res.status(201).send(job)
    }
    catch(err){
        console.log(err.message);
        res.status(500).send({message: err.message})
    }
})

router.get('/', async(req, res) => {
    try{
        const jobs = await Job.find({});
        return res.status(200).json(jobs)
    }catch(error){
        console.log(error.message);
        res.status(500).send({ message: error.message })
    }
})

router.get('/:id', async(req, res) => {
    try{
        const { id } = req.params;
        const job = await Job.findById(id);
        return res.status(200).json({
            job
        })
    }catch(error){
        console.log(error.message);
        res.status(500).send({ message: error.message })
    }
})

router.put('/:id', async(req, res) => {
    try{
        if (
            !req.body.title || !req.body.company || !req.body.location
        ) {
            return res.status(400).send({
                message : "Send all required fields"
            })
        }
        const { id } = req.params;
        const result = await Job.findByIdAndUpdate(id, req.body);
        if (!result){
            return res.status(404).json({ message: 'Job not found' })
        }
        return res.status(200).send({ message: 'Job updated sucessfully' })
    }catch(error){
        console.log(error.message);
        res.status(500).send({ message: error.message })
    }
})

router.delete('/:id', async(req, res) => {
    try{
        const { id } = req.params;
        const result = await Job.findByIdAndDelete(id);
        if (!result){
            return res.status(404).json({ message: 'Job not found'  })
        }
        return res.status(200).json({ message: 'Job deleted successfully'  })
    }catch(error){
        console.log(error.message);
        res.status(500).send({ message: error.message })
    }
})


export default router
