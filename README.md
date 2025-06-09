# TikTok Bot Website

Esta aplicación web permite realizar sorteos en vivo en TikTok, similar a Nightbot.tv/giveaways, con un dashboard moderno, responsivo y visualmente atractivo. Permite conectar dinámicamente al chat de TikTok Live, personalizar comandos, ajustar probabilidades según tipo de usuario, y soporta multilenguaje (ES/EN).

## Características principales

- Dashboard tipo Nightbot para sorteos en vivo de TikTok
- Conexión dinámica al chat de TikTok Live por WebSocket
- Personalización de comandos y probabilidades (suscriptor/normal)
- Ganadores únicos, anuncio en chat y timeout de actividad
- Interfaz profesional, responsiva, modo oscuro y paleta TikTok
- Multilenguaje (Español/Inglés)
- Feedback visual de estado y errores del bot

## Estructura del proyecto

```
tiktokbot-website
├── backend
│   ├── tiktok-bot-server.js   # Servidor Node.js para TikTok Live y WebSocket
│   └── package.json           # Dependencias backend
├── public
│   ├── index.html             # HTML principal
│   └── styles.css             # Estilos globales
├── src
│   ├── App.jsx                # Componente principal React
│   ├── components
│   │   └── BotDashboard.jsx   # Dashboard de sorteos TikTok
│   ├── pages
│   │   └── Home.jsx           # Página de inicio
│   ├── services
│   │   └── tiktokApi.js       # Funciones para TikTok API
│   ├── utils
│   │   └── helpers.js         # Utilidades
│   └── styles.css             # Estilos adicionales
├── package.json               # Configuración npm frontend
└── README.md                  # Documentación
```

## Instalación

1. Clona el repositorio:
   ```powershell
   git clone <repository-url>
   cd tiktokbot-website
   ```
2. Instala las dependencias del frontend:
   ```powershell
   npm install
   ```
3. Instala las dependencias del backend:
   ```powershell
   cd backend
   npm install
   cd ..
   ```

## Uso

1. Inicia el backend (PowerShell):
   ```powershell
   cd backend
   node tiktok-bot-server.js
   ```
2. En otra terminal, inicia el frontend:
   ```powershell
   npm start
   ```
3. Abre tu navegador en [http://localhost:3000](http://localhost:3000)

## Notas importantes

- El backend debe estar corriendo antes de usar el dashboard.
- El usuario de TikTok debe estar transmitiendo EN VIVO para que la conexión funcione.
- Si ves errores de conexión o de TikTok, revisa la terminal del backend y el dashboard.

## Contribuciones

¡Se aceptan mejoras y reportes! Abre un issue o pull request.

## Licencia

MIT License.