import apiClient from './client'

// GET/PUT/DELETE /profile (role-agnostic — server reads role off the token)
export async function getProfileApi() {
  const res = await apiClient.get('/profile')
  return res.data
}

export async function updateProfileApi(data) {
  const res = await apiClient.put('/profile/update', data)
  return res.data
}

export async function deleteProfileApi() {
  const res = await apiClient.delete('/profile')
  return res.data
}

export async function getConsumerDashboardApi() {
  const res = await apiClient.get('/dashboard/consumer')
  return res.data
}

export async function getSellerDashboardApi() {
  const res = await apiClient.get('/dashboard/seller')
  return res.data
}

export async function getPlatformDashboardApi() {
  const res = await apiClient.get('/dashboard/platform')
  return res.data
}