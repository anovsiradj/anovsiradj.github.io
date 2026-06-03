# PRD — Recruitment & Candidate Assessment System

## 1. Overview

Build a web-based Recruitment & Candidate Assessment System.

The application is intended for internal company recruitment workflow management.

The system must support:
- candidate recruitment
- dynamic workflow stage
- candidate assessment
- candidate comparison
- assignment workflow
- recruiter/reviewer/manager collaboration

The system must be generic enough to support flexible recruitment flow, but still simple and maintainable.

---

# 2. Technology Stack

## Backend

- PHP 8.2+
- Native PHP (NO framework)
- SQLite
- PDO
- REST API

## Frontend

- Vue 3 latest
- Vite
- Bootstrap v5
- Bootstrap Icons v1
- Pinia
- Vue Router

## Runtime / Tooling

- Deno

---

# 3. Architecture Requirements

## Backend Architecture

Use modular architecture.

Structure:

```text
backend/
├── public/
├── app/
├── storage/
├── bootstrap/
└── vendor/
```

Module structure:

```text
Module/
├── Candidate/
├── Workflow/
├── Assessment/
├── File/
├── Comparison/
└── Auth/
```

Each module should contain:

```text
Controller
Service
Repository
Validator
Transformer
```

Business logic must stay inside Service.

Repository handles database query.

Controller only handles HTTP layer.

---

# 4. Database Rules

## Important Rules

- Use SQLite
- Use singular table names
- No JSON column
- Relation must be explicit
- Use snake_case
- Use INTEGER PRIMARY KEY AUTOINCREMENT
- Use TEXT for datetime storage

## Foreign Key

Enable:

```sql
PRAGMA foreign_keys = ON;
```

---

# 5. Main Domains

## Auth Domain

Tables:

```text
role
user
```

---

## Recruitment Domain

Tables:

```text
period
position
batch
candidate_status
candidate
```

---

## Workflow Domain

Tables:

```text
recruitment_stage
workflow
workflow_stage
workflow_assignment
workflow_activity
```

---

## Assessment Domain

Tables:

```text
assessment_template
assessment_section
assessment_criteria
assessment_submission
assessment_score
```

---

## File Domain

Tables:

```text
file
```

---

# 6. Candidate Workflow Concept

Workflow is mutable.

Requirements:

- recruiter can add workflow stage at runtime
- workflow is sequential process
- workflow stage can be reordered
- workflow stage can be repeated
- assessment can be submitted multiple times
- every workflow has activity timeline

Workflow is NOT strict hierarchy.

---

# 7. Assessment System Rules

## Assessment Structure

Assessment contains:

```text
Template
→ Section
→ Criteria
→ Submission
→ Score
```

---

## Assessment Requirements

Each assessment:

- has criteria
- each criteria has score
- each criteria can have note
- each criteria has weight
- each criteria can have minimum score
- template can have minimum score
- assessment can be submitted multiple times
- latest attempt is active

---

## Formula Types

Supported formula types:

```text
SUM
AVG
WEIGHTED_AVG
```

---

## Weighted Average Formula

```text
(sum(score * weight)) / (sum(weight))
```

---

## Pass Validation

Assessment passes when:

```text
all criteria minimum score passed
AND
final score >= template minimum score
```

---

# 8. Candidate Comparison Requirements

Comparison feature must support:

- select some candidates
- select all candidates
- filter by period
- filter by batch
- filter by assessment template
- compare section score
- compare criteria score
- compare total score
- compare reviewer recommendation

---

## Comparison Result

Display as table matrix.

Example:

| Candidate | Logic | Communication | Leadership | Final |
|---|---|---|---|---|
| A | 90 | 80 | 70 | 80 |
| B | 85 | 90 | 95 | 90 |

---

# 9. Role Rules

## Recruiter

Can:
- access everything
- manage workflow
- manage candidate
- manage assessment template

---

## Manager

