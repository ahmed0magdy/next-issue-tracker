import { AlertDialog, Box, Button, Flex } from "@radix-ui/themes";

const DeleteIssueButton = ({ issueId }: { issueId: number }) => {
  return (
    <Box>
      <AlertDialog.Root>
        <AlertDialog.Trigger>
          <Button color="red">Delete Issue</Button>
        </AlertDialog.Trigger>
        <AlertDialog.Content>
          <AlertDialog.Title>Confirm Deletion</AlertDialog.Title>
          <AlertDialog.Description>
            Are you sure you want to delete this issue? This action can't be
            undone.
          </AlertDialog.Description>
          <Flex mt="3" gap="3">
            <AlertDialog.Action>
              <Button color="red">Delete Issue</Button>
            </AlertDialog.Action>
            <AlertDialog.Cancel>
              <Button variant="soft" color="yellow">
                Cancel
              </Button>
            </AlertDialog.Cancel>
          </Flex>
        </AlertDialog.Content>
      </AlertDialog.Root>
    </Box>
  );
};

export default DeleteIssueButton;
