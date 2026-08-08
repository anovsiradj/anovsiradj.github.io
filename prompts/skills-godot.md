create skills for each features listed in here
https://docs.godotengine.org/en/stable/about/list_of_features.html

save each skills to `godot/godot-{feature}` (snakecase).
make it universal (vendor agnostic), so every agents can use it.

Instead of creating a skill from scratch, simply note down the unusual things, weird things, recommendations, and prohibitions of what you have learned and understand from the docs.

provide explaination for hard/complex things with "Explain like I'm 5" methodology,
also provide it with complete working example that easy to understand.

Emphasize the differences between this major version and the previous one so that the agent does not get confused or hallucinate.

jangan lupa, selalu baca ./AGENTS.md.
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
complete each skills based on related "Manual" Pages or `https://docs.godotengine.org/en/stable/tutorials/*`.

to make `SKILL.md` small and organized,
separate files on each skill based on contexts (class/function/usage/etc).
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
aku ingin kamu menyempurnakan semua skills yang ada di `./godot/*/`,
validasi dan evaluasi lalu sempurnakan semua skills itu.

untuk source code docs nya sudah aku clone di `C:\works\skills\tmp\godot-docs.git`.

skills dibuat berdasarkan features di `C:\works\skills\tmp\godot-docs.git\about\list_of_features.rst`.
setiap feature disimpan dengan nama `godot/godot-{feature}` (snakecase).

supaya kamu, semua godot skills:
- is universal, so every agents can use it.
- Instead of creating a skill from scratch, simply note down the unusual things, weird things, recommendations, and prohibitions of what you have learned and understand from the docs.
- provide explaination for hard/complex things with "Explain like I'm 5" methodology, also provide it with complete working example that easy to understand.
- Emphasize the differences between this `major.minor` (v4.7) version and the previous major (v3) one so that the agent does not get confused or hallucinate.

to make `SKILL.md` and other files small and organized,
separate files on each skill based on contexts (class/function/etc).
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
untuk statement kamu bahwa fitur `File-based organization` sudah ditambahkan,
setelah aku cek pakai `git diff HEAD --stat`,
perubahan kamu hanya dilakukan 1 file dimasing2 folder skills, `SKILL.md` .

contoh `./godot/godot-miscellaneous/SKILL.md` menambahan sampai 700+ baris.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
then you must break it into multiple files for each skills.
give your plan, save it to `C:\works\skills\.agents\works\001a-plan.md`, ill review it, dont execute it before i accept your plan.
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
help refactor/adjust/improve skills at `./godot/**/`, including the broken examples.

for your `Honest quality assessment` in `./godot/**` help me fixes it.
use the cloned official docs (`./tmp/godot-docs.git/`) as your references and guidelines.

organize the skills files, maybe you can also separate examples to it own files, if necessary.

semuanya aku percayakan padamu.
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
amazing!

i dont know that you can do lint/test/static_analysis/debug for godot script!
can you make a new skill for that? to validate/evaluate godot script from CLI.