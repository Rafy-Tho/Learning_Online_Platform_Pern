import { useQuery } from "@tanstack/react-query";
import { subscriptionApi } from "../../services/SubscriptionApi";
import useAuth from "../useAuth";

const useGetActiveSubscription = () => {
  const { user } = useAuth();
  const { data, isPending, error } = useQuery({
    queryKey: ["active-subscription"],
    queryFn: () => subscriptionApi.getActiveSubscription(),
    enabled: !!user,
  });
  return { data, isPending, error };
};
export default useGetActiveSubscription;
