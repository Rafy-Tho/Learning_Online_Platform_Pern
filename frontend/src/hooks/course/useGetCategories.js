import { useQuery } from "@tanstack/react-query";
import categoryApi from "../../services/CategoryApi";

function useGetCategories() {
  const { data, isPending, error } = useQuery({
    queryKey: ["categories"],
    queryFn: () => categoryApi.getCategories(),
  });

  return { data, isPending, error };
}
export default useGetCategories;
