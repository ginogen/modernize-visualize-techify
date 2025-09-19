import { ProcessedLead } from '@/types/leads';
import { loadLeadsData } from './leadsData';

// Utility function to get lead statistics
export async function getLeadStatistics() {
  const leads = await loadLeadsData();
  
  return {
    total: leads.length,
    averageDigitalMaturity: Math.round(leads.reduce((sum, lead) => sum + lead.digital_maturity_score, 0) / leads.length),
    averageSeoScore: Math.round(leads.reduce((sum, lead) => sum + lead.seo_score, 0) / leads.length),
    averageSecurityScore: Math.round(leads.reduce((sum, lead) => sum + lead.security_score, 0) / leads.length),
    averageOverallScore: Math.round(leads.reduce((sum, lead) => sum + lead.overall_tech_score, 0) / leads.length),
    companySizes: {
      small: leads.filter(lead => lead.company_size_estimate === 'small').length,
      medium: leads.filter(lead => lead.company_size_estimate === 'medium').length,
      large: leads.filter(lead => lead.company_size_estimate === 'large').length,
    },
    techReadiness: {
      basic: leads.filter(lead => lead.tech_readiness === 'basic').length,
      intermediate: leads.filter(lead => lead.tech_readiness === 'intermediate').length,
      advanced: leads.filter(lead => lead.tech_readiness === 'advanced').length,
    },
    cms: leads.reduce((acc, lead) => {
      const cms = lead.cms_platform || 'Unknown';
      acc[cms] = (acc[cms] || 0) + 1;
      return acc;
    }, {} as Record<string, number>),
  };
}

// Generate a shareable URL for a lead (for internal use)
export function generateLeadUrl(slug: string, baseUrl: string = window.location.origin): string {
  return `${baseUrl}/leads/${slug}`;
}

// Get leads by various filters
export async function getLeadsByFilter(filter: {
  industry?: string;
  companySize?: string;
  techReadiness?: string;
  minScore?: number;
  maxScore?: number;
}) {
  const leads = await loadLeadsData();
  
  return leads.filter(lead => {
    if (filter.industry && lead.industry_category !== filter.industry) return false;
    if (filter.companySize && lead.company_size_estimate !== filter.companySize) return false;
    if (filter.techReadiness && lead.tech_readiness !== filter.techReadiness) return false;
    if (filter.minScore && lead.overall_tech_score < filter.minScore) return false;
    if (filter.maxScore && lead.overall_tech_score > filter.maxScore) return false;
    return true;
  });
}

// Get top leads by score
export async function getTopLeads(limit: number = 10) {
  const leads = await loadLeadsData();
  return leads
    .sort((a, b) => b.overall_tech_score - a.overall_tech_score)
    .slice(0, limit);
}

// Get leads with most opportunities
export async function getLeadsWithMostOpportunities(limit: number = 10) {
  const leads = await loadLeadsData();
  return leads
    .sort((a, b) => 
      (b.automation_opportunities_array.length + b.sales_opportunities_array.length) - 
      (a.automation_opportunities_array.length + a.sales_opportunities_array.length)
    )
    .slice(0, limit);
}

// Export lead data for reporting (without sensitive info)
export async function exportLeadSummary(slug: string) {
  const leads = await loadLeadsData();
  const lead = leads.find(l => l.slug === slug);
  
  if (!lead) return null;
  
  return {
    company_name: lead.company_name,
    website: lead.website,
    industry_category: lead.industry_category,
    company_size_estimate: lead.company_size_estimate,
    scores: {
      digital_maturity_score: lead.digital_maturity_score,
      seo_score: lead.seo_score,
      security_score: lead.security_score,
      overall_tech_score: lead.overall_tech_score,
    },
    tech_stack: {
      cms_platform: lead.cms_platform,
      frontend_frameworks: lead.frontend_frameworks,
      backend_technology: lead.backend_technology,
      tech_readiness: lead.tech_readiness,
    },
    opportunities_count: {
      automation: lead.automation_opportunities_array.length,
      sales: lead.sales_opportunities_array.length,
      security: lead.security_recommendations_array.length,
      seo: lead.seo_opportunities_array.length,
    },
    analysis_date: lead.analysis_timestamp,
  };
}

// Validate lead URL slug
export function isValidLeadSlug(slug: string): boolean {
  return /^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug);
}

// Generate lead preview text for sharing
export function generateLeadPreview(lead: ProcessedLead): string {
  return `Análisis de ${lead.company_name}: ${lead.overall_tech_score}/100 puntos técnicos. ${lead.automation_opportunities_array.length} oportunidades de automatización identificadas.`;
}