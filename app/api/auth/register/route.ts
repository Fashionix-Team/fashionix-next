import { NextRequest, NextResponse } from 'next/server';

const BAGISTO_API_URL = 'http://localhost:8000/api';

export async function POST(req: NextRequest) {
  try {
    const data = await req.json();
    
    // Validate required fields
    if (!data.first_name || !data.last_name || !data.email || !data.password) {
      return NextResponse.json(
        { success: false, message: 'Semua field harus diisi' },
        { status: 400 }
      );
    }

    // Prepare register data
    const registerData = {
      first_name: data.first_name,
      last_name: data.last_name,
      email: data.email,
      password: data.password,
      password_confirmation: data.password,
      channel: 'default'
    };

    console.log('Sending registration request to Bagisto:', {
      url: `${BAGISTO_API_URL}/customer/register`,
      data: { ...registerData, password: '***' }
    });

    // Send request to Bagisto
    const response = await fetch(`${BAGISTO_API_URL}/customer/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify(registerData)
    });

    const result = await response.json();
    console.log('Bagisto response:', result);

    if (!response.ok) {
      return NextResponse.json(
        { 
          success: false, 
          message: result.message || 'Registrasi gagal'
        },
        { status: response.status }
      );
    }

    return NextResponse.json({
      success: true,
      message: 'Registrasi berhasil',
      token: result.token,
      customer: result.customer || result.data
    });

  } catch (error) {
    console.error('Registration error:', error);
    return NextResponse.json(
      { success: false, message: 'Terjadi kesalahan saat registrasi' },
      { status: 500 }
    );
  }
}