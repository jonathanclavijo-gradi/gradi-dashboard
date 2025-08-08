"use client"

import { TrendingUp } from "lucide-react"
import { Pie, PieChart } from "recharts"

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader
} from '~/components/ui/card'
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "~/components/ui/chart"
import { kpis } from "~/data/kips"

export const description = "A simple pie chart"

export function ChartPieSimple() {
  const numericKpis = kpis
  .map((item) => ({
    label: item.label,
    value: typeof item.value === "string"
      ? parseFloat(item.value.replace(/[^0-9.-]+/g, ""))
      : item.value,
  }))
  .filter((item) => !isNaN(item.value));

  const chartConfig = numericKpis.reduce((acc, kpi, index) => {
    acc[kpi.label] = {
      label: kpi.label,
      color: kpi.color,
    }
    return acc
  }, {} as ChartConfig)

  return (
    <Card className="flex flex-col bg-gray-300 border-0">
      <CardHeader className="items-center pb-0">
        <CardDescription>January - June 2024</CardDescription>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto max-h-[200px]"
        >
          <PieChart>
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Pie 
              data={numericKpis} 
              outerRadius={50}
              label
              dataKey="value"
              nameKey="label" 
            />
          </PieChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col gap-2 text-sm">
        <div className="flex items-center gap-2 leading-none font-medium">
          Trending up by 5.2% this month 
          <TrendingUp className="h-4 w-4" />
        </div>
        <div className="text-muted-foreground leading-none">
          Showing total visitors for the last 6 months
        </div>
      </CardFooter>
    </Card>
  )
}