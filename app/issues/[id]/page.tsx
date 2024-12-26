import prisma from "@/prisma/client";
import { notFound } from "next/navigation";

const issueDetails = async ({ params }: { params: { id: string } }) => {
  const { id } = await params;
  const issue = await prisma.issue.findUnique({
    where: { id: parseInt(id) },
  });

  if (!issue) return notFound();
  return (
    <div>
      <p>{issue.title}</p>
      <p>{issue.description}</p>
      <p>{issue.status}</p>
      <p>{issue.created_at.toDateString()}</p>
    </div>
  );
};
export default issueDetails;
