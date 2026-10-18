import type { Metadata } from 'next'
import technicianFixture from '../../../../../fixtures/technicians.json'
import { TechnicianDispatchFlow } from '@/features/technician-dispatch/components/TechnicianDispatchFlow'
import type { TechnicianDispatchFixture } from '@/features/technician-dispatch/types'

export const metadata: Metadata = {
  title: 'Technician dispatch',
  description: 'Create, match and schedule a technician dispatch request.',
}

export default function TechnicianDispatchPage() {
  return (
    <TechnicianDispatchFlow
      fixture={technicianFixture as TechnicianDispatchFixture}
    />
  )
}