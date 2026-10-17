export interface FaultFixture {
  id: string
  name: string
}

export interface AccessRequirementFixture {
  id: string
  name: string
  satisfiedBy: string[][]
}

export interface TechnicianFixture {
  id: string
  name: string
  faults: string[]
  equipment: string[]
}

export interface TechnicianDispatchFixture {
  faults: FaultFixture[]
  equipment: string[]
  accessRequirements: AccessRequirementFixture[]
  technicians: TechnicianFixture[]
}

export interface DispatchRequest {
  premises: string
  faultId: string
  accessRequirementId: string
  notes: string
}

export interface TechnicianMatch {
  technician: TechnicianFixture
  matchedEquipment: string[]
}

export interface ScheduledDispatch {
  request: DispatchRequest
  technician: TechnicianFixture
  matchedEquipment: string[]
  visitDate: string
  visitTime: string
}