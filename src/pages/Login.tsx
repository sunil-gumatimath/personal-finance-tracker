import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Eye, EyeOff, Loader2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { toast } from 'sonner'
import { useAuth } from '@/contexts/AuthContext'

export function Login() {
    const navigate = useNavigate()
    const { signIn } = useAuth()
    const [loading, setLoading] = useState(false)
    const [showPassword, setShowPassword] = useState(false)
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    })

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setLoading(true)

        try {
            const { error } = await signIn(formData.email, formData.password)
            if (error) throw error
            toast.success('Welcome back!')
            navigate('/')
        } catch (error: unknown) {
            console.error('Login error:', error)
            toast.error(error instanceof Error ? error.message : 'Failed to sign in')
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-background via-background to-primary/5 p-4">
            <div className="w-full max-w-md space-y-8">
                {/* Logo */}
                <div className="flex flex-col items-center">
                    <div className="relative flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10 dark:bg-slate-950 shadow-2xl overflow-hidden group/logo border border-primary/20 dark:border-white/10">
                        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-primary/10 dark:from-slate-900 dark:via-slate-950 dark:to-black" />
                        <svg viewBox="0 0 24 24" fill="none" className="h-10 w-10 relative z-10 transition-all duration-500 group-hover/logo:scale-110">
                            {/* Growth Bars */}
                            <rect x="4" y="14" width="3" height="6" rx="1" fill="currentColor" className="text-emerald-500/40 dark:text-emerald-500/30" />
                            <rect x="10.5" y="10" width="3" height="10" rx="1" fill="currentColor" className="text-emerald-500/70 dark:text-emerald-500/60" />
                            <rect x="17" y="4" width="3" height="16" rx="1" fill="currentColor" className="text-emerald-500 dark:text-emerald-400" />
                            {/* Trend Line */}
                            <path d="M4 14L10.5 10L17 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" className="text-primary dark:text-white opacity-40 group-hover/logo:opacity-100 transition-opacity" />
                        </svg>
                        <div className="absolute -inset-1 bg-emerald-500/10 blur-xl opacity-0 group-hover/logo:opacity-100 transition-opacity" />
                    </div>
                    <div className="mt-4 flex flex-col items-center">
                        <span className="text-lg font-black tracking-[0.2em] text-foreground uppercase">
                            Personal Finance
                        </span>
                        <span className="text-xs font-bold text-emerald-600 dark:text-emerald-500 uppercase tracking-widest mt-1">
                            Tracker
                        </span>
                    </div>
                </div>

                {/* Login Card */}
                <Card className="border-border/50 shadow-xl">
                    <CardHeader className="space-y-1">
                        <CardTitle className="text-2xl">Welcome back</CardTitle>
                        <CardDescription>
                            Enter your credentials to access your account
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="email">Email</Label>
                                <Input
                                    id="email"
                                    type="email"
                                    placeholder="user@gmail.com"
                                    value={formData.email}
                                    onChange={(e) =>
                                        setFormData({ ...formData, email: e.target.value })
                                    }
                                    required
                                    autoComplete="email"
                                />
                            </div>

                            <div className="space-y-2">
                                <div className="flex items-center justify-between">
                                    <Label htmlFor="password">Password</Label>
                                    <Link
                                        to="/forgot-password"
                                        className="text-sm text-primary hover:underline"
                                    >
                                        Forgot password?
                                    </Link>
                                </div>
                                <div className="relative">
                                    <Input
                                        id="password"
                                        type={showPassword ? 'text' : 'password'}
                                        placeholder="••••••••"
                                        value={formData.password}
                                        onChange={(e) =>
                                            setFormData({ ...formData, password: e.target.value })
                                        }
                                        required
                                        autoComplete="current-password"
                                    />
                                    <Button
                                        type="button"
                                        variant="ghost"
                                        size="icon"
                                        className="absolute right-0 top-0 h-full px-3 hover:bg-transparent"
                                        onClick={() => setShowPassword(!showPassword)}
                                    >
                                        {showPassword ? (
                                            <EyeOff className="h-4 w-4 text-muted-foreground" />
                                        ) : (
                                            <Eye className="h-4 w-4 text-muted-foreground" />
                                        )}
                                    </Button>
                                </div>
                            </div>

                            <Button type="submit" className="w-full" disabled={loading}>
                                {loading ? (
                                    <>
                                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                        Signing in...
                                    </>
                                ) : (
                                    'Sign in'
                                )}
                            </Button>
                        </form>

                        <div className="mt-6 text-center text-sm">
                            Don't have an account?{' '}
                            <Link to="/signup" className="text-primary hover:underline">
                                Sign up
                            </Link>
                        </div>
                    </CardContent>
                </Card>

                {/* Demo Note */}
                <p className="text-center text-sm text-muted-foreground">
                    Running in demo mode? Data persistence requires Supabase setup.
                </p>
            </div>
        </div>
    )
}
