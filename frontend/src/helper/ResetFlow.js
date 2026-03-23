export function saveResetPasswordFlow(step, email, otp) {
  sessionStorage.setItem(
    "reset-password-flow",
    JSON.stringify({ step, email, otp }),
  );
}

export function getResetPasswordFlow() {
  return JSON.parse(sessionStorage.getItem("reset-password-flow"));
}

export function removeResetPasswordFlow() {
  sessionStorage.removeItem("reset-password-flow");
}
