export function groupHourlyToDailyMean(hourlyData) {
  const dailyMap = {};

  hourlyData?.time?.forEach((time, index) => {
    const date = time.split("T")[0];

    if (!dailyMap[date]) {
      dailyMap[date] = {
        date,
        pm10: [],
        pm2_5: [],
      };
    }

    dailyMap[date].pm10.push(hourlyData.pm10[index]);
    dailyMap[date].pm2_5.push(hourlyData.pm2_5[index]);
  });

  return Object.values(dailyMap).map((day) => {
    // Calculate means
    const meanPm10 = day.pm10.reduce((a, b) => a + b, 0) / day.pm10.length;
    const meanPm2_5 = day.pm2_5.reduce((a, b) => a + b, 0) / day.pm2_5.length;

    return {
      date: day.date,
      // Round to 2 decimal places and convert back to Number
      pm10: Number(meanPm10.toFixed(2)),
      pm2_5: Number(meanPm2_5.toFixed(2)),
    };
  });
}
