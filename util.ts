export function getTimeDiffms(timestamp: string): number {
  const lastSeen = new Date(timestamp)

  const lastSeenDifferencems: number = new Date().getTime() - lastSeen.getTime()

  return lastSeenDifferencems
}