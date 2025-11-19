import { NextRequest, NextResponse } from 'next/server';
import { bagistoFetch } from '@/lib/bagisto';

// Simple query to get shipping methods (requires address already saved)
const getShippingMethodsQuery = /* GraphQL */ `
  query {
    shippingMethods {
      message
      shippingMethods {
        title
        methods {
          code
          label
          price
          formattedPrice
          basePrice
          formattedBasePrice
        }
      }
    }
  }
`;

export async function GET(request: NextRequest) {
  try {
    const res = await bagistoFetch<any>({
      query: getShippingMethodsQuery,
      cache: "no-store",
    });

    console.log('Raw shipping methods response:', JSON.stringify(res.body.data, null, 2));
    
    const shippingMethods = res.body.data?.shippingMethods?.shippingMethods || [];
    
    return NextResponse.json({
      success: true,
      data: shippingMethods
    });
  } catch (error: any) {
    console.error('Shipping methods fetch error:', error.message);
    
    return NextResponse.json({
      success: false,
      data: [],
      message: error.message || 'Failed to fetch shipping methods'
    }, { status: 200 }); // Return 200 to avoid breaking the UI
  }
}
