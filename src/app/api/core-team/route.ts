import { NextResponse } from 'next/server';
import { promises as fs } from 'fs';
import path from 'path';
import { parse } from 'csv-parse/sync';

export async function GET() {
  try {
    const filePath = path.join(process.cwd(), 'public/data/core-team.csv');
    const fileContent = await fs.readFile(filePath, 'utf-8');
    
    const data = parse(fileContent, {
      columns: true,
      skip_empty_lines: true
    });

    return NextResponse.json(data);
  } catch (error) {
    console.error('Error loading core team data:', error);
    return NextResponse.json({ error: 'Failed to load core team data' }, { status: 500 });
  }
}