import emailjs from '@emailjs/browser';

export interface ContactFormData {
  email: string;
  phone: string;
  name: string;
  project_type: string;
  available_for_call: string;
  preferred_time?: string;
}

export interface ContactFormEmailData extends ContactFormData {
  source: string;
  ip_address?: string;
  user_agent?: string;
  page_url?: string;
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
  submission_date?: string;
  submission_time?: string;
}

// Function to get client IP address
const getClientIP = async (): Promise<string | null> => {
  try {
    const response = await fetch('https://api.ipify.org?format=json');
    const data = await response.json();
    return data.ip;
  } catch (error) {
    console.warn('Could not get client IP:', error);
    return null;
  }
};

// Function to extract UTM parameters from URL
const getUTMParameters = () => {
  const urlParams = new URLSearchParams(window.location.search);
  return {
    utm_source: urlParams.get('utm_source') || undefined,
    utm_medium: urlParams.get('utm_medium') || undefined,
    utm_campaign: urlParams.get('utm_campaign') || undefined,
  };
};

// EmailJS configuration - Replace with your actual values
const EMAILJS_CONFIG = {
  SERVICE_ID: 'service_kg7t72j', // Replace with your EmailJS service ID
  TEMPLATE_ID: 'template_6hst25t', // Replace with your EmailJS template ID
  PUBLIC_KEY: '_7JQTQ5pn59L0JHwr' // Replace with your EmailJS public key
};

// Main function to send contact form via email
export const saveContactFormLead = async (formData: ContactFormData): Promise<{ success: boolean; leadId?: string; error?: string }> => {
  try {
    // Get additional metadata
    const [clientIP] = await Promise.all([
      getClientIP()
    ]);

    const utmParams = getUTMParameters();
    const now = new Date();

    // Prepare email data
    const emailData: ContactFormEmailData = {
      ...formData,
      source: 'propuesta_con_formulario',
      ip_address: clientIP || 'No disponible',
      user_agent: navigator.userAgent,
      page_url: window.location.href,
      submission_date: now.toLocaleDateString('es-ES'),
      submission_time: now.toLocaleTimeString('es-ES'),
      ...utmParams
    };

    console.log('Sending contact form via EmailJS:', emailData);

    // Send email via EmailJS
    const result = await emailjs.send(
      EMAILJS_CONFIG.SERVICE_ID,
      EMAILJS_CONFIG.TEMPLATE_ID,
      {
        // Data for email template
        to_email: 'hola@builders-ai.com', // Your email
        from_name: emailData.name,
        from_email: emailData.email,
        phone: emailData.phone,
        project_type: emailData.project_type,
        available_for_call: emailData.available_for_call === 'yes' ? 'Sí' : 'No',
        preferred_time: emailData.preferred_time || 'No especificado',
        source: emailData.source,
        page_url: emailData.page_url,
        submission_datetime: `${emailData.submission_date} ${emailData.submission_time}`,
        ip_address: emailData.ip_address,
        utm_source: emailData.utm_source || 'Directo',
        utm_medium: emailData.utm_medium || 'N/A',
        utm_campaign: emailData.utm_campaign || 'N/A',
        
        // Email subject and content
        subject: `Nuevo contacto desde formulario multistep - ${emailData.name}`,
        message: `
Nuevo contacto recibido:

👤 INFORMACIÓN DE CONTACTO:
- Nombre: ${emailData.name}
- Email: ${emailData.email}
- Teléfono: ${emailData.phone}

🎯 PROYECTO:
- Tipo: ${emailData.project_type}

📞 DISPONIBILIDAD:
- Disponible para llamada: ${emailData.available_for_call === 'yes' ? 'SÍ' : 'NO'}
- Horario preferido: ${emailData.preferred_time || 'No especificado'}

📊 INFORMACIÓN TÉCNICA:
- Fuente: ${emailData.source}
- Página: ${emailData.page_url}
- Fecha: ${emailData.submission_date} ${emailData.submission_time}
- IP: ${emailData.ip_address}
- UTM Source: ${emailData.utm_source || 'Directo'}
- UTM Medium: ${emailData.utm_medium || 'N/A'}
- UTM Campaign: ${emailData.utm_campaign || 'N/A'}
        `
      },
      EMAILJS_CONFIG.PUBLIC_KEY
    );

    if (result.status === 200) {
      console.log('Email sent successfully:', result);
      return { success: true, leadId: result.text };
    } else {
      console.error('EmailJS error:', result);
      return { success: false, error: 'Error al enviar el email' };
    }

  } catch (error) {
    console.error('Unexpected error sending email:', error);
    return { 
      success: false, 
      error: error instanceof Error ? error.message : 'Error desconocido'
    };
  }
};

// Function to send auto-reply email to the user
export const sendAutoReply = async (userEmail: string, userName: string): Promise<{ success: boolean; error?: string }> => {
  try {
    const result = await emailjs.send(
      EMAILJS_CONFIG.SERVICE_ID,
      'template_auto_reply', // You'll need to create this template in EmailJS
      {
        to_email: userEmail,
        to_name: userName,
        subject: 'Gracias por tu consulta - Builders AI',
        message: `Hola ${userName},

Gracias por completar nuestro formulario de contacto. Hemos recibido tu información y nos pondremos en contacto contigo dentro de las próximas 24 horas.

Mientras tanto, puedes:
• Revisar nuestro portfolio en: https://builders-ai.com/portfolio
• Seguirnos en LinkedIn para ver casos de éxito
• Preparar cualquier pregunta específica sobre tu proyecto

¡Estamos emocionados por conocer más sobre tu proyecto!

Saludos,
El equipo de Builders AI

--
Este es un email automático. Por favor no respondas a esta dirección.`
      },
      EMAILJS_CONFIG.PUBLIC_KEY
    );

    if (result.status === 200) {
      console.log('Auto-reply sent successfully');
      return { success: true };
    } else {
      console.error('Error sending auto-reply:', result);
      return { success: false, error: 'Error enviando respuesta automática' };
    }

  } catch (error) {
    console.error('Unexpected error sending auto-reply:', error);
    return { 
      success: false, 
      error: error instanceof Error ? error.message : 'Error desconocido'
    };
  }
};