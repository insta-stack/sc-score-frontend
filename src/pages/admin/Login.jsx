import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { AlertCircle } from 'lucide-react'
import { AuthLayout } from '../../components/auth/AuthLayout'
import { Card, CardContent } from '../../components/ui/card'
import { Label } from '../../components/ui/label'
import { Input } from '../../components/ui/input'
import { Button } from '../../components/ui/button'
import { useAuth } from '../../context/AuthContext'

export default function AdminLogin() {
  const { login } = useAuth(); const navigate = useNavigate(); const [identity, setIdentity] = useState(''); const [password, setPassword] = useState(''); const [loading, setLoading] = useState(false); const [error, setError] = useState('')
  async function submit(event) { event.preventDefault(); setError(''); if (!identity.trim() || !password) { setError('Enter your authorized identity and password.'); return } try { setLoading(true); await login('admin', identity.trim(), password); navigate('/admin/dashboard') } catch (err) { setError(err.response?.data?.detail || 'We could not verify those administrator credentials.') } finally { setLoading(false) } }
  return <AuthLayout portalRole="admin" title="Administrative access" subtitle="Authorized SC·Score operators only"><Card><CardContent className="pt-6 sm:pt-8">{error && <div role="alert" className="mb-5 flex gap-3 rounded-lg border border-red-400/30 bg-red-950/30 p-3 text-sm text-red-200"><AlertCircle className="h-5 w-5 shrink-0" />{error}</div>}<form onSubmit={submit} className="space-y-4"><div><Label htmlFor="admin-identity" required>Authorized email</Label><Input id="admin-identity" value={identity} onChange={(e) => setIdentity(e.target.value)} autoComplete="username" required /></div><div><Label htmlFor="admin-password" required>Password</Label><Input id="admin-password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} autoComplete="current-password" required /></div><Button className="mt-2 w-full" type="submit" loading={loading}>Enter administration</Button></form></CardContent></Card></AuthLayout>
}
