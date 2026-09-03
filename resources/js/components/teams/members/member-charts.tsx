import { useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from 'recharts'
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig
} from '@/components/ui/chart'
import type { TasksCount } from '@/types'

export function MemberTasksChart({ tasksCount }: { tasksCount: TasksCount }) {
  const { t } = useTranslation()

  const chartData = useMemo(
    () => [
      {
        high: tasksCount.todo.high,
        low: tasksCount.todo.low,
        medium: tasksCount.todo.medium,
        status: t(($) => $.tasks.statuses.todo)
      },
      {
        high: tasksCount.in_progress.high,
        low: tasksCount.in_progress.low,
        medium: tasksCount.in_progress.medium,
        status: t(($) => $.tasks.statuses.inProgress)
      },
      {
        high: tasksCount.done.high,
        low: tasksCount.done.low,
        medium: tasksCount.done.medium,
        status: t(($) => $.tasks.statuses.done)
      },
      {
        high: tasksCount.other.high,
        low: tasksCount.other.low,
        medium: tasksCount.other.medium,
        status: t(($) => $.other)
      }
    ],
    [t, tasksCount]
  )

  const chartConfig = {
    high: {
      color: '#3e25eb',
      label: t(($) => $.tasks.priorities.high)
    },
    low: {
      color: '#60a5fa',
      label: t(($) => $.tasks.priorities.low)
    },
    medium: {
      color: '#2563eb',
      label: t(($) => $.tasks.priorities.medium)
    }
  } satisfies ChartConfig

  return (
    <ChartContainer
      className="min-h-50 w-full"
      config={chartConfig}
    >
      <BarChart
        accessibilityLayer
        data={chartData}
      >
        <CartesianGrid vertical={false} />
        <XAxis
          axisLine={false}
          dataKey="status"
          tickLine={false}
        />
        <YAxis
          axisLine={false}
          tickLine={false}
          width="auto"
        />
        <ChartTooltip content={<ChartTooltipContent />} />
        <Bar
          dataKey="low"
          fill="var(--color-low)"
          radius={4}
        />
        <Bar
          dataKey="medium"
          fill="var(--color-medium)"
          radius={4}
        />
        <Bar
          dataKey="high"
          fill="var(--color-high)"
          radius={4}
        />
      </BarChart>
    </ChartContainer>
  )
}
