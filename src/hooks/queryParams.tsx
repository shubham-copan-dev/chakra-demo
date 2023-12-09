import { usePathname, useSearchParams } from "next/navigation";

const useGetUrlParams = () => {
  const path = usePathname();
  const params = useSearchParams();

  // Extract id from the URL path
  const id = path.split("/")[3] || null;

  // Get page and limit from query parameters
  const page = params.get("page") ?? null;
  const limit = params.get("limit") ?? null;

  return { id, page, limit };
};

export default useGetUrlParams;
