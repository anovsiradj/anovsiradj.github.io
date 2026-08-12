# MAIN:CREATE

audit this project from source code, find all flaws and all flows.
- give honest reviews with explicit reasons
- give constructive/destructive criticisms
- give ideas based on your audit result
- possibility of fixs or bugs
- possibility of improvements

for complete database structures see `structures.sql`.
for API schemas almost entirely following the database structures.

# MAIN:UPDATE

update `./dokum/` for flaws and flows with current project state.

cleanup and remove any unused/outdated/unrelated documentation.

update flaws in `./dokum/`.
Mark fixed flaws by adding prefix `**[FIXED]**` (bold),
make sure marked flaws have been validated and verified.

# FORCE

you must Understand this project 100%.
interogate me until you have 100% confident about what I actually want, not what I think I should want.

When in doubt, prompt it out.

# FLOWS

for flows visualize it based on App Flow, Task Flow, User Flow, Customer Journey.
group it based on their respective roles/types/features/modules.

# FLAWS

for flaws find it based on their respective roles/types/features/modules,
each flaws must includes:
- feedback
- file (use relative path)
- line (line number for the file)
- working solution snippet

# OUTPUT

Use Indonesian as the main language,
but do not translate source code and technical jargon and other terms that should not be translated.

use mermaid in markdown for visualization.

to make things small and organized,
separate files based on roles/types/features/modules.

write down everything in `./dokum/`.

# app to prd

create PRD for q9t-v3 module that has been implemented.
Explain each process in detail, from A to Z, from input to output with repeat.
These include:
- Backend workflow
- Frontend workflow
- Build steps description
- SQL generation description
- etc.

save it in a file at `./sigap_forge/q9t-v3-prd.md`
