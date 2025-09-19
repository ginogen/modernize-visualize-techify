import { Lead, ProcessedLead } from '@/types/leads';

// Raw CSV data - In production, this would be loaded from the CSV file
const rawLeadsData = `company_name,website,description,services,value_proposition,target_audience,competitive_advantages,industry_category,company_size_estimate,personalized_message,confidence_score,cms_platform,google_analytics,meta_pixel,google_tag_manager,digital_maturity_score,tech_readiness,keywords,frontend_frameworks,backend_technology,ecommerce_platform,hosting_platform,tech_sophistication_score,domain_age_years,has_ssl,ssl_expires_days,email_provider,uses_cloudflare,domain_trust_score,https_enabled,security_headers_count,has_vulnerabilities,security_score,title_optimized,has_meta_description,mobile_friendly,has_structured_data,seo_score,pain_points,automation_opportunities,sales_opportunities,security_recommendations,seo_opportunities,overall_tech_score,analysis_timestamp,tokens_used,processing_time
Salvà Abogados,https://salvaabogados.com/quienes-somos/,"Salvà Abogados es un despacho legal con una trayectoria sólida, enfocado en derecho administrativo y penal. Sin embargo, su presencia digital y procesos internos necesitan modernización a través de tecnología y automatización para mejorar la eficiencia y captación de clientes.",Automatización de gestión de casos | Implementación de chatbots | Optimización SEO,Mejorar la eficiencia operativa y la captación de clientes mediante soluciones tecnológicas personalizadas.,Particulares y empresas que requieren servicios legales en derecho administrativo y penal.,Experiencia consolidada en el sector legal | Enfoque personalizado en atención al cliente,bufete_abogados,small,"He notado que su sitio web no cuenta con sistemas de captura de leads online, lo que significa que están perdiendo oportunidades valiosas de atraer nuevos clientes. Además, la falta de herramientas de automatización como un sistema de gestión de casos puede aumentar la carga de trabajo y disminuir la eficiencia. Nuestros servicios pueden ayudarles a implementar formularios inteligentes y automatizar procesos, mejorando así su captación y gestión de clientes.",0.85,WordPress,False,False,True,33,intermediate,salva | conocenos | abogados | aumentando | aperturó | experiencia | letrado | datos | laboral | contacto,,PHP,none,unknown,10,12.0,True,35,Google Workspace,False,80,True,1,False,30,False,False,True,False,55,Sin sistemas de captura de leads online,Sistema de gestión de casos automático | Automatización de documentos legales | Proceso automático de captación de clientes | Chatbot para atención 24/7,Sin sistemas de captura de leads online | Implementar Google Analytics para medir tráfico y conversiones | Instalar Meta Pixel para retargeting y optimización de campañas | Optimizar meta descriptions para mejor SEO | Implementar schema markup para rich snippets | Implementar CRM para gestión de leads | Instalar chat automático para atención 24/7 | Optimizar WordPress con plugins de performance y SEO | Automatización de procesos clave,Implementar Content-Security-Policy | Implementar X-Frame-Options | Implementar X-Content-Type-Options,Optimizar título de página | Agregar meta descripción | Agregar encabezado H1,41.6,2025-09-18T16:47:30.002999,1701,27.410322904586792`;

