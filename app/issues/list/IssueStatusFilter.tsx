import { Status } from "@prisma/client";
import { Select } from "@radix-ui/themes";
const statuses: { label: string; value: Status }[] = [
  { label: "Open", value: "OPEN" },
  { label: "closed", value: "CLOSED" },
  { label: "IN Progress", value: "IN_PROGRESS" },
];
const IssueStatusFilter = () => {
  return (
    <Select.Root>
      <Select.Trigger placeholder="Filter by Status" />
      <Select.Content>
        <Select.Item key="all" value="all">
          All
        </Select.Item>
        {statuses.map((status) => (
          <Select.Item key={status.value} value={status.value}>
            {status.label}
          </Select.Item>
        ))}
      </Select.Content>
    </Select.Root>
  );
};

export default IssueStatusFilter;
