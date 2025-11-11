// Utility functions for Meta Pixel tracking

interface MetaPixelParams {
  [key: string]: any;
}

// Check if Meta Pixel is available
const isMetaPixelAvailable = (): boolean => {
  return typeof window !== 'undefined' && typeof window.fbq === 'function';
};

// Base tracking function with error handling
const trackEvent = (eventType: 'track' | 'trackCustom', eventName: string, params?: MetaPixelParams) => {
  if (!isMetaPixelAvailable()) {
    console.warn('Meta Pixel not available for tracking event:', eventName);
    return;
  }

  try {
    if (eventType === 'trackCustom') {
      window.fbq('trackCustom', eventName, params || {});
    } else {
      window.fbq('track', eventName, params || {});
    }
    console.log(`Meta Pixel: ${eventType} - ${eventName}`, params);
  } catch (error) {
    console.error('Meta Pixel tracking error:', error);
  }
};

// Standard Meta Pixel events
export const trackLead = (params?: MetaPixelParams) => {
  trackEvent('track', 'Lead', {
    content_name: 'Formulario Multistep',
    content_category: 'Contact Form',
    value: 1,
    currency: 'USD',
    ...params
  });
};

export const trackInitiateCheckout = (params?: MetaPixelParams) => {
  trackEvent('track', 'InitiateCheckout', params);
};

// Custom events for multistep form
export const trackFormStepCompleted = (step: number, stepName: string, additionalParams?: MetaPixelParams) => {
  trackEvent('trackCustom', 'FormStepCompleted', {
    step,
    step_name: stepName,
    form_type: 'multistep_contact',
    ...additionalParams
  });
};

export const trackFormStepStarted = (step: number, stepName: string) => {
  trackEvent('trackCustom', 'FormStepStarted', {
    step,
    step_name: stepName,
    form_type: 'multistep_contact'
  });
};

export const trackContactInfoCompleted = () => {
  trackEvent('trackCustom', 'ContactInfoCompleted', {
    form_type: 'multistep',
    step: 1
  });
};

export const trackProjectDetailsCompleted = (projectType: string) => {
  trackEvent('trackCustom', 'ProjectDetailsCompleted', {
    project_type: projectType,
    form_type: 'multistep',
    step: 2
  });
};

export const trackCallAvailabilitySelected = (availableForCall: string, preferredTime?: string) => {
  trackEvent('trackCustom', 'CallAvailabilitySelected', {
    available_for_call: availableForCall,
    preferred_time: preferredTime || 'not_specified',
    form_type: 'multistep',
    step: 3
  });
};

export const trackFormSubmitted = (formData: any) => {
  // Standard Lead event
  trackLead({
    project_type: formData.project_type,
    available_for_call: formData.available_for_call
  });

  // Custom form submitted event
  trackEvent('trackCustom', 'ContactFormSubmitted', {
    form_type: 'multistep',
    project_type: formData.project_type,
    available_for_call: formData.available_for_call,
    preferred_time: formData.preferred_time || 'not_specified',
    completion_time: Date.now()
  });
};

export const trackFormAbandonment = (currentStep: number, stepName: string, timeSpent?: number) => {
  trackEvent('trackCustom', 'FormAbandonment', {
    last_completed_step: currentStep - 1,
    abandoned_on_step: currentStep,
    abandoned_step_name: stepName,
    form_type: 'multistep',
    time_spent: timeSpent || 0
  });
};

export const trackFormValidationError = (step: number, fieldName: string, errorType: string) => {
  trackEvent('trackCustom', 'FormValidationError', {
    step,
    field_name: fieldName,
    error_type: errorType,
    form_type: 'multistep'
  });
};

export const trackFormFieldFocus = (step: number, fieldName: string) => {
  trackEvent('trackCustom', 'FormFieldFocus', {
    step,
    field_name: fieldName,
    form_type: 'multistep'
  });
};

// Time tracking utilities
let formStartTime: number | null = null;
let stepStartTime: number | null = null;

export const startFormTracking = () => {
  formStartTime = Date.now();
  trackEvent('trackCustom', 'FormStarted', {
    form_type: 'multistep',
    timestamp: formStartTime
  });
};

export const startStepTracking = (step: number, stepName: string) => {
  stepStartTime = Date.now();
  trackFormStepStarted(step, stepName);
};

export const completeStepTracking = (step: number, stepName: string) => {
  const timeSpent = stepStartTime ? Date.now() - stepStartTime : 0;
  
  trackFormStepCompleted(step, stepName, {
    time_spent_ms: timeSpent,
    time_spent_seconds: Math.round(timeSpent / 1000)
  });
  
  stepStartTime = null;
};

export const getFormCompletionTime = (): number => {
  return formStartTime ? Date.now() - formStartTime : 0;
};

// Page visibility API to track form abandonment
export const setupFormAbandonmentTracking = (currentStep: number, getStepName: (step: number) => string) => {
  const handleVisibilityChange = () => {
    if (document.hidden) {
      const timeSpent = getFormCompletionTime();
      trackFormAbandonment(currentStep, getStepName(currentStep), timeSpent);
    }
  };

  const handleBeforeUnload = () => {
    const timeSpent = getFormCompletionTime();
    trackFormAbandonment(currentStep, getStepName(currentStep), timeSpent);
  };

  // Add event listeners
  document.addEventListener('visibilitychange', handleVisibilityChange);
  window.addEventListener('beforeunload', handleBeforeUnload);

  // Return cleanup function
  return () => {
    document.removeEventListener('visibilitychange', handleVisibilityChange);
    window.removeEventListener('beforeunload', handleBeforeUnload);
  };
};