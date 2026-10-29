const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const mongoose = require('mongoose');
const productoRoutes = require('../routes/productoRoutes');
const errorHandler = require('../middlewares/errorHandler');

const app = express();
const server = http.createServer(app);
const io = new Server(server);
const port = 3000;

app.set('io', io);
app.use(express.json());

mongoose.connect('mongodb://127.0.0.1:27017/bd')
    .then(() => console.log('Conectado a la base de datos'))
    .catch(err => console.error('Error al conectar a la base de datos', err));

io.on('connection', (socket) => {
    console.log('Cliente conectado:', socket.id);
    socket.on('disconnect', () => {
        console.log('Cliente desconectado:', socket.id);
    });
});

app.use('/productos', productoRoutes);

app.use(errorHandler);

server.listen(port, () => {
    console.log(`Servidor corriendo en el puerto ${port}`);
});
