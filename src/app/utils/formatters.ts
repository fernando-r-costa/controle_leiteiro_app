/**
 * @param dateString
 * @returns
 */
export const formatDateForInput = (dateString: string | null | undefined): string => {
  if (!dateString) {
    return "";
  }
  return dateString.split('T')[0];
};

/**
 * @param dateString
 * @returns
 */
export const formatDateForDisplay = (dateString: string | null | undefined): string => {
  if (!dateString) {
    return "";
  }
  return new Date(dateString).toLocaleDateString("pt-BR", {
    timeZone: 'UTC',
  });
};

/**
 * @param dateString
 * @returns
 */
export const normalizeDateInputForBackend = (dateString: string | null): string | null => {
  if (dateString === "") {
    return null;
  }
  return dateString;
};