import useGetActiveSubscription from "../../hooks/subscription/useGetActiveSubscription";
import SpinnerLoader from "../../ui/SpinnerLoader";
import Subscribed from "./Subscribed";
import Subscription from "./Subscription";

function SubscriptionContainer() {
  const { data, isPending } = useGetActiveSubscription();
  const activeSubscription = data?.data || null;
  if (isPending) return <SpinnerLoader />;
  return activeSubscription ? (
    <Subscribed data={activeSubscription} />
  ) : (
    <Subscription />
  );
}

export default SubscriptionContainer;
