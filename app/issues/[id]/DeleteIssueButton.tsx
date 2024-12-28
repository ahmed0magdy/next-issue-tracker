import { Box, Button } from "@radix-ui/themes";

const DeleteIssueButton = ({ issueId }: { issueId: number }) => {
  return (
    <Box>
      <Button color="red">Delete Issue</Button>
    </Box>
  );
};

export default DeleteIssueButton;
