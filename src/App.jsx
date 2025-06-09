import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';
import Home from './pages/Home';
import BotDashboard from './components/BotDashboard';

const translations = {
    en: {
        home: 'Home', dashboard: 'Dashboard', about: 'About', contact: 'Contact',
        aboutTitle: 'About',
        aboutText: `This project is a TikTok bot dashboard inspired by Nightbot, focused on TikTok automation and management.\n\nFeatures:\n- Real-time giveaways for TikTok Live, with advanced luck modifiers and unique winner options.\n- Customizable commands and chat announcements.\n- Modern, responsive dashboard inspired by Nightbot.tv/giveaways.\n- Multi-language support (English/Spanish).\n- Not affiliated with TikTok.\n\n\n**How it works:**\n1. Enter your TikTok username and connect.\n2. Set up your giveaway command and options.\n3. View participants in real time and draw a winner.\n\n**Tech:**\n- Frontend: React, modern CSS\n- Backend: Node.js, tiktok-live-connector, WebSocket\n\n**Open Source:**\nThis project is open to contributions.`,
        contactTitle: 'Contact', contactText: 'For support or inquiries, email:',
        notAffiliated: 'Not affiliated with TikTok.'
    },
    es: {
        home: 'Inicio', dashboard: 'Panel', about: 'Acerca de', contact: 'Contacto',
        aboutTitle: 'Acerca de',
        aboutText: `Este proyecto es un panel de bot para TikTok inspirado en Nightbot, enfocado en automatización y gestión.\n\nCaracterísticas:\n- Sorteos en tiempo real para TikTok Live, con modificadores de suerte avanzados y opción de ganadores únicos.\n- Comandos personalizables y anuncios en el chat.\n- Dashboard moderno y responsivo inspirado en Nightbot.tv/giveaways.\n- Soporte multilenguaje (Español/Inglés).\n- No afiliado a TikTok.\n\n\n**¿Cómo funciona?**\n1. Ingresa tu usuario de TikTok y conéctate.\n2. Configura el comando y las opciones del sorteo.\n3. Visualiza participantes en tiempo real y elige un ganador.\n\n**Tecnología:**\n- Frontend: React, CSS moderno\n- Backend: Node.js, tiktok-live-connector, WebSocket\n\n**Open Source:**\nEste proyecto acepta contribuciones.`,
        contactTitle: 'Contacto', contactText: 'Para soporte o consultas, escribe a:',
        notAffiliated: 'No afiliado a TikTok.'
    }
};

const About = ({ lang }) => (
    <div className="container about-section-tiktok">
        <h1 className="about-title-tiktok">{translations[lang].aboutTitle}</h1>
        <div className="about-block-tiktok">
            <div className="about-icon-tiktok"><span role="img" aria-label="features">🟦</span></div>
            <div>
                <h2 className="about-heading-tiktok">{lang === 'es' ? 'Características' : 'Features'}</h2>
                <p>{lang === 'es' ?
                    'Este proyecto es un panel de bot para TikTok inspirado en Nightbot, enfocado en automatización y gestión. Con muchas variaciones y sorteos en tiempo real para TikTok Live, con modificadores de suerte avanzados y opción de ganadores únicos, comandos personalizados y anuncios en chat. - Soporte multilingüe específico (Español/Inglés). – No afiliado a TikTok.'
                    :
                    'This project is a TikTok bot dashboard inspired by Nightbot, focused on automation and management. Real-time giveaways for TikTok Live, advanced luck modifiers, unique winner options, custom commands, and chat announcements. - Multilingual support (English/Spanish). – Not affiliated with TikTok.'
                }</p>
            </div>
        </div>
        <div className="about-block-tiktok">
            <div className="about-icon-tiktok"><span role="img" aria-label="how">❓</span></div>
            <div>
                <h2 className="about-heading-tiktok">{lang === 'es' ? 'Cómo funciona' : 'How it works'}</h2>
                <p>{lang === 'es' ?
                    'Ingresa tu usuario en TikTok y conéctate. Configura tus comandos y las opciones de sorteo. Visualiza a participantes en tiempo real y elige un ganador.'
                    :
                    'Enter your TikTok username and connect. Set up your commands and giveaway options. View participants in real time and draw a winner.'
                }</p>
            </div>
        </div>
        <div className="about-block-tiktok">
            <div className="about-icon-tiktok"><span role="img" aria-label="tech">⚙️</span></div>
            <div>
                <h2 className="about-heading-tiktok">{lang === 'es' ? 'Tecnología' : 'Technology'}</h2>
                <p>{lang === 'es' ?
                    'Frontend: React + CSS moderno · Backend: Node.js · Conector: tiktok-live-connector · Open Source: Este proyecto acepta contribuciones.'
                    :
                    'Frontend: React + modern CSS · Backend: Node.js · Connector: tiktok-live-connector · Open Source: This project is open to contributions.'
                }</p>
            </div>
        </div>
    </div>
);

