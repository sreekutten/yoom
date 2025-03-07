import { NextResponse } from 'next/server';
import { MongoClient } from 'mongodb';

const uri = process.env.MONGODB_URI!;
const client = new MongoClient(uri);

export async function POST(req: Request) {
  try {
    await client.connect();
    const db = client.db('your_database_name'); // Change this to your actual database name
    const collection = db.collection('participants');

    const { emails } = await req.json();

    if (!emails || emails.length === 0) {
      return NextResponse.json({ error: 'No emails provided' }, { status: 400 });
    }

    const emailDocs = emails.map((email: string) => ({ email, joinedAt: new Date() }));

    await collection.insertMany(emailDocs);

    return NextResponse.json({ message: 'Participants stored successfully' });
  } catch (error) {
    console.error('Database Error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
