import dayjs from 'dayjs'
import dayjsPluginUTC from 'dayjs/plugin/utc'
dayjs.extend(dayjsPluginUTC);

export const formateUTCDateWithTimezone = (date: string, timezone: string, formatType?: string) => {
  return dayjs
    .utc(date)
    .utcOffset(timezone)
    .format(formatType && formatType)
};