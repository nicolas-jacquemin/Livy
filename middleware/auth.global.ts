import { useRenewToken } from "~/composables/api/auth/renewToken.api";
import { useSSRRenewToken } from "~/composables/api/auth/renewToken.ssr.api";

export default defineNuxtRouteMiddleware(async (to, from) => {
  const renewToken = (process.server) ? useSSRRenewToken() : useRenewToken();

  if (to.path.includes("/auth")) return;

  try {
    await renewToken();
  } catch (e: any) {
    return await navigateTo({
      name: "auth-login",
      query: { redirect: to.fullPath },
    });
  }
});
