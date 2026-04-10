import { PrismaClient } from "../src/generated/prisma/client";
import { PrismaLibSql } from "@prisma/adapter-libsql";
import bcrypt from "bcryptjs";

const adapter = new PrismaLibSql({ url: "file:dev.db" });
const prisma = new PrismaClient({ adapter });

async function main() {
  console.log("Seeding database...");

  // Clear existing data
  await prisma.examSubmission.deleteMany();
  await prisma.question.deleteMany();
  await prisma.exam.deleteMany();
  await prisma.user.deleteMany();

  const hashedPassword = await bcrypt.hash("password123", 10);

  // Create employer users
  const employer1 = await prisma.user.create({
    data: {
      email: "employer@akij.com",
      password: hashedPassword,
      name: "Arif Hossain",
      refId: "16101121",
      role: "employer",
    },
  });

  const employer2 = await prisma.user.create({
    data: {
      email: "hr@akij.com",
      password: hashedPassword,
      name: "Fatima Rahman",
      refId: "16101122",
      role: "employer",
    },
  });

  // Create candidate users
  const candidate1 = await prisma.user.create({
    data: {
      email: "candidate@akij.com",
      password: hashedPassword,
      name: "Md. Naimur Rahman",
      refId: "12341341",
      role: "candidate",
    },
  });

  const candidate2 = await prisma.user.create({
    data: {
      email: "john@example.com",
      password: hashedPassword,
      name: "Jhon Smith Doe",
      refId: "12341342",
      role: "candidate",
    },
  });

  const candidate3 = await prisma.user.create({
    data: {
      email: "sarah@example.com",
      password: hashedPassword,
      name: "Sarah Ahmed",
      refId: "12341343",
      role: "candidate",
    },
  });

  const candidate4 = await prisma.user.create({
    data: {
      email: "karim@example.com",
      password: hashedPassword,
      name: "Abdul Karim",
      refId: "12341344",
      role: "candidate",
    },
  });

  const candidate5 = await prisma.user.create({
    data: {
      email: "riya@example.com",
      password: hashedPassword,
      name: "Riya Sharma",
      refId: "12341345",
      role: "candidate",
    },
  });

  // Create Exam 1: Management Trainee Officer (MCQ)
  const exam1 = await prisma.exam.create({
    data: {
      title: "Psychometric Test for Management Trainee Officer",
      totalCandidates: 10000,
      totalSlots: 3,
      totalQuestionSet: 2,
      questionType: "MCQ",
      startTime: new Date("2026-04-10T09:00:00Z"),
      endTime: new Date("2026-04-15T18:00:00Z"),
      duration: 30,
      negativeMarking: -0.25,
      creatorId: employer1.id,
      questions: {
        create: [
          {
            title: "What is the Capital of Bangladesh?",
            type: "MCQ",
            options: JSON.stringify([
              { label: "A", text: "Dhaka", isCorrect: true },
              { label: "B", text: "Chattogram", isCorrect: false },
              { label: "C", text: "Rajshahi", isCorrect: false },
              { label: "D", text: "Barishal", isCorrect: false },
            ]),
            score: 1,
            order: 1,
          },
          {
            title: "Which of the following indicators is used to measure market volatility?",
            type: "MCQ",
            options: JSON.stringify([
              { label: "A", text: "Relative Strength Index (RSI)", isCorrect: false },
              { label: "B", text: "Moving Average Convergence Divergence (MACD)", isCorrect: false },
              { label: "C", text: "Bollinger Bands", isCorrect: true },
              { label: "D", text: "Fibonacci Retracement", isCorrect: false },
            ]),
            score: 1,
            order: 2,
          },
          {
            title: "What is the full form of GDP?",
            type: "MCQ",
            options: JSON.stringify([
              { label: "A", text: "Gross Domestic Product", isCorrect: true },
              { label: "B", text: "General Development Plan", isCorrect: false },
              { label: "C", text: "Global Distribution Protocol", isCorrect: false },
              { label: "D", text: "Government Development Program", isCorrect: false },
            ]),
            score: 1,
            order: 3,
          },
          {
            title: "Which bank is the central bank of Bangladesh?",
            type: "MCQ",
            options: JSON.stringify([
              { label: "A", text: "Sonali Bank", isCorrect: false },
              { label: "B", text: "Bangladesh Bank", isCorrect: true },
              { label: "C", text: "Janata Bank", isCorrect: false },
              { label: "D", text: "Agrani Bank", isCorrect: false },
            ]),
            score: 1,
            order: 4,
          },
          {
            title: "What is the currency of Bangladesh?",
            type: "MCQ",
            options: JSON.stringify([
              { label: "A", text: "Rupee", isCorrect: false },
              { label: "B", text: "Dollar", isCorrect: false },
              { label: "C", text: "Taka", isCorrect: true },
              { label: "D", text: "Yen", isCorrect: false },
            ]),
            score: 1,
            order: 5,
          },
        ],
      },
    },
  });

  // Create Exam 2: Mixed type
  const exam2 = await prisma.exam.create({
    data: {
      title: "Probationary Officer Written Test",
      totalCandidates: 5000,
      totalSlots: 2,
      totalQuestionSet: 1,
      questionType: "Mixed",
      startTime: new Date("2026-04-12T09:00:00Z"),
      endTime: new Date("2026-04-20T18:00:00Z"),
      duration: 45,
      negativeMarking: 0,
      creatorId: employer1.id,
      questions: {
        create: [
          {
            title: "Which of the following are programming languages?",
            type: "Checkbox",
            options: JSON.stringify([
              { label: "A", text: "Python", isCorrect: true },
              { label: "B", text: "HTML", isCorrect: false },
              { label: "C", text: "JavaScript", isCorrect: true },
              { label: "D", text: "CSS", isCorrect: false },
            ]),
            score: 2,
            order: 1,
          },
          {
            title: "What does API stand for?",
            type: "MCQ",
            options: JSON.stringify([
              { label: "A", text: "Application Programming Interface", isCorrect: true },
              { label: "B", text: "Application Process Integration", isCorrect: false },
              { label: "C", text: "Automated Program Instruction", isCorrect: false },
              { label: "D", text: "Advanced Protocol Interface", isCorrect: false },
            ]),
            score: 1,
            order: 2,
          },
          {
            title: "Write a brief about your experience with banking software.",
            type: "Text",
            options: JSON.stringify([]),
            score: 5,
            order: 3,
          },
        ],
      },
    },
  });

  // Create Exam 3: Not Set values
  await prisma.exam.create({
    data: {
      title: "Senior Executive Assessment",
      totalCandidates: 0,
      totalSlots: 0,
      totalQuestionSet: 0,
      questionType: "MCQ",
      startTime: new Date("2026-05-01T09:00:00Z"),
      endTime: new Date("2026-05-10T18:00:00Z"),
      duration: 60,
      negativeMarking: -0.5,
      creatorId: employer1.id,
    },
  });

  // Create Exam by second employer
  await prisma.exam.create({
    data: {
      title: "IT Officer Technical Assessment",
      totalCandidates: 2000,
      totalSlots: 4,
      totalQuestionSet: 2,
      questionType: "MCQ",
      startTime: new Date("2026-04-15T09:00:00Z"),
      endTime: new Date("2026-04-25T18:00:00Z"),
      duration: 40,
      negativeMarking: -0.25,
      creatorId: employer2.id,
      questions: {
        create: [
          {
            title: "What is the time complexity of binary search?",
            type: "MCQ",
            options: JSON.stringify([
              { label: "A", text: "O(n)", isCorrect: false },
              { label: "B", text: "O(log n)", isCorrect: true },
              { label: "C", text: "O(n log n)", isCorrect: false },
              { label: "D", text: "O(1)", isCorrect: false },
            ]),
            score: 1,
            order: 1,
          },
        ],
      },
    },
  });

  // Create some exam submissions
  await prisma.examSubmission.create({
    data: {
      userId: candidate1.id,
      examId: exam1.id,
      answers: JSON.stringify({
        [exam1.id + "_q1"]: "A",
        [exam1.id + "_q2"]: "C",
        [exam1.id + "_q3"]: "A",
      }),
      score: 3,
      tabSwitches: 1,
      fullscreenExits: 0,
      autoSubmitted: false,
    },
  });

  await prisma.examSubmission.create({
    data: {
      userId: candidate2.id,
      examId: exam1.id,
      answers: JSON.stringify({
        [exam1.id + "_q1"]: "A",
        [exam1.id + "_q2"]: "B",
      }),
      score: 0.75,
      tabSwitches: 3,
      fullscreenExits: 2,
      autoSubmitted: true,
    },
  });

  await prisma.examSubmission.create({
    data: {
      userId: candidate3.id,
      examId: exam1.id,
      answers: JSON.stringify({
        [exam1.id + "_q1"]: "A",
        [exam1.id + "_q2"]: "C",
        [exam1.id + "_q3"]: "A",
        [exam1.id + "_q4"]: "B",
        [exam1.id + "_q5"]: "C",
      }),
      score: 5,
      tabSwitches: 0,
      fullscreenExits: 0,
      autoSubmitted: false,
    },
  });

  await prisma.examSubmission.create({
    data: {
      userId: candidate4.id,
      examId: exam2.id,
      answers: JSON.stringify({
        [exam2.id + "_q1"]: ["A", "C"],
        [exam2.id + "_q2"]: "A",
        [exam2.id + "_q3"]: "I have 3 years of experience...",
      }),
      score: 8,
      tabSwitches: 0,
      fullscreenExits: 1,
      autoSubmitted: false,
    },
  });

  await prisma.examSubmission.create({
    data: {
      userId: candidate5.id,
      examId: exam1.id,
      answers: JSON.stringify({}),
      score: 0,
      tabSwitches: 5,
      fullscreenExits: 3,
      autoSubmitted: true,
    },
  });

  console.log("Seed completed successfully!");
  console.log(`
Demo credentials:
  Employer: employer@akij.com / password123
  Candidate: candidate@akij.com / password123
  `);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
