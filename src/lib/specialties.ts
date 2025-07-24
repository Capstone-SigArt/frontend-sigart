// Utility functions for handling user specialties

export const parseSpecialties = (specialtiesString: unknown): string[] => {
  if (typeof specialtiesString !== 'string') return [];

  return specialtiesString
      .split(',')
      .map(s => s.trim())
      .filter(s => s.length > 0);
};

export const formatSpecialties = (specialties: string[]): string => {
  return specialties
    .map(s => s.trim())
    .filter(s => s.length > 0)
    .join(', ');
};

export const getDefaultSpecialties = (): string[] => {
  return ['Digital Art', 'Creative', 'Portfolio'];
};

export const addHashtags = (specialties: string[]): string[] => {
  return specialties.map(s => s.startsWith('#') ? s : `#${s}`);
};

export const removeHashtags = (specialties: string[]): string[] => {
  return specialties.map(s => s.startsWith('#') ? s.slice(1) : s);
}; 