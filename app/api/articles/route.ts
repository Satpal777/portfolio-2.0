import articlesData from '@/data/articles.json';
import { NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.json(articlesData);
}
