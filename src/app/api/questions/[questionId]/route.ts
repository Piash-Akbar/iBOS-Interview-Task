import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { verifyToken, getTokenFromHeader } from "@/lib/auth";

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ questionId: string }> }
) {
  try {
    const { questionId } = await params;
    const token = getTokenFromHeader(request.headers.get("authorization"));
    if (!token) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const payload = await verifyToken(token);
    if (!payload || payload.role !== "employer") {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    const body = await request.json();
    const { title, type, options, score } = body;

    const question = await prisma.question.update({
      where: { id: questionId },
      data: {
        ...(title !== undefined && { title }),
        ...(type !== undefined && { type }),
        ...(options !== undefined && {
          options: JSON.stringify(options),
        }),
        ...(score !== undefined && { score }),
      },
    });

    return NextResponse.json({
      question: { ...question, options: JSON.parse(question.options) },
    });
  } catch {
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ questionId: string }> }
) {
  try {
    const { questionId } = await params;
    const token = getTokenFromHeader(request.headers.get("authorization"));
    if (!token) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const payload = await verifyToken(token);
    if (!payload || payload.role !== "employer") {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    await prisma.question.delete({ where: { id: questionId } });

    return NextResponse.json({ message: "Question deleted" });
  } catch {
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
