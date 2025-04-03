import { google } from 'googleapis';
import { JWT } from 'google-auth-library';

// Configuración de credenciales
const SCOPES = ['https://www.googleapis.com/auth/drive.file'];
const EMAIL = 'hola@builders-ai.com';

// Esta función deberá ser llamada con las credenciales proporcionadas por Google Cloud Console
export const initializeGoogleDrive = async (credentials: any) => {
  const auth = new JWT({
    email: credentials.client_email,
    key: credentials.private_key,
    scopes: SCOPES,
    subject: EMAIL
  });

  const drive = google.drive({ version: 'v3', auth });
  return drive;
};

export const createClientFolder = async (drive: any, clientName: string) => {
  try {
    // Crear carpeta para el cliente
    const folderMetadata = {
      name: clientName,
      mimeType: 'application/vnd.google-apps.folder',
    };

    const folder = await drive.files.create({
      resource: folderMetadata,
      fields: 'id'
    });

    return folder.data.id;
  } catch (error) {
    console.error('Error creating folder:', error);
    throw error;
  }
};

export const createImplementationDoc = async (drive: any, folderId: string, clientName: string) => {
  try {
    const docMetadata = {
      name: `${clientName} - Implementación Bot`,
      mimeType: 'application/vnd.google-apps.document',
      parents: [folderId]
    };

    const doc = await drive.files.create({
      resource: docMetadata,
      fields: 'id'
    });

    // Contenido del documento
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
   - [Respuesta aquí]
`;

    await drive.files.update({
      fileId: doc.data.id,
      requestBody: {
        content: content
      }
    });

    return doc.data.id;
  } catch (error) {
    console.error('Error creating document:', error);
    throw error;
  }
}; 