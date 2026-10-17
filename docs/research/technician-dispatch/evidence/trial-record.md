# Trial Two Technician Dispatch — Criterion Results

## Acceptance Criterion Results

| Criterion | Result | Evidence |
| --- | --- | --- |
| T2-AC01 — Create a dispatch request | Pass | `docs/research/technician-dispatch/evidence/T2-AC01.png` |
| T2-AC02 — Record the fault | Pass | `docs/research/technician-dispatch/evidence/T2-AC02.png` |
| T2-AC03 — Record access and equipment needs | Pass | `docs/research/technician-dispatch/evidence/T2-AC03.png` |
| T2-AC04 — Match the technician to the fault | Pass | `docs/research/technician-dispatch/evidence/T2-AC04.png` |
| T2-AC05 — Match the equipment to the job | Pass | `docs/research/technician-dispatch/evidence/T2-AC05.png` |
| T2-AC06 — Reject an invalid second-storey match | Pass | `docs/research/technician-dispatch/evidence/T2-AC06.png` |
| T2-AC07 — Accept a compatible second-storey match | Pass | `docs/research/technician-dispatch/evidence/T2-AC07.png` |
| T2-AC08 — Reject an invalid pit-job match | Pass | `docs/research/technician-dispatch/evidence/T2-AC08.png` |
| T2-AC09 — Do not invent a compatible match | Pass | `docs/research/technician-dispatch/evidence/T2-AC09.png` |
| T2-AC10 — Schedule a valid dispatch | Pass | `docs/research/technician-dispatch/evidence/T2-AC10.png` |
| T2-AC11 — Record the dispatch result | Pass | `docs/research/technician-dispatch/evidence/T2-AC11.png` |
| T2-AC12 — Show equipment requirements accessibly | Pass | `docs/research/technician-dispatch/evidence/T2-AC12.png` |
| T2-AC13 — Keyboard access | Pass | `docs/research/technician-dispatch/evidence/T2-AC13.png` |
| T2-AC14 — No colour-only information | Pass | `docs/research/technician-dispatch/evidence/T2-AC14.png` |

## Verification Notes

- T2-AC01 to T2-AC14 were manually tested in the technician-dispatch flow.
- The keyboard-only flow was completed successfully for T2-AC13.
- Automated tests passed with `pnpm run test:all`.
- Type checking passed with `pnpm run typecheck`.
- Linting passed with `pnpm run lint`.
- `pnpm audit` was completed and reported pre-existing dependency vulnerabilities. No dependency manifests or lockfile changes were introduced by the technician-dispatch feature.

## Trial Evidence Requirements

- T2-AC15 — Working preview: Pending until the pull request has a working preview URL.
- T2-AC16 — Criterion results recorded: Satisfied by this record
- T2-AC17 — Run details recorded
