export const blockAccess = (localItem: string, router: any) => {
  if (typeof window !== 'undefined') {
    const item = JSON.parse(localStorage.getItem(localItem) || '{}');

    if (item.level !== localItem) {
      alert('Anda tidak memiliki akses ke halaman ini!');
      localStorage.clear();
      router.push('/');
    }
  }
};
