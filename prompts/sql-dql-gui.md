I need to design a GUI (web app) to raw SQL, with the database being PostgreSQL.

The user asks me that they need to select any data without writing raw SQL.
It includes joins between tables, dynamic columns with aliases, and sometimes they also need to pivot a column.

they are a government organization in the field of forest monitoring,
they are already understand the technical aspects about the data.

for the data, There is 1 regional table (covering provinces, districts) and many thematic tables (covering areas, forests, roads, rivers, etc.).
Regional table: 700+ rows, including provinces/districts/etc.
Thematic tables:
- the largets on my local server is 999882 rows.
- last time i check on client server, largest is 100000000 in 1 thematic table.
- There are more than 100 thematic tables, containing an average of 1000000 rows.

For the record, I have mastering and have a deep understanding of SQL.
However, creating a GUI for DQL (Data Query Language) specifically for "SELECT" is very challenging and impractical.

For the record. i already make the GUI, but its very technical:
- Editor, to write raw SQL (using library codemirror) to the engine.
- engine, to run the sql, to parse the flag, to generate output, use as backend.
- viewer, to show table/chart result from the engine.


after doing my own research at https://www.postgresql.org/docs/current/sql-select.html 
about how "SELECT" works, I need to find a way to make a GUI for:
- dynamically "select" columns from multiple tables
- add using aggregate functions, like SUM,COUNT,CONCAT, etc., on the selected columns
- add using date/time functions, like YEAR,MONTH, etc., on the selected columns
- select grouping
- select ordering
- dynamic numbering (row_number, etc.)
- pivot
- etc

I use Vue v3.
for the sake of simplicity, use bootstrap v5 (and jquery if needed).

Ask me anything, interview me until you have 91% confident about what I actually want, not what I think I should want.
