import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { verifyToken, getTokenFromHeader } from "@/lib/auth";

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ examId: string }> }
) {
  try {
    const { examId } = await params;
    const token = getTokenFromHeader(request.headers.get("authorization"));
    if (!token) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const payload = await verifyToken(token);
    if (!payload || payload.role !== "candidate") {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    // Check if already submitted
    const existing = await prisma.examSubmission.findUnique({
      where: {
        userId_examId: {
          userId: payload.userId,
          examId,
        },
      },
    });

    if (existing) {
      return NextResponse.json(
        { error: "Exam already submitted" },
        { status: 409 }
      );
    }

    const body = await request.json();
    const { answers, tabSwitches, fullscreenExits, autoSubmitted } = body;

    // Calculate score
    const exam = await prisma.exam.findUnique({
      where: { id: examId },
      include: { questions: true },
    });

    if (!exam) {
      return NextResponse.json({ error: "Exam not found" }, { status: 404 });
    }

    let score = 0;
    for (const question of exam.questions) {
      const userAnswer = answers[question.id];
      if (!userAnswer) continue;

      const options = JSON.parse(question.options) as {
        label: string;
        text: string;
        isCorrect: boolean;
      }[];

      if (question.type === "Text") {
        // Text questions: give full score if answered
        if (typeof userAnswer === "string" && userAnswer.trim().length > 0) {
          score += question.score;
        }
      } else if (question.type === "MCQ") {
        const correctOption = options.find((o) => o.isCorrect);
        if (correctOption && userAnswer === correctOption.label) {
          score += question.score;
        } else if (userAnswer && exam.negativeMarking) {
          score += exam.negativeMarking;
        }
      } else if (question.type === "Checkbox") {
        const correctLabels = options
          .filter((o) => o.isCorrect)
          .map((o) => o.label);
        const userLabels = Array.isArray(userAnswer) ? userAnswer : [];
        const isCorrect =
          correctLabels.length === userLabels.length &&
          correctLabels.every((l) => userLabels.includes(l));
        if (isCorrect) {
          score += question.score;
        } else if (userLabels.length > 0 && exam.negativeMarking) {
          score += exam.negativeMarking;
        }
      }
    }

    const submission = await prisma.examSubmission.create({
      data: {
        userId: payload.userId,
        examId,
        answers: JSON.stringify(answers),
        score,
        tabSwitches: tabSwitches || 0,
        fullscreenExits: fullscreenExits || 0,
        autoSubmitted: autoSubmitted || false,
      },
    });

    return NextResponse.json({ submission }, { status: 201 });
  } catch (error) {
    console.error("Submit exam error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