const Contact = ({ lang }) => (
    <div className="container">
        <h1>{translations[lang].contactTitle}</h1>
        <p>{translations[lang].contactText} <a href="mailto:support@tiktokbot.com">support@tiktokbot.com</a></p>
    </div>
);

const HowItWorks = ({ lang }) => (
    <section className="how-it-works-section container">
        <h2>{lang === 'es' ? '¿Cómo funciona?' : 'How It Works?'}</h2>
        <div className="how-video-wrapper" style={{ display: 'flex', justifyContent: 'center', marginBottom: 36 }}>
            <iframe
                width="560"
                height="315"
                src="https://www.youtube.com/embed/dQw4w9WgXcQ"
                title="YouTube video player"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
                style={{ borderRadius: 12, maxWidth: '100%' }}
            ></iframe>
        </div>
        <div className="how-it-works-steps">
            <div className="how-step">
                <span className="how-step-number">1</span>
                <h3>{lang === 'es' ? 'Conecta tu cuenta de TikTok' : 'Connect your TikTok account'}</h3>
                <p>{lang === 'es' ? 'Inicia sesión con tu cuenta de TikTok para comenzar a gestionar tu chat en vivo.' : 'Log in with your TikTok account to start managing your live chat.'}</p>
            </div>
            <div className="how-step">
                <span className="how-step-number">2</span>
                <h3>{lang === 'es' ? 'Configura tus comandos y moderación' : 'Set up commands and moderation'}</h3>
                <p>{lang === 'es' ? 'Personaliza comandos, filtros y reglas de moderación para tu chat.' : 'Customize commands, filters, and moderation rules for your chat.'}</p>
            </div>
            <div className="how-step">
                <span className="how-step-number">3</span>
                <h3>{lang === 'es' ? '¡Disfruta y analiza!' : 'Enjoy and analyze!'}</h3>
                <p>{lang === 'es' ? 'Interactúa con tu audiencia y revisa estadísticas en tiempo real.' : 'Engage with your audience and review real-time analytics.'}</p>
            </div>
        </div>
    </section>
);

const App = () => {
    const [lang, setLang] = useState('es');
    return (
        <Router>
            <Route path={["/dashboard"]} render={({ location }) => null} />
            {window.location.pathname !== "/dashboard" && <Header lang={lang} setLang={setLang} />}
            <Switch>
                <Route path="/" exact render={() => <>
                    <Home lang={lang} />
                    <HowItWorks lang={lang} />
                </>} />
                <Route path="/dashboard" render={() => <BotDashboard lang={lang} />} />
                <Route path="/about" render={() => <About lang={lang} />} />
            </Switch>
            {window.location.pathname !== "/dashboard" &&
                <footer className="footer about-footer-tiktok">
                    <div>
                        {lang === 'es'
                            ? 'Para soporte o consultas: '
                            : 'For support or inquiries: '}
                        <a href="mailto:support@tiktokbot.com" style={{color:'#25f4ee'}}>support@tiktokbot.com</a>
                    </div>
                    <div style={{marginTop:'1em'}}>
                        © {new Date().getFullYear()} TikTokBot. {translations[lang].notAffiliated}
                    </div>
                </footer>
            }
        </Router>
    );
};

const Header = ({ lang, setLang }) => (
    <header className="header">
        <div className="header-content">
            <span className="logo">TikTokBot</span>
            <nav>
                <ul>
                    <li><Link to="/">{translations[lang].home}</Link></li>
                    <li><Link to="/dashboard">{translations[lang].dashboard}</Link></li>
                    <li><Link to="/about">{translations[lang].about}</Link></li>
                </ul>
            </nav>
            <div className="lang-switcher">
                <button className={lang === 'en' ? 'active' : ''} onClick={() => setLang('en')}>EN</button>
                <button className={lang === 'es' ? 'active' : ''} onClick={() => setLang('es')}>ES</button>
            </div>
        </div>
    </header>
);

export default App;