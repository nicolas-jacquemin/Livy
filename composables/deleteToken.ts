export const useDeleteToken = () => {
  return () => {
    document.cookie = "userToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    document.cookie = "userExpires=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
  };
}