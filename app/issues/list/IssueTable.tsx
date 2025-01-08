import { IssueStatusBadge } from "@/app/components";
import { Issue, Status } from "@prisma/client";
import { ArrowUpIcon } from "@radix-ui/react-icons";
import { Table } from "@radix-ui/themes";
import Link from "next/link";
import NextLink from "next/link";

export interface IssueQuery{
    status: Status;
    orderBy: keyof Issue;
    orderDirection: "asc" | "desc";
    page: string;
    pageSize:string
}

interface Props {
  searchParams: Promise<IssueQuery>;
  issues: Issue[];
}

const IssueTable = async ({ searchParams, issues }: Props) => {
  const params = await searchParams;

  return (
    <Table.Root variant="surface">
      <Table.Header>
        <Table.Row>
          {columns.map((column) => (
            <Table.ColumnHeaderCell
              key={column.value}
              className={column.classname}
            >
              <NextLink
                href={{
                  query: {
                    ...params,
                    orderBy: column.value,
                    orderDirection:
                      column.value === params.orderBy &&
                      params.orderDirection === "asc"
                        ? "desc"
                        : "asc",
                  },
                }}
              >
                {column.label}
              </NextLink>
              {column.value === params.orderBy && (
                <ArrowUpIcon
                  className={`inline ${
                    params.orderDirection === "desc"
                      ? "transform rotate-180"
                      : ""
                  }`}
                />
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
  );
};

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
export const columnNames = columns.map((column) => column.value);
export default IssueTable;
