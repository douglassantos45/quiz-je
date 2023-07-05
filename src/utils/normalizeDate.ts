export const normalizeDate = (date: Date = new Date()) => {
  return String(new Date(date).toLocaleString('pt-br', {
    day: 'numeric',
    month: 'short',
    year: '2-digit',

  }));
} 
