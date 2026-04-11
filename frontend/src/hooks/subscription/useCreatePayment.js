import { useMutation } from "@tanstack/react-query";
import userApi from "../../services/UserApi";
import { toast } from "react-toastify";

function useCreatePayment() {
  const { mutate, isPending, error } = useMutation({
    mutationKey: ["create-payment"],
    mutationFn: (id) => userApi.createPayment(id),
    onSuccess: (data) => {
      toast.success("Redirecting to payment gateway");
      window.location.href = data.session_url;
    },
    onError: (error) => {
      toast.error(error.message || "Failed to create payment");
    },
  });
  return {
    mutate,
    isPending,
    error,
  };
}

export default useCreatePayment;
