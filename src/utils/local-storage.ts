export const saveLocalStorage = (key: string, value: any) => {
  localStorage.setItem(key, JSON?.stringify(value));
};

export const getLocalStorage = (key: string) => {
  const sessionDate = localStorage.getItem(key);
  if (!sessionDate) return null;
  return JSON?.parse(sessionDate);
};

export const destroyLocalSession = (key: string) => {
  localStorage.removeItem(key);
}
