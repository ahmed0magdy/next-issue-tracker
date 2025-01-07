"use client";
import { Issue, User } from "@prisma/client";
import { Select } from "@radix-ui/themes";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Skeleton } from "@/app/components";
import toast, { Toaster } from "react-hot-toast";

const AssigneeSelect = ({ issue }: { issue: Issue }) => {
  const {
    data: users,
    error,
    isLoading,
  } = useQuery({
    queryKey: ["users"],
    queryFn: () => axios.get<User[]>("/api/users").then((res) => res.data),
    staleTime: 60 * 1000,
    retry: 3,
  });
  if (isLoading) return <Skeleton />;
  if (error) return null;

  return (
    <>
      <Select.Root
        defaultValue={issue.userId || ""}
        onValueChange={(userId) => {
          axios
            .patch("/xapi/issues/" + issue.id, {
              userId: userId == "unassign" ? null : userId,
            })
            .catch(() => toast.error("Changes could not be saved"));
        }}
      >
        <Select.Trigger placeholder="Assignee" />
        <Select.Content>
          <Select.Group>
            <Select.Label>Suggestions</Select.Label>
            <Select.Item value="unassign">UnAssigned</Select.Item>
            {users?.map((user) => (
              <Select.Item key={user.id} value={user.id}>
                {user.name}
              </Select.Item>
            ))}
          </Select.Group>
        </Select.Content>
      </Select.Root>
      <Toaster />
    </>
  );
};

export default AssigneeSelect;
