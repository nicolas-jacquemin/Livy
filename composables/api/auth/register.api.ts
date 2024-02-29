import { ofetch } from "ofetch";

export type RegisterResponse = {
  token: string;
  expires: string;
};

export const useRegister =
  () =>
  async (name: string, email: string, password: string, inviteCode: string): Promise<RegisterResponse> => {
    const config = useRuntimeConfig();
    return await ofetch<RegisterResponse>(`${config.public.apiUrl}/auth/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, email, password, inviteCode }),
    });
  };
