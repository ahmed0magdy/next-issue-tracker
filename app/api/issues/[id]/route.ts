import { EditIssueSchema } from "@/app/ValidationSchemas";
import prisma from "@/prisma/client";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import authOptions from "../../auth/authOptions";

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({}, { status: 401 });
  const { id } = await params;
  const body = await request.json();
  const validation = EditIssueSchema.safeParse(body);
  if (!validation.success)
    return NextResponse.json(validation.error.format(), { status: 400 });

  const { userId, title, description } = body;
  if (userId) {
    const user = await prisma.user.findUnique({
      where: { id: userId },
    });

    if (!user)
      return NextResponse.json({ error: "Invalid User" }, { status: 400 });
  }

  const issue = await prisma.issue.findUnique({
    where: { id: parseInt(id) },
  });

  if (!issue)
    return NextResponse.json({ error: "Invalid Issue" }, { status: 404 });

  const updatedIssue = await prisma.issue.update({
    where: { id: issue.id },
    data: {
      title,
      description,
      userId,
    },
  });

  return NextResponse.json(updatedIssue);
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  const issue = await prisma.issue.findUnique({
    where: { id: parseInt(id) },
  });

  if (!issue)
    return NextResponse.json({ error: "Invalid Issue" }, { status: 404 });

  await prisma.issue.delete({
    where: { id: issue.id },
  });

  return NextResponse.json({});
}
