import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import { signupSellerApi } from '../../api/auth'
import { normalizePhone, isValidPhone, isValidPan, isValidGstin, isValidEmail } from '../../lib/validators'
import { AuthLayout } from '../../components/auth/AuthLayout'
import { Card, CardContent } from '../../components/ui/card'
import { Label } from '../../components/ui/label'
import { Input } from '../../components/ui/input'
import { Button } from '../../components/ui/button'
import { AlertCircle } from 'lucide-react'
export default function SellerSignup() {
  const { setAuthSession } = useAuth()
  const navigate = useNavigate()

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone_number: '',
    pan_number: '',
    gstin: '',
    password: '',
    address: '',
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: name === 'pan_number' || name === 'gstin' ? value.toUpperCase() : value,
    }))
  }
  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    const { name, email, phone_number, pan_number, gstin, password, address } = formData
    if (!name.trim()) {
      setError('Business / Seller Name is required.')
      return
    }
    if (!isValidEmail(email)) {
      setError('Please provide a valid business email address.')
      return
    }

    const cleanPhone = normalizePhone(phone_number)
    if (!isValidPhone(cleanPhone)) {
      setError('Please enter a valid 10-digit Indian mobile number.')
      return
    }

    if (!isValidPan(pan_number)) {
      setError('PAN number must be exactly 10 alphanumeric characters (e.g., ABCDE1234F).')
      return
    }

    if (!isValidGstin(gstin)) {
      setError('GSTIN must be a valid 15-character format (e.g., 27ABCDE1234F1Z5).')
      return
    }

    if (!password || password.length < 8) {
      setError('Password must be at least 8 characters long.')
      return
    }

    if (!address.trim()) {
      setError('Registered business address is required.')
      return
    }

    try {
      setLoading(true)
      const res = await signupSellerApi({
        name: name.trim(),
        email: email.trim(),
        phone_number: cleanPhone,
        pan_number: pan_number.trim().toUpperCase(),
        gstin: gstin.trim().toUpperCase(),
        password,
        address: address.trim(),
      })

      // Backend returns: { success, message, token, user_id, gstin_verified }
      // Merge typed name and email and role: "seller"
      const storedUser = {
        ...res,
        role: 'seller',
        name: name.trim(),
        email: email.trim(),
      }

      setAuthSession(storedUser)
      navigate('/sellers/dashboard')
    } catch (err) {
      const msg =
        err.response?.data?.detail ||
        err.response?.data?.message ||
        'Seller registration failed. Please review your details and try again.'
      setError(typeof msg === 'string' ? msg : JSON.stringify(msg))
    } finally {
      setLoading(false)
    }
  }

  return (
    <AuthLayout
      portalRole="Seller"
      title="Register Seller Account"
      subtitle="Join the verified commerce ecosystem with transparent supply chain credibility"
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
              <Label htmlFor="name" required>Seller / Business Name</Label>
              <Input
                id="name"
                name="name"
                placeholder="Acme Retailers Pvt Ltd"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <Label htmlFor="email" required>Business Email</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="contact@business.com"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>

              <div>
                <Label htmlFor="phone_number" required>Mobile Number</Label>
                <Input
                  id="phone_number"
                  name="phone_number"
                  type="tel"
                  placeholder="9876543210"
                  value={formData.phone_number}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <Label htmlFor="pan_number" required>PAN Number</Label>
                <Input
                  id="pan_number"
                  name="pan_number"
                  placeholder="ABCDE1234F"
                  maxLength={10}
                  value={formData.pan_number}
                  onChange={handleChange}
                  required
                />
                <p className="text-[11px] text-slate-400 mt-0.5">10-character PAN</p>
              </div>

              <div>
                <Label htmlFor="gstin" required>GSTIN Number</Label>
                <Input
                  id="gstin"
                  name="gstin"
                  placeholder="27ABCDE1234F1Z5"
                  maxLength={15}
                  value={formData.gstin}
                  onChange={handleChange}
                  required
                />
                <p className="text-[11px] text-slate-400 mt-0.5">15-character GSTIN</p>
              </div>
            </div>

            <div>
              <Label htmlFor="password" required>Password</Label>
              <Input
                id="password"
                name="password"
                type="password"
                placeholder="At least 8 characters"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </div>

            <div>
              <Label htmlFor="address" required>Registered Business Address</Label>
              <Input
                id="address"
                name="address"
                placeholder="Warehouse / Office address, City, PIN"
                value={formData.address}
                onChange={handleChange}
                required
              />
            </div>

            <Button type="submit" loading={loading} className="w-full mt-2">
              Register as Seller
            </Button>
          </form>

          <div className="mt-6 text-center text-sm text-slate-600 border-t border-slate-100 pt-5">
            Already registered?{' '}
            <Link to="/sellers/login" className="font-semibold text-indigo-600 hover:text-indigo-500">
              Sign In
            </Link>
          </div>
        </CardContent>
      </Card>
    </AuthLayout>
  )
}
