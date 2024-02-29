import { useRenewToken } from "~/composables/api/auth/renewToken.api";

export default defineNuxtRouteMiddleware(async (to, from) => {
  if (process.server) return;

  if (to.path.includes("/auth")) return;

  const token = document.cookie
    .split("; ")
    .find((row) => row.startsWith("userToken"))
    ?.split("=")[1];
  const expires = document.cookie
    .split("; ")
    .find((row) => row.startsWith("userExpires"))
    ?.split("=")[1];

  if (!token || !expires || new Date(expires) < new Date()) {
    return navigateTo("/auth/login");
  }
  console.log("auth.global.ts");

  const renewToken = useRenewToken();
  const saveTokenToCookies = useSaveTokenToCookies();

  try {
    const user = await renewToken(token);
    saveTokenToCookies(user.token, user.expires);
  } catch (e) {
    document.cookie = `token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/`;
    return navigateTo("/auth/login");
  }
});
