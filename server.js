const express = require('express');
const cors = require('cors');
const { google } = require('googleapis');
const { OAuth2Client } = require('google-auth-library');
require('dotenv').config();

const app = express();
const port = 3001;

// Configurar CORS para permitir solicitudes desde el frontend
app.use(cors({
  origin: 'http://localhost:8080',
  credentials: true,
  methods: ['GET', 'POST', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express.json());

const SCOPES = [
  'https://www.googleapis.com/auth/drive',
  'https://www.googleapis.com/auth/drive.file',
  'https://www.googleapis.com/auth/drive.appdata',
  'https://www.googleapis.com/auth/docs'
];

// Almacenamiento temporal de tokens (en producción deberías usar una base de datos)
let tokens = null;

// Verificar que las credenciales estén disponibles
console.log('Verificando credenciales de Google OAuth2:', {
  clientId: process.env.VITE_GOOGLE_CLIENT_ID ? 'Configurado' : 'No configurado',
  clientSecret: process.env.VITE_GOOGLE_CLIENT_SECRET ? 'Configurado' : 'No configurado'
});

const oauth2Client = new OAuth2Client(
  process.env.VITE_GOOGLE_CLIENT_ID,
  process.env.VITE_GOOGLE_CLIENT_SECRET,
  'http://localhost:3001/auth/google/callback'
);

// Si ya tenemos tokens, configurarlos
if (tokens) {
  oauth2Client.setCredentials(tokens);
}

// Verificar estado de autenticación
app.get('/api/google-drive/status', (req, res) => {
  try {
    if (!tokens) {
      return res.json({ isAuthenticated: false });
    }

    // Verificar si el token ha expirado
    const expiryDate = new Date(tokens.expiry_date);
    const now = new Date();
    const isExpired = now >= expiryDate;

    if (isExpired && !tokens.refresh_token) {
      tokens = null;
      return res.json({ isAuthenticated: false });
    }

    res.json({ isAuthenticated: true });
  } catch (error) {
    console.error('Error checking auth status:', error);
    res.status(500).json({ error: 'Error checking authentication status' });
  }
});

// Revocar acceso
app.post('/auth/google/revoke', async (req, res) => {
  try {
    if (!tokens) {
      return res.status(400).json({ error: 'No hay tokens para revocar' });
    }

    await oauth2Client.revokeToken(tokens.access_token);
    tokens = null;
    
    res.json({ success: true });
  } catch (error) {
    console.error('Error revoking token:', error);
    res.status(500).json({ error: 'Error revoking access' });
  }
});

app.get('/auth/google', (req, res) => {
  console.log('Iniciando flujo de autenticación de Google');
  const authUrl = oauth2Client.generateAuthUrl({
    access_type: 'offline',
    scope: SCOPES,
    prompt: 'consent',
    include_granted_scopes: true
  });
  console.log('URL de autenticación generada:', authUrl);
  res.json({ authUrl });
});

app.get('/auth/google/callback', async (req, res) => {
  const { code } = req.query;
  try {
    console.log('Recibido código de autorización:', code);
    const { tokens: newTokens } = await oauth2Client.getToken(code);
    console.log('Tokens recibidos:', newTokens);
    
    tokens = newTokens;
    oauth2Client.setCredentials(newTokens);
    
    res.send(`
      <html>
        <body>
          <h1>Autenticación exitosa</h1>
          <p>Puedes cerrar esta ventana y volver a la aplicación.</p>
          <script>
            window.opener && window.opener.postMessage('auth_success', 'http://localhost:8080');
            setTimeout(() => {
              window.close();
            }, 1000);
          </script>
        </body>
      </html>
    `);
  } catch (error) {
    console.error('Error getting tokens:', error);
    res.status(500).send(`
      <html>
        <body>
          <h1>Error en la autenticación</h1>
          <p>${error.message}</p>
          <script>
            window.opener && window.opener.postMessage('auth_error', 'http://localhost:8080');
            setTimeout(() => {
              window.close();
            }, 2000);
          </script>
        </body>
      </html>
    `);
  }
});

app.post('/api/google-drive', async (req, res) => {
  try {
    const { clientName } = req.body;

    // Verificar si tenemos tokens válidos
    if (!tokens) {
      return res.status(401).json({
        success: false,
        error: 'No autenticado',
        authUrl: '/auth/google'
      });
    }

    const drive = google.drive({ version: 'v3', auth: oauth2Client });

    // Buscar si ya existe una carpeta para el cliente
    const folderQuery = await drive.files.list({
      q: `name = '${clientName}' and mimeType = 'application/vnd.google-apps.folder' and trashed = false`,
      fields: 'files(id, name)',
      spaces: 'drive'
    });

    let folderId;
    
    if (folderQuery.data.files && folderQuery.data.files.length > 0) {
      // Usar la carpeta existente
      folderId = folderQuery.data.files[0].id;
      console.log('Usando carpeta existente:', folderId);
      
      // Buscar si ya existe el documento de implementación
      const docQuery = await drive.files.list({
        q: `name = '${clientName} - Implementación Bot' and '${folderId}' in parents and trashed = false`,
        fields: 'files(id, name)',
        spaces: 'drive'
      });
      
      if (docQuery.data.files && docQuery.data.files.length > 0) {
        // Retornar los IDs existentes
        return res.json({ 
          success: true, 
          folderId: folderId,
          docId: docQuery.data.files[0].id,
          message: 'Usando documentación existente'
        });
      }
    } else {
      // Crear nueva carpeta
      const folderMetadata = {
        name: clientName,
        mimeType: 'application/vnd.google-apps.folder',
      };

      const folder = await drive.files.create({
        requestBody: folderMetadata,
        fields: 'id'
      });
      
      folderId = folder.data.id;
      console.log('Carpeta creada:', folderId);
    }

    // Crear documento de implementación
    const docMetadata = {
      name: `${clientName} - Implementación Bot`,
      mimeType: 'application/vnd.google-apps.document',
      parents: [folderId]
    };

    const doc = await drive.files.create({
      requestBody: docMetadata,
      fields: 'id'
    });

    // Contenido del documento usando el método correcto
    const content = `Implementación Bot para ${clientName}

Este documento nos servirá para determinar la implementación del bot, necesitamos responder:

1. ¿Qué queremos lograr con el bot?
   - [Respuesta aquí]

2. ¿Qué funciones ofrecer?
   - Atención primaria
   - Soporte
   - Ventas
   - Consultas
   - Agendar turnos
   - [Otras funciones]

3. ¿Qué información del negocio se necesita?
   - [Respuesta aquí]

4. ¿Qué datos necesita recopilar?
   - [Respuesta aquí]`;

    // Actualizar el contenido del documento usando el método docs.documents.batchUpdate
    const docs = google.docs({ version: 'v1', auth: oauth2Client });
    await docs.documents.batchUpdate({
      documentId: doc.data.id,
      requestBody: {
        requests: [{
          insertText: {
            location: {
              index: 1
            },
            text: content
          }
        }]
      }
    });

    res.json({ 
      success: true, 
      folderId: folderId,
      docId: doc.data.id,
      message: 'Documentación creada exitosamente'
    });

  } catch (error) {
    console.error('Error:', error);
    
    // Si el error es de autenticación, solicitar nueva autenticación
    if (error.message.includes('invalid_grant') || 
        error.message.includes('unauthorized') ||
        error.message.includes('Invalid Credentials')) {
      tokens = null; // Limpiar tokens inválidos
      return res.status(401).json({
        success: false,
        error: 'Necesitas autenticarte nuevamente',
        authUrl: '/auth/google'
      });
    }
    
    res.status(500).json({ 
      success: false, 
      error: error.message 
    });
  }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
}); 