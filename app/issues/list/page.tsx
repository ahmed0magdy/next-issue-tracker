import prisma from "@/prisma/client";
import { Table } from "@radix-ui/themes";
import IssueActions from "./IssueActions";
import { IssueStatusBadge, Link } from "@/app/components";
import NextLink from "next/link";
import { Issue, Status } from "@prisma/client";
import { ArrowUpIcon } from "@radix-ui/react-icons";

interface Props {
  searchParams: Promise<{ status: Status; orderBy: keyof Issue }>;
}

const IssuesPage = async ({ searchParams }: Props) => {
  const columns: {
    label: string;
    value: keyof Issue;
    classname?: string;
  }[] = [
    { label: "Issue", value: "title" },
    { label: "Status", value: "status", classname: "hidden md:table-cell" },
    {
      label: "Created",
      value: "created_at",
      classname: "hidden md:table-cell",
    },
  ];
  const params = await searchParams;
  const statusQuery = params.status;
  const orderByQuery = params.orderBy;
  const statuses = Object.values(Status);
  const status = statuses.includes(statusQuery) ? statusQuery : undefined;
  const orderBy = columns.map((column) => column.value).includes(orderByQuery)
    ? { [orderByQuery]: "asc" }
    : undefined;

  const issues = await prisma.issue.findMany({
    where: {
      status,
    },
    orderBy,
  });
  return (
    <div>
      <IssueActions />
      <Table.Root variant="surface">
        <Table.Header>
          <Table.Row>
            {columns.map((column) => (
              <Table.ColumnHeaderCell
                key={column.value}
                className={column.classname}
              >
                <NextLink
                  href={{ query: { ...params, orderBy: column.value } }}
                >
                  {column.label}
                </NextLink>
                {column.value === params.orderBy && (
                  <ArrowUpIcon className="inline" />
                )}
              </Table.ColumnHeaderCell>
            ))}
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {issues.map((issue) => (
            <Table.Row key={issue.id}>
              <Table.Cell>
                <Link href={`/issues/${issue.id}`}>{issue.title}</Link>
                <div className="block md:hidden">
                  <IssueStatusBadge status={issue.status}></IssueStatusBadge>
                </div>
              </Table.Cell>
              <Table.Cell className="hidden md:table-cell">
                <IssueStatusBadge status={issue.status}></IssueStatusBadge>
              </Table.Cell>
              <Table.Cell className="hidden md:table-cell">
                {issue.created_at.toDateString()}
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table.Root>
    </div>
  );
};
export const dynamic = "force-dynamic";

export default IssuesPage;
