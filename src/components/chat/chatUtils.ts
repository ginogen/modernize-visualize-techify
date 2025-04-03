
import { Message, MessageRole, MessageType } from "./types";

// Initial system messages and welcome message
export const initialMessages: Message[] = [
  {
    id: "system-1",
    role: MessageRole.SYSTEM,
    content: "Eres un asistente especializado en ayudar a definir los requisitos para la implementación de chatbots personalizados.",
    timestamp: new Date().toISOString(),
  },
  {
    id: "welcome-1",
    role: MessageRole.ASSISTANT,
    content: 
`Hola, soy tu asistente para definir cómo implementar tu chatbot. Para ayudarte mejor, necesito conocer detalles sobre:

1. **Tu negocio o servicio**: ¿A qué se dedica? ¿Qué sector?
2. **Procesos clave**: ¿Cómo atiendes a tus clientes? ¿Cuáles son tus procesos de venta?
3. **Sistemas actuales**: ¿Utilizas Wordpress, Shopify, WooCommerce, CRM, ERP, etc.?
4. **Objetivos del chatbot**: ¿Qué problemas debe resolver? ¿En qué procesos ayudar?
5. **Tono deseado**: ¿Formal, amigable, técnico, cercano?

Puedes responder escribiendo o usando el micrófono para hablar directamente. Comencemos: ¿puedes contarme sobre tu negocio y por qué necesitas un chatbot?`,
    timestamp: new Date().toISOString(),
  },
];

// Questions to ask based on conversation stage
const followUpQuestions = {
  business: [
    "¿Podrías describir más detalladamente qué productos o servicios ofreces?",
    "¿Cuál es tu público objetivo? ¿Quiénes son tus clientes típicos?",
    "¿Qué te diferencia de tu competencia? ¿Cuál es tu propuesta de valor?",
  ],
  processes: [
    "¿Cómo es tu proceso de atención al cliente actualmente?",
    "¿Qué pasos siguen tus clientes para comprar o contratar tus servicios?",
    "¿Cuáles son las preguntas más frecuentes que recibes de tus clientes?",
    "¿Qué procesos internos te gustaría automatizar con el chatbot?",
  ],
  systems: [
    "¿Qué plataformas o sistemas utilizas para tu página web o tienda online?",
    "¿Usas algún CRM, ERP u otro software de gestión? ¿Cuál?",
    "¿Qué sistemas de pago utilizas (Mercado Pago, PayPal, etc.)?",
    "¿Usas alguna herramienta para agendar citas o reservas (Google Calendar, etc.)?",
  ],
  tone: [
    "¿Prefieres que tu chatbot use un tono formal o más conversacional?",
    "¿Hay algún vocabulario específico de tu industria que debería utilizar?",
    "¿Tienes alguna guía de marca o tono de comunicación establecido?",
  ],
  examples: [
    "Aquí te muestro un ejemplo de cómo podría responder tu chatbot a una consulta típica: [ejemplo contextualizado]",
    "¿Te parece adecuado este estilo de respuesta para tu marca?",
  ],
};

// Generate AI response based on conversation history using OpenAI
export const generateResponse = async (
  messageHistory: Message[], 
  lastUserMessage: string,
  apiKey?: string
): Promise<string> => {
  console.log("Generating response for:", lastUserMessage);
  console.log("Message history length:", messageHistory.length);
  
  // Use OpenAI if API key is provided
  if (apiKey) {
    try {
      return await generateOpenAIResponse(messageHistory, lastUserMessage, apiKey);
    } catch (error) {
      console.error("Error with OpenAI, falling back to simulated response:", error);
      // Continue with fallback if OpenAI fails
    }
  }
  
  // Fallback to simulated response
  await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate API delay
  
  const messagesFromUser = messageHistory.filter(m => m.role === MessageRole.USER);
  const businessInfo = detectBusinessInfo(messageHistory);
  const processInfo = detectProcessInfo(messageHistory);
  const systemsInfo = detectSystemsInfo(messageHistory);
  
  // Determine what information we still need
  if (messagesFromUser.length <= 1) {
    return generateInitialResponse(lastUserMessage);
  }
  
  if (!businessInfo) {
    return askAboutBusiness();
  }
  
  if (!processInfo && messagesFromUser.length <= 3) {
    return askAboutProcesses();
  }
  
  if (!systemsInfo && messagesFromUser.length <= 5) {
    return askAboutSystems();
  }
  
  // If we have basic information, follow up with more specific questions
  if (messagesFromUser.length <= 7) {
    return askFollowUpQuestions(messageHistory.length % 3);
  }
  
  // Start wrapping up and suggesting examples
  if (messagesFromUser.length <= 10) {
    return provideExamples(businessInfo, processInfo, systemsInfo);
  }
  
  // Final summary and next steps
  return generateFinalSummary(businessInfo, processInfo, systemsInfo);
};

