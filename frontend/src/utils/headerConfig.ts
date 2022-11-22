export const headerConfig = {
  headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
};
