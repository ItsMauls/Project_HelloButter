import { Xendit } from 'xendit-node';
const XENDIT_API_KEY = process.env.XENDIT_API_KEY as string

export const x = new Xendit({
  secretKey: XENDIT_API_KEY
})

const { Invoice } = x

export const i = Invoice