// Use OpenAI API to generate responses
const generateOpenAIResponse = async (
  messageHistory: Message[], 
  lastUserMessage: string,
  apiKey: string
): Promise<string> => {
  const systemMessage = `Eres un asistente especializado en ayudar a definir los requisitos para la implementación de chatbots personalizados. 
Tu objetivo es obtener la siguiente información:
1. Detalles del negocio o servicio: sector, productos, servicios, público objetivo
2. Procesos clave: atención al cliente, procesos de venta, flujos de trabajo
3. Sistemas actuales: CMS (Wordpress, Shopify), CRM, ERP, sistemas de pago, herramientas de agenda
4. Objetivos del chatbot: problemas a resolver, procesos a optimizar
5. Tono y estilo deseado: formal, amigable, técnico, cercano

Haz preguntas de seguimiento para profundizar en cada área. Después de obtener suficiente información, informa al usuario que estás listo para generar un documento de especificaciones.`;

  // Format messages for OpenAI
  const formattedMessages = [
    { role: "system", content: systemMessage },
    ...messageHistory.map(msg => ({
      role: msg.role.toLowerCase() as "system" | "user" | "assistant",
      content: msg.content
    }))
  ];

  try {
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${apiKey}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        messages: formattedMessages,
        temperature: 0.7,
        max_tokens: 500
      })
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error("OpenAI API error:", errorData);
      throw new Error(`OpenAI API Error: ${response.status}`);
    }

    const data = await response.json();
    return data.choices[0].message.content;
  } catch (error) {
    console.error("Error calling OpenAI:", error);
    throw error;
  }
};

// Helper functions to simulate AI understanding
function detectBusinessInfo(messages: Message[]): string | null {
  const userMessages = messages.filter(m => m.role === MessageRole.USER).map(m => m.content.toLowerCase());
  
  for (const msg of userMessages) {
    if (msg.length > 50) {
      return "detected"; // In a real scenario, we'd extract actual business info
    }
  }
  
  return null;
}

function detectProcessInfo(messages: Message[]): string | null {
  const userMessages = messages.filter(m => m.role === MessageRole.USER).map(m => m.content.toLowerCase());
  const processKeywords = ["proceso", "venta", "atención", "cliente", "consulta", "servicio"];
  
  for (const msg of userMessages) {
    for (const keyword of processKeywords) {
      if (msg.includes(keyword)) {
        return "detected"; // In a real scenario, we'd extract actual process info
      }
    }
  }
  
  return null;
}

function detectSystemsInfo(messages: Message[]): string | null {
  const userMessages = messages.filter(m => m.role === MessageRole.USER).map(m => m.content.toLowerCase());
  const systemKeywords = ["wordpress", "shopify", "tienda", "crm", "erp", "woocommerce", "mercado", "pago", "calendar"];
  
  for (const msg of userMessages) {
    for (const keyword of systemKeywords) {
      if (msg.includes(keyword)) {
        return "detected"; // In a real scenario, we'd extract actual systems info
      }
    }
  }
  
  return null;
}

// Response generators
function generateInitialResponse(userMessage: string): string {
  return `Gracias por compartir esa información. Para poder definir mejor tu chatbot, necesito entender más sobre tu negocio.

¿Podrías contarme más sobre tus productos o servicios principales y cómo los comercializas actualmente? También, ¿qué te motiva a implementar un chatbot en tu negocio?`;
}

function askAboutBusiness(): string {
  const questions = followUpQuestions.business;
  const randomIndex = Math.floor(Math.random() * questions.length);
  
  return `Me gustaría entender mejor tu negocio. ${questions[randomIndex]}

Esto me ayudará a recomendar las mejores estrategias para tu chatbot.`;
}

function askAboutProcesses(): string {
  const questions = followUpQuestions.processes;
  const randomIndex = Math.floor(Math.random() * questions.length);
  
  return `Ahora me gustaría entender tus procesos actuales. ${questions[randomIndex]}

Esta información es crucial para saber cómo el chatbot puede integrarse en tu flujo de trabajo actual.`;
}

function askAboutSystems(): string {
  const questions = followUpQuestions.systems;
  const randomIndex = Math.floor(Math.random() * questions.length);
  
  return `Para poder recomendar la mejor implementación técnica, necesito conocer tus sistemas actuales. ${questions[randomIndex]}

Saber esto nos ayudará a determinar qué integraciones serán necesarias.`;
}

function askFollowUpQuestions(stage: number): string {
  const allQuestions = [
    ...followUpQuestions.business,
    ...followUpQuestions.processes,
    ...followUpQuestions.systems,
    ...followUpQuestions.tone,
  ];
  
  const index = stage % allQuestions.length;
  
  return `Gracias por toda esa información. ${allQuestions[index]}

Cada detalle que compartes nos acerca más a definir perfectamente tu chatbot.`;
}

function provideExamples(businessInfo: string | null, processInfo: string | null, systemsInfo: string | null): string {
  return `Basándome en la información que me has proporcionado, aquí hay un ejemplo de cómo podría funcionar tu chatbot:

Cliente: "Hola, quisiera saber más sobre [producto/servicio hipotético basado en la conversación]"

Chatbot: "¡Bienvenido a [Nombre de la empresa]! Estaré encantado de ayudarte con información sobre [producto/servicio]. 
Tenemos [características principales] y ofrecemos [beneficios clave]. 
¿Te gustaría conocer más detalles específicos o quizás agendar una demostración con uno de nuestros especialistas?"

¿Te parece que este tipo de respuesta se alinea con el tono y la forma en que quieres comunicarte con tus clientes?`;
}

function generateFinalSummary(businessInfo: string | null, processInfo: string | null, systemsInfo: string | null): string {
  return `Gracias por compartir toda esta valiosa información. Basado en nuestra conversación, ya tengo una comprensión sólida de tu negocio, procesos y sistemas.

Para finalizar y preparar el documento de especificaciones:

1. ¿Hay alguna característica específica que consideres indispensable para tu chatbot?
2. ¿Tienes alguna restricción de tiempo o presupuesto para la implementación?
3. ¿Hay alguna preocupación o requisito adicional que no hayamos discutido?

Con esta información, podremos generar un documento detallado con las especificaciones para implementar tu chatbot personalizado.`;
}
