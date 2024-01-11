import debug from "debug";
import { Kafka } from "kafkajs";
import dotenv from 'dotenv';
import e from "express";
const logger = debug('node-kafka:kafkaController')
dotenv.config()

class KafkaController {
    constructor() {
        this.kafka = new Kafka({
            clientId: process.env.CLIENT_ID,
            brokers: [process.env.BROKER_1]
        })
    }

    //method to create topic with multiple partitions

    async createTopic(topicName, noOfPartition) {
        try {
            const admin = this.kafka.admin()
            await admin.connect()
            await admin.createTopics({
                topics: [{
                    topic: topicName.toString(),
                    numPartitions: parseInt(noOfPartition),
                    replicationFactor: 1
                }]
            })
            await admin.disconnect()
        } catch (e) {
            logger(e)
            throw e
        }
    }

    //publish message to the topic
    async publishMessageToTopic(topicName, messages) {
        const producer = this.kafka.producer()
        try {
            await producer.connect()
            await producer.send({
                topic: topicName,
                messages
            })
        } catch (error) {
            logger(error)
            throw error
        } finally {
            await producer.disconnect()
        }
    }
    //consume message to the topic
    async consumeMessageFromTopic(topicName, callback) {
        const consumer = this.kafka.consumer({ groupId: 'test-group' })
        try {
            await consumer.connect()
            await consumer.subscribe({ topic: topicName, fromBeginning: true })
            await consumer.run({
                eachMessage: async ({ topic, partition, message }) => {
                    const value = `Received message: ${message.value.toString()} from partition ${partition} and topic ${topic}`
                    callback(value)
                }
            })
        } catch (e) { 
            logger(e)
            throw e
        }
    }

}

export default KafkaController;