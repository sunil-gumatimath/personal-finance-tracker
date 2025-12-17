import { Area, AreaChart, XAxis, YAxis, CartesianGrid } from 'recharts'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { usePreferences } from '@/hooks/usePreferences'
import { TrendingUp, TrendingDown } from 'lucide-react'
import {
    type ChartConfig,
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent,
    ChartLegend,
    ChartLegendContent,
} from '@/components/ui/chart'

interface MonthlyTrend {
    month: string
    income: number
    expenses: number
}

interface SpendingChartProps {
    data: MonthlyTrend[]
}

const chartConfig = {
    income: {
        label: 'Income',
        color: 'hsl(142.1 76.2% 36.3%)',
    },
    expenses: {
        label: 'Expenses',
        color: 'hsl(346.8 77.2% 49.8%)',
    },
} satisfies ChartConfig

export function SpendingChart({ data }: SpendingChartProps) {
    const { formatCurrency } = usePreferences()

    const totalIncome = data.reduce((sum, item) => sum + item.income, 0)
    const totalExpenses = data.reduce((sum, item) => sum + item.expenses, 0)
    const netFlow = totalIncome - totalExpenses
    const savingsRate = totalIncome > 0 ? ((netFlow / totalIncome) * 100) : 0

    return (
        <Card>
            <CardHeader>
                <div className="flex items-center justify-between">
                    <div>
                        <CardTitle>Income vs Expenses</CardTitle>
                        <CardDescription>Last 6 months overview</CardDescription>
                    </div>
                    <div className="flex items-center gap-4 text-sm">
                        <div className={`flex items-center gap-1 ${netFlow >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                            {netFlow >= 0 ? <TrendingUp className="h-4 w-4" /> : <TrendingDown className="h-4 w-4" />}
                            <span className="font-medium">{formatCurrency(Math.abs(netFlow))}</span>
                        </div>
                        <div className="text-muted-foreground">
                            <span className="font-medium">{savingsRate.toFixed(0)}%</span> savings
                        </div>
                    </div>
                </div>
            </CardHeader>
            <CardContent>
                <ChartContainer config={chartConfig} className="h-[300px] w-full">
                    <AreaChart
                        data={data}
                        margin={{ top: 20, right: 20, left: 0, bottom: 0 }}
                    >
                        <defs>
                            <linearGradient id="fillIncome" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="var(--color-income)" stopOpacity={0.8} />
                                <stop offset="95%" stopColor="var(--color-income)" stopOpacity={0.1} />
                            </linearGradient>
                            <linearGradient id="fillExpenses" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="var(--color-expenses)" stopOpacity={0.8} />
                                <stop offset="95%" stopColor="var(--color-expenses)" stopOpacity={0.1} />
                            </linearGradient>
                        </defs>
                        <CartesianGrid vertical={false} />
                        <XAxis
                            dataKey="month"
                            tickLine={false}
                            axisLine={false}
                            tickMargin={10}
                        />
                        <YAxis
                            tickLine={false}
                            axisLine={false}
                            tickFormatter={(value) => {
                                if (value === 0) return '0'
                                if (Math.abs(value) >= 1000) return `${(value / 1000).toFixed(0)}k`
                                return value.toString()
                            }}
                            tickMargin={10}
                        />
                        <ChartTooltip
                            content={
                                <ChartTooltipContent
                                    indicator="line"
                                    formatter={(value, name) => (
                                        <div className="flex items-center justify-between gap-8">
                                            <span className="text-muted-foreground">{name}</span>
                                            <span className="font-medium">{formatCurrency(Number(value))}</span>
                                        </div>
                                    )}
                                />
                            }
                        />
                        <Area
                            dataKey="income"
                            type="natural"
                            fill="url(#fillIncome)"
                            stroke="var(--color-income)"
                            strokeWidth={2}
                            activeDot={{
                                r: 6,
                                fill: "var(--color-income)",
                                stroke: "hsl(var(--background))",
                                strokeWidth: 2,
                            }}
                        />
                        <Area
                            dataKey="expenses"
                            type="natural"
                            fill="url(#fillExpenses)"
                            stroke="var(--color-expenses)"
                            strokeWidth={2}
                            activeDot={{
                                r: 6,
                                fill: "var(--color-expenses)",
                                stroke: "hsl(var(--background))",
                                strokeWidth: 2,
                            }}
                        />
                        <ChartLegend content={<ChartLegendContent />} />
                    </AreaChart>
                </ChartContainer>
            </CardContent>
        </Card>
    )
}
