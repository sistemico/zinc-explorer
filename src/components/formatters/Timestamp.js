import React, { useMemo } from 'react'
import { formatDistance } from 'date-fns'

const Timestamp = ({ value, defaultValue = '-', formatter = formatDistance }) => {
  const date = useMemo(() => value * 1000, [value])
  const now = new Date()

  return <span>{value ? formatter(date, now) : defaultValue}</span>
}

export default Timestamp
