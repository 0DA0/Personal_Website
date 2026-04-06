import { NextRequest, NextResponse } from 'next/server';
import clientPromise from '@/lib/mongodb';

async function getCollection() {
  const client = await clientPromise;
  return client.db('portfolio').collection('projects');
}

export async function GET() {
  try {
    const col = await getCollection();
    const projects = await col.find({}).sort({ order: 1, createdAt: -1 }).toArray();
    return NextResponse.json(projects);
  } catch (err) {
    console.error('GET /api/projects error:', err);
    return NextResponse.json({ message: 'Sunucu hatası' }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  const token = req.cookies.get('admin_token')?.value;
  if (!token) return NextResponse.json({ message: 'Yetkisiz' }, { status: 401 });

  try {
    const body = await req.json();
    const { title, description, technologies, github, demo, order } = body;

    if (!title?.trim() || !description?.trim()) {
      return NextResponse.json({ message: 'Başlık ve açıklama zorunlu' }, { status: 400 });
    }

    const col = await getCollection();
    const result = await col.insertOne({
      title: title.trim(),
      description: description.trim(),
      technologies: technologies || [],
      github: github?.trim() || '',
      demo: demo?.trim() || '',
      order: order ?? 99,
      createdAt: new Date(),
    });

    return NextResponse.json({ _id: result.insertedId, message: 'Proje eklendi' }, { status: 201 });
  } catch (err) {
    console.error('POST /api/projects error:', err);
    return NextResponse.json({ message: 'Sunucu hatası' }, { status: 500 });
  }
}
