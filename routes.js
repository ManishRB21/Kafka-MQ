import { Router } from "express";
import KafkaController from "./kafkaController.js";
const router = Router();

router.post('/create', async(req, res)=>{
    try {
        const {topicName, noOfPartition} = req.body
        console.log(topicName, noOfPartition)
        const kafkaController = new KafkaController()
        await kafkaController.createTopic(topicName, noOfPartition)
        res.send({
            status: 'Ok',
            message: 'Done'
        })
    }catch(e){
        res.status(500).send({
            message: "Failed"
        })
    }
})

router.post('/publish', async(req,res)=>{
    try {
        const {topicName, message} = req.body
        const messages = [{
            key: message?.key,
            value: message?.value
        }] 
        const kafkaController = new KafkaController()
        await kafkaController.publishMessageToTopic(topicName, messages)
        res.send({
            status: 'Ok',
            message: 'Message sent'
        })}catch(e){
        res.status(500).send({
            message: "Failed"
        })
    }
})

router.post('/consume', async(req,res)=>{
    try {
        const {topicName} = req.body

        const kafkaController = new KafkaController()
        await kafkaController.consumeMessageFromTopic(topicName, (message)=>{
            res.send({
                status: 'Ok',
                message
            })
        })
       }catch(e){
        res.status(500).send({
            message: "Failed  to  consume"
        })
    }
})

export default router;