import apiClient from './client'

/**
 * Login user (consumer, seller, or platform)
 * @param {{ email_or_phone: string, password: string, role: string }} data
 * @returns {Promise<{ success: boolean, token: string, user_id: string, role: string, name: string, email: string }>}
 */
export async function loginApi({ email_or_phone, password, role }) {
  const res = await apiClient.post('/auth/login', {
    email_or_phone,
    password,
    role,
  })
  return res.data
}

/**
 * Send OTP for Aadhaar verification
 * @param {{ phone_number: string, aadhaar_number?: string }} data
 * @returns {Promise<{ success: boolean, message: string, ref_id: string }>}
 */
export async function sendAadhaarOtpApi({ phone_number, aadhaar_number }) {
  const payload = { phone_number }
  if (aadhaar_number) {
    payload.aadhaar_number = aadhaar_number
  }
  const res = await apiClient.post('/auth/aadhaar/send-otp', payload)
  return res.data
}

/**
 * Verify OTP for Aadhaar verification
 * @param {{ phone_number: string, otp: string }} data
 * @returns {Promise<{ success: boolean, verified: boolean, ref_id: string, name?: string, dob?: string, masked_aadhaar?: string }>}
 */
export async function verifyAadhaarOtpApi({ phone_number, otp }) {
  const res = await apiClient.post('/auth/aadhaar/verify-otp', {
    phone_number,
    otp,
  })
  return res.data
}

/**
 * Signup consumer
 * @param {{ name: string, email: string, phone_number: string, password: string, address: string, aadhaar_ref_id: string }} data
 * @returns {Promise<{ success: boolean, message: string, token: string, user_id: string, aadhaar_verified: boolean, digilocker_verified: boolean }>}
 */
export async function signupConsumerApi({ name, email, phone_number, password, address, aadhaar_ref_id }) {
  const res = await apiClient.post('/auth/signup-consumer', {
    name,
    email,
    phone_number,
    password,
    address,
    aadhaar_ref_id,
  })
  return res.data
}

/**
 * Signup seller
 * @param {{ name: string, email: string, phone_number: string, pan_number: string, gstin: string, password: string, address: string }} data
 * @returns {Promise<{ success: boolean, message: string, token: string, user_id: string, gstin_verified: boolean }>}
 */
export async function signupSellerApi({ name, email, phone_number, pan_number, gstin, password, address }) {
  const res = await apiClient.post('/auth/signup-seller', {
    name,
    email,
    phone_number,
    pan_number,
    gstin,
    password,
    address,
  })
  return res.data
}

/**
 * Signup platform
 * @param {{ name: string, email: string, phone_number: string, pan_number: string, gstin: string, password: string, address: string, category: string }} data
 * @returns {Promise<{ success: boolean, message: string, token: string, user_id: string, api_key: string, webhook_secret: string, gstin_verified: boolean }>}
 */
export async function signupPlatformApi({ name, email, phone_number, pan_number, gstin, password, address, category }) {
  const res = await apiClient.post('/auth/signup-platform', {
    name,
    email,
    phone_number,
    pan_number,
    gstin,
    password,
    address,
    category,
  })
  return res.data
}

/**
 * Request password reset OTP
 * @param {{ email_or_phone: string }} data
 * @returns {Promise<{ success: boolean, message: string }>}
 */
export async function forgotPasswordApi({ email_or_phone }) {
  const res = await apiClient.post('/auth/forgot-password', {
    email_or_phone,
  })
  return res.data
}

/**
 * Reset password using OTP
 * @param {{ email_or_phone: string, otp: string, new_password: string }} data
 * @returns {Promise<{ success: boolean, message: string }>}
 */
export async function resetPasswordApi({ email_or_phone, otp, new_password }) {
  const res = await apiClient.post('/auth/reset-password', {
    email_or_phone,
    otp,
    new_password,
  })
  return res.data
}
