import { ofetch } from "ofetch";

export type LoginResponse = {
  token: string;
  expires: string;
};

export const useLogin =
  () =>
  async (email: string, password: string): Promise<LoginResponse> => {
    const config = useRuntimeConfig();
    return await ofetch<LoginResponse>(`${config.public.apiUrl}/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });
  };
