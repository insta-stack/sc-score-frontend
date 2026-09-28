import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import { sendAadhaarOtpApi, verifyAadhaarOtpApi, signupConsumerApi } from '../../api/auth'
import { normalizePhone, isValidPhone, isValidEmail } from '../../lib/validators'
import { AuthLayout } from '../../components/auth/AuthLayout'
import { Card, CardContent } from '../../components/ui/card'
import { Label } from '../../components/ui/label'
import { Input } from '../../components/ui/input'
import { Button } from '../../components/ui/button'
import { AlertCircle, CheckCircle2, ShieldCheck } from 'lucide-react'


export default function ConsumerSignup() {
  const { setAuthSession } = useAuth()
  const navigate = useNavigate()

  // Steps: 'send_otp' -> 'verify_otp' -> 'details'
  const [step, setStep] = useState('send_otp')

  // Aadhaar / Phone step state
  const [phone, setPhone] = useState('')
  const [aadhaarNumber, setAadhaarNumber] = useState('')
  const [otp, setOtp] = useState('')
  const [aadhaarRefId, setAadhaarRefId] = useState('')
  const [aadhaarVerifiedDetails, setAadhaarVerifiedDetails] = useState(null)

  // Details form state
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [address, setAddress] = useState('')

  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [infoMessage, setInfoMessage] = useState('')

  // Step 1: Request Aadhaar OTP
  const handleSendOtp = async (e) => {
    e.preventDefault()
    setError('')
    setInfoMessage('')

    const cleanPhone = normalizePhone(phone)
    if (!isValidPhone(cleanPhone)) {
      setError('Please enter a valid 10-digit mobile number.')
      return
    }

    try {
      setLoading(true)
      const res = await sendAadhaarOtpApi({
        phone_number: cleanPhone,
        aadhaar_number: aadhaarNumber.trim() || undefined,
      })
      setInfoMessage(res.message || 'OTP sent successfully to your mobile number.')
      setStep('verify_otp')
    } catch (err) {
      const msg =
        err.response?.data?.detail ||
        err.response?.data?.message ||
        'Failed to send OTP. Please check your phone number and try again.'
      setError(typeof msg === 'string' ? msg : JSON.stringify(msg))
    } finally {
      setLoading(false)
    }
  }

  // Step 2: Verify OTP
  const handleVerifyOtp = async (e) => {
    e.preventDefault()
    setError('')
    setInfoMessage('')

    if (!otp || otp.trim().length < 4) {
      setError('Please enter the verification OTP.')
      return
    }

    try {
      setLoading(true)
      const cleanPhone = normalizePhone(phone)
      const res = await verifyAadhaarOtpApi({
        phone_number: cleanPhone,
        otp: otp.trim(),
      })

      // Must use the ref_id from THIS response as per contract
      setAadhaarRefId(res.ref_id)
      setAadhaarVerifiedDetails(res)
      if (res.name && !name) {
        setName(res.name)
      }
      setInfoMessage('Aadhaar verified successfully! Please complete your account details.')
      setStep('details')
    } catch (err) {
      const msg =
        err.response?.data?.detail ||
        err.response?.data?.message ||
        'Invalid or expired OTP. Please try again.'
      setError(typeof msg === 'string' ? msg : JSON.stringify(msg))
    } finally {
      setLoading(false)
    }
  }

  // Step 3: Complete Signup
  const handleCompleteSignup = async (e) => {
    e.preventDefault()
    setError('')

    if (!name.trim()) {
      setError('Name is required.')
      return
    }
    if (!isValidEmail(email)) {
      setError('Please enter a valid email address.')
      return
    }
    if (!password || password.length < 8) {
      setError('Password must be at least 8 characters.')
      return
    }
    if (!address.trim()) {
      setError('Address is required.')
      return
    }

    try {
      setLoading(true)
      const cleanPhone = normalizePhone(phone)
      const res = await signupConsumerApi({
        name: name.trim(),
        email: email.trim(),
        phone_number: cleanPhone,
        password,
        address: address.trim(),
        aadhaar_ref_id: aadhaarRefId,
      })

      // Backend response: { success, message, token, user_id, aadhaar_verified, digilocker_verified }
      // Merge { role: "consumer", name, email } as required
      const storedUser = {
        ...res,
        role: 'consumer',
        name: name.trim(),
        email: email.trim(),
      }

      setAuthSession(storedUser)
      navigate('/consumer/dashboard')
    } catch (err) {
      const msg =
        err.response?.data?.detail ||
        err.response?.data?.message ||
        'Registration failed. Please review your details and try again.'
      setError(typeof msg === 'string' ? msg : JSON.stringify(msg))
    } finally {
      setLoading(false)
    }
  }

  return (
    <AuthLayout
      portalRole="Consumer"
      title="Create Consumer Account"
      subtitle="Verify your identity and register for verified supply chain credibility"
    >
      <Card>
        <CardContent className="pt-6 sm:pt-8">
          {/* Progress Indicator */}
          <div className="mb-6 flex items-center justify-between border-b border-slate-100 pb-4">
            <div className="flex items-center gap-2">
              <span
                className={`flex h-6 w-6 items-center justify-center rounded-full text-xs font-bold ${
                  step === 'send_otp'
                    ? 'bg-indigo-600 text-white'
                    : 'bg-emerald-100 text-emerald-700'
                }`}
              >
                1
              </span>
              <span className="text-xs font-semibold text-slate-700">Phone & Aadhaar</span>
            </div>
            <div className="h-0.5 w-6 bg-slate-200" />
            <div className="flex items-center gap-2">
              <span
                className={`flex h-6 w-6 items-center justify-center rounded-full text-xs font-bold ${
                  step === 'verify_otp'
                    ? 'bg-indigo-600 text-white'
                    : step === 'details'
                    ? 'bg-emerald-100 text-emerald-700'
                    : 'bg-slate-200 text-slate-500'
                }`}
              >
                2
              </span>
              <span className="text-xs font-semibold text-slate-700">Verify OTP</span>
            </div>
            <div className="h-0.5 w-6 bg-slate-200" />
            <div className="flex items-center gap-2">
              <span
                className={`flex h-6 w-6 items-center justify-center rounded-full text-xs font-bold ${
                  step === 'details'
                    ? 'bg-indigo-600 text-white'
                    : 'bg-slate-200 text-slate-500'
                }`}
              >
                3
              </span>
              <span className="text-xs font-semibold text-slate-700">Profile</span>
            </div>
          </div>

          {error && (
            <div className="mb-4 flex items-start gap-3 rounded-lg border border-red-200 bg-red-50 p-3.5 text-sm text-red-700">
              <AlertCircle className="h-5 w-5 shrink-0 text-red-500 mt-0.5" />
              <span>{error}</span>
            </div>
          )}

          {infoMessage && (
            <div className="mb-4 flex items-start gap-3 rounded-lg border border-emerald-200 bg-emerald-50 p-3.5 text-sm text-emerald-800">
              <CheckCircle2 className="h-5 w-5 shrink-0 text-emerald-600 mt-0.5" />
              <span>{infoMessage}</span>
            </div>
          )}

          {/* Step 1: Send OTP */}
          {step === 'send_otp' && (
            <form onSubmit={handleSendOtp} className="space-y-4">
              <div>
                <Label htmlFor="phone" required>Mobile Number</Label>
                <Input
                  id="phone"
                  type="tel"
                  placeholder="9876543210 or +919876543210"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  required
                />
                <p className="text-xs text-slate-400 mt-1">10-digit Indian mobile number for OTP verification.</p>
              </div>

              <div>
                <Label htmlFor="aadhaar">Aadhaar Number (Optional)</Label>
                <Input
                  id="aadhaar"
                  type="text"
                  placeholder="12-digit Aadhaar number (optional)"
                  value={aadhaarNumber}
                  onChange={(e) => setAadhaarNumber(e.target.value)}
                  maxLength={14}
                />
              </div>

              <Button type="submit" loading={loading} className="w-full mt-2">
                Send OTP
              </Button>
            </form>
          )}

          {/* Step 2: Verify OTP */}
          {step === 'verify_otp' && (
            <form onSubmit={handleVerifyOtp} className="space-y-4">
              <div className="rounded-lg bg-slate-50 border border-slate-200 p-3 text-xs text-slate-600">
                OTP sent to <span className="font-semibold text-slate-800">{phone}</span>.
              </div>

              <div>
                <Label htmlFor="otp" required>Enter 6-Digit OTP</Label>
                <Input
                  id="otp"
                  type="text"
                  placeholder="123456"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  maxLength={8}
                  required
                  autoFocus
                />
              </div>

              <div className="flex gap-2">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setStep('send_otp')}
                  className="w-1/3"
                >
                  Back
                </Button>
                <Button type="submit" loading={loading} className="w-2/3">
                  Verify & Proceed
                </Button>
              </div>
            </form>
          )}

          {/* Step 3: Complete Details */}
          {step === 'details' && (
            <form onSubmit={handleCompleteSignup} className="space-y-4">
              {aadhaarVerifiedDetails?.masked_aadhaar && (
                <div className="flex items-center gap-2 rounded-lg bg-emerald-50 border border-emerald-200 p-2.5 text-xs text-emerald-800">
                  <ShieldCheck className="h-4 w-4 text-emerald-600 shrink-0" />
                  <span>
                    Aadhaar verified: {aadhaarVerifiedDetails.masked_aadhaar}
                    {aadhaarVerifiedDetails.dob ? ` (DOB: ${aadhaarVerifiedDetails.dob})` : ''}
                  </span>
                </div>
              )}

              <div>
                <Label htmlFor="name" required>Full Name</Label>
                <Input
                  id="name"
                  type="text"
                  placeholder="Chirayu Sharma"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>

              <div>
                <Label htmlFor="email" required>Email Address</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="name@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>

              <div>
                <Label htmlFor="password" required>Password</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="At least 8 characters"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>

              <div>
                <Label htmlFor="address" required>Delivery / Residential Address</Label>
                <Input
                  id="address"
                  type="text"
                  placeholder="Street, City, State, PIN code"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  required
                />
              </div>

              <Button type="submit" loading={loading} className="w-full mt-2">
                Complete Registration
              </Button>
            </form>
          )}

          <div className="mt-6 text-center text-sm text-slate-600 border-t border-slate-100 pt-5">
            Already registered?{' '}
            <Link to="/consumer/login" className="font-semibold text-indigo-600 hover:text-indigo-500">
              Sign In
            </Link>
          </div>
        </CardContent>
      </Card>
    </AuthLayout>
  )
}
