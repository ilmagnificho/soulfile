// Analytics tracking system for SOULFILE
// Integrates with Google Analytics 4 and has structure for Supabase

declare global {
    interface Window {
        gtag?: (
            command: string,
            targetId: string,
            config?: Record<string, any>
        ) => void;
    }
}

interface EventParams {
    [key: string]: string | number | boolean | undefined;
}

/**
 * Track custom events to Google Analytics 4 and prepare for Supabase logging
 * @param eventName - Name of the event (e.g., 'click_unlock_payment')
 * @param params - Event parameters (e.g., { element: 'fire', user_id: '123' })
 */
export function trackEvent(eventName: string, params?: EventParams): void {
    // Google Analytics 4
    if (typeof window !== 'undefined' && window.gtag) {
        window.gtag('event', eventName, params);
        console.log('📊 GA4 Event:', eventName, params);
    }

    // Supabase logging (structure ready, uncomment when API keys are set)
    // insertIntoSupabase(eventName, params);
}

/**
 * Placeholder for Supabase event logging
 * Uncomment and configure when Supabase is set up
 */
async function insertIntoSupabase(
    eventName: string,
    params?: EventParams
): Promise<void> {
    // Example structure for Supabase insertion
    /*
    const { createClient } = await import('@supabase/supabase-js');
    const supabase = createClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    );

    const { error } = await supabase.from('analytics_events').insert({
        event_name: eventName,
        event_params: params,
        timestamp: new Date().toISOString(),
        user_agent: navigator.userAgent,
    });

    if (error) {
        console.error('Supabase logging error:', error);
    }
    */

    // For now, just log to console
    console.log('📦 Supabase Event (not yet configured):', eventName, params);
}

/**
 * Track page views
 */
export function trackPageView(url: string): void {
    if (typeof window !== 'undefined' && window.gtag) {
        window.gtag('event', 'page_view', {
            page_path: url,
        });
    }
}

/**
 * Track unlock button clicks (Willingness to Pay metric)
 */
export function trackUnlockClick(element: string, birthDate: string): void {
    trackEvent('click_unlock_payment', {
        element: element,
        birth_date: birthDate,
        conversion_intent: 'high',
    });
}

/**
 * Track Soul Card downloads/shares
 */
export function trackSoulCardAction(action: 'download' | 'share', element: string): void {
    trackEvent('soul_card_action', {
        action: action,
        element: element,
    });
}
