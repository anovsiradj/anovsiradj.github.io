for js, its intentional for using jquery, also i want to upgrade it v4.
for build tool and bundling, i will use deno because it has builtin bundler and package manager.
that is mean, i want you to not use node or npm/pnpm/etc.

to avoid YouTube ToS because hiding the buttons/actions,
make it configurable and disabled by default.
that is mean i need options/config page.
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

i have checked the extension in chrome.

your changes also effecting the button controls,
for example: if i increase zoom, it is also zoom the controbar.
that is wrong, i should be only change the player.

for frontend/browser/client js scripts, i want to keep using jquery (v4).
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

i have checked the extension in chrome,
the custom controls is not added.

options.js should use jquery too.
can you just bundling jquery to client.js and options.js with tree shaking?
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

why you need to use esm.sh? there is no reason for it.

i have added jquery using `deno add npm:jquery`.
i have deleted `import_map.json`.

i also changed the CHANGE.md file.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
i have deleted the mod.ts file, no need for entry point.
where is the watch task in deno.json?
