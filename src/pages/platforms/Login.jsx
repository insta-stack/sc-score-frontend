import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import { AuthLayout } from '../../components/auth/AuthLayout'
import { Card, CardContent } from '../../components/ui/card'
import { Label } from '../../components/ui/label'
import { Input } from '../../components/ui/input'
import { Button } from '../../components/ui/button'
import { AlertCircle } from 'lucide-react'

export default function PlatformLogin() {
  const { login } = useAuth()
  const navigate = useNavigate()

  const [emailOrPhone, setEmailOrPhone] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')

    if (!emailOrPhone.trim() || !password) {
      setError('Please enter both your registered platform email/phone and password.')
      return
    }

    try {
      setLoading(true)
      await login('platform', emailOrPhone.trim(), password)
      navigate('/platforms/dashboard')
    } catch (err) {
      const msg =
        err.response?.data?.detail ||
        err.response?.data?.message ||
        (err.response?.status === 401 ? 'Invalid credentials or unauthorized role.' : 'Failed to log in.')
      setError(typeof msg === 'string' ? msg : JSON.stringify(msg))
    } finally {
      setLoading(false)
    }
  }

  return (
    <AuthLayout
      portalRole="Platform"
      title="Platform Sign In"
      subtitle="Manage API integrations, webhooks, and seller credibility scoring"
    >
      <Card>
        <CardContent className="pt-6 sm:pt-8">
          {error && (
            <div className="mb-5 flex items-start gap-3 rounded-lg border border-red-200 bg-red-50 p-3.5 text-sm text-red-700">
              <AlertCircle className="h-5 w-5 shrink-0 text-red-500 mt-0.5" />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label htmlFor="platformEmail" required>Partner Email or Phone</Label>
              <Input
                id="platformEmail"
                type="text"
                placeholder="developer@ecommerce.com"
                value={emailOrPhone}
                onChange={(e) => setEmailOrPhone(e.target.value)}
                autoComplete="username"
                required
              />
            </div>

            <div>
              <div className="flex items-center justify-between">
                <Label htmlFor="platformPassword" required>Password</Label>
                <Link
                  to="/platforms/forgot-password"
                  className="text-xs font-semibold text-indigo-600 hover:text-indigo-500"
                >
                  Forgot password?
                </Link>
              </div>
              <Input
                id="platformPassword"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoComplete="current-password"
                required
              />
            </div>

            <Button type="submit" loading={loading} className="w-full mt-2">
              Sign In to Platform Portal
            </Button>
          </form>

          <div className="mt-6 text-center text-sm text-slate-600 border-t border-slate-100 pt-5">
            Integrate your platform?{' '}
            <Link to="/platforms/signup" className="font-semibold text-indigo-600 hover:text-indigo-500">
              Register platform
            </Link>
          </div>
        </CardContent>
      </Card>
    </AuthLayout>
  )
}
