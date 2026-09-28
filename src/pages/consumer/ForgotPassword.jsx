import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { forgotPasswordApi, resetPasswordApi } from '../../api/auth'
import { AuthLayout } from '../../components/auth/AuthLayout'
import { Card, CardContent } from '../../components/ui/card'
import { Label } from '../../components/ui/label'
import { Input } from '../../components/ui/input'
import { Button } from '../../components/ui/button'
import { AlertCircle, CheckCircle2, ArrowLeft } from 'lucide-react'

export default function ConsumerForgotPassword() {
  const navigate = useNavigate()

  const [step, setStep] = useState('request') // 'request' | 'reset'
  const [emailOrPhone, setEmailOrPhone] = useState('')
  const [otp, setOtp] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')

  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [successMsg, setSuccessMsg] = useState('')

  const handleRequestOtp = async (e) => {
    e.preventDefault()
    setError('')
    setSuccessMsg('')

    if (!emailOrPhone.trim()) {
      setError('Please enter your email or phone number.')
      return
    }

    try {
      setLoading(true)
      const res = await forgotPasswordApi({ email_or_phone: emailOrPhone.trim() })
      setSuccessMsg(res.message || 'OTP has been sent to your email/phone.')
      setStep('reset')
    } catch (err) {
      const msg =
        err.response?.data?.detail ||
        err.response?.data?.message ||
        'Unable to send reset OTP. Please check your details and try again.'
      setError(typeof msg === 'string' ? msg : JSON.stringify(msg))
    } finally {
      setLoading(false)
    }
  }

  const handleResetPassword = async (e) => {
    e.preventDefault()
    setError('')

    if (!otp.trim()) {
      setError('Please enter the OTP.')
      return
    }
    if (!newPassword || newPassword.length < 8) {
      setError('Password must be at least 8 characters long.')
      return
    }
    if (newPassword !== confirmPassword) {
      setError('Passwords do not match.')
      return
    }

    try {
      setLoading(true)
      const res = await resetPasswordApi({
        email_or_phone: emailOrPhone.trim(),
        otp: otp.trim(),
        new_password: newPassword,
      })
      setSuccessMsg(res.message || 'Password reset successfully! Redirecting to login...')
      setTimeout(() => {
        navigate('/consumer/login')
      }, 1500)
    } catch (err) {
      const msg =
        err.response?.data?.detail ||
        err.response?.data?.message ||
        'Password reset failed. Invalid or expired OTP.'
      setError(typeof msg === 'string' ? msg : JSON.stringify(msg))
    } finally {
      setLoading(false)
    }
  }

  return (
    <AuthLayout
      portalRole="Consumer"
      title="Reset Password"
      subtitle="Recover access to your consumer account"
    >
      <Card>
        <CardContent className="pt-6 sm:pt-8">
          {error && (
            <div className="mb-4 flex items-start gap-3 rounded-lg border border-red-200 bg-red-50 p-3.5 text-sm text-red-700">
              <AlertCircle className="h-5 w-5 shrink-0 text-red-500 mt-0.5" />
              <span>{error}</span>
            </div>
          )}

          {successMsg && (
            <div className="mb-4 flex items-start gap-3 rounded-lg border border-emerald-200 bg-emerald-50 p-3.5 text-sm text-emerald-800">
              <CheckCircle2 className="h-5 w-5 shrink-0 text-emerald-600 mt-0.5" />
              <span>{successMsg}</span>
            </div>
          )}

          {step === 'request' ? (
            <form onSubmit={handleRequestOtp} className="space-y-4">
              <div>
                <Label htmlFor="emailOrPhone" required>Registered Email or Phone</Label>
                <Input
                  id="emailOrPhone"
                  type="text"
                  placeholder="name@example.com or 9876543210"
                  value={emailOrPhone}
                  onChange={(e) => setEmailOrPhone(e.target.value)}
                  required
                />
              </div>

              <Button type="submit" loading={loading} className="w-full mt-2">
                Send Reset OTP
              </Button>
            </form>
          ) : (
            <form onSubmit={handleResetPassword} className="space-y-4">
              <div className="rounded-lg bg-slate-50 border border-slate-200 p-3 text-xs text-slate-600">
                OTP sent to <span className="font-semibold text-slate-800">{emailOrPhone}</span>.
              </div>

              <div>
                <Label htmlFor="otp" required>Enter Reset OTP</Label>
                <Input
                  id="otp"
                  type="text"
                  placeholder="Enter received OTP"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  required
                  autoFocus
                />
              </div>

              <div>
                <Label htmlFor="newPassword" required>New Password</Label>
                <Input
                  id="newPassword"
                  type="password"
                  placeholder="At least 8 characters"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  required
                />
              </div>

              <div>
                <Label htmlFor="confirmPassword" required>Confirm New Password</Label>
                <Input
                  id="confirmPassword"
                  type="password"
                  placeholder="Re-enter new password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                />
              </div>

              <div className="flex gap-2">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setStep('request')}
                  className="w-1/3"
                >
                  Back
                </Button>
                <Button type="submit" loading={loading} className="w-2/3">
                  Reset Password
                </Button>
              </div>
            </form>
          )}

          <div className="mt-6 text-center text-sm text-slate-600 border-t border-slate-100 pt-5">
            <Link
              to="/consumer/login"
              className="inline-flex items-center gap-1.5 font-semibold text-indigo-600 hover:text-indigo-500"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Sign In
            </Link>
          </div>
        </CardContent>
      </Card>
    </AuthLayout>
  )
}
