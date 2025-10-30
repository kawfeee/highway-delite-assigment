export type TimeSlot = {
  time: string
  available: number
  soldOut?: boolean
}

export type Experience = {
  id: string
  title: string
  location: string
  price: number
  image: string
  short: string
  description: string
  availableDates: string[]
  timeSlots: TimeSlot[]
  minAge?: number
  aboutText: string
  images?: string[]
}