Can:
- only access owned candidate/workflow
- assign reviewer/interviewer

Manager cannot see other manager data.

---

## Reviewer

Can:
- access assigned workflow only
- submit assessment

---

# 10. File Upload Rules

Use generic file table.

Fields:

```text
id
refer_id
refer_table
refer_field
title
name
path
mime
ext
size
hash
created_at
updated_at
uploaded_at
created_by
updated_by
uploaded_by
```

Requirements:

- hash means checksum
- ext means extension
- use generated filename
- never use original filename as storage filename
- support reusable attachment system

---

# 11. API Requirements

Use REST API.

Response format:

## Success

```json
{
  "success": true,
  "message": "OK",
  "data": {}
}
```

## Error

```json
{
  "success": false,
  "message": "Validation failed",
  "errors": {}
}
```

---

# 12. Required API Modules

```text
/auth
/role
/user
/period
/position
/batch
/candidate
/recruitment-stage
/workflow
/workflow-stage
/workflow-assignment
/workflow-activity
/assessment-template
/assessment-section
/assessment-criteria
/assessment-submission
/file
/comparison
/dashboard
```

---

# 13. Frontend Requirements

## Frontend Architecture

```text
src/
├── api/
├── components/
├── layouts/
├── modules/
├── pages/
├── router/
├── stores/
└── utils/
```

---

## Required Layout

- sidebar layout
- top navbar
- responsive layout
- bootstrap v5 only

---

## Required Pages

### Auth

- Login

### Dashboard

- Summary statistics
- Candidate summary
- Workflow summary

### Master Data

- Role
- User
- Period
- Position
- Recruitment Stage
- Assessment Template

### Recruitment

- Batch
- Candidate
- Workflow
- Workflow Stage
- Assignment

### Assessment

- Assessment Template
- Assessment Submission
- Assessment Detail

### Comparison

- Comparison Matrix
- Comparison Detail

---

# 14. UI Requirements

Use Bootstrap 5 heavily.

Use:

- table-based UI
- modal
- offcanvas
- accordion
- badge
- progress
- dropdown
- tabs
- sticky table header

The application is data-heavy internal system.

Focus on:

- speed
- readability
- information density
- usability

Do NOT overdesign.

---

# 15. Important Implementation Rules

## Backend

- use PDO
- use prepared statement
- avoid magic abstraction
- avoid ORM
- avoid ActiveRecord
- prefer raw SQL

---

## Frontend

- use Composition API
- use Pinia
- use Vue Router
- use reusable table component
- use reusable form component
- use reusable modal component

---

## Workflow Mutation

Must support:

- insert stage
- move stage
- delete stage
- reorder stage
- complete stage

Maintain order_no consistency.

---

## Assessment Attempt

Every new assessment submission:

- creates new attempt
- never overwrite old submission

---

# 16. Security Rules

Backend must validate:

- ownership
- assignment access
- role access

Never trust frontend filtering.

---

# 17. SQLite Rules

Enable:

```sql
PRAGMA journal_mode=WAL;
```

Use indexes properly.

Avoid unnecessary joins.

---

# 18. Coding Style

## PHP

- PSR-12 style
- typed method when possible
- avoid static global state
- keep service small

---

## Vue

- Composition API
- avoid massive component
- split reusable component
- avoid business logic inside component template

---

# 19. MVP Scope

## Included

- authentication
- candidate management
- workflow management
- assessment management
- comparison engine
- file upload
- dashboard

---

## Excluded

- AI scoring
- OCR CV parser
- realtime collaboration
- websocket
- notification system
- workflow visual builder
- template versioning
- automation engine
- advanced expression formula

---

# 20. Final Goal

The final application must:

- be maintainable
- be modular
- support dynamic workflow
- support repeated assessment
- support candidate comparison
- work properly on SQLite
- work properly without PHP framework
- be easy to debug manually
- be easy to extend later
- remain simple enough for solo development

