import React, { useEffect, useState } from 'react';

const defaultConfig = {
    tiktokUsername: '',
    command: '!sorteo',
    luck: {
        subscriber: 2,
        normal: 1
    },
    activityTimeout: 10, // minutos
    uniqueWinners: false,
    chatAnnouncement: true
};

const DashboardNav = ({ lang }) => (
    <nav className="dashboard-nav-bar">
        <ul>
            <li><a href="/" className={window.location.pathname === '/' ? 'active' : ''}>{lang === 'es' ? 'Inicio' : 'Home'}</a></li>
            <li><a href="/dashboard" className={window.location.pathname === '/dashboard' ? 'active' : ''}>{lang === 'es' ? 'Panel' : 'Dashboard'}</a></li>
            <li><a href="/about" className={window.location.pathname === '/about' ? 'active' : ''}>{lang === 'es' ? 'Acerca de' : 'About'}</a></li>
            <li><a href="/contact" className={window.location.pathname === '/contact' ? 'active' : ''}>{lang === 'es' ? 'Contacto' : 'Contact'}</a></li>
        </ul>
    </nav>
);

const BotDashboard = ({ lang }) => {
    const [config, setConfig] = useState(defaultConfig);
    const [users, setUsers] = useState([]);
    const [ws, setWs] = useState(null);
    const [connected, setConnected] = useState(false);
    const [status, setStatus] = useState('');
    const [winner, setWinner] = useState(null);

    useEffect(() => {
        if (!config.tiktokUsername) return;
        const socket = new window.WebSocket('ws://127.0.0.1:8080');
        setWs(socket);
        socket.onopen = () => {
            setConnected(true);
            setStatus(lang === 'es' ? 'Conectado al bot.' : 'Connected to bot.');
            socket.send(JSON.stringify({
                type: 'connect',
                tiktokUsername: config.tiktokUsername,
                command: config.command,
                luck: config.luck,
                activityTimeout: config.activityTimeout,
                uniqueWinners: config.uniqueWinners,
                chatAnnouncement: config.chatAnnouncement
            }));
        };
        socket.onmessage = (event) => {
            const data = JSON.parse(event.data);
            if (data.type === 'users') {
                setUsers(data.users);
            } else if (data.type === 'newUser') {
                setUsers(prev => prev.includes(data.user) ? prev : [...prev, data.user]);
            } else if (data.type === 'info') {
                setStatus(data.message);
            } else if (data.type === 'winner') {
                setWinner(data.user);
            } else if (data.type === 'error') {
                setStatus(data.message);
                setConnected(false);
            }
        };
        socket.onclose = () => setConnected(false);
        return () => socket.close();
    }, [config.tiktokUsername, config.command, config.luck, config.activityTimeout, config.uniqueWinners, config.chatAnnouncement, lang]);

    const handleCopy = () => {
        navigator.clipboard.writeText(users.join(', '));
    };

    const handleChange = e => {
        const { name, value, type, checked } = e.target;
        if (name === 'tiktokUsername' || name === 'command') {
            setConfig(prev => ({ ...prev, [name]: value }));
        } else if (name === 'subscriber' || name === 'normal') {
            setConfig(prev => ({ ...prev, luck: { ...prev.luck, [name]: Number(value) } }));
        } else if (name === 'activityTimeout') {
            setConfig(prev => ({ ...prev, activityTimeout: Number(value) }));
        } else if (name === 'uniqueWinners' || name === 'chatAnnouncement') {
            setConfig(prev => ({ ...prev, [name]: checked }));
        }
    };

    const handleConnect = e => {
        e.preventDefault();
        setUsers([]);
        setWinner(null);
        setStatus(lang === 'es' ? 'Conectando...' : 'Connecting...');
    };

    const handleDraw = () => {
        if (ws && connected) {
            ws.send('drawWinner');
        }
    };

    return (
        <div className="bot-dashboard-giveaway-full">
            <DashboardNav lang={lang} />
            <div className="dashboard-header-bar">
                <h1 className="dashboard-title">{lang === 'es' ? 'Sorteos TikTok' : 'TikTok Giveaways'}</h1>
                <span className={`dashboard-connection-indicator ${connected ? 'connected' : 'disconnected'}`}>{connected ? (lang === 'es' ? 'Conectado' : 'Connected') : (lang === 'es' ? 'Desconectado' : 'Disconnected')}</span>
            </div>
            <div className="dashboard-panels-giveaway">
                {/* Sección izquierda: Configuración */}
                <section className="dashboard-panel-giveaway settings-panel-giveaway">
                    <form onSubmit={handleConnect} className="giveaway-settings">
                        <div className="form-block">
                            <label className="input-label">{lang === 'es' ? 'Usuario de TikTok' : 'TikTok Username'}</label>
                            <input
                                type="text"
                                name="tiktokUsername"
                                placeholder={lang === 'es' ? 'Usuario de TikTok' : 'TikTok Username'}
                                value={config.tiktokUsername}
                                onChange={handleChange}
                                className="input-tiktok"
                                required
                            />
                            <label className="input-label" style={{marginTop:'1rem'}}>{lang === 'es' ? 'Comando' : 'Command'}</label>
                            <input
                                type="text"
                                name="command"
                                placeholder={lang === 'es' ? 'Comando (ej: !sorteo)' : 'Command (e.g. !giveaway)'}
                                value={config.command}
                                onChange={handleChange}
                                className="input-tiktok"
                                required
                            />
                            <button className="button primary connect-btn" type="submit" style={{marginTop:'1.2rem', alignSelf:'flex-end', minWidth:120}}>
                                <span role="img" aria-label="plug">🔌</span> {lang === 'es' ? 'Conectar' : 'Connect'}
                            </button>
                        </div>
                        <div className="form-block options-block">
                            <div className="option-row">
                                <label>{lang === 'es' ? 'Tiempo de actividad' : 'Activity Timeout'}</label>
                                <select name="activityTimeout" value={config.activityTimeout} onChange={handleChange}>
                                    <option value={5}>5 {lang === 'es' ? 'minutos' : 'minutes'}</option>
                                    <option value={10}>10 {lang === 'es' ? 'minutos' : 'minutes'}</option>
                                    <option value={15}>15 {lang === 'es' ? 'minutos' : 'minutes'}</option>
                                    <option value={30}>30 {lang === 'es' ? 'minutos' : 'minutes'}</option>
                                </select>
                            </div>
                            <div className="option-row">
                                <label><input type="checkbox" name="uniqueWinners" checked={config.uniqueWinners} onChange={handleChange} /> {lang === 'es' ? 'Ganadores únicos' : 'Unique Winners'}</label>
                            </div>
                            <div className="option-row">
                                <label><input type="checkbox" name="chatAnnouncement" checked={config.chatAnnouncement} onChange={handleChange} /> {lang === 'es' ? 'Anuncio en chat' : 'Chat Announcement'}</label>
                            </div>
                        </div>
                        <details className="form-block advanced-block" style={{marginTop:'1rem'}}>
                            <summary style={{color:'#25f4ee',fontWeight:600, cursor:'pointer'}}>{lang === 'es' ? 'Configuración avanzada' : 'Advanced Settings'}</summary>
                            <div className="option-row">
                                <label>{lang === 'es' ? 'Suerte usuario normal' : 'Viewer Luck Modifier'}</label>
                                <input type="number" name="normal" min={1} value={config.luck.normal} onChange={handleChange} className="input-tiktok" />
                            </div>
                            <div className="option-row">
                                <label>{lang === 'es' ? 'Suerte suscriptor' : 'Subscriber Luck Modifier'}</label>
                                <input type="number" name="subscriber" min={1} value={config.luck.subscriber} onChange={handleChange} className="input-tiktok" />
                            </div>
                        </details>
                    </form>
                </section>
                {/* Sección derecha: Participantes y acciones */}
                <section className="dashboard-panel-giveaway participants-panel-giveaway">
                    <div className="participants-title-row">
                        <span className="participants-title-icon" role="img" aria-label="chat">💬</span>
                        <h2 className="participants-title">{lang === 'es' ? 'Usuarios que escribieron' : 'Users who typed'} <span style={{color:'#25f4ee'}}>{config.command}</span> <span className="badge-tiktok">{users.length}</span></h2>
                    </div>
                    <div className="participants-chat-box">
                        <ul className="participants-list-tiktok">
                            {users.length === 0 && <li className="participant empty">{lang === 'es' ? 'Ejemplo: usuario1, usuario2, usuario3...' : 'Example: user1, user2, user3...'}</li>}
                            {users.map((u, i) => (
                                <li key={u} className={`participant${winner === u ? ' winner' : ''}`}>{u}</li>
                            ))}
                        </ul>
                    </div>
                    <div className="panel-actions participants-actions">
                        <button className="button" onClick={handleCopy}>
                            <span role="img" aria-label="copy">📋</span> {lang === 'es' ? 'Copiar lista' : 'Copy list'}
                        </button>
                        <button className="button primary" onClick={handleDraw} disabled={users.length === 0}>
                            <span role="img" aria-label="trophy">🏆</span> {lang === 'es' ? 'Elegir ganador' : 'Draw Winner'}
                        </button>
                    </div>
                    {winner && <div className="winner-announcement-tiktok">
                        <span role="img" aria-label="confetti">🎉</span> {lang === 'es' ? 'Ganador:' : 'Winner:'} <b>{winner}</b> <span role="img" aria-label="confetti">🎉</span>
                    </div>}
                </section>
            </div>
        </div>
    );
};

export default BotDashboard;