export const decodeAmount = (text: string) => {
  return text.replace(/[ ,+-]/g, '');
};

export const encodeAmount = (x: string | number) => {
  let text = x.toString();
  if (text.startsWith('.')) {
    text = '0' + text;
  }
  const parts = text.split('.');
  parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  return parts.join('.');
};
