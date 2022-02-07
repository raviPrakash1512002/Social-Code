

module.exports.chatSockets= function(socketServer){
    let io = require('socket.io')(socketServer);

    io.sockets.on('connection',(socket)=>{
        console.log('new connection receved',socket.id);
        socket.on('disconnect',function(){
            console.log('socket disconected');
        });
        socket.on('join_room',function(data){
            console.log('joining requet rec.',data);
            socket.join(data.chatroom);

            io.in(data.chatroom).emit('user_joined',data);
        })
        socket.on('send_message',function(data){
            console.log(data);
            io.in(data.chatroom).emit('receive_message',data);
        });
    });


}