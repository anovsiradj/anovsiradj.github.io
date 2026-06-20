# ZenUML Diagram

## Status

ZenUML requires the **separate package** `@mermaid-js/mermaid-zenuml`. It is NOT included in the standard Mermaid bundle.

If only the base Mermaid package is loaded, ZenUML diagrams will **fail silently** (empty SVG with no error).

## Workaround

Use standard `sequenceDiagram` syntax instead. The visual output is nearly identical for most use cases.

```
sequenceDiagram
    participant C as Customer
    participant S as Server
    participant D as Database
    C->>S: POST /login
    S->>D: Query user
    D-->>S: User data
    S-->>C: 200 OK + token
```

## If You Need ZenUML

Load both packages:
```html
<script src="https://cdn.jsdelivr.net/npm/mermaid@11/dist/mermaid.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/@mermaid-js/mermaid-zenuml@latest/dist/mermaid-zenuml.min.js"></script>
<script>
  mermaid.registerExternalDiagrams([window.ZenUML]).then(() => {
    mermaid.initialize({ startOnLoad: true });
  });
</script>
```
