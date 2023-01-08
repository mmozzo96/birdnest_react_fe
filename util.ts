import { drone } from "./types"

export function getTimeDiffms(timestamp: string): number {
  const lastSeen = new Date(timestamp)

  const lastSeenDifferencems: number = new Date().getTime() - lastSeen.getTime()

  return lastSeenDifferencems
}

export function getDistance(drone: drone) {
  return Math.sqrt(Math.pow(+drone.positionX-250000, 2)+Math.pow(+drone.positionY-250000, 2))/1000
}