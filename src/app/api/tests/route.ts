import { prisma } from '@/lib/prisma';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { testId, testName, url, analyticsId, startDate, endDate, status, variations } = body;

        const test = await prisma.aBTest.create({
            data: {
                testId,
                name: testName,
                url,
                analyticsId,
                startDate: new Date(startDate),
                endDate: new Date(endDate),
                status: status || 'draft',
                variations: JSON.stringify(variations || []),
            },
        });

        return NextResponse.json(test, { status: 201 });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: 'Error creating test' }, { status: 500 });
    }
}

export async function GET() {
    try {
        const tests = await prisma.aBTest.findMany({
            select: {
                testId: true,
                name: true,
                url: true,
                endDate: true,
                status: true,
            },
            orderBy: {
                endDate: 'desc',
            },
        });

        return NextResponse.json(tests, { status: 200 });
    } catch (error) {
        console.error('Error fetching tests:', error);
        return NextResponse.json({ error: 'Error fetching tests' }, { status: 500 });
    }
}
