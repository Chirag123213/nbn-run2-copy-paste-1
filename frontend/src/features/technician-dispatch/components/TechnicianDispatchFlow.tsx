'use client'

import { useMemo, useState, type ChangeEvent, type FormEvent } from 'react'
import {
  CalendarClock,
  CheckCircle2,
  Construction,
  MapPin,
  PackageCheck,
  Search,
  ShieldCheck,
  Wrench,
} from 'lucide-react'
import { findCompatibleTechnicians } from '@/features/technician-dispatch/matching'
import type {
  DispatchRequest,
  ScheduledDispatch,
  TechnicianDispatchFixture,
  TechnicianMatch,
} from '@/features/technician-dispatch/types'

interface TechnicianDispatchFlowProps {
  fixture: TechnicianDispatchFixture
}

const EMPTY_REQUEST: DispatchRequest = {
  premises: '',
  faultId: '',
  accessRequirementId: '',
  notes: '',
}

function humaniseEquipment(item: string) {
  return item
    .split('-')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ')
}

function EquipmentRequirement({ items }: { items: string[] }) {
  const label =
    items.length > 0
      ? items.map(humaniseEquipment).join(' + ')
      : 'No additional equipment'

  return (
    <span className="inline-flex items-center gap-2 rounded-full border border-zinc-300 bg-white px-3 py-1.5 text-sm font-medium text-zinc-800 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-100">
      <Construction className="h-4 w-4 shrink-0" aria-hidden="true" />
      <span>{label}</span>
    </span>
  )
}

