
1). Who will use this GUI?
they are a government organization in the field of forest monitoring,
they are already understand the technical aspects about the data.

2). There is 1 regional table (covering provinces, districts) and many thematic tables (covering areas, forests, roads, rivers, etc.).
Regional table: 700+ rows, including provinces/districts/etc.
Thematic tables:
- the largets on my local server is 999882 rows.
- last time i check on client server, largest is 100000000 in 1 thematic table.
- There are more than 100 thematic tables, containing an average of 1000000 rows.

3). Manual only, all thematic tables have geometry column and have relation to regional table.

4). turn rows into columns dynamically.
namely making the contents of a column in table1 then aggregating it with table2, or table1 directly aggregating itself using sum, count, etc.

5). Simple conditions with ordering, grouping and aggregated columns.

6). yes, the result is raw SQL saved on specific table named data.

7). for table use limit-offset, for chart use Real‑time charting.

8). yes, in fact i already make the same app, but very explicit, user having hard time to use it.

9). must have features:
- Aggregate functions
- Date/time functions
- ORDER BY multiple columns
- Row numbering
for CTEs it is optional.

10). no, we already have the engine to run it on the server that return the response to the web.
the engine work as connector between frontend/web and backend/db, nothing more or less.

11). only me.

here some trivia:
the user too lazy to learn SQL,
but they want to analyze the data by themself,
that why the need more user friendly.

but for me what i need is feature friendly, simple and explicit.

btw here is my existing tool that i already made, it is very straight foward:
- Editor, to write raw SQL (using library codemirror)
- engine, to run the sql, to parse the flag, to generate output.
- viewer, to show table/chart result.
- the user can choose to preview the table or the chart.
you must be curious how do i do it? it is very simple:
on the editor, i add custom columns on the raw SQL to flag the contents that will be parsed by the engine:
```sql
select
'Nama Unit' as x,
'Luas (Ha)' as y,
'Luas (Ha)=decimal' as z
'Zonasi' as _x_label,
'remark' as _x_field,
'column1=currency|column2=year' _formats
```

##############################################################################

1). yes, i can install `tablefunc`, i have control for the server.
You: would you accept that pivot is semi‑dynamic?
Me: it doesnt matter

2). answers:
- yes, the user will Pick two or more tables
- Draw a line between table representations, no need, too advanced, to much coding.

basically the tool that i need is to make GUI for SQL,
it will replace my old editor (from raw SQL) to GUI using an advanced form.

3). no need, ill do it myself.
the GUI tool purpose is to convert interactive form into raw SQL.
you can careless about existing engine.

4). yes. it can be Row number or Ranked numbering

5). no need, ill do it myself.

##############################################################################

for the current concept it is quite good.
give me standalone working app with dummy data (ill change it to API myself).
