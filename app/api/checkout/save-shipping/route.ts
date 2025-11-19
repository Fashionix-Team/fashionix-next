import { NextRequest, NextResponse } from 'next/server';
import { addShippingMethod } from '@/lib/bagisto';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { method } = body;

    if (!method) {
      return NextResponse.json({
        success: false,
        message: 'Shipping method is required'
      }, { status: 400 });
    }

    console.log('Saving shipping method:', method);

    const result = await addShippingMethod({ method });
    
    console.log('Shipping method save result:', JSON.stringify(result, null, 2));
    
    return NextResponse.json({
      success: true,
      data: result
    });
  } catch (error: any) {
    console.error('Save shipping method error:', error);
    console.error('Error details:', error.message);
    
    return NextResponse.json({
      success: false,
      message: error.message || 'Failed to save shipping method'
    }, { status: 500 });
  }
}
