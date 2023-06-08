export function parseListUtil(value?: string, separator = ','): any[] {
  if (!value) {
    return [];
  }

  const allowedSeparators = [',', ';', '/', '-'];
  if (!allowedSeparators.includes(separator)) {
    throw new Error('separator must be one of allowed: , ; / -');
  }

  const list = value
    .split(separator)
    .map((item) => item.trim())
    .filter((item) => !!item);

  return list;
}
