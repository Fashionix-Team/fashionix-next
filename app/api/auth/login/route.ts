import { NextRequest, NextResponse } from 'next/server';
import { CustomerLogin } from '@/lib/bagisto/mutations/customer-login';
import { fetchHandler } from '@/lib/fetch-handler';

export async function POST(req: NextRequest) {
  try {
    const { email, password } = await req.json();

    if (!email || !password) {
      return NextResponse.json(
        { success: false, message: 'Email dan password diperlukan' },
        { status: 400 }
      );
    }

    const response = await fetchHandler({
      url: '/shop/customer/login',
      method: 'POST',
      body: {
        email,
        password
      }
    });

    if (!response.data?.status) {
      return NextResponse.json(
        { success: false, message: response.data?.message || 'Login gagal' },
        { status: 400 }
      );
    }

    const token = response.data.token;
    const customer = response.data.data;

    return NextResponse.json({
      success: true,
      token,
      customer,
      message: 'Login berhasil'
    });
  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json(
      { success: false, message: 'Terjadi kesalahan saat login' },
      { status: 500 }
    );
  }
}