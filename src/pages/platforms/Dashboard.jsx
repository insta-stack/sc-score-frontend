import React, { useEffect, useState } from 'react'
import { useAuth } from '../../context/AuthContext'
import PortalLayout from '../../components/layout/PortalLayout'
import { getPlatformDashboardApi } from '../../api/dashboard'
import { toast } from '../../hooks/use-toast'

function StatCard({ label, value }) {
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
      <p className="text-xs font-medium text-slate-500">{label}</p>
      <p className="mt-1 text-2xl font-bold text-slate-900">{value}</p>
    </div>
  )
}

export default function PlatformDashboard() {
  const { user } = useAuth()
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let cancelled = false
    async function load() {
      try {
        const res = await getPlatformDashboardApi()
        if (!cancelled) setData(res)
      } catch (err) {
        if (!cancelled) {
          toast({
            title: 'Could not load dashboard',
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

  return (
    <PortalLayout portal="platforms">
      <div className="mx-auto max-w-4xl p-8">
        <h1 className="text-2xl font-bold text-slate-900">
          Welcome, {data?.name || user?.name || 'Platform Partner'}
        </h1>
        <p className="mt-1 text-sm text-slate-500">Your integration activity at a glance.</p>

        {loading ? (
          <div className="mt-6 flex items-center justify-center rounded-xl border border-slate-200 bg-white p-10">
            <div className="h-6 w-6 animate-spin rounded-full border-4 border-indigo-600 border-t-transparent" />
          </div>
        ) : (
          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <StatCard label="Total Orders" value={data?.total_orders ?? 0} />
            <StatCard label="Total Value" value={`₹${data?.total_value ?? 0}`} />
            <StatCard label="Queries This Month" value={data?.queries_this_month ?? 0} />
            <StatCard label="Billing Amount" value={`₹${data?.billing_amount ?? 0}`} />
          </div>
        )}

        {!loading && (
          <div className="mt-4 rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
            <p className="text-xs font-medium text-slate-500">API Key</p>
            <p className="mt-1 font-mono text-sm text-slate-800">{data?.api_key || 'Not generated'}</p>
          </div>
        )}
      </div>
    </PortalLayout>
  )
}
