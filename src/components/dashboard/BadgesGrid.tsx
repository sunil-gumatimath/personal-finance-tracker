import type { Badge as BadgeType } from '@/hooks/useFinancialHealth'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Crown, Target, Sword, Star, Lock, Check } from 'lucide-react'
import { cn } from '@/lib/utils'

interface BadgesGridProps {
    badges: BadgeType[]
}

const ICON_MAP: Record<string, React.ElementType> = {
    Crown,
    Target,
    Sword,
    Star
}

export function BadgesGrid({ badges }: BadgesGridProps) {
    return (
        <Card className="h-full border-border/50 bg-card/50 backdrop-blur-sm">
            <CardHeader className="pb-4">
                <CardTitle className="text-sm font-bold uppercase tracking-widest text-muted-foreground">
                    Achievements
                </CardTitle>
            </CardHeader>
            <CardContent>
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
                    {badges.map((badge) => {
                        const Icon = ICON_MAP[badge.icon] || Star
                        const progress = Math.round(badge.progress || 0)

                        return (
                            <div
                                key={badge.id}
                                className={cn(
                                    "relative flex flex-col items-center p-4 rounded-xl border",
                                    badge.unlocked
                                        ? "bg-card border-border/50"
                                        : "bg-muted/20 border-dashed border-border/40"
                                )}
                            >
                                {/* Icon */}
                                <div className={cn(
                                    "h-12 w-12 rounded-full flex items-center justify-center mb-3",
                                    badge.unlocked
                                        ? "bg-primary/10 text-primary"
                                        : "bg-muted/50 text-muted-foreground/50"
                                )}>
                                    {badge.unlocked ? (
                                        <Icon className="h-6 w-6" />
                                    ) : (
                                        <Lock className="h-5 w-5" />
                                    )}
                                </div>

                                {/* Badge Name */}
                                <h4 className={cn(
                                    "text-xs font-semibold text-center mb-1",
                                    badge.unlocked ? "text-foreground" : "text-muted-foreground"
                                )}>
                                    {badge.name}
                                </h4>

                                {/* Description */}
                                <p className="text-[10px] text-muted-foreground text-center leading-tight line-clamp-2 mb-3">
                                    {badge.description}
                                </p>

                                {/* Status indicator */}
                                {badge.unlocked ? (
                                    <div className="flex items-center gap-1 text-[10px] text-primary font-medium">
                                        <Check className="h-3 w-3" />
                                        <span>Unlocked</span>
                                    </div>
                                ) : (
                                    <div className="w-full space-y-1.5">
                                        <div className="h-1.5 w-full bg-muted/40 rounded-full overflow-hidden">
                                            <div
                                                className="h-full bg-primary/60 rounded-full"
                                                style={{ width: `${Math.max(progress, 3)}%` }}
                                            />
                                        </div>
                                        <p className="text-[10px] text-muted-foreground text-center">
                                            {progress}% complete
                                        </p>
                                    </div>
                                )}
                            </div>
                        )
                    })}
                </div>
            </CardContent>
        </Card>
    )
}
