import { useQuery } from "@tanstack/react-query";
import { subscriptionApi } from "../../services/SubscriptionApi";

function useGetSubscription() {
  const searchParams = new URLSearchParams(window.location.search);
  const subscriptionId = searchParams.get("subscriptionId");
  console.log(subscriptionId);
  const { data } = useQuery({
    queryKey: ["subscription"],
    queryFn: () => subscriptionApi.getSubscription(subscriptionId),
    enabled: !!subscriptionId,
  });
  return { data };
}

export default useGetSubscription;
