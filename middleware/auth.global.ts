import { useRenewToken } from "~/composables/api/auth/renewToken.api";

export default defineNuxtRouteMiddleware(async (to, from) => {
  if (process.server) return;

  if (to.path.includes("/auth")) return;

  const deleteToken = useDeleteToken();

  const token = document.cookie
    .split("; ")
    .find((row) => row.startsWith("userToken"))
    ?.split("=")[1];
  const expires = document.cookie
    .split("; ")
    .find((row) => row.startsWith("userExpires"))
    ?.split("=")[1];

  if (!token || !expires || new Date(expires) < new Date()) {
    deleteToken();
    return navigateTo("/auth/login");
  }

  const renewToken = useRenewToken();
  const saveTokenToCookies = useSaveTokenToCookies();

  try {
    const user = await renewToken(token);
    saveTokenToCookies(user.token, user.expires);
  } catch (e) {
    deleteToken();
    return navigateTo("/auth/login");
  }
});
