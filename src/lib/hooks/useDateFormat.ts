export function useDateFormat(date: Date): string {
  return new Intl.DateTimeFormat('en-US').format(date)
}
