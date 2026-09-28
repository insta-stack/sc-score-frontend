import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import PortalLayout from '../../components/layout/PortalLayout'
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '../../components/ui/card'
import { Input } from '../../components/ui/input'
import { Label } from '../../components/ui/label'
import { Button } from '../../components/ui/button'
import { getProfileApi, updateProfileApi, deleteProfileApi } from '../../api/dashboard'
import { toast } from '../../hooks/use-toast'
import { useAuth } from '../../context/AuthContext'

export default function SellerProfile() {
  const navigate = useNavigate()
  const { logout } = useAuth()
  const [profile, setProfile] = useState(null)
  const [form, setForm] = useState({ name: '', email: '', address: '' })
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    let cancelled = false
    async function load() {
      try {
        const res = await getProfileApi()
        if (!cancelled) {
          setProfile(res.profile)
          setForm({
            name: res.profile?.name || '',
            email: res.profile?.email || '',
            address: res.profile?.address || '',
          })
        }
      } catch (err) {
        if (!cancelled) {
          toast({
            title: 'Could not load profile',
            description: err?.response?.data?.detail || 'Please try again.',
            variant: 'destructive',
          })
        }
      } finally {
        if (!cancelled) setLoading(false)
      }
    }
    load()
    return () => {
      cancelled = true
    }
  }, [])

  async function handleSave(e) {
    e.preventDefault()
    setSaving(true)
    try {
      const res = await updateProfileApi(form)
      setProfile(res.profile)
      toast({ title: 'Profile updated' })
    } catch (err) {
      toast({
        title: 'Update failed',
        description: err?.response?.data?.detail || 'Please try again.',
        variant: 'destructive',
      })
    } finally {
      setSaving(false)
    }
  }

  async function handleDelete() {
    if (!window.confirm('Delete your account? This cannot be undone.')) return
    try {
      await deleteProfileApi()
      logout()
      navigate('/sellers/login')
    } catch (err) {
      toast({
        title: 'Delete failed',
        description: err?.response?.data?.detail || 'Please try again.',
        variant: 'destructive',
      })
    }
  }

  if (loading) {
    return (
      <PortalLayout portal="sellers">
        <div className="flex min-h-[60vh] items-center justify-center">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-indigo-600 border-t-transparent" />
        </div>
      </PortalLayout>
    )
  }

  return (
    <PortalLayout portal="sellers">
      <div className="mx-auto max-w-lg p-8">
        <Card>
          <CardHeader>
            <CardTitle>Business Profile</CardTitle>
            <CardDescription>Update your account details.</CardDescription>
          </CardHeader>
          <form onSubmit={handleSave}>
            <CardContent className="space-y-4">
              <div>
                <Label required>Business Name</Label>
                <Input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
              </div>
              <div>
                <Label required>Email</Label>
                <Input type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
              </div>
              <div>
                <Label>Address</Label>
                <Input value={form.address} onChange={(e) => setForm({ ...form, address: e.target.value })} />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Phone Number</Label>
                  <Input value={profile?.phone_number || ''} disabled />
                </div>
                <div>
                  <Label>GSTIN</Label>
                  <Input value={profile?.gstin || ''} disabled />
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex items-center justify-between">
              <Button type="button" variant="destructive" onClick={handleDelete}>
                Delete Account
              </Button>
              <Button type="submit" loading={saving}>
                Save Changes
              </Button>
            </CardFooter>
          </form>
        </Card>
      </div>
    </PortalLayout>
  )
}
