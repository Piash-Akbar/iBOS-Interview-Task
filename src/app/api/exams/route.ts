import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { verifyToken, getTokenFromHeader } from "@/lib/auth";

export async function GET(request: NextRequest) {
  try {
    const token = getTokenFromHeader(request.headers.get("authorization"));
    if (!token) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const payload = await verifyToken(token);
    if (!payload) {
      return NextResponse.json({ error: "Invalid token" }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const search = searchParams.get("search") || "";
    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "8");
    const skip = (page - 1) * limit;

    const where =
      payload.role === "employer"
        ? {
            creatorId: payload.userId,
            ...(search && {
              title: { contains: search },
            }),
          }
        : {
            ...(search && {
              title: { contains: search },
            }),
          };

    const [exams, total] = await Promise.all([
      prisma.exam.findMany({
        where,
        include: {
          _count: {
            select: { questions: true, submissions: true },
          },
        },
        orderBy: { createdAt: "desc" },
        skip,
        take: limit,
      }),
      prisma.exam.count({ where }),
    ]);

    return NextResponse.json({
      exams,
      total,
      page,
      totalPages: Math.ceil(total / limit),
    });
  } catch {
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const token = getTokenFromHeader(request.headers.get("authorization"));
    if (!token) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const payload = await verifyToken(token);
    if (!payload || payload.role !== "employer") {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    const body = await request.json();
    const {
      title,
      totalCandidates,
      totalSlots,
      totalQuestionSet,
      questionType,
      startTime,
      endTime,
      duration,
      negativeMarking,
      questions,
    } = body;

    const exam = await prisma.exam.create({
      data: {
        title,
        totalCandidates,
        totalSlots,
        totalQuestionSet,
        questionType,
        startTime: new Date(startTime),
        endTime: new Date(endTime),
        duration,
        negativeMarking: negativeMarking || 0,
        creatorId: payload.userId,
        questions: {
          create: (questions || []).map(
            (
              q: {
                title: string;
                type: string;
                options: unknown[];
                score: number;
              },
              index: number
            ) => ({
              title: q.title,
              type: q.type,
              options: JSON.stringify(q.options || []),
              score: q.score || 1,
              order: index + 1,
            })
          ),
        },
      },
      include: {
        questions: true,
        _count: { select: { questions: true, submissions: true } },
      },
    });

    return NextResponse.json({ exam }, { status: 201 });
  } catch (error) {
    console.error("Create exam error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
