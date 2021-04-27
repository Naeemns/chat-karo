const express = require("express");
const socketio = require("socket.io");
const http = require("http");
const cors = require("cors");
const {
    addUser,
    getUser,
    removeUser,
    getUserInRoom
} = require("./utils");


const Port = process.env.PORT || 5000;

const app = express();

app.use(cors());

const server = http.createServer(app);
const io = socketio(server, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"]
    }
})

io.on("connection", (socket) => {
    // console.log("We have a new connection");

    socket.on("join", ({
        userName,
        room
    }, callback) => {
        const {
            error,
            user
        } = addUser({
            id: socket.id,
            userName,
            room
        });
        // console.log("error", error)
        if (error) return callback(error);

        socket.emit("message", {
            user: "Admin",
            text: `${user.userName}, welcome to chat room ${user.room}`
        });

        socket.broadcast.to(user.room).emit("message", {
            user: "Admin",
            text: `${user.userName}, has joined the room`
        })

        socket.join(user.room);

        io.to(user.room).emit("roomData", {
            room: user.room,
            users: getUserInRoom(user.room)
        });

        callback();
    })

    socket.on("sendMessage", (message) => {
        const user = getUser(socket.id);
        io.to(user.room).emit("message", {
            user: user.userName,
            text: message
        });

        io.to(user.room).emit("roomData", {
            room: user.room,
            users: getUserInRoom(user.room)
        });
    })

    socket.on("disconnect", () => {
        // console.log("User had left!!");
        const user = removeUser(socket.id);
        if (user) {
            io.to(user.room).emit("message", {
                user: "Admin",
                text: `${user.userName} has left!!`
            })

            io.to(user.room).emit("roomData", {
                room: user.room,
                users: getUserInRoom(user.room)
            });
        }

    })
})

server.listen(Port, () => console.log(`Server is listening to port ${Port}`));