// Function to generate slug from company name
export function generateSlug(companyName: string): string {
  return companyName
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

// Function to parse CSV line respecting quoted commas
function parseCSVLine(line: string): string[] {
  const result: string[] = [];
  let current = '';
  let inQuotes = false;
  
  for (let i = 0; i < line.length; i++) {
    const char = line[i];
    
    if (char === '"') {
      inQuotes = !inQuotes;
    } else if (char === ',' && !inQuotes) {
      result.push(current);
      current = '';
    } else {
      current += char;
    }
  }
  
  result.push(current);
  return result;
}

// Function to convert string to boolean
function parseBoolean(value: string): boolean {
  return value.toLowerCase() === 'true';
}

// Function to convert string to number
function parseNumber(value: string): number {
  const num = parseFloat(value);
  return isNaN(num) ? 0 : num;
}

// Function to process CSV data into Lead objects
export function parseLeadsFromCSV(csvData: string): ProcessedLead[] {
  const lines = csvData.trim().split('\n');
  const headers = parseCSVLine(lines[0]);
  
  return lines.slice(1).map(line => {
    const values = parseCSVLine(line);
    const leadData: any = {};
    
    headers.forEach((header, index) => {
      const value = values[index] || '';
      
      // Handle boolean fields
      if (['google_analytics', 'meta_pixel', 'google_tag_manager', 'has_ssl', 'uses_cloudflare', 'https_enabled', 'has_vulnerabilities', 'title_optimized', 'has_meta_description', 'mobile_friendly', 'has_structured_data'].includes(header)) {
        leadData[header] = parseBoolean(value);
      }
      // Handle number fields
      else if (['confidence_score', 'digital_maturity_score', 'tech_sophistication_score', 'domain_age_years', 'ssl_expires_days', 'domain_trust_score', 'security_headers_count', 'security_score', 'seo_score', 'overall_tech_score', 'tokens_used', 'processing_time'].includes(header)) {
        leadData[header] = parseNumber(value);
      }
      // Handle string fields
      else {
        leadData[header] = value;
      }
    });
    
    // Generate slug
    const slug = generateSlug(leadData.company_name);
    
    // Helper function to filter out medical references
    const filterMedicalReferences = (items: string[]): string[] => {
      return items.filter(item => {
        const lowerItem = item.toLowerCase();
        return !lowerItem.includes('citas médicas') && 
               !lowerItem.includes('pacientes') &&
               !lowerItem.includes('paciente') &&
               !lowerItem.includes('sistema de citas médicas') &&
               !lowerItem.includes('recordatorios automáticos a pacientes') &&
               !lowerItem.includes('formularios digitales pre-consulta');
      });
    };

    // Process arrays from pipe-separated strings
    const processedLead: ProcessedLead = {
      ...leadData,
      slug,
      services_array: filterMedicalReferences(leadData.services ? leadData.services.split(' | ').filter(Boolean) : []),
      automation_opportunities_array: filterMedicalReferences(leadData.automation_opportunities ? leadData.automation_opportunities.split(' | ').filter(Boolean) : []),
      sales_opportunities_array: filterMedicalReferences(leadData.sales_opportunities ? leadData.sales_opportunities.split(' | ').filter(Boolean) : []),
      pain_points_array: filterMedicalReferences(leadData.pain_points ? leadData.pain_points.split(' | ').filter(Boolean) : []),
      security_recommendations_array: filterMedicalReferences(leadData.security_recommendations ? leadData.security_recommendations.split(' | ').filter(Boolean) : []),
      seo_opportunities_array: filterMedicalReferences(leadData.seo_opportunities ? leadData.seo_opportunities.split(' | ').filter(Boolean) : []),
      keywords_array: leadData.keywords ? leadData.keywords.split(' | ').filter(Boolean) : [],
    };
    
    return processedLead;
  });
}

// In production, this would read from the actual CSV file
// For now, we'll include the raw data here
export async function loadLeadsData(): Promise<ProcessedLead[]> {
  // Read the actual CSV file content
  try {
    const response = await fetch('/leads_analyzed_20250918_172458.csv');
    const csvContent = await response.text();
    return parseLeadsFromCSV(csvContent);
  } catch (error) {
    console.error('Error loading CSV file:', error);
    // Fallback to a few sample records for development
    return parseLeadsFromCSV(rawLeadsData);
  }
}

// Function to get a lead by slug
export async function getLeadBySlug(slug: string): Promise<ProcessedLead | null> {
  const leads = await loadLeadsData();
  return leads.find(lead => lead.slug === slug) || null;
}

// Function to get all lead slugs (useful for routing)
export async function getAllLeadSlugs(): Promise<string[]> {
  const leads = await loadLeadsData();
  return leads.map(lead => lead.slug);
}