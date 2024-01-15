const validIANATimezoneCache: Record<string, boolean> = {}

/**
 * check if the provided timezone is supported or not
 */
export function isValidTimezoneIANAString(timeZoneString: string) {
  if (validIANATimezoneCache[timeZoneString])
    return true
  try {
    Intl.DateTimeFormat(undefined, { timeZone: timeZoneString })
    validIANATimezoneCache[timeZoneString] = true
    return true
  }
  catch (error) {
    return false
  }
}

/**
 * The `getLocalTimeZone` from `@internationalized/date` will throw error in Chrome 118
 */
export function getLocalTimeZone() {
  return Intl.DateTimeFormat('id-ID', {
    timeZone: 'GMT', // Asia/Jakarta
  }).resolvedOptions().timeZone
}
