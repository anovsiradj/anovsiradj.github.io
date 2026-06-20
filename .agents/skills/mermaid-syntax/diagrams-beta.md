# Beta Diagram Types

These diagram types are marked `*-beta` in Mermaid v11.15.0. Syntax may change between versions. All use the `beta` suffix in their keyword.

---

## Sankey Diagram (`sankey-beta`)

### Syntax

```
sankey-beta
    Source,Target,Value
    Electricity Generation,Useful Energy,55
    Electricity Generation,Losses,35
```

### Gotchas

- CSV-like syntax: `Source,Target,Value` (NO quotes needed)
- No diagram title -- use a comment or heading above
- Values must be numbers
- Node names with commas: use quotes `"Node, with comma"`

---

## XY Chart (`xychart-beta`)

### Syntax

```
xychart-beta
    title "Monthly Revenue"
    x-axis ["Jan", "Feb", "Mar"]
    y-axis "Revenue ($K)" 0 --> 100
    bar [30, 40, 50]
    line [30, 40, 50]
```

### Gotchas

- x-axis labels MUST be a quoted array: `["Jan", "Feb"]`
- y-axis range uses `-->` not `to`: `0 --> 100`
- Data arrays use bracket syntax: `[30, 40, 50]`
- Both `bar` and `line` can coexist

---

## Block Diagram (`block-beta`)

### Syntax

```
block-beta
    columns 3
    a["Frontend"]:2 b["API"]
    block:group:2
        c["Auth"] d["User"]
    end
    e["Database"]
    a --> b
    b --> c
```

### Gotchas

- `columns N` sets how many columns the grid uses
- `:N` suffix on ID means span N columns: `a:2`
- Groups use `block:ID:span { ... }` with closing `end`
- Connections use `-->` like flowcharts

---

## Packet Diagram (`packet`)

### Syntax

```
packet
    title TCP Header
    0-3: "Source Port"
    4-7: "Destination Port"
    8-31: "Sequence Number"
```

### Gotchas

- Bit ranges: `start-end: "Label"`
- Ranges must be contiguous (or close) to render properly
- Title uses `title` keyword

---

## Kanban (`kanban`)

### Syntax

```
kanban
    id1[Todo]
        id2[Design schema]
        id3[Write tests]
    id4[In Progress]
        id5[Implement auth]
    id6[Done]
        id7[Setup repo]
```

### Gotchas

- Column headers are top-level items
- Cards are **indented** under their column
- Column and card IDs must be unique

---

## Architecture (`architecture-beta`)

### Syntax

```
architecture-beta
    group api(cloud)[API]
    service db(database)[Database] in api
    service server(server)[Server] in api
    service disk(disk)[Storage] in api
    service internet(internet)[Internet]
    db:L -- R:server
    server:B -- T:disk
    internet:B -- T:server
```

### Gotchas

- Service types: `database`, `server`, `disk`, `cloud`, `internet`, `block`, `queue`
- Position notation: `source:SIDE -- SIDE:target`
  - Sides: `T` (top), `B` (bottom), `L` (left), `R` (right)
- Groups: `group id(type)[Label]`
- Services in groups: `service id(type)[Label] in group`

---

## Radar Chart (`radar-beta`)

### Syntax

```
radar-beta
    title Developer Skills
    axis Frontend, Backend, DevOps, Database, Testing
    curve Current {8, 7, 5, 6, 7}
    curve Target {9, 8, 8, 8, 9}
    showLegend true
```

### Gotchas

- Axis labels are comma-separated, **NOT quoted**: `axis Frontend, Backend`
- Curve values use curly braces with comma-separated numbers: `{8, 7, 5}`
- **Values must be unquoted numbers inside braces**
- `showLegend true` is optional

### Prohibitions

- Do NOT quote axis labels or curve values
- Do NOT use `:` for size (unlike Venn)

---

## Event Modeling (`eventmodeling`)

### Syntax

**Compact:**
```
eventmodeling
tf 01 ui CartUI
tf 02 cmd AddItem
tf 03 evt ItemAdded
tf 04 rmo CartView
```

**Relaxed:**
```
eventmodeling
timeframe 01 ui CartUI
timeframe 02 command AddItem
timeframe 03 event ItemAdded
timeframe 04 readmodel CartView
```

