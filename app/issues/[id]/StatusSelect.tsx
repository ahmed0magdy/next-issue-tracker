import { Status } from "@prisma/client";
import { Select } from "@radix-ui/themes";

const StatusSelect = ({
  currentStatus,
  onStatusChange,
}: {
  currentStatus: Status;
  onStatusChange: (status: Status) => void;
}) => {
  return (
    <Select.Root value={currentStatus} onValueChange={onStatusChange}>
      <Select.Trigger />
      <Select.Content>
        <Select.Item value="OPEN">Open</Select.Item>
        <Select.Item value="IN_PROGRESS">In Progress</Select.Item>
        <Select.Item value="CLOSED">Closed</Select.Item>
      </Select.Content>
    </Select.Root>
  );
};

export default StatusSelect;
