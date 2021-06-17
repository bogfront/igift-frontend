export function formatDate (date) {
  let day = String(date.getDate());
  if (day.length === 1) {
    day = '0' + day;
  }

  let month = String((1 + date.getMonth()));
  if (month.length === 1) {
    month = '0' + month;
  }

  return `${day}.${month}.${date.getFullYear()}`;
}
