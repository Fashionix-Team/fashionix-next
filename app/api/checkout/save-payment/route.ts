import { NextRequest, NextResponse } from 'next/server';
import { addPaymentMethod } from '@/lib/bagisto';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { method } = body;

    if (!method) {
      return NextResponse.json({
        success: false,
        message: 'Payment method is required'
      }, { status: 400 });
    }

    console.log('Saving payment method:', method);

    const result = await addPaymentMethod({ method });
    
    console.log('Payment method saved:', result ? 'Success' : 'Failed');
    
    return NextResponse.json({
      success: true,
      data: result
    });
  } catch (error: any) {
    console.error('Save payment method error:', error);
    
    return NextResponse.json({
      success: false,
      message: error.message || 'Failed to save payment method'
    }, { status: 500 });
  }
}
