export function saveResendTimer() {
  const expire = Date.now() + 60000;
  localStorage.setItem("can-resend-timer", expire);
}

export function getResendTimer() {
  return Number(localStorage.getItem("can-resend-timer"));
}

export function getResendTimerRemaining() {
  const savedExpire = getResendTimer();
  if (savedExpire) {
    const remaining = Math.floor((savedExpire - Date.now()) / 1000);
    return remaining > 0 ? remaining : 0;
  }
  return 0;
}

export function isResendTimerExpired() {
  return getResendTimerRemaining() === 0;
}

export function resetResendTimer() {
  localStorage.removeItem("can-resend-timer");
}
