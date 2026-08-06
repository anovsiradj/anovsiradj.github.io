EXECUTE ONE-OFF MIGRATION: LEGACY JSON TO MARKDOWN

Before starting, read `./.agents/BRAINS.md` to establish your target operational constraints. Then, execute the following migration loop immediately:

1. SCAN LEGACY FILES: Locate all `.json` files within the `./.agents/` and `./.agents/brains/` directories (e.g., `context-references.json`, etc.).
2. TRANSLATE & COMPRESS: Extract the data from all located `.json` files. Translate this data into the dense, machine-readable Markdown shorthand required by `BRAINS.md`. 
   - Apply the 5W1H principle (WHAT, WHY/HOW, WHAT NOT) to the raw JSON values.
   - Do not just dump JSON into Markdown. Reformat it into strict bullet points and pseudo-code.
3. NAMESPACE & SPLIT: Create NEW Markdown files inside `./.agents/brains/` using the strict `[category]-[specific_topic].md` naming convention (e.g., `tech-stack.md`, `ui-rules.md`). 
   - ENFORCE HARD LIMIT: No newly created `.md` file may exceed hundreds lines. Split them if necessary.
4. PURGE LEGACY: Once all knowledge is securely translated and saved into the new `.md` files, PHYSICALLY DELETE all legacy `.json` files to prevent context duplication and cognitive bloat.
5. CONFIRMATION: Execute silently. Once finished, output a concise list of the deleted `.json` files and the newly generated `[category]-[topic].md` files. Do not explain the process.
