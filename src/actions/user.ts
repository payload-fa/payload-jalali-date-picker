'use server'

import { getCurrentUser, logout } from '@/auth'

export async function getCurrentUserAction() {
  const currentUser = await getCurrentUser()
  return currentUser
}

export async function logoutUserAction() {
  await logout()
  return {
    status: 'ok',
  }
}
