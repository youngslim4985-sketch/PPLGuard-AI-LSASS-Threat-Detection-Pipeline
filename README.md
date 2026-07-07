# PPLGuard / SentinelIQ

[![Build Status](https://img.shields.io/badge/build-passing-brightgreen)]()
[![Tests](https://img.shields.io/badge/tests-passing-brightgreen)]()
[![License](https://img.shields.io/badge/license-MIT-blue)]()
[![Coverage](https://img.shields.io/badge/coverage-%25-yellow)]()

> Behavior-based LSASS process protection and threat analytics platform — built on a causal state-transition motif architecture, not signature matching.

<!-- Swap the badges above for real GitHub Actions badges once CI is wired in:
https://docs.github.com/en/actions/monitoring-and-troubleshooting-workflows/adding-a-workflow-status-badge -->

---

## Demo

<!-- Screenshot or short screen-recording GIF of the Grafana dashboard(s) here.
A 15-30 second demo video embedded via GitHub-hosted MP4 or a linked Loom converts far better than static text. -->

`[ dashboard screenshot / demo GIF placeholder ]`

---

## Problem

Traditional LSASS-protection tooling relies on static signatures or vendor-specific EDR hooks — both break the moment an attacker varies technique, and neither gives a SOC analyst a causal explanation of *why* an alert fired, only *that* it fired. Most open detection tooling also stops at alerting; it doesn't score analyst time efficiency or correlate related alerts into a single incident narrative, which means SOC teams drown in low-context noise.

## Solution

PPLGuard/SentinelIQ takes a state-transition causal motif approach: instead of matching known-bad patterns, it models the sequence of process/memory behaviors that precede credential-dumping activity and flags deviations from expected state transitions. This is layered on:

- **TimescaleDB** for high-cardinality time-series threat telemetry
- **Alert correlation engine** that groups related signals into single incidents instead of raw alert floods
- **Bounty Efficiency Score™** — a custom formula scoring analyst/bounty-hunter time-to-signal efficiency
- **PostgreSQL DDL across 6 core tables** modeling entities, events, correlations, and scoring
- **Grafana dashboards** (4 shipped) for real-time SOC visibility

## Results

<!-- Fill in with real numbers once available — these are the categories worth measuring: -->
- Alert-to-incident correlation reduces raw alert volume by **[X]%**
- Mean time-to-triage improved from **[X] → [Y]**
- Detection coverage mapped against **[N] MITRE ATT&CK techniques**, including T1003 (Credential Dumping) and related LSASS-access patterns

---

## Architecture

<!-- Replace with a real diagram — draw.io, Excalidraw, or Mermaid rendered to PNG all work.
Minimum: show data flow from telemetry source → TimescaleDB → correlation engine → Grafana/alerting. -->

```
[ architecture diagram placeholder ]

  Telemetry Sources → Ingest Layer → TimescaleDB → Correlation Engine → Scoring (Bounty Efficiency Score™) → Grafana Dashboards / Alerts
```

## Tech Stack & Skills Demonstrated

| Layer | Technology | Skill Demonstrated |
|---|---|---|
| Time-series storage | TimescaleDB | Schema design for high-cardinality security telemetry |
| Core data model | PostgreSQL (6-table DDL) | Relational modeling for threat correlation |
| Detection logic | State-transition motif engine | Behavior-based (non-signature) detection design |
| Visualization | Grafana (4 dashboards) | Security observability / SOC tooling |
| Scoring | Bounty Efficiency Score™ (custom formula) | Applied quantitative modeling |
| Threat mapping | MITRE ATT&CK | Detection engineering, technique coverage |

---

## Roadmap

- [x] Phase 1–2: Core telemetry ingest + correlation engine
- [x] Phase 3: Causal state-transition motif architecture
- [ ] Phase 4: **Causal intervention layer** — the primary planned competitive differentiator; moves from detection to automated containment recommendations
- [ ] Public detection rule library (Sigma-format export)
- [ ] CI/CD pipeline with automated rule regression testing

---

## Getting Started

<!-- Standard setup instructions — fill in once repo is packaged for public consumption -->

```bash
git clone <repo-url>
cd pplguard
# setup instructions here
```

## License

MIT (or your preferred license)
