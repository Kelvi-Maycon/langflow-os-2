---
name: action-plan-prd
description: Analyze a goal, initiative, feature idea, or ambiguous request and turn it into a concrete plan of action. Use when Codex needs to scope work, recommend what should be built, produce a PRD, define phases and milestones, break the work into tasks, identify assumptions, dependencies, risks, success metrics, rollout steps, and open questions for product, operations, study plans, internal initiatives, or execution planning in general.
---

# Action Plan PRD

Turn vague intent into an execution package that is sized to the job. Prefer a right-sized plan over a bloated document set, but do not skip scope, risks, dependencies, or decision points when they matter.

## Start With The Outcome

Translate the user's request into:

- desired outcome
- problem or opportunity
- who is affected
- why this matters now
- definition of success
- time, resource, or quality constraints

If important context is missing, make reasonable assumptions and label them. Ask follow-up questions only when a wrong assumption would materially change the recommendation.

## Choose The Planning Package

Pick the smallest package that can still guide execution:

- **Quick plan**
  - Use for small or low-risk requests, personal action plans, narrow experiments, bugfix initiatives, or when the user mainly needs next steps.
  - Include: outcome summary, assumptions, recommended approach, phases, immediate tasks, risks, and open questions.
- **Standard plan**
  - Use for most feature work, internal initiatives, launches, process changes, and scoped projects.
  - Include: brief, goals and non-goals, users or stakeholders, PRD-lite, execution plan, milestone map, task backlog, dependencies, risks, metrics, and open questions.
- **Full plan package**
  - Use for multi-team work, expensive efforts, external launches, platform changes, process transformations, or requests with serious delivery risk.
  - Include: context brief, full PRD, phased roadmap, task backlog with acceptance criteria, decision log, risk register, rollout plan, communication plan, and success measurement.

Read [references/package-selection.md](references/package-selection.md) when the sizing decision is not obvious.

## Run The Workflow

### 1. Frame The Work

Write a compact framing block before planning:

- one-sentence objective
- current problem or gap
- target user, stakeholder, or owner
- constraints
- planning assumptions
- success criteria

Convert vague goals into explicit verbs such as launch, reduce, improve, validate, migrate, automate, document, or learn.

### 2. Define Scope

Separate:

- goals
- non-goals
- must-haves
- should-haves
- future ideas

If the user asks for a PRD, define scope before writing requirements. If the user asks only for tasks, still include at least a compact scope statement so the backlog has boundaries.

### 3. Write The Core Recommendation

Recommend one primary approach. Do not present multiple options as equals unless the tradeoff is genuinely unresolved.

For the recommended approach, state:

- why it fits the objective
- key tradeoffs
- major dependencies
- expected sequence of work
- what must be true for it to succeed

### 4. Produce The Right Deliverables

Default deliverables by package size:

- **Quick plan**
  - context snapshot
  - action plan
  - immediate task list
  - risks and questions
- **Standard plan**
  - brief
  - PRD-lite
  - execution plan
  - task backlog
  - risks, dependencies, and metrics
- **Full plan package**
  - context brief
  - full PRD
  - execution roadmap
  - backlog with acceptance criteria
  - risks and decisions
  - rollout and measurement plan

Read [references/prd-guide.md](references/prd-guide.md) when writing or right-sizing a PRD.

### 5. Build The Task Plan

Break work into phases that can actually be executed. Each phase should have:

- objective
- entry condition
- key tasks
- dependency notes
- completion signal

For tasks, prefer this structure:

- task name
- why it exists
- owner type or function if known
- dependencies
- acceptance criteria

Avoid giant flat task lists. Group by phase, milestone, or workstream.

Read [references/execution-checklists.md](references/execution-checklists.md) when decomposing tasks, sequencing milestones, or defining rollout and metrics.

### 6. Surface What Usually Gets Missed

Include these when they matter:

- assumptions
- non-goals
- dependencies
- risk register
- open questions
- decision log
- rollout plan
- communication needs
- success metrics
- validation plan

If the prompt is strategic, add options considered and recommendation rationale. If the prompt is operational, bias toward sequencing, ownership, and blockers.

## Hold This Quality Bar

The plan should be:

- actionable enough to start immediately
- scoped enough to avoid backlog sprawl
- explicit about assumptions and risks
- sequenced in a realistic order
- clear about what is not included
- measurable after execution begins

## Use The Bundled Resources

Read only what the task needs:

- [references/package-selection.md](references/package-selection.md) for picking quick, standard, or full output
- [references/prd-guide.md](references/prd-guide.md) for PRD structure and how to compress it
- [references/execution-checklists.md](references/execution-checklists.md) for milestones, backlog quality, rollout, risks, and metrics

Use `scripts/scaffold_plan_bundle.py` when the user wants the planning package materialized as files:

```bash
python3 scripts/scaffold_plan_bundle.py --title "Launch referral program" --mode standard --output docs/referral-plan
python3 scripts/scaffold_plan_bundle.py --title "Q2 study reset" --mode quick
```

Generate the scaffold first, then fill in the content.
