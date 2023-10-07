const io = require('socket.io')(8001, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"]
    }
});
let connectedClients = [];
// enum ActionEnum {
//     JOIN = "JOIN",
//     LEAVE = "LEAVE",
//   }
io.on("connection", socket => {
    // Get the id of the connected client
    const id = socket.handshake.query.id;

    // Add the id to the list of connected clients
    connectedClients.push(id);
    connectedClients = [...new Set(connectedClients)]
    io.emit('connectedClients', connectedClients); // Emit the list of connected clients to all clients

    // Output the ids of all connected clients
    console.log('Connected clients:', connectedClients);

    socket.join(id);
    socket.on("send-message", ({ recipients, text, group_id, creator_id, name }) => {
        recipients.forEach(recipient => {
            const newRecipients = recipients.filter(r => r !== recipient);
            newRecipients.push(id);
            socket.broadcast.to(recipient).emit('receive-message', {
                text,
                sender: id,
                group_id,
                recipients: newRecipients,
                creator_id,
                name
            });
        });
    });
    socket.on("send-action-message", ({ recipients, text, departures, guests, group_id, creator_id, name }) => {
        recipients.forEach(recipient => {
            const newRecipients = recipients.filter(r => r !== recipient);
            newRecipients.push(id);
            socket.broadcast.to(recipient).emit('receive-message', { //receive an action message from all recipients for user that edit the conversation except the sender because broadcast  foes not send the message to the sender while "socket.broadcast.to" do that
                text: departures.includes(recipient) ? `You have just removed` : guests.includes(recipient) ? `You have just joined` : text,
                sender: id,
                group_id,
                type: "action",
                recipients: newRecipients,
                creator_id,
                name,
            });
        });
        departures.forEach((departure) => {
            socket.broadcast.to(departure).emit('remove-member', group_id);
        });
        guests.forEach((guest) => {
            socket.broadcast.to(guest).emit('add-member', group_id);
        });
    });
    // socket.on("edit-conversation", ({ name, recipients, group_id }) => {
    //     connectedClients.forEach(recipient => { //here we emit this event to all users in system to be able to transfer the changes to all members on this conversation and all users that not have membership on this conversation but have this conversation on there side
    //         const newRecipients = connectedClients.filter(r => r !== recipient && [...recipients, id].includes(recipient));
    //         //console.log("newRecipients", newRecipients)
    //         io.to(recipient).emit('receive-edit-conversation', {
    //             name,
    //             recipients: newRecipients,
    //             group_id
    //         });
    //     });
    // });
    // function notifyOtherMembersWhoHaveConversation(notifiedRecipients, conversationInfo) {
    //     notifiedRecipients.forEach(connectedClient => {
    //         socket.broadcast.to(connectedClient).emit('receive-edit-conversation', {
    //             ...conversationInfo,
    //             recipients: conversationInfo.recipients, //.filter(c => c !== connectedClient)
    //         });
    //     })
    // }
    socket.on("edit-conversation", ({ name, recipients, creator_id, group_id,image }) => {
        const all_recipients = [...recipients, id];
        // all_recipients.forEach(recipient => {
        //     const newRecipients = all_recipients.filter(r => r !== recipient);
        //     io.to(recipient).emit('receive-edit-conversation', {
        //         name,
        //         recipients: newRecipients,
        //         group_id
        //     });
        // });

        // console.log("-------------------------------");
        // console.log("All connectedClients :" + connectedClients);
        // console.log("Pure connectedClients :" + connectedClients.filter(c => !c.includes(all_recipients)));
        // console.log("All all_recipients :" + all_recipients);
        // let arr = [4, 6]
        // console.log("Tes :" + [2, 3, 4, 5].filter(n => n >= 4 && !arr.includes(n)));

        connectedClients.forEach(connectedClient => {
            //let is_belong_to_conversation = new Boolean(all_recipients.find(c => c === connectedClient));
            io.to(connectedClient).emit('receive-edit-conversation', {
                name,
                recipients: all_recipients.filter(c => c !== connectedClient),
                creator_id,
                group_id,
                image
                //is_belong_to_conversation
            });
        })
    });

    socket.on("join-or-leave-conversation", ({ recipients, group_id, type = "LEAVE" }) => { //add or delete id from recipients list based on type param if it is "join" or "leave"
        let receivers = recipients;
        if (type === "JOIN") receivers.push(id);
        // receivers.forEach(recipient => {
        //     const newRecipients = receivers.filter(r => r !== recipient);
        //     io.to(recipient).emit('receive-join-or-leave-conversation', {
        //         recipients: newRecipients,
        //         group_id
        //     });
        // });
        if (type === "JOIN")
            io.to(id).emit('add-member', group_id); //make the conversation enabled for current user
        else if (type === "LEAVE")
            io.to(id).emit('remove-member', group_id); //make the conversation disabled for current user

        connectedClients.forEach(connectedClient => {
            io.to(connectedClient).emit('receive-join-or-leave-conversation', {
                recipients: receivers.filter(c => c !== connectedClient),
                group_id
            });
        });
    });

    socket.on("add-conversation", ({ group_id, name, recipients, image }) => {
        //the creator_id is someone who sends the request
        // console.log("create---------------", group_id, name, recipients,image)
        const creator_id = id;
        const recipients_with_creator = [...recipients, creator_id];
        recipients_with_creator.forEach(recipient => {
            const newRecipients = recipients_with_creator.filter(r => r !== recipient);
            io.to(recipient).emit('add-conversation', { //io.to send to all - while socket.broadcast is responsible for broadcasting the event to all connected clients except the current socket (the sender)
                group_id,
                creator_id,
                name,
                recipients: newRecipients,
                image
            });
        });
    });
    socket.on("disconnect", () => {
        // Remove the id from the list of connected clients
        connectedClients = connectedClients.filter(cid => cid !== id);
        io.emit('connectedClients', connectedClients); // Emit the updated list of connected clients to all clients
        // Output the ids of all remaining connected clients
        //console.log('Connected clients:', connectedClients);
    });
});