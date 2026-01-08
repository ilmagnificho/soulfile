// Lemon Squeezy API integration
// Documentation: https://docs.lemonsqueezy.com

export interface CheckoutData {
    name: string;
    birthDate: string;
    element: string;
    email?: string;
}

export async function createCheckout(userData: CheckoutData): Promise<string> {
    try {
        const response = await fetch('/api/checkout', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(userData),
        });

        if (!response.ok) {
            throw new Error('Failed to create checkout');
        }

        const { checkoutUrl } = await response.json();
        return checkoutUrl;
    } catch (error) {
        console.error('Checkout error:', error);
        throw error;
    }
}

export function redirectToCheckout(checkoutUrl: string) {
    window.location.href = checkoutUrl;
}
