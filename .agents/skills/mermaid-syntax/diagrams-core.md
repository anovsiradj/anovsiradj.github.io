# Core Diagram Types (Stable)

These diagram types are stable (non-beta) and have consistent syntax.

---

## Flowchart (`flowchart` / `graph`)

### Gotchas

- `graph` and `flowchart` are interchangeable but `flowchart` is preferred
- Direction: `TD` (top-down), `LR` (left-right), `BT`, `RL`
- Subgraphs **must** have a closing `end` statement
- Node IDs are case-sensitive: `A` and `a` are different nodes
- Links with labels need pipe syntax: `A -->|label| B`

### Prohibitions

- Do NOT use reserved words as node IDs: `default`, `null`, `true`, `false`
- Do NOT use special chars in unquoted IDs: `A["OK"]` not `A[OK]`

---

## Sequence Diagram (`sequenceDiagram`)

### Gotchas

- Actor names with spaces require quotes: `actor "User Agent" as UA`
- `alt` blocks require `else` and `end`
- `loop`, `opt`, `par` also require `end`
- `Note left of A: text` -- note placement is strict: `left of`, `right of`
- Messages: `A->>B` (solid, filled arrow), `A->B` (solid, open), `A-->>B` (dashed)

### Recommendations

- Use `->>` for most messages (solid line, filled arrow)
- Use `-->>` for returns/async responses

---

## Class Diagram (`classDiagram`)

### Gotchas

- Relationships: `A <|-- B` (inheritance), `A *-- B` (composition), `A o-- B` (aggregation), `A --> B` (association)
- Multiplicity: `A "1" *-- "*" B`
- Methods use parentheses: `+method() : returnType`
- Fields use colon: `+String name`
- `namespace` blocks require `end`

### Prohibitions

- Do NOT use `class` keyword to define a class. Use the class name directly:
  ```
  classDiagram
      Animal
  ```
- Do NOT put visibility in field type: `+String name` not `+ name: String`

---

## State Diagram (`stateDiagram-v2`)

### Gotchas

- Must use `stateDiagram-v2` (v1 is deprecated)
- Transitions: `[*] --> Idle`, `Idle --> Running : start`, `Running --> [*]`
- Composite states require `end` keyword
- Notes: `note right of Idle : pending state`

---

## Entity Relationship (`erDiagram`)

### Gotchas

- Relationship labels go in quotes: `CUSTOMER ||--o{ ORDER : "places"`
- Cardinality symbols: `||` (exactly one), `o|` (zero or one), `}|` (one or many), `o{` (zero or many)
- Attributes: `CUSTOMER { string name }` (inside curly braces)

---

## User Journey (`journey`)

### Syntax

```
journey
    title My Working Day
    section Go to work
      Make tea: 5: Me
      Go upstairs: 3: Me
      Do work: 1: Me, Cat
    section Go home
      Go downstairs: 5: Me
      Sit down: 5: Me
```

### Gotchas

- Tasks are indented under sections
- Score is 1-5 (higher is better)
- Multiple actors separated by commas

---

## Gantt Chart (`gantt`)

### Gotchas

- `dateFormat` is required: `dateFormat  YYYY-MM-DD`
- Task syntax: `Task name : status, start, end` or `Task name : milestone, 2025-01-01`
- Status values: `done`, `active`, `crit`, or empty
- **Critical path:** use `crit` status

---

## Pie Chart (`pie`)

### Syntax

```
pie
    title Technology Stack
    "JavaScript" : 35
    "Python" : 25
    "Other" : 40
```

### Gotchas

- Values can be numbers OR strings (will be parsed as numbers)
- Labels must be quoted

---

## Quadrant Chart (`quadrantChart`)

### Syntax

```
quadrantChart
    title Technology Adoption
    x-axis Low Adoption --> High Adoption
    y-axis Low Value --> High Value
    quadrant-1 Invest Heavily
    quadrant-2 Monitor
    quadrant-3 Reconsider
    quadrant-4 Maintain
    React: [0.8, 0.7]
    jQuery: [0.2, 0.3]
```

### Gotchas

- Axis labels MUST use `-->` separator
- Quadrant labels are positional (1=TR, 2=TL, 3=BL, 4=BR)
- Data points: `Label: [x, y]` with values 0-1

---

## Requirement Diagram (`requirementDiagram`)

### Syntax

```
requirementDiagram
    requirement test_req {
        id: 1
        text: the test text
        risk: high
        verifymethod: test
    }
    element test_entity {
        type: simulation
    }
    test_entity - satisfies -> test_req
```

### Gotchas

- `element` blocks are needed (even if just referenced)
- Relationship types: `satisfies`, `verifies`, `traces`, `contains`, `copies`, `derives`, `refines`, `traces`

---

## GitGraph (`gitGraph`)

### Syntax

```
gitGraph
    commit
    commit
    branch develop
    checkout develop
    commit
    commit
    checkout main
    merge develop
    commit
```

### Gotchas

- `branch` creates and checks out
- `checkout` switches branches
- `merge` requires being on the target branch

---

## C4 Diagram (`C4Context`, `C4Container`, `C4Component`)

### Gotchas

- Three levels: `C4Context` (system), `C4Container` (app), `C4Component` (component)
- Person must be declared with `Person` or `Person_Ext`
- System boundary: `Boundary(b, "Label") { ... }`
- Relationships: `Rel(source, target, "label", "technology")`

---

## Mindmap (`mindmap`)

### Gotchas

- **Indentation defines hierarchy** (tabs or spaces, must be consistent)
- Root node is the first line
- Syntax:
  ```
  mindmap
    root((Central Topic))
      Branch A
        Leaf 1
        Leaf 2
      Branch B
  ```

- Shapes: `((round))`, `[[square]]`, `(rounded)`, `{{hexagon}}`, `)cloud(`, `Default`

---

## Timeline (`timeline`)

### Syntax

```
timeline
    title History of Computing
    1970s : C Language
    1980s : C++
    1990s : Python
```

### Gotchas

- Events are indented under time periods
- Can use sections for grouping
