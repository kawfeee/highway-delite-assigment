import { Experience } from '../types/experience'

const experiences: Experience[] = [
  {
    id: '1',
    title: 'Kayaking',
    location: 'Udupi',
    price: 999,
    image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=1200&auto=format&fit=crop&ixlib=rb-4.0.3&s=1c8f1b7e2db177b65ffb7df3c3f5fb87',
    short: 'Curated small-group experience. Certified guide. Safety first with gear included.',
    description: 'Curated small-group experience. Certified guide. Safety first with gear included. Helmet and Life jackets along with an expert will accompany in kayaking.',
    availableDates: ['2025-10-22', '2025-10-23', '2025-10-24', '2025-10-25', '2025-10-26'],
    timeSlots: [
      { time: '07:00 am', available: 4 },
      { time: '09:00 am', available: 2 },
      { time: '11:00 am', available: 5 },
      { time: '01:00 pm', soldOut: true, available: 0 }
    ],
    minAge: 10,
    aboutText: 'Scenic routes, trained guides, and safety briefing. Minimum age 10.'
  },
  {
    id: '2',
    title: 'Nandi Hills Sunrise',
    location: 'Bangalore',
    price: 899,
    image: 'https://images.unsplash.com/photo-1501785888041-af3ef285b470?q=80&w=1200&auto=format&fit=crop&ixlib=rb-4.0.3&s=39c6c6f7e2b4a0d6c9f6d8a7c6bfe8c0',
    short: 'Curated small-group experience. Certified guide. Safety first with gear included.',
    description: 'Early morning trek to witness breathtaking sunrise views from Nandi Hills.',
    availableDates: ['2025-10-22', '2025-10-23', '2025-10-24'],
    timeSlots: [
      { time: '04:30 am', available: 10 },
      { time: '05:00 am', available: 8 }
    ],
    aboutText: 'Guided trek with breakfast included. Minimum age 8.'
  },
  {
    id: '3',
    title: 'Coffee Trail',
    location: 'Coorg',
    price: 1299,
    image: 'https://images.unsplash.com/photo-1501785888041-af3ef285b470?q=80&w=1200&auto=format&fit=crop&ixlib=rb-4.0.3&s=39c6c6f7e2b4a0d6c9f6d8a7c6bfe8c0',
    short: 'Curated small-group experience. Certified guide. Safety first with gear included.',
    description: 'Explore coffee plantations and learn about coffee processing.',
    availableDates: ['2025-10-23', '2025-10-24', '2025-10-25'],
    timeSlots: [
      { time: '09:00 am', available: 6 },
      { time: '02:00 pm', available: 4 }
    ],
    aboutText: 'Guided tour with coffee tasting. All ages welcome.'
  },
  {
    id: '4',
    title: 'Kayaking',
    location: 'Udupi, Karnataka',
    price: 999,
    image: 'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?q=80&w=1200&auto=format&fit=crop&ixlib=rb-4.0.3&s=7d8b0f2f3e8f9a4f0d0b6e8a7b3c5e2d',
    short: 'Curated small-group experience. Certified guide. Safety first with gear included.',
    description: 'Curated small-group experience. Certified guide. Safety first with gear included.',
    availableDates: ['2025-10-22', '2025-10-23'],
    timeSlots: [
      { time: '07:00 am', available: 5 },
      { time: '09:00 am', available: 3 }
    ],
    aboutText: 'Water adventure with safety equipment. Minimum age 10.'
  },
  {
    id: '5',
    title: 'Nandi Hills Sunrise',
    location: 'Bangalore',
    price: 899,
    image: 'https://images.unsplash.com/photo-1501785888041-af3ef285b470?q=80&w=1200&auto=format&fit=crop&ixlib=rb-4.0.3&s=39c6c6f7e2b4a0d6c9f6d8a7c6bfe8c0',
    short: 'Curated small-group experience. Certified guide. Safety first with gear included.',
    description: 'Early morning trek to witness breathtaking sunrise views.',
    availableDates: ['2025-10-24', '2025-10-25'],
    timeSlots: [
      { time: '04:30 am', available: 12 }
    ],
    aboutText: 'Guided trek with refreshments. All ages welcome.'
  },
  {
    id: '6',
    title: 'Boat Cruise',
    location: 'Sunderban',
    price: 999,
    image: 'https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?q=80&w=1200&auto=format&fit=crop&ixlib=rb-4.0.3&s=2f7c6f8d5b1c3a7a4b5c6d7e8f9a0b1c',
    short: 'Curated small-group experience. Certified guide. Safety first with gear included.',
    description: 'Explore the Sunderban mangroves on a boat cruise.',
    availableDates: ['2025-10-23', '2025-10-24'],
    timeSlots: [
      { time: '08:00 am', available: 15 },
      { time: '03:00 pm', available: 10 }
    ],
    aboutText: 'Wildlife viewing with experienced guides. All ages welcome.'
  },
  {
    id: '7',
    title: 'Bungee Jumping',
    location: 'Manali',
    price: 999,
    image: 'https://images.unsplash.com/photo-1504198458649-3128b932f49f?q=80&w=1200&auto=format&fit=crop&ixlib=rb-4.0.3&s=7e2c6f9a0b1c3d4e5f6a7b8c9d0e1f2a',
    short: 'Curated small-group experience. Certified guide. Safety first with gear included.',
    description: 'Adrenaline rush with professional safety measures.',
    availableDates: ['2025-10-22', '2025-10-23', '2025-10-24'],
    timeSlots: [
      { time: '10:00 am', available: 8 },
      { time: '12:00 pm', available: 6 }
    ],
    minAge: 18,
    aboutText: 'Professional instructors and safety gear. Minimum age 18.'
  },
  {
    id: '8',
    title: 'Coffee Trail',
    location: 'Coorg',
    price: 1299,
    image: 'https://images.unsplash.com/photo-1501785888041-af3ef285b470?q=80&w=1200&auto=format&fit=crop&ixlib=rb-4.0.3&s=39c6c6f7e2b4a0d6c9f6d8a7c6bfe8c0',
    short: 'Curated small-group experience. Certified guide. Safety first with gear included.',
    description: 'Explore coffee plantations and learn about coffee processing.',
    availableDates: ['2025-10-25', '2025-10-26'],
    timeSlots: [
      { time: '09:00 am', available: 7 }
    ],
    aboutText: 'Educational tour with tastings. All ages welcome.'
  }
]

export default experiences