export function TechnicianDispatchFlow({
  fixture,
}: TechnicianDispatchFlowProps) {
  const [request, setRequest] = useState<DispatchRequest>(EMPTY_REQUEST)
  const [submittedRequest, setSubmittedRequest] =
    useState<DispatchRequest | null>(null)
  const [matches, setMatches] = useState<TechnicianMatch[] | null>(null)
  const [selectedTechnicianId, setSelectedTechnicianId] = useState('')
  const [visitDate, setVisitDate] = useState('')
  const [visitTime, setVisitTime] = useState('')
  const [scheduledDispatch, setScheduledDispatch] =
    useState<ScheduledDispatch | null>(null)

  const selectedAccessRequirement = useMemo(
    () =>
      fixture.accessRequirements.find(
        (item) => item.id === request.accessRequirementId
      ),
    [fixture.accessRequirements, request.accessRequirementId]
  )

  const submittedFault = submittedRequest
    ? fixture.faults.find((fault) => fault.id === submittedRequest.faultId)
    : undefined

  const submittedAccessRequirement = submittedRequest
    ? fixture.accessRequirements.find(
        (item) => item.id === submittedRequest.accessRequirementId
      )
    : undefined

  const selectedMatch = matches?.find(
    (match) => match.technician.id === selectedTechnicianId
  )

  function updateRequest<K extends keyof DispatchRequest>(
    key: K,
    value: DispatchRequest[K]
  ) {
    setRequest((current) => ({ ...current, [key]: value }))
    setMatches(null)
    setSelectedTechnicianId('')
    setVisitDate('')
    setVisitTime('')
    setScheduledDispatch(null)
  }

  function handleFindMatches(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    if (!selectedAccessRequirement) return

    const nextRequest = { ...request }

    const compatible = findCompatibleTechnicians(
      fixture.technicians,
      nextRequest.faultId,
      selectedAccessRequirement
    )

    setSubmittedRequest(nextRequest)
    setMatches(compatible)
    setSelectedTechnicianId('')
    setVisitDate('')
    setVisitTime('')
    setScheduledDispatch(null)
  }

  function handleSchedule(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    if (
      !submittedRequest ||
      !selectedMatch ||
      !visitDate ||
      !visitTime
    ) {
      return
    }

    setScheduledDispatch({
      request: submittedRequest,
      technician: selectedMatch.technician,
      matchedEquipment: selectedMatch.matchedEquipment,
      visitDate,
      visitTime,
    })
  }

  return (
    <main className="min-h-screen bg-zinc-50 text-zinc-950 dark:bg-zinc-950 dark:text-zinc-50">
      <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
        <header className="mb-8 max-w-3xl">
          <p className="mb-2 text-sm font-semibold uppercase tracking-[0.18em] text-zinc-600 dark:text-zinc-400">
            Trial Two
          </p>

          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Technician dispatch
          </h1>

          <p className="mt-3 text-base leading-7 text-zinc-600 dark:text-zinc-400">
            Record the premises, fault and access needs, then choose a
            compatible technician and schedule the visit.
          </p>
        </header>

        <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)]">
          <section className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
            <div className="mb-6 flex items-start gap-3">
              <div className="rounded-lg bg-zinc-100 p-2 dark:bg-zinc-800">
                <Wrench className="h-5 w-5" aria-hidden="true" />
              </div>

              <div>
                <h2 className="text-lg font-semibold">
                  1. Create dispatch request
                </h2>

                <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">
                  Fields marked required are needed before matching.
                </p>
              </div>
            </div>

            <form className="space-y-5" onSubmit={handleFindMatches}>
              <div>
                <label
                  htmlFor="premises"
                  className="mb-2 block text-sm font-medium"
                >
                  Customer premises
                </label>

                <input
                  id="premises"
                  name="premises"
                  type="text"
                  required
                  value={request.premises}
                  onChange={(event: ChangeEvent<HTMLInputElement>) =>
                    updateRequest('premises', event.target.value)
                  }
                  placeholder="e.g. 18 Sample Street, Carlton VIC"
                  className="w-full rounded-lg border border-zinc-300 bg-white px-3 py-2.5 text-sm outline-none ring-offset-2 focus:border-zinc-950 focus:ring-2 focus:ring-zinc-950 dark:border-zinc-700 dark:bg-zinc-950 dark:focus:border-white dark:focus:ring-white"
                />
              </div>

              <div>
                <label
                  htmlFor="fault"
                  className="mb-2 block text-sm font-medium"
                >
                  Fault or problem
                </label>

                <select
                  id="fault"
                  name="fault"
                  required
                  value={request.faultId}
                  onChange={(event: ChangeEvent<HTMLSelectElement>) =>
                    updateRequest('faultId', event.target.value)
                  }
                  className="w-full rounded-lg border border-zinc-300 bg-white px-3 py-2.5 text-sm outline-none ring-offset-2 focus:border-zinc-950 focus:ring-2 focus:ring-zinc-950 dark:border-zinc-700 dark:bg-zinc-950 dark:focus:border-white dark:focus:ring-white"
                >
                  <option value="">Select a fault</option>

                  {fixture.faults.map((fault) => (
                    <option key={fault.id} value={fault.id}>
                      {fault.name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label
                  htmlFor="access-requirement"
                  className="mb-2 block text-sm font-medium"
                >
                  Access or equipment requirement
                </label>

                <select
                  id="access-requirement"
                  name="access-requirement"
                  required
                  value={request.accessRequirementId}
                  onChange={(event: ChangeEvent<HTMLSelectElement>) =>
                    updateRequest(
                      'accessRequirementId',
                      event.target.value
                    )
                  }
                  className="w-full rounded-lg border border-zinc-300 bg-white px-3 py-2.5 text-sm outline-none ring-offset-2 focus:border-zinc-950 focus:ring-2 focus:ring-zinc-950 dark:border-zinc-700 dark:bg-zinc-950 dark:focus:border-white dark:focus:ring-white"
                >
                  <option value="">Select an access requirement</option>

                  {fixture.accessRequirements.map((requirement) => (
                    <option
                      key={requirement.id}
                      value={requirement.id}
                    >
                      {requirement.name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label
                  htmlFor="notes"
                  className="mb-2 block text-sm font-medium"
                >
                  Request notes{' '}
                  <span className="font-normal text-zinc-500">
                    (optional)
                  </span>
                </label>

                <textarea
                  id="notes"
                  name="notes"
                  rows={3}
                  value={request.notes}
                  onChange={(event: ChangeEvent<HTMLTextAreaElement>) =>
                    updateRequest('notes', event.target.value)
                  }
                  placeholder="Any job-access details the technician should know"
                  className="w-full resize-y rounded-lg border border-zinc-300 bg-white px-3 py-2.5 text-sm outline-none ring-offset-2 focus:border-zinc-950 focus:ring-2 focus:ring-zinc-950 dark:border-zinc-700 dark:bg-zinc-950 dark:focus:border-white dark:focus:ring-white"
                />
              </div>

              <button
                type="submit"
                className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-zinc-950 px-4 py-2.5 text-sm font-semibold text-white outline-none ring-offset-2 hover:bg-zinc-800 focus:ring-2 focus:ring-zinc-950 dark:bg-white dark:text-zinc-950 dark:hover:bg-zinc-200 dark:focus:ring-white"
              >
                <Search className="h-4 w-4" aria-hidden="true" />
                Find compatible technicians
              </button>
            </form>
          </section>

          <div className="space-y-6">
            <section className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
              <div className="mb-5 flex items-start gap-3">
                <div className="rounded-lg bg-zinc-100 p-2 dark:bg-zinc-800">
                  <ShieldCheck
                    className="h-5 w-5"
                    aria-hidden="true"
                  />
                </div>

                <div>
                  <h2 className="text-lg font-semibold">
                    2. Match technician and equipment
                  </h2>

                  <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">
                    Only technicians suitable for the fault and recorded
                    access requirement are shown.
                  </p>
                </div>
              </div>

              {matches === null ? (
                <div className="rounded-xl border border-dashed border-zinc-300 p-6 text-sm text-zinc-600 dark:border-zinc-700 dark:text-zinc-400">
                  Submit a dispatch request to see compatible
                  technicians.
                </div>
              ) : matches.length === 0 ? (
                <div
                  role="status"
                  className="rounded-xl border border-zinc-300 p-5 dark:border-zinc-700"
                >
                  <p className="font-semibold">
                    No compatible technician and equipment match
                  </p>

                  <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">
                    No fixture technician satisfies both the selected
                    fault and access requirement. An incompatible
                    combination will not be offered for scheduling.
                  </p>
                </div>
              ) : (
                <fieldset className="space-y-3">
                  <legend className="sr-only">
                    Compatible technicians
                  </legend>

                  {matches.map((match) => {
                    const selected =
                      selectedTechnicianId === match.technician.id

                    return (
                      <label
                        key={match.technician.id}
                        className="flex cursor-pointer gap-3 rounded-xl border border-zinc-300 p-4 outline-none has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-zinc-950 dark:border-zinc-700 dark:has-[:focus-visible]:ring-white"
                      >
                        <input
                          type="radio"
                          name="technician"
                          value={match.technician.id}
                          checked={selected}
                          onChange={(
                            event: ChangeEvent<HTMLInputElement>
                          ) =>
                            setSelectedTechnicianId(
                              event.target.value
                            )
                          }
                          className="mt-1 h-4 w-4"
                        />

                        <span className="min-w-0 flex-1">
                          <span className="block font-semibold">
                            {match.technician.name}
                          </span>

                          <span className="mt-1 block text-sm text-zinc-600 dark:text-zinc-400">
                            Suitable for{' '}
                            {submittedFault?.name ??
                              submittedRequest?.faultId}
                          </span>

                          <span className="mt-3 block">
                            <span className="mb-2 block text-xs font-semibold uppercase tracking-wide text-zinc-500">
                              Equipment / access capability
                            </span>

                            <EquipmentRequirement
                              items={match.matchedEquipment}
                            />
                          </span>
                        </span>
                      </label>
                    )
                  })}
                </fieldset>
              )}
            </section>

            <section className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
              <div className="mb-5 flex items-start gap-3">
                <div className="rounded-lg bg-zinc-100 p-2 dark:bg-zinc-800">
                  <CalendarClock
                    className="h-5 w-5"
                    aria-hidden="true"
                  />
                </div>

                <div>
                  <h2 className="text-lg font-semibold">
                    3. Schedule visit
                  </h2>

                  <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">
                    Scheduling is available only after a valid match
                    is selected.
                  </p>
                </div>
              </div>

              <form
                className="grid gap-4 sm:grid-cols-2"
                onSubmit={handleSchedule}
              >
                <div>
                  <label
                    htmlFor="visit-date"
                    className="mb-2 block text-sm font-medium"
                  >
                    Visit date
                  </label>

                  <input
                    id="visit-date"
                    type="date"
                    required
                    disabled={!selectedMatch}
                    value={visitDate}
                    onChange={(
                      event: ChangeEvent<HTMLInputElement>
                    ) => setVisitDate(event.target.value)}
                    className="w-full rounded-lg border border-zinc-300 bg-white px-3 py-2.5 text-sm outline-none ring-offset-2 focus:border-zinc-950 focus:ring-2 focus:ring-zinc-950 disabled:cursor-not-allowed disabled:bg-zinc-100 disabled:text-zinc-500 dark:border-zinc-700 dark:bg-zinc-950 dark:disabled:bg-zinc-800"
                  />
                </div>

                <div>
                  <label
                    htmlFor="visit-time"
                    className="mb-2 block text-sm font-medium"
                  >
                    Visit time
                  </label>

                  <input
                    id="visit-time"
                    type="time"
                    required
                    disabled={!selectedMatch}
                    value={visitTime}
                    onChange={(
                      event: ChangeEvent<HTMLInputElement>
                    ) => setVisitTime(event.target.value)}
                    className="w-full rounded-lg border border-zinc-300 bg-white px-3 py-2.5 text-sm outline-none ring-offset-2 focus:border-zinc-950 focus:ring-2 focus:ring-zinc-950 disabled:cursor-not-allowed disabled:bg-zinc-100 disabled:text-zinc-500 dark:border-zinc-700 dark:bg-zinc-950 dark:disabled:bg-zinc-800"
                  />
                </div>

                <button
                  type="submit"
                  disabled={!selectedMatch}
                  className="inline-flex items-center justify-center gap-2 rounded-lg bg-zinc-950 px-4 py-2.5 text-sm font-semibold text-white outline-none ring-offset-2 hover:bg-zinc-800 focus:ring-2 focus:ring-zinc-950 disabled:cursor-not-allowed disabled:bg-zinc-300 disabled:text-zinc-600 sm:col-span-2 dark:bg-white dark:text-zinc-950 dark:hover:bg-zinc-200 dark:focus:ring-white dark:disabled:bg-zinc-700 dark:disabled:text-zinc-400"
                >
                  <CalendarClock
                    className="h-4 w-4"
                    aria-hidden="true"
                  />
                  Schedule dispatch
                </button>
              </form>
            </section>
          </div>
        </div>

        {scheduledDispatch && (
          <section
            aria-live="polite"
            className="mt-6 rounded-2xl border border-zinc-300 bg-white p-6 shadow-sm dark:border-zinc-700 dark:bg-zinc-900"
          >
            <div className="flex items-start gap-3">
              <CheckCircle2
                className="mt-0.5 h-6 w-6 shrink-0"
                aria-hidden="true"
              />

              <div className="min-w-0 flex-1">
                <h2 className="text-xl font-semibold">
                  Dispatch scheduled
                </h2>

                <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">
                  The selected technician, visit and matching access
                  capability are recorded below.
                </p>

                <dl className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                  <div>
                    <dt className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-zinc-500">
                      <MapPin
                        className="h-4 w-4"
                        aria-hidden="true"
                      />
                      Premises
                    </dt>

                    <dd className="mt-1 text-sm font-medium">
                      {scheduledDispatch.request.premises}
                    </dd>
                  </div>

                  <div>
                    <dt className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-zinc-500">
                      <Wrench
                        className="h-4 w-4"
                        aria-hidden="true"
                      />
                      Technician
                    </dt>

                    <dd className="mt-1 text-sm font-medium">
                      {scheduledDispatch.technician.name}
                    </dd>
                  </div>

                  <div>
                    <dt className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-zinc-500">
                      <CalendarClock
                        className="h-4 w-4"
                        aria-hidden="true"
                      />
                      Visit
                    </dt>

                    <dd className="mt-1 text-sm font-medium">
                      {scheduledDispatch.visitDate} at{' '}
                      {scheduledDispatch.visitTime}
                    </dd>
                  </div>

                  <div>
                    <dt className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-zinc-500">
                      <PackageCheck
                        className="h-4 w-4"
                        aria-hidden="true"
                      />
                      Access requirement
                    </dt>

                    <dd className="mt-1 text-sm font-medium">
                      {submittedAccessRequirement?.name ??
                        scheduledDispatch.request.accessRequirementId}
                    </dd>

                    <dd className="mt-2">
                      <EquipmentRequirement
                        items={scheduledDispatch.matchedEquipment}
                      />
                    </dd>
                  </div>
                </dl>
              </div>
            </div>
          </section>
        )}
      </div>
    </main>
  )
}