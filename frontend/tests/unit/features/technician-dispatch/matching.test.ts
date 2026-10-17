import { describe, expect, it } from 'vitest'
import technicianFixture from '../../../../../fixtures/technicians.json'
import { findCompatibleTechnicians } from '@/features/technician-dispatch/matching'
import type { TechnicianDispatchFixture } from '@/features/technician-dispatch/types'

const fixture = technicianFixture as TechnicianDispatchFixture

function requirement(id: string) {
  const value = fixture.accessRequirements.find((item) => item.id === id)

  if (!value) {
    throw new Error(`Missing requirement ${id}`)
  }

  return value
}

describe('technician dispatch matching', () => {
  it('requires the technician to support the recorded fault', () => {
    const matches = findCompatibleTechnicians(
      fixture.technicians,
      'F1',
      requirement('R0')
    )

    expect(matches.map((match) => match.technician.id)).toEqual([
      'T1',
      'T4',
    ])

    expect(
      matches.some((match) => match.technician.id === 'T2')
    ).toBe(false)
  })

  it('rejects a second-storey technician without ladder or elevated work platform access', () => {
    const matches = findCompatibleTechnicians(
      fixture.technicians,
      'F1',
      requirement('R1')
    )

    expect(matches.map((match) => match.technician.id)).toEqual([
      'T1',
    ])

    expect(
      matches.some((match) => match.technician.id === 'T4')
    ).toBe(false)
  })

  it('accepts a second-storey technician with compatible fault and equipment', () => {
    const matches = findCompatibleTechnicians(
      fixture.technicians,
      'F3',
      requirement('R1')
    )

    expect(matches).toHaveLength(1)
    expect(matches[0]?.technician.id).toBe('T2')
    expect(matches[0]?.matchedEquipment).toEqual([
      'elevated-work-platform',
    ])
  })

  it('rejects pit jobs when the fault-compatible technician lacks pit access', () => {
    const matches = findCompatibleTechnicians(
      fixture.technicians,
      'F1',
      requirement('R2')
    )

    expect(matches).toEqual([])
  })

  it('accepts a pit job only when the fault-compatible technician has pit access', () => {
    const matches = findCompatibleTechnicians(
      fixture.technicians,
      'F3',
      requirement('R2')
    )

    expect(matches).toHaveLength(1)
    expect(matches[0]?.technician.id).toBe('T2')
    expect(matches[0]?.matchedEquipment).toEqual(['pit-access'])
  })

  it('does not invent a match when no fixture combination satisfies both requirements', () => {
    const matches = findCompatibleTechnicians(
      fixture.technicians,
      'F2',
      requirement('R1')
    )

    expect(matches).toEqual([])
  })
})