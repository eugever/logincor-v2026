import { NextRequest, NextResponse } from 'next/server';

const BACKEND_URL = 'http://3.138.85.92:3001/public/solicitar-retiro';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const res = await fetch(BACKEND_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });

    const data = await res.json();
    return NextResponse.json(data, { status: res.status });
  } catch (err) {
    console.error('proxy solicitar-retiro error:', err);
    return NextResponse.json(
      { error: 'Error al procesar la solicitud. Intenta nuevamente.' },
      { status: 500 }
    );
  }
}
