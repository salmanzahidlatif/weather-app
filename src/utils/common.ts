
export const getFilterWeatherByDateRange = (
  data: TArrayOfObjects, 
  startDate: Date, 
  endDate: Date
) => {
  return data.filter((item: TObject) => {
  endDate.setHours(23,59,59,999)
  return item?.date >= startDate.getTime() && item?.date <= endDate.getTime()
})
}
