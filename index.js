const express = require('express')
const http = require('http');
const app = express()
const socketio = require('socket.io');
const server = http.createServer(app)
app.use(express.json())
const connection = require('./config/db')
const userRouter = require('./router/user.router')
const cors = require('cors');
app.use(cors())

app.use('/app/user',userRouter)
const io = socketio(server)

io.on("connection",(socket)=>{
    console.log("One client joined")

    socket.on("joinroom",({username})=>{
        console.log(username)
    })
})

server.listen(1111,()=>{
    console.log("http://localhost:1111/")
    try{
        connection
        console.log("connected with database")
    }catch(err){
        console.log("error while connecting db")
    }
})