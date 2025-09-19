export interface Lead {
  company_name: string;
  website: string;
  description: string;
  services: string;
  value_proposition: string;
  target_audience: string;
  competitive_advantages: string;
  industry_category: string;
  company_size_estimate: string;
  personalized_message: string;
  confidence_score: number;
  cms_platform: string;
  google_analytics: boolean;
  meta_pixel: boolean;
  google_tag_manager: boolean;
  digital_maturity_score: number;
  tech_readiness: string;
  keywords: string;
  frontend_frameworks: string;
  backend_technology: string;
  ecommerce_platform: string;
  hosting_platform: string;
  tech_sophistication_score: number;
  domain_age_years: number;
  has_ssl: boolean;
  ssl_expires_days: number;
  email_provider: string;
  uses_cloudflare: boolean;
  domain_trust_score: number;
  https_enabled: boolean;
  security_headers_count: number;
  has_vulnerabilities: boolean;
  security_score: number;
  title_optimized: boolean;
  has_meta_description: boolean;
  mobile_friendly: boolean;
  has_structured_data: boolean;
  seo_score: number;
  pain_points: string;
  automation_opportunities: string;
  sales_opportunities: string;
  security_recommendations: string;
  seo_opportunities: string;
  overall_tech_score: number;
  analysis_timestamp: string;
  tokens_used: number;
  processing_time: number;
  slug?: string; // Generated slug for routing
}

export interface ProcessedLead extends Lead {
  slug: string;
  services_array: string[];
  automation_opportunities_array: string[];
  sales_opportunities_array: string[];
  pain_points_array: string[];
  security_recommendations_array: string[];
  seo_opportunities_array: string[];
  keywords_array: string[];
}

export interface LeadScores {
  digital_maturity: number;
  tech_readiness: string;
  seo_score: number;
  security_score: number;
  overall_tech_score: number;
}

export interface LeadTechStack {
  cms_platform: string;
  frontend_frameworks: string;
  backend_technology: string;
  ecommerce_platform: string;
  hosting_platform: string;
  email_provider: string;
}

export interface LeadAnalytics {
  google_analytics: boolean;
  meta_pixel: boolean;
  google_tag_manager: boolean;
  uses_cloudflare: boolean;
}