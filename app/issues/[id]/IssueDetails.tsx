"use client";
import { IssueStatusBadge } from "@/app/components";
import StatusSelect from "@/app/issues/[id]/StatusSelect";
import { Issue, Status } from "@prisma/client";
import { Box, Heading, Flex, Card, Text } from "@radix-ui/themes";
import axios from "axios";
import { useSession } from "next-auth/react";
import { useState } from "react";
import toast from "react-hot-toast";
import ReactMarkdown from "react-markdown";

const IssueDetails = ({ issue }: { issue: Issue }) => {
  const { status } = useSession();
  const [statusState, setStatusState] = useState(issue.status);
  const handleStatusChange = async (newStatus: Status) => {
    try {
      await axios.patch(`/api/issues/${issue.id}`, {
        status: newStatus,
      });
      setStatusState(newStatus);
    } catch (error) {
      toast.error("Changes could not be saved");
    }
  };
    // const mutation = useMutation({
    //   mutationFn: (newStatus: Status) =>
    //     axios.patch(`/api/issues/${issue.id}`, {
    //       status: newStatus,
    //     }),
    //   onSuccess: (_, newStatus) => {
    //     setStatusState(newStatus);
    //   },
    // });

  return (
    <Box>
      <Heading as="h2">{issue.title}</Heading>
      <Flex gapX="3" my="2">
        {status === "unauthenticated" && (
          <IssueStatusBadge status={issue.status} />
        )}
        {status === "authenticated" && (
          <StatusSelect
            currentStatus={statusState}
            onStatusChange={handleStatusChange}
          />
        )}
        <Text>{issue.created_at.toDateString()}</Text>
      </Flex>
      <Card className="prose" mt="4">
        <ReactMarkdown>{issue.description}</ReactMarkdown>
      </Card>
    </Box>
  );
};

export default IssueDetails;
