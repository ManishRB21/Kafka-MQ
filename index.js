import  express  from "express";
import debug  from "debug";
import router from "./routes.js"
const app =express()
const logger = debug('node-kafka:server')
app.use(express.json())
app.use('/kafka', router)

app.listen(5000, () => {
    logger("running")
})