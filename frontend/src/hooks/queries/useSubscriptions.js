import { useQuery } from "@tanstack/react-query";
import { subscriptionsApi } from "../../api/subscriptions";
import useAuth from "../useAuth";

export function useActiveSubscription() {
  const { user } = useAuth();
  return useQuery({
    queryKey: ["active-subscription"],
    queryFn: () => subscriptionsApi.getActive(),
    enabled: !!user,
  });
}

export function useSubscriptionDetails() {
  const searchParams = new URLSearchParams(window.location.search);
  const subscriptionId = searchParams.get("subscriptionId");
  return useQuery({
    queryKey: ["subscription"],
    queryFn: () => subscriptionsApi.getById(subscriptionId),
    enabled: !!subscriptionId,
  });
}
