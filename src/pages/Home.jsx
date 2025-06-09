import React from 'react';
import { Link } from 'react-router-dom';

const features = {
    en: [
        { title: 'Automated Moderation', desc: 'Keep your TikTok live chat clean and safe with customizable filters and auto-moderation tools.' },
        { title: 'Custom Commands', desc: 'Create custom commands for your viewers to interact with your TikTok live in real time.' },
        { title: 'Giveaways & Polls', desc: 'Engage your audience with easy-to-run giveaways and live polls.' },
        { title: 'Analytics', desc: 'Track your TikTok live performance and chat activity with detailed analytics.' }
    ],
    es: [
        { title: 'Moderación Automática', desc: 'Mantén tu chat en vivo de TikTok limpio y seguro con filtros personalizables y herramientas de moderación automática.' },
        { title: 'Comandos Personalizados', desc: 'Crea comandos personalizados para que tus espectadores interactúen en tiempo real con tu TikTok Live.' },
        { title: 'Sorteos y Encuestas', desc: 'Involucra a tu audiencia con sorteos y encuestas en vivo fáciles de usar.' },
        { title: 'Analíticas', desc: 'Monitorea el rendimiento de tu live y la actividad del chat con analíticas detalladas.' }
    ]
};

const heroText = {
    en: {
        title: 'TikTok Bot',
        desc: 'Your all-in-one solution for managing and enhancing your TikTok live experience. Moderation, commands, analytics, and more.',
        btn: 'Get Started',
        features: 'Features'
    },
    es: {
        title: 'TikTok Bot',
        desc: 'Tu solución todo en uno para gestionar y potenciar tu experiencia en TikTok Live. Moderación, comandos, analíticas y más.',
        btn: 'Comenzar',
        features: 'Características'
    }
};

const Home = ({ lang }) => {
    return (
        <div className="home container">
            <div className="hero">
                <h1 className="hero-title">{heroText[lang].title}</h1>
                <p className="hero-desc">{heroText[lang].desc}</p>
                <Link to="/dashboard" className="button hero-btn">{heroText[lang].btn}</Link>
            </div>
            <section className="features">
                <h2>{heroText[lang].features}</h2>
                <div className="features-list">
                    {features[lang].map((f, i) => (
                        <div className="feature-card" key={i}>
                            <h3>{f.title}</h3>
                            <p>{f.desc}</p>
                        </div>
                    ))}
                </div>
            </section>
        </div>
    );
};

export default Home;