export const logout = (localItem: string, router: any) => {
  localStorage.removeItem(localItem);
  localStorage.removeItem('token');
  router.push('/');
};
