import { IssueStatusBadge } from "@/app/components";
import { Issue } from "@prisma/client";
import { Box, Heading, Flex, Card, Text } from "@radix-ui/themes";
import ReactMarkdown from "react-markdown";

const IssueDetails = ({ issue }: { issue: Issue }) => {
  return (
    <Box>
      <Heading as="h2">{issue.title}</Heading>
      <Flex gapX="3" my="2">
        <IssueStatusBadge status={issue.status} />
        <Text>{issue.created_at.toDateString()}</Text>
      </Flex>
      <Card className="prose" mt="4">
        <ReactMarkdown>{issue.description}</ReactMarkdown>
      </Card>
    </Box>
  );
};

export default IssueDetails;
