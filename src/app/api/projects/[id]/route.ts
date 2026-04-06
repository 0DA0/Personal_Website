import { NextRequest, NextResponse } from 'next/server';
import clientPromise from '@/lib/mongodb';
import { ObjectId } from 'mongodb';

async function getCollection() {
  const client = await clientPromise;
  return client.db('portfolio').collection('projects');
}

function requireAuth(req: NextRequest) {
  return !!req.cookies.get('admin_token')?.value;
}

export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  if (!requireAuth(req)) return NextResponse.json({ message: 'Yetkisiz' }, { status: 401 });

  try {
    const { id } = await params;
    const body = await req.json();
    const { title, description, technologies, github, demo, order } = body;

    const col = await getCollection();
    await col.updateOne(
      { _id: new ObjectId(id) },
      {
        $set: {
          title: title?.trim(),
          description: description?.trim(),
          technologies: technologies || [],
          github: github?.trim() || '',
          demo: demo?.trim() || '',
          order: order ?? 99,
          updatedAt: new Date(),
        },
      }
    );

    return NextResponse.json({ message: 'Güncellendi' });
  } catch (err) {
    console.error('PUT /api/projects/[id] error:', err);
    return NextResponse.json({ message: 'Sunucu hatası' }, { status: 500 });
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  if (!requireAuth(req)) return NextResponse.json({ message: 'Yetkisiz' }, { status: 401 });

  try {
    const { id } = await params;
    const col = await getCollection();
    await col.deleteOne({ _id: new ObjectId(id) });
    return NextResponse.json({ message: 'Silindi' });
  } catch (err) {
    console.error('DELETE /api/projects/[id] error:', err);
    return NextResponse.json({ message: 'Sunucu hatası' }, { status: 500 });
  }
}
