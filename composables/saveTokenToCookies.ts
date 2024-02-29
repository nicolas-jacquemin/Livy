export const useSaveTokenToCookies = () => {
  return (token: string, expires: string) => {
    document.cookie = `userToken=${token}; expires=${expires}; path=/;`;
    document.cookie = `userExpires=${expires}; expires=${expires}; path=/`;
  }
};