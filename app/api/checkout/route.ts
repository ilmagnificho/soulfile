import { NextRequest, NextResponse } from 'next/server';

// TODO: Install @lemonsqueezy/lemonsqueezy.js and import:
// import { lemonSqueezySetup, createCheckout } from '@lemonsqueezy/lemonsqueezy.js';

export async function POST(request: NextRequest) {
    try {
        const { name, birthDate, element, email } = await request.json();

        // TODO: Replace with your actual Lemon Squeezy credentials
        // Get these from: https://app.lemonsqueezy.com/settings/api
        const STORE_ID = process.env.LEMONSQUEEZY_STORE_ID!;
        const VARIANT_ID = process.env.LEMONSQUEEZY_VARIANT_ID!;
        const API_KEY = process.env.LEMONSQUEEZY_API_KEY!;

        if (!STORE_ID || !VARIANT_ID || !API_KEY) {
            return NextResponse.json(
                { error: 'Lemon Squeezy not configured. Please add credentials to .env.local' },
                { status: 500 }
            );
        }

        // TODO: Uncomment when @lemonsqueezy/lemonsqueezy.js is installed:
        /*
        lemonSqueezySetup({ apiKey: API_KEY });
    
        const checkout = await createCheckout(STORE_ID, VARIANT_ID, {
          checkoutData: {
            email: email,
            custom: {
              name,
              birthDate,
              element,
            },
          },
          productOptions: {
            name: `Saja Soul Report - ${element.toUpperCase()}`,
            description: `Complete 2026 forecast for ${name}`,
          },
          checkoutOptions: {
            embed: false,
            media: false,
            logo: true,
          },
        });
    
        return NextResponse.json({
          checkoutUrl: checkout.data.attributes.url,
        });
        */

        // TEMPORARY: Return mock URL until Lemon Squeezy is configured
        return NextResponse.json({
            checkoutUrl: `https://example.lemonsqueezy.com/checkout?name=${encodeURIComponent(name)}&element=${element}`,
            message: 'This is a demo URL. Configure Lemon Squeezy to enable real payments.',
        });

    } catch (error) {
        console.error('Checkout API error:', error);
        return NextResponse.json(
            { error: 'Failed to create checkout session' },
            { status: 500 }
        );
    }
}
