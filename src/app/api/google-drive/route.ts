import { google } from 'googleapis';
import { JWT } from 'google-auth-library';
import { NextResponse } from 'next/server';

const SCOPES = ['https://www.googleapis.com/auth/drive.file'];
const EMAIL = 'hola@builders-ai.com';

export async function POST(request: Request) {
  try {
    const { clientName } = await request.json();

    const credentials = {
      client_email: process.env.GOOGLE_CLIENT_EMAIL,
      private_key: process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
    };

    const auth = new JWT({
      email: credentials.client_email,
      key: credentials.private_key,
      scopes: SCOPES,
      subject: EMAIL
    });

    const drive = google.drive({ version: 'v3', auth });

    // Crear carpeta para el cliente
    const folderMetadata = {
      name: clientName,
      mimeType: 'application/vnd.google-apps.folder',
    };

    const folder = await drive.files.create({
      resource: folderMetadata,
      fields: 'id'
    });

    // Crear documento de implementación
    const docMetadata = {
      name: `${clientName} - Implementación Bot`,
      mimeType: 'application/vnd.google-docs',
      parents: [folder.data.id]
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
   - [Respuesta aquí]`;

    await drive.files.update({
      fileId: doc.data.id,
      requestBody: {
        content
      }
    });

    return NextResponse.json({ 
      success: true, 
      folderId: folder.data.id,
      docId: doc.data.id
    });

  } catch (error: any) {
    console.error('Error:', error);
    return NextResponse.json({ 
      success: false, 
      error: error.message 
    }, { status: 500 });
  }
} 