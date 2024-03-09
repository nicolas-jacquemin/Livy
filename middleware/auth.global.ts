import { useLogout } from "~/composables/api/auth/logout.api";
import { useRenewToken } from "~/composables/api/auth/renewToken.api";

export default defineNuxtRouteMiddleware(async (to, from) => {
  if (process.server) return;

  const logout = useLogout();

  const renewToken = useRenewToken();

  if (to.path.includes("/auth"))
    return;

  try {
    await renewToken();
  } catch (e: any) {
    logout();
    return navigateTo("/auth/login");
  }
});
