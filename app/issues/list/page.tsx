import Pagination from "@/app/components/pagination";
import prisma from "@/prisma/client";
import { Status } from "@prisma/client";
import { Flex } from "@radix-ui/themes";
import IssueActions from "./IssueActions";
import IssueTable, { columnNames, IssueQuery } from "./IssueTable";

interface Props {
  searchParams: Promise<IssueQuery>;
}

const IssuesPage = async ({ searchParams }: Props) => {
  const params = await searchParams;
  const statusQuery = params.status;
  const orderByQuery = params.orderBy;
  const statuses = Object.values(Status);
  const status = statuses.includes(statusQuery) ? statusQuery : undefined;
  const orderBy = columnNames.includes(orderByQuery)
    ? { [orderByQuery]: params.orderDirection }
    : undefined;

  const page = parseInt(params.page) || 1;
  const pageSize = 10;

  const issues = await prisma.issue.findMany({
    where: {
      status,
    },
    orderBy,
    skip: (page - 1) * pageSize,
    take: pageSize,
  });

  const issueCount = await prisma.issue.count({
    where: {
      status,
    },
  });

  return (
    <Flex direction="column" gap="3">
      <IssueActions />
      <IssueTable searchParams={searchParams} issues={issues} />
      <Pagination
        itemCount={issueCount}
        pageSize={pageSize}
        currentPage={page}
      />
    </Flex>
  );
};
export const dynamic = "force-dynamic";

export default IssuesPage;
