import dayjs from 'dayjs'
import { FunctionalComponent } from 'preact'
import { useEffect, useState } from 'preact/hooks'

import { withLoading } from '@/common/hoc/withLoading'
import TimeTracker from '@/common/services/timetracker'
import { pad } from '@/common/helpers/utils'

const Clock: FunctionalComponent = () => {

  const [entryTime, setEntryTime] = useState<dayjs.Dayjs | null>(null)
  const [timer, setTimer] = useState<Date | null>(null)
  const [seconds, setSeconds] = useState('00')
  const [minutes, setMinutes] = useState('00')
  const [hours, setHours] = useState('00')

  const getLatestTimeEntry = async () => {
    const response = await TimeTracker.getLatestTimeEntry()
    setEntryTime(dayjs(response.time))
  }

  useEffect(() => {
    getLatestTimeEntry()
  }, [])

  useEffect(() => {
    const intervalGetEntryTime = setInterval(async () => {
      getLatestTimeEntry()
    }, 3 * 60 * 1000)

    const intervalDiffTime = setInterval(() => {
      setTimer(new Date())
    }, 1000)

    return () => {
      clearInterval(intervalDiffTime)
      clearInterval(intervalGetEntryTime)
    }
  }, [])

  useEffect(() => {
    const diff = dayjs(timer).diff(entryTime, 's')
    if (timer !== null || timer !== undefined) {
      const diffHours = pad(Math.floor(diff! / 3600))
      const diffMinutes = pad(Math.floor((diff! / 60) % 60))
      const diffSeconds = pad(diff! % 60)

      if (hours !== diffHours) setHours(diffHours)
      if (minutes !== diffMinutes) setMinutes(diffMinutes)
      setSeconds(diffSeconds)
    }
  }, [timer])
  return (
    <div className="f-screen h-screen flex justify-center items-center">
      <div>{`${hours}:${minutes}:${seconds}`}</div>
    </div>
  )
}

export default withLoading(Clock)
