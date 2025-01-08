"use client";
import { Flex, Select } from "@radix-ui/themes";
import { useRouter, useSearchParams } from "next/navigation";

const PageSizeSelector = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const pageSizes = [10, 20, 30, 50];

  return (
    <Flex>
      <Select.Root
        defaultValue={searchParams.get("pageSize") || "10"}
        onValueChange={(value) => {
          const params = new URLSearchParams(searchParams);
          params.set("pageSize", value);
          params.set("page", "1");
          router.push("?" + params.toString());
        }}
      >
        <Select.Trigger />
        <Select.Content>
          {pageSizes.map((size) => (
            <Select.Item key={size} value={size.toString()}>
              {size} per page
            </Select.Item>
          ))}
        </Select.Content>
      </Select.Root>
    </Flex>
  );
};

export default PageSizeSelector;
