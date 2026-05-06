import { z } from 'zod'
import { VEHICLE_NUMBER_REGEX } from '@/lib/constants'

export const vehicleNumberSchema = z
  .string()
  .transform(val => val.replace(/[\s-]/g, '').toUpperCase())
  .pipe(
    z.string().regex(
      VEHICLE_NUMBER_REGEX,
      'Invalid format. Example: DL01AB1234'
    )
  )

export const mobileSchema = z
  .string()
  .regex(/^[0-9]{10}$/, 'Enter a valid 10-digit mobile number')

export const otpSchema = z
  .string()
  .length(4, 'Enter complete 4-digit OTP')

export const userNameSchema = z
  .string()
  .min(2, 'Name must be at least 2 characters')
  .max(50, 'Name too long')
