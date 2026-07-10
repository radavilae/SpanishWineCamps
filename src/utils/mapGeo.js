/** Geographic bounds of the Catalonia relief map (Wikimedia Commons) */
export const MAP_GEO = {
  north: 42.99,
  south: 40.405,
  west: -0.55,
  east: 4.02,
  paddingTop: 0.028,
  paddingLeft: 0.022,
  paddingRight: 0.022,
  paddingBottom: 0.028,
}

export function geoToMapPosition(lat, lng, offsets = {}) {
  const { north, south, west, east, paddingTop, paddingLeft, paddingRight, paddingBottom } =
    MAP_GEO

  const innerWidth = 1 - paddingLeft - paddingRight
  const innerHeight = 1 - paddingTop - paddingBottom

  const x =
    paddingLeft + ((lng - west) / (east - west)) * innerWidth + (offsets.x ?? 0)
  const y =
    paddingTop + ((north - lat) / (north - south)) * innerHeight + (offsets.y ?? 0)

  return {
    left: `${Math.max(2, Math.min(98, x * 100)).toFixed(2)}%`,
    top: `${Math.max(2, Math.min(98, y * 100)).toFixed(2)}%`,
  }
}
