import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card'
import type { FinancialHealth } from '@/hooks/useFinancialHealth'
import { Activity, ShieldCheck, PieChartIcon, TrendingUp, Lightbulb, ChevronRight } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Skeleton } from '@/components/ui/skeleton'
import { Button } from '@/components/ui/button'
import { useState } from 'react'
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
} from '@/components/ui/dialog'

interface FinancialHealthScoreProps {
    data: FinancialHealth | null
    loading: boolean
}

export function FinancialHealthScore({ data, loading }: FinancialHealthScoreProps) {
    const [open, setOpen] = useState(false)

    if (loading || !data) {
        return (
            <Card className="h-full border-border/50 bg-card/50">
                <CardHeader>
                    <Skeleton className="h-4 w-32" />
                </CardHeader>
                <CardContent className="flex flex-col items-center gap-4">
                    <Skeleton className="h-32 w-32 rounded-full" />
                    <div className="w-full space-y-2">
                        <Skeleton className="h-2 w-full" />
                        <Skeleton className="h-2 w-full" />
                    </div>
                </CardContent>
            </Card>
        )
    }

    const { score, savingsRate, budgetAdherence, emergencyFundProgress, nextSteps } = data

    const getScoreColor = (s: number) => {
        if (s >= 80) return 'text-emerald-500'
        if (s >= 60) return 'text-blue-500'
        if (s >= 40) return 'text-amber-500'
        return 'text-rose-500'
    }

    // Get the fill color for the gauge arc
    const getGaugeFillColor = (s: number) => {
        if (s >= 80) return 'hsl(142.1, 76.2%, 36.3%)' // emerald-500
        if (s >= 60) return 'hsl(217.2, 91.2%, 59.8%)' // blue-500
        if (s >= 40) return 'hsl(37.7, 92.1%, 50.2%)'  // amber-500
        return 'hsl(346.8, 77.2%, 49.8%)'             // rose-500
    }

    const getScoreStatus = (s: number) => {
        if (s >= 80) return 'Excellent'
        if (s >= 60) return 'Good'
        if (s >= 40) return 'Average'
        return 'Needs Attention'
    }

    // Get badge background styling based on score
    const getScoreBadgeStyle = (s: number) => {
        if (s >= 80) return 'bg-emerald-500/10 border-emerald-500/30'
        if (s >= 60) return 'bg-blue-500/10 border-blue-500/30'
        if (s >= 40) return 'bg-amber-500/10 border-amber-500/30'
        return 'bg-rose-500/10 border-rose-500/30'
    }

    return (
        <>
            <Card className="h-full border-border/50 bg-card/50 backdrop-blur-sm overflow-hidden group flex flex-col relative">
                {/* Dynamic gradient overlay based on score */}
                <div
                    className="absolute inset-0 pointer-events-none opacity-50"
                    style={{
                        background: `linear-gradient(135deg, ${getGaugeFillColor(score)}10 0%, transparent 50%)`
                    }}
                />

                <CardHeader className="pb-2">
                    <div className="flex items-center justify-between">
                        <CardTitle className="text-sm font-bold uppercase tracking-widest text-muted-foreground flex items-center gap-2">
                            <Activity className={cn("h-4 w-4", getScoreColor(score))} />
                            Health Score
                        </CardTitle>
                        <span className={cn("text-[10px] font-black px-2 py-0.5 rounded-full border", getScoreColor(score), getScoreBadgeStyle(score))}>
                            {getScoreStatus(score)}
                        </span>
                    </div>
                </CardHeader>

                <CardContent className="flex-1">
                    <div className="flex flex-col items-center">
                        <div
                            className="relative h-[180px] w-full flex items-center justify-center cursor-pointer"
                            onClick={() => setOpen(true)}
                        >
                            {/* Minimal Donut Chart */}
                            <svg viewBox="0 0 120 120" className="w-[160px] h-[160px]">
                                {/* Background track */}
                                <circle
                                    cx="60"
                                    cy="60"
                                    r="50"
                                    fill="none"
                                    stroke="hsl(var(--muted))"
                                    strokeWidth="10"
                                    opacity="0.2"
                                />

                                {/* Score arc */}
                                <circle
                                    cx="60"
                                    cy="60"
                                    r="50"
                                    fill="none"
                                    stroke={getGaugeFillColor(score)}
                                    strokeWidth="10"
                                    strokeLinecap="round"
                                    strokeDasharray={`${(score / 100) * 314.16} 314.16`}
                                    transform="rotate(-90 60 60)"
                                />

                                {/* Score text */}
                                <text
                                    x="60"
                                    y="55"
                                    textAnchor="middle"
                                    dominantBaseline="middle"
                                    className="text-3xl font-black"
                                    style={{ fill: getGaugeFillColor(score) }}
                                >
                                    {score}
                                </text>
                                <text
                                    x="60"
                                    y="75"
                                    textAnchor="middle"
                                    className="fill-muted-foreground text-[8px] font-medium uppercase tracking-wide"
                                >
                                    out of 100
                                </text>
                            </svg>
                        </div>

                        <div className="w-full space-y-4 px-2 pb-2">
                            <MetricBar
                                icon={TrendingUp}
                                label="Savings Rate"
                                value={Math.round(savingsRate * 100)}
                            />
                            <MetricBar
                                icon={PieChartIcon}
                                label="Budget Adherence"
                                value={Math.round(budgetAdherence * 100)}
                            />
                            <MetricBar
                                icon={ShieldCheck}
                                label="Emergency Fund"
                                value={Math.round(emergencyFundProgress * 100)}
                            />
                        </div>
                    </div>
                </CardContent>

                {nextSteps.length > 0 && (
                    <CardFooter className="pt-0 pb-4">
                        <Button
                            variant="ghost"
                            className="w-full justify-between h-auto py-3 px-4 bg-muted/20 hover:bg-muted/40 border border-transparent hover:border-border/50 rounded-xl group/btn"
                            onClick={() => setOpen(true)}
                        >
                            <div className="flex items-start gap-3 text-left">
                                <div className="p-1.5 rounded-full bg-primary/10 text-primary mt-0.5">
                                    <Lightbulb className="h-3.5 w-3.5" />
                                </div>
                                <div className="flex-1">
                                    <p className="text-xs font-semibold line-clamp-1">Improve your score</p>
                                    <p className="text-[10px] text-muted-foreground line-clamp-1 opacity-80">
                                        {nextSteps[0]}
                                    </p>
                                </div>
                            </div>
                            <ChevronRight className="h-4 w-4 text-muted-foreground group-hover/btn:translate-x-1 transition-transform" />
                        </Button>
                    </CardFooter>
                )}
            </Card>

            <Dialog open={open} onOpenChange={setOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle className="flex items-center gap-2">
                            <Activity className="h-5 w-5 text-primary" />
                            Financial Health Breakdown
                        </DialogTitle>
                        <DialogDescription>
                            Your score is calculated based on three key financial pillars.
                        </DialogDescription>
                    </DialogHeader>

                    <div className="space-y-6 pt-4">
                        <div className="flex items-center justify-center py-6 bg-muted/20 rounded-2xl border border-dashed border-border/50">
                            <div className="text-center">
                                <span className={cn("text-6xl font-black tracking-tighter", getScoreColor(score))}>
                                    {score}
                                </span>
                                <p className="text-sm font-medium text-muted-foreground mt-2 uppercase tracking-widest">Current Score</p>
                            </div>
                        </div>

                        <div className="space-y-4">
                            <h4 className="text-sm font-bold uppercase tracking-widest text-muted-foreground">Action Plan</h4>
                            {nextSteps.map((step, i) => (
                                <div key={i} className="flex gap-3 p-3 rounded-xl bg-card border border-border/50 items-start">
                                    <div className="h-6 w-6 rounded-full bg-primary/10 text-primary flex items-center justify-center shrink-0 text-xs font-bold">
                                        {i + 1}
                                    </div>
                                    <p className="text-sm font-medium leading-relaxed">{step}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </DialogContent>
            </Dialog>
        </>
    )
}

interface MetricBarProps {
    icon: React.ElementType
    label: string
    value: number
}

// Get dynamic color based on metric value
function getMetricColor(value: number) {
    if (value >= 80) return { bar: 'bg-emerald-500', icon: 'text-emerald-500', text: 'text-emerald-500' }
    if (value >= 50) return { bar: 'bg-blue-500', icon: 'text-blue-500', text: 'text-blue-500' }
    if (value >= 25) return { bar: 'bg-amber-500', icon: 'text-amber-500', text: 'text-amber-500' }
    return { bar: 'bg-rose-500', icon: 'text-rose-500', text: 'text-rose-500' }
}

function MetricBar({ icon: Icon, label, value }: MetricBarProps) {
    const colors = getMetricColor(value)

    return (
        <div className="space-y-1.5">
            <div className="flex items-center justify-between text-[11px] font-bold uppercase text-muted-foreground tracking-wider">
                <div className="flex items-center gap-2">
                    <Icon className={cn("h-3.5 w-3.5 transition-colors", colors.icon)} />
                    {label}
                </div>
                <span className={cn("font-black transition-colors", colors.text)}>{Math.min(100, value)}%</span>
            </div>
            <div className="h-2.5 w-full bg-muted/30 rounded-full overflow-hidden border border-border/30">
                <div
                    className={cn(
                        "h-full rounded-full transition-all duration-1000 ease-out",
                        colors.bar,
                        value > 0 && "shadow-[0_0_8px_rgba(0,0,0,0.2)]"
                    )}
                    style={{ width: `${Math.min(100, Math.max(value > 0 ? 3 : 0, value))}%` }}
                />
            </div>
        </div>
    )
}
