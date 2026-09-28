import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import { signupPlatformApi } from '../../api/auth'
import { normalizePhone, isValidPhone, isValidPan, isValidGstin, isValidEmail } from '../../lib/validators'
import { AuthLayout } from '../../components/auth/AuthLayout'
import { Card, CardContent } from '../../components/ui/card'
import { Label } from '../../components/ui/label'
import { Input } from '../../components/ui/input'
import { Button } from '../../components/ui/button'
import { AlertCircle, Check, Copy, ShieldAlert, ArrowRight } from 'lucide-react'


export default function PlatformSignup() {
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
    category: 'E-commerce',
  })

  // State for the one-time credentials screen
  const [credentials, setCredentials] = useState(null)
  const [copiedKey, setCopiedKey] = useState(false)
  const [copiedSecret, setCopiedSecret] = useState(false)
  const [confirmedSaved, setConfirmedSaved] = useState(false)

  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: name === 'pan_number' || name === 'gstin' ? value.toUpperCase() : value,
    }))
  }

  const handleCopy = (text, type) => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(text)
      if (type === 'key') {
        setCopiedKey(true)
        setTimeout(() => setCopiedKey(false), 2000)
      } else {
        setCopiedSecret(true)
        setTimeout(() => setCopiedSecret(false), 2000)
      }
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')

    const { name, email, phone_number, pan_number, gstin, password, address, category } = formData

    if (!name.trim()) {
      setError('Platform / Company name is required.')
      return
    }
    if (!isValidEmail(email)) {
      setError('Please provide a valid company email address.')
      return
    }

    const cleanPhone = normalizePhone(phone_number)
    if (!isValidPhone(cleanPhone)) {
      setError('Please enter a valid 10-digit mobile number.')
      return
    }

    if (!isValidPan(pan_number)) {
      setError('PAN number must be exactly 10 alphanumeric characters (e.g. ABCDE1234F).')
      return
    }

    if (!isValidGstin(gstin)) {
      setError('GSTIN must be 15 characters (e.g. 27ABCDE1234F1Z5).')
      return
    }

    if (!password || password.length < 8) {
      setError('Password must be at least 8 characters long.')
      return
    }

    if (!address.trim()) {
      setError('Business address is required.')
      return
    }

    try {
      setLoading(true)
      const res = await signupPlatformApi({
        name: name.trim(),
        email: email.trim(),
        phone_number: cleanPhone,
        pan_number: pan_number.trim().toUpperCase(),
        gstin: gstin.trim().toUpperCase(),
        password,
        address: address.trim(),
        category: category.trim(),
      })

      // Store credentials to show the one-time copy screen
      setCredentials({
        apiKey: res.api_key,
        webhookSecret: res.webhook_secret,
        rawUser: {
          ...res,
          role: 'platform',
          name: name.trim(),
          email: email.trim(),
        },
      })
    } catch (err) {
      const msg =
        err.response?.data?.detail ||
        err.response?.data?.message ||
        'Platform registration failed. Please review your details and try again.'
      setError(typeof msg === 'string' ? msg : JSON.stringify(msg))
    } finally {
      setLoading(false)
    }
  }

  const handleProceedToDashboard = () => {
    if (credentials?.rawUser) {
      setAuthSession(credentials.rawUser)
      navigate('/platforms/dashboard')
    }
  }

  return (
    <AuthLayout
      portalRole="Platform"
      title={credentials ? 'API Credentials' : 'Register Platform Partner'}
      subtitle={
        credentials
          ? 'Save your generated API credentials now. These will NEVER be shown again.'
          : 'Integrate your e-commerce marketplace or ERP system with SC-Score'
      }
    >
      <Card>
        <CardContent className="pt-6 sm:pt-8">
          {/* One-time Credentials Screen */}
          {credentials ? (
            <div className="space-y-5">
              <div className="rounded-xl border border-amber-300 bg-amber-50 p-4 text-sm text-amber-900 flex items-start gap-3">
                <ShieldAlert className="h-5 w-5 shrink-0 text-amber-600 mt-0.5" />
                <div>
                  <h4 className="font-semibold">Important Security Notice</h4>
                  <p className="text-xs text-amber-800 mt-0.5">
                    Your API Key and Webhook Secret are shown <strong>only once</strong> and cannot be recovered after you leave this page. Store them securely in your vault or environment config.
                  </p>
                </div>
              </div>

              <div>
                <Label htmlFor="apiKeyDisplay">API Key</Label>
                <div className="flex items-center gap-2">
                  <Input
                    id="apiKeyDisplay"
                    readOnly
                    value={credentials.apiKey || 'Not generated'}
                    className="font-mono text-xs bg-slate-50 select-all"
                  />
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => handleCopy(credentials.apiKey, 'key')}
                    className="shrink-0 h-10 px-3"
                  >
                    {copiedKey ? <Check className="h-4 w-4 text-emerald-600" /> : <Copy className="h-4 w-4" />}
                  </Button>
                </div>
              </div>

              <div>
                <Label htmlFor="webhookSecretDisplay">Webhook Secret</Label>
                <div className="flex items-center gap-2">
                  <Input
                    id="webhookSecretDisplay"
                    readOnly
                    value={credentials.webhookSecret || 'Not generated'}
                    className="font-mono text-xs bg-slate-50 select-all"
                  />
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => handleCopy(credentials.webhookSecret, 'secret')}
                    className="shrink-0 h-10 px-3"
                  >
                    {copiedSecret ? <Check className="h-4 w-4 text-emerald-600" /> : <Copy className="h-4 w-4" />}
                  </Button>
                </div>
              </div>

              <div className="flex items-center gap-2 pt-2">
                <input
                  id="confirmSaved"
                  type="checkbox"
                  checked={confirmedSaved}
                  onChange={(e) => setConfirmedSaved(e.target.checked)}
                  className="h-4 w-4 rounded border-slate-300 text-indigo-600 focus:ring-indigo-500"
                />
                <label htmlFor="confirmSaved" className="text-xs text-slate-600 cursor-pointer">
                  I have copied and securely saved my API Key and Webhook Secret.
                </label>
              </div>

              <Button
                type="button"
                disabled={!confirmedSaved}
                onClick={handleProceedToDashboard}
                className="w-full mt-2"
              >
                Proceed to Platform Dashboard
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          ) : (
            /* Signup Form */
            <>
              {error && (
                <div className="mb-5 flex items-start gap-3 rounded-lg border border-red-200 bg-red-50 p-3.5 text-sm text-red-700">
                  <AlertCircle className="h-5 w-5 shrink-0 text-red-500 mt-0.5" />
                  <span>{error}</span>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <Label htmlFor="platformName" required>Platform / Marketplace Name</Label>
                  <Input
                    id="platformName"
                    name="name"
                    placeholder="QuickCart Logistics"
                    value={formData.name}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <Label htmlFor="platformEmailInput" required>Company Email</Label>
                    <Input
                      id="platformEmailInput"
                      name="email"
                      type="email"
                      placeholder="dev@platform.com"
                      value={formData.email}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div>
                    <Label htmlFor="platformPhone" required>Phone Number</Label>
                    <Input
                      id="platformPhone"
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
                    <Label htmlFor="platformPan" required>PAN Number</Label>
                    <Input
                      id="platformPan"
                      name="pan_number"
                      placeholder="ABCDE1234F"
                      maxLength={10}
                      value={formData.pan_number}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div>
                    <Label htmlFor="platformGstin" required>GSTIN</Label>
                    <Input
                      id="platformGstin"
                      name="gstin"
                      placeholder="27ABCDE1234F1Z5"
                      maxLength={15}
                      value={formData.gstin}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="category" required>Platform Category</Label>
                  <select
                    id="category"
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                    className="flex h-10 w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  >
                    <option value="E-commerce">E-commerce Marketplace</option>
                    <option value="D2C Brand">D2C Brand</option>
                    <option value="Logistics / 3PL">Logistics / 3PL Partner</option>
                    <option value="Payment Gateway">Payment Gateway / Fintech</option>
                    <option value="ERP / SaaS">ERP / Warehouse SaaS</option>
                  </select>
                </div>

                <div>
                  <Label htmlFor="platformPasswordInput" required>Password</Label>
                  <Input
                    id="platformPasswordInput"
                    name="password"
                    type="password"
                    placeholder="At least 8 characters"
                    value={formData.password}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="platformAddress" required>Headquarters Address</Label>
                  <Input
                    id="platformAddress"
                    name="address"
                    placeholder="Corporate office, City, State, PIN"
                    value={formData.address}
                    onChange={handleChange}
                    required
                  />
                </div>

                <Button type="submit" loading={loading} className="w-full mt-2">
                  Create Platform & Generate API Keys
                </Button>
              </form>

              <div className="mt-6 text-center text-sm text-slate-600 border-t border-slate-100 pt-5">
                Already registered?{' '}
                <Link to="/platforms/login" className="font-semibold text-indigo-600 hover:text-indigo-500">
                  Sign In
                </Link>
              </div>
            </>
          )}
        </CardContent>
      </Card>
    </AuthLayout>
  )
}
