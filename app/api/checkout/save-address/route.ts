import { NextRequest, NextResponse } from 'next/server';
import { addCheckoutAddress } from '@/lib/bagisto';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { billing, shipping } = body;

    if (!billing || !shipping) {
      return NextResponse.json({
        success: false,
        message: 'Billing and shipping addresses are required'
      }, { status: 400 });
    }

    // Transform address to match Bagisto schema
    const transformAddress = (addr: any) => {
      // Handle address field - could be string or array
      let addressArray: string[];
      if (Array.isArray(addr.address)) {
        addressArray = addr.address;
      } else if (typeof addr.address === 'string') {
        addressArray = [addr.address];
      } else {
        // Fallback to address1 and address2 if address field not present
        addressArray = [addr.address1 || '', addr.address2 || ''].filter(Boolean);
      }

      return {
        companyName: addr.companyName || '',
        firstName: addr.firstName || '',
        lastName: addr.lastName || '',
        email: addr.email || '',
        address: addressArray,
        country: addr.country || '',
        state: addr.state || '',
        city: addr.city || '',
        postcode: addr.postcode || '',
        phone: addr.phone || '',
        useForShipping: true,
        saveAddress: false,
        defaultAddress: addr.defaultAddress || false,
      };
    };

    const input = {
      billing: transformAddress(billing),
      shipping: transformAddress(shipping),
    };

    console.log('Saving checkout addresses:', JSON.stringify(input, null, 2));

    const result = await addCheckoutAddress({ input });
    
    return NextResponse.json({
      success: true,
      data: result,
      shippingMethods: result?.shippingMethods || []
    });
  } catch (error: any) {
    console.error('Save address error:', error);
    
    return NextResponse.json({
      success: false,
      message: error.message || 'Failed to save address'
    }, { status: 500 });
  }
}
