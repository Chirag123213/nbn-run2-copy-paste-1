import type {
  AccessRequirementFixture,
  TechnicianFixture,
  TechnicianMatch,
} from '@/features/technician-dispatch/types'

export function getMatchingEquipment(
  technician: TechnicianFixture,
  accessRequirement: AccessRequirementFixture
): string[] | null {
  for (const acceptableCombination of accessRequirement.satisfiedBy) {
    if (acceptableCombination.every((item) => technician.equipment.includes(item))) {
      return acceptableCombination
    }
  }

  return null
}

export function findCompatibleTechnicians(
  technicians: TechnicianFixture[],
  faultId: string,
  accessRequirement: AccessRequirementFixture
): TechnicianMatch[] {
  return technicians.flatMap((technician) => {
    if (!technician.faults.includes(faultId)) return []

    const matchedEquipment = getMatchingEquipment(technician, accessRequirement)
    if (matchedEquipment === null) return []

    return [{ technician, matchedEquipment }]
  })
}