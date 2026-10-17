import { fireEvent, render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it } from 'vitest'
import technicianFixture from '../../../../../fixtures/technicians.json'
import { TechnicianDispatchFlow } from '@/features/technician-dispatch/components/TechnicianDispatchFlow'
import type { TechnicianDispatchFixture } from '@/features/technician-dispatch/types'

const fixture = technicianFixture as TechnicianDispatchFixture

describe('TechnicianDispatchFlow', () => {
  it('creates a request, presents only valid matches and records a scheduled dispatch', async () => {
    const user = userEvent.setup()

    render(<TechnicianDispatchFlow fixture={fixture} />)

    await user.type(
      screen.getByLabelText('Customer premises'),
      '18 Sample Street'
    )

    await user.selectOptions(
      screen.getByLabelText('Fault or problem'),
      'F1'
    )

    await user.selectOptions(
      screen.getByLabelText('Access or equipment requirement'),
      'R1'
    )

    await user.click(
      screen.getByRole('button', {
        name: 'Find compatible technicians',
      })
    )

    expect(screen.getByText('Tech Alpha')).toBeInTheDocument()
    expect(screen.queryByText('Tech Delta')).not.toBeInTheDocument()
    expect(screen.getByText('Ladder')).toBeInTheDocument()

    await user.click(
      screen.getByRole('radio', {
        name: /Tech Alpha/i,
      })
    )

    fireEvent.change(screen.getByLabelText('Visit date'), {
      target: {
        value: '2026-10-20',
      },
    })

    fireEvent.change(screen.getByLabelText('Visit time'), {
      target: {
        value: '10:30',
      },
    })

    await user.click(
      screen.getByRole('button', {
        name: 'Schedule dispatch',
      })
    )

    expect(
      screen.getByRole('heading', {
        name: 'Dispatch scheduled',
      })
    ).toBeInTheDocument()

    expect(
      screen.getByText('18 Sample Street')
    ).toBeInTheDocument()

    expect(
      screen.getAllByText('Tech Alpha').length
    ).toBeGreaterThan(0)

    expect(
      screen.getByText('2026-10-20 at 10:30')
    ).toBeInTheDocument()

    expect(
        screen.getByText('Second storey', { selector: 'dd' })
    ).toBeInTheDocument()
  })

  it('shows a no-match message instead of an incompatible combination', async () => {
    const user = userEvent.setup()

    render(<TechnicianDispatchFlow fixture={fixture} />)

    await user.type(
      screen.getByLabelText('Customer premises'),
      '44 Test Road'
    )

    await user.selectOptions(
      screen.getByLabelText('Fault or problem'),
      'F2'
    )

    await user.selectOptions(
      screen.getByLabelText('Access or equipment requirement'),
      'R1'
    )

    await user.click(
      screen.getByRole('button', {
        name: 'Find compatible technicians',
      })
    )

    expect(
      screen.getByText(
        'No compatible technician and equipment match'
      )
    ).toBeInTheDocument()

    expect(screen.queryByRole('radio')).not.toBeInTheDocument()

    expect(
      screen.getByRole('button', {
        name: 'Schedule dispatch',
      })
    ).toBeDisabled()
  })
})