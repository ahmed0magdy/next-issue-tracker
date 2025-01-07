import prisma from "@/prisma/client";
import { Flex, Grid } from "@radix-ui/themes";
import { notFound } from "next/navigation";
import EditIssueButton from "./EditIssueButton";
import IssueDetails from "./IssueDetails";
import DeleteIssueButton from "./DeleteIssueButton";
import { getServerSession } from "next-auth";
import authOptions from "@/app/api/auth/authOptions";
import AssigneeSelect from "./AssigneeSelect";

const issueDetailPage = async ({
  params,
}: {
  params: Promise<{ id: string }>;
}) => {
  const session = await getServerSession(authOptions);
  const { id } = await params;
  const issue = await prisma.issue.findUnique({
    where: { id: parseInt(id) },
  });
  if (!issue) return notFound();
  return (
    <Grid columns={{ initial: "1", md: "2" }} gap="5">
      <IssueDetails issue={issue} />
      {session && (
        <Flex direction={"column"} gap="3">
          <AssigneeSelect issue={issue} />
          <EditIssueButton issueId={issue.id} />
          <DeleteIssueButton issueId={issue.id} />
        </Flex>
      )}
    </Grid>
  );
};
export default issueDetailPage;