### Entity Types

| Compact | Relaxed | Swimlane |
|---------|---------|----------|
| `ui` | `ui` | UI/Automation |
| `pcr` | `processor` | UI/Automation |
| `cmd` | `command` | Command/Read Model |
| `rmo` | `readmodel` | Command/Read Model |
| `evt` | `event` | Events |

### Gotchas

- **Blank line required** after `eventmodeling` keyword (or at least no content on same line)
- Timeframe numbers are unique identifiers (order doesn't matter)
- Compact keywords (`tf`, `cmd`, `evt`, `rmo`, `pcr`) are shorter but less readable
- `rf` / `resetframe` breaks automatic relationship inference

---

## Treemap (`treemap-beta`)

### Syntax

```
treemap-beta
    "Project Budget"
        "Development"
            "Frontend": 30
            "Backend": 40
        "Operations"
            "DevOps": 15
```

### Gotchas

- **Section/parent nodes** are quoted strings WITHOUT a value
- **Leaf nodes** are quoted strings WITH a colon and value: `"Label": 30`
- Hierarchy is defined by indentation
- Top-level items without indentation are roots

---

## Venn Diagram (`venn-beta`)

### Syntax

```
venn-beta
    set A["JavaScript"]
    set B["Python"]
    set C["Go"]
    union A,B["Full Stack"]
    union A,C["Systems"]
    union B,C["Data Science"]
```

### Gotchas

- **`set` keyword is REQUIRED** before each set identifier
- **`union` keyword is REQUIRED** before each union
- **Union members are comma-separated**: `union A,B["Label"]` NOT `union AB A B`
- Labels use bracket syntax on the union name: `A,B["Full Stack"]`
- Set identifiers can be bare words or quoted strings

### Prohibitions

- Do NOT use space-separated union syntax: ~~`union AB A B`~~
- Do NOT use `union` without preceding `set` declarations
- Do NOT omit the `set`/`union` keywords

---

## Ishikawa / Fishbone (`ishikawa-beta`)

### Syntax

```
ishikawa-beta
    Low Code Quality
    Requirements
        Unclear requirements
        Changing specs
    Process
        No code review
        No testing standards
    People
        Lack of training
    Tools
        Outdated IDE
```

### Gotchas

- **First line** is the effect/problem (no keyword needed)
- Categories and causes are defined purely by **indentation**
- No colons, no quotes, no special syntax -- just indentation levels

### Prohibitions

- Do NOT use colon syntax: ~~`"Requirements" : cause`~~
- Do NOT quote the problem statement or categories

---

## Wardley Map (`wardley-beta`)

### Syntax

```
wardley-beta
    title Strategy Map
    anchor User [0.9, 0.95]
    component "Web App" [0.7, 0.7]
    component API [0.5, 0.6]
    component Database [0.3, 0.5]
    User -> "Web App"
    "Web App" -> API
    API -> Database
    evolve API 0.85
    note "Key decision" [0.4, 0.5]
```

### Gotchas

- Coordinates are `[visibility, evolution]` NOT `[x, y]`
  - Visibility (Y-axis): 0.0=infrastructure, 1.0=user-facing
  - Evolution (X-axis): 0.0=genesis, 1.0=commodity
- **This is the OWM format** (OnlineWardleyMaps) -- coordinates are swapped from typical x,y
- Component names with spaces MUST be quoted: `"Web App"`
- Component names without spaces do NOT need quotes: `API`
- Anchors represent users with bold labels

### Decorators

- `(build)` -- triangle (build in-house)
- `(buy)` -- diamond (purchase)
- `(outsource)` -- square
- `(market)` -- circle
- `(inertia)` -- resistance to change

---

## TreeView (`treeView-beta`)

### Syntax

```
treeView-beta
    "src/"
        "components/"
            "Header.tsx"
            "Footer.tsx"
        "pages/"
            "Home.tsx"
    "public/"
        "index.html"
    "package.json"
```

### Gotchas

- **Indentation defines hierarchy** (like file system)
- All items are quoted strings
- Folders are items with `/` suffix (cosmetic, not functional)
- Leaf files are items without children
