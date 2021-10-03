import dayjs from 'dayjs'
import { FunctionalComponent } from 'preact'
import { useEffect, useState, useCallback } from 'preact/hooks'
import Ripples from 'react-ripples'

import { HourGlassLoadingWrapper } from '@/common/components/Loading'
import TimeTracker from '@/common/services/timetracker'
import { pad } from '@/common/helpers/utils'
import {
  ClockType,
  ILatestTimeEntry
} from '@/common/services/timetracker/types'

const Clock: FunctionalComponent = () => {
  const [loading, setLoading] = useState(true)
  const [isGetEntryTime, setIsGetEntryTime] = useState(false)

  const [entryTime, setEntryTime] = useState<ILatestTimeEntry | null>(null)
  const [timer, setTimer] = useState<Date | null>(null)
  const [seconds, setSeconds] = useState('00')
  const [minutes, setMinutes] = useState('00')
  const [hours, setHours] = useState('00')

  const [diffTimeInterval, setDiffTimeInterval] = useState<number | false>(
    false
  )

  const getLatestTimeEntry = useCallback(async () => {
    setIsGetEntryTime(true)
    const response = await TimeTracker.getLatestTimeEntry()
    setIsGetEntryTime(false)
    setEntryTime(response)
  }, [isGetEntryTime])

  const onClocking = useCallback(async () => {
    setLoading(true)
    await TimeTracker.clocking(
      entryTime?.clockType === ClockType.IN ? ClockType.OUT : ClockType.IN
    )
    await getLatestTimeEntry()
    setLoading(false)
  }, [entryTime?.clockType])

  const runTimer = useCallback(() => {
    const intervalDiffTime = setInterval(() => {
      setTimer(new Date())
    }, 1000)
    setDiffTimeInterval(intervalDiffTime)
    return intervalDiffTime
  }, [diffTimeInterval])

  const resetTimer = useCallback(() => {
    setLoading(true)
    clearInterval(diffTimeInterval as number)
    setDiffTimeInterval(false)
    setHours('00')
    setMinutes('00')
    setSeconds('00')
    setTimeout(() => {
      setLoading(false)
    }, 1000)
  }, [isGetEntryTime])

  useEffect(() => {
    ;(async () => {
      setLoading(true)
      await getLatestTimeEntry()
      setLoading(false)
    })()
  }, [])

  useEffect(() => {
    const intervalGetEntryTime = setInterval(async () => {
      getLatestTimeEntry()
    }, 60 * 1000)

    return () => {
      clearInterval(intervalGetEntryTime)
    }
  }, [])

  useEffect(() => {
    if (timer !== null || timer !== undefined) {
      const diff = dayjs(timer).diff(entryTime?.time, 's')
      const diffHours = pad(Math.floor(diff! / 3600))
      const diffMinutes = pad(Math.floor((diff! / 60) % 60))
      const diffSeconds = pad(diff! % 60)

      if (hours !== diffHours) setHours(diffHours)
      if (minutes !== diffMinutes) setMinutes(diffMinutes)
      setSeconds(diffSeconds)
    }
  }, [timer])

  useEffect(() => {
    if (
      entryTime?.clockType === ClockType.IN &&
      typeof diffTimeInterval === 'boolean' &&
      !diffTimeInterval
    ) {
      setLoading(true)
      runTimer()
      setTimeout(() => {
        setLoading(false)
      }, 1000)
    } else if (
      entryTime?.clockType === ClockType.OUT &&
      typeof diffTimeInterval === 'number'
    ) {
      resetTimer()
    }

    return () => {
      resetTimer()
    }
  }, [entryTime?.clockType])

  const getFormatCurentEntryTime = () => {
    if (!entryTime) return '00-00-0000 00:00:00'
    return dayjs(entryTime?.time).format('DD-MM-YYYY HH:mm:ss')
  }

  return (
    <HourGlassLoadingWrapper loading={loading}>
      <div className="f-screen h-screen flex justify-center items-center text-primary">
        {/* @ts-ignore */}
        <Ripples className="rounded-xl" color="rgba(0, 0, 0, .3)">
          <div
            className="row w-auto mb-lg bg-seaBlue p-5 rounded-xl bg-opacity-60 backdrop-filter backdrop-blur-lg cursor-pointer"
            onClick={onClocking}
          >
            <div className="col-12 flex justify-center items-center mb-2 text-size-12px">
              {entryTime?.clockType === ClockType.IN
                ? `Start @ ${getFormatCurentEntryTime()}`
                : `Clock Out @ ${getFormatCurentEntryTime()}`}
            </div>
            <div className="font-medium col-12 flex justify-center items-center mb-2">
              <div className="text-size-34px">
                {hours} : {minutes} : {seconds}
              </div>
            </div>
            <div className="col-12 flex justify-center items-center text-size-20px font-medium">
              {entryTime?.clockType === ClockType.IN ? 'Clock Out' : 'Clock In'}
            </div>
          </div>
        </Ripples>
      </div>
    </HourGlassLoadingWrapper>
  )
}

export default Clock
