// backend/tiktok-bot-server.js
// Backend Node.js para conectar con TikTok Live y exponer usuarios de comandos por WebSocket

const { WebcastPushConnection } = require('tiktok-live-connector');
const WebSocket = require('ws');

let tiktokConnection = null;
let currentUsername = null;
let currentCommand = null;
let usersForGiveaway = new Set();

function connectToTikTok(username, command) {
    if (tiktokConnection) {
        tiktokConnection.removeAllListeners();
        tiktokConnection.disconnect();
    }
    usersForGiveaway = new Set();
    currentUsername = username;
    currentCommand = command;
    tiktokConnection = new WebcastPushConnection(username);
    tiktokConnection.on('chat', data => {
        if (data.comment && data.comment.trim().toLowerCase() === command.toLowerCase()) {
            usersForGiveaway.add(data.uniqueId);
            wss.clients.forEach(client => {
                if (client.readyState === WebSocket.OPEN) {
                    client.send(JSON.stringify({ type: 'newUser', user: data.uniqueId }));
                }
            });
        }
    });
    tiktokConnection.on('connected', () => {
        console.log(`Conectado al live de @${username}`);
        wss.clients.forEach(client => {
            if (client.readyState === WebSocket.OPEN) {
                client.send(JSON.stringify({ type: 'info', message: `Conectado al live de @${username}` }));
            }
        });
    });
    tiktokConnection.on('disconnected', () => {
        console.log(`Desconectado del live de @${username}`);
        wss.clients.forEach(client => {
            if (client.readyState === WebSocket.OPEN) {
                client.send(JSON.stringify({ type: 'info', message: `Desconectado del live de @${username}` }));
            }
        });
    });
    tiktokConnection.on('streamEnd', () => {
        console.log(`El live de @${username} ha terminado.`);
        wss.clients.forEach(client => {
            if (client.readyState === WebSocket.OPEN) {
                client.send(JSON.stringify({ type: 'info', message: `El live de @${username} ha terminado.` }));
            }
        });
    });
    tiktokConnection.connect().catch(err => {
        console.error('Error conectando a TikTok:', err);
        wss.clients.forEach(client => {
            if (client.readyState === WebSocket.OPEN) {
                client.send(JSON.stringify({ type: 'error', message: `Error conectando a TikTok: ${err.message}` }));
            }
        });
    });
}

// WebSocket server para frontend
const wss = new WebSocket.Server({ port: 8080 });

wss.on('connection', ws => {
    ws.send(JSON.stringify({ type: 'info', message: 'Conectado al backend TikTokBot.' }));
    ws.on('message', msg => {
        let data;
        try { data = JSON.parse(msg); } catch { data = msg; }
        if (data === 'getUsers') {
            ws.send(JSON.stringify({ type: 'users', users: Array.from(usersForGiveaway) }));
        } else if (data && data.type === 'connect') {
            connectToTikTok(data.tiktokUsername, data.command);
            ws.send(JSON.stringify({ type: 'info', message: `Conectando a @${data.tiktokUsername} con comando ${data.command}` }));
        }
    });
});

console.log('Backend TikTokBot corriendo en puerto 8080.');
