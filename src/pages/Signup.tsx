import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Eye, EyeOff, Loader2, Check } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { toast } from 'sonner'
import { useAuth } from '@/contexts/AuthContext'

export function Signup() {
    const navigate = useNavigate()
    const { signUp } = useAuth()
    const [loading, setLoading] = useState(false)
    const [showPassword, setShowPassword] = useState(false)
    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        password: '',
        confirmPassword: '',
    })

    const passwordRequirements = [
        { met: formData.password.length >= 8, text: 'At least 8 characters' },
        { met: /[A-Z]/.test(formData.password), text: 'One uppercase letter' },
        { met: /[a-z]/.test(formData.password), text: 'One lowercase letter' },
        { met: /[0-9]/.test(formData.password), text: 'One number' },
    ]

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()

        if (formData.password !== formData.confirmPassword) {
            toast.error('Passwords do not match')
            return
        }

        if (!passwordRequirements.every((req) => req.met)) {
            toast.error('Please meet all password requirements')
            return
        }

        setLoading(true)

        try {
            const { error } = await signUp(formData.email, formData.password, formData.fullName)
            if (error) throw error
            toast.success('Account created! Please check your email to verify.')
            navigate('/login')
        } catch (error: unknown) {
            console.error('Signup error:', error)
            toast.error(error instanceof Error ? error.message : 'Failed to create account')
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

                {/* Signup Card */}
                <Card className="border-border/50 shadow-xl">
                    <CardHeader className="space-y-1">
                        <CardTitle className="text-2xl">Create an account</CardTitle>
                        <CardDescription>
                            Enter your details to get started
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="fullName">Full Name</Label>
                                <Input
                                    id="fullName"
                                    placeholder="John Doe"
                                    value={formData.fullName}
                                    onChange={(e) =>
                                        setFormData({ ...formData, fullName: e.target.value })
                                    }
                                    required
                                    autoComplete="name"
                                />
                            </div>

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
                                <Label htmlFor="password">Password</Label>
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
                                        autoComplete="new-password"
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
                                {formData.password && (
                                    <ul className="mt-2 space-y-1">
                                        {passwordRequirements.map((req, index) => (
                                            <li
                                                key={index}
                                                className={`flex items-center gap-2 text-xs ${req.met ? 'text-green-500' : 'text-muted-foreground'
                                                    }`}
                                            >
                                                <Check
                                                    className={`h-3 w-3 ${req.met ? 'opacity-100' : 'opacity-30'}`}
                                                />
                                                {req.text}
                                            </li>
                                        ))}
                                    </ul>
                                )}
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="confirmPassword">Confirm Password</Label>
                                <Input
                                    id="confirmPassword"
                                    type="password"
                                    placeholder="••••••••"
                                    value={formData.confirmPassword}
                                    onChange={(e) =>
                                        setFormData({ ...formData, confirmPassword: e.target.value })
                                    }
                                    required
                                    autoComplete="new-password"
                                />
                                {formData.confirmPassword &&
                                    formData.password !== formData.confirmPassword && (
                                        <p className="text-xs text-destructive">Passwords do not match</p>
                                    )}
                            </div>

                            <Button type="submit" className="w-full" disabled={loading}>
                                {loading ? (
                                    <>
                                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                        Creating account...
                                    </>
                                ) : (
                                    'Create account'
                                )}
                            </Button>
                        </form>

                        <div className="mt-6 text-center text-sm">
                            Already have an account?{' '}
                            <Link to="/login" className="text-primary hover:underline">
                                Sign in
                            </Link>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}
