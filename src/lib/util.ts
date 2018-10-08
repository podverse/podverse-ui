export const readableDate = (date) => {
  const dateObj = new Date(date),
    year = dateObj.getFullYear(),
    month = dateObj.getMonth() + 1,
    day = dateObj.getDate();


  // If date is within the past 6 days, then display name of day instead of date
  var date6DaysAgo = new Date().getTime() - (6 * 24 * 60 * 60 * 1000);
  var today = new Date();
  var yesterday = new Date(today);
  yesterday.setDate(today.getDate() - 1);

  if (dateObj.getTime() > date6DaysAgo) {
    if (dateObj.getDay() === today.getDay()) {
      return 'Today';
    } else if (dateObj.getDay() === yesterday.getDay()) {
      return 'Yesterday';
    } else {
      const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
      var dayName = days[dateObj.getDay()];
      return dayName
    }
  } else {
    // Else return the date in mm/dd/yyyy format
    return month + '/' + day + '/' + year;
  }
}
