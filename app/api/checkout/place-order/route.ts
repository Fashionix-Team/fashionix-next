import { NextRequest, NextResponse } from 'next/server';
import { createPlaceOrder } from '@/lib/bagisto';

export async function POST(request: NextRequest) {
  try {
    console.log('Placing order...');

    const result = await createPlaceOrder();
    
    console.log('Place order result:', JSON.stringify(result, null, 2));

    if (!result || !result.success) {
      throw new Error('Order placement failed');
    }
    
    return NextResponse.json({
      success: true,
      data: result,
      order: result.order,
      redirectUrl: result.redirectUrl
    });
  } catch (error: any) {
    console.error('Place order error:', error);
    
    return NextResponse.json({
      success: false,
      message: error.message || 'Failed to place order'
    }, { status: 500 });
  }
}
