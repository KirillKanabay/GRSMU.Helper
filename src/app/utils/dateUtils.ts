export function addDays(date: Date, days: number) : Date {
  const result = new Date(date);
  result.setDate(result.getDate() + days);
  return result;
}

export function incDays(date: Date) : Date { 
  return addDays(date, 1); 
}

export function today() : Date{
  const today = new Date();
  return new Date(today.getFullYear(), today.getMonth(), today.getDate());
}

export function toISODate(date: Date) : string {
  var timestamp = date.getTime() - date.getTimezoneOffset() * 60000;
  var correctDate = new Date(timestamp);
  
  correctDate.setUTCHours(0, 0, 0, 0);
  return correctDate.toISOString();
}

export function datesAreEqual(date1: Date, date2: Date) : boolean {
  return date1.getFullYear() === date2.getFullYear() &&
         date1.getMonth() === date2.getMonth() &&
         date1.getDate() === date2.getDate()
}