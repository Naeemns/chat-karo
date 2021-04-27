const users = [];

const addUser = ({
    id,
    userName,
    room
}) => {
    userName = userName.trim().toLowerCase();
    room = room.trim().toLowerCase();

    const existingUser = users.find(user => {
        if (user.room == room && user.userName == userName) {
            return user
        }
    });
    if (existingUser) {
        return {
            error: "User namae is already taken"
        };
    }

    const user = {
        id,
        userName,
        room
    };

    users.push(user);
    return {
        user
    };
}

const getUser = (id) => {
    return users.find(user => user.id === id);
}

const removeUser = (id) => {
    const index = users.findIndex(user => user.id === id);
    if (index !== -1) {
        return users.splice(index, 1)[0];
    }
}

const getUserInRoom = (room) => {
    return users.filter(user => user.room === room);
}

module.exports = {
    addUser,
    getUser,
    removeUser,
    getUserInRoom
};