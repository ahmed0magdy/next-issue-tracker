import prisma from "@/prisma/client";
import IssueForm from "../../_components/IssueForm";
import { notFound } from "next/navigation";

const EditIssuePage = async ({ params }: { params: { id: string } }) => {
  const { id } = await params;
  const issue = await prisma.issue.findUnique({
    where: { id: parseInt(id) },
  });
  if (!issue) notFound();
  return <IssueForm issue={issue} />;
};
export default EditIssuePage;
