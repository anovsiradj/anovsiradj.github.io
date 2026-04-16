# The Interview Answers
1). yes
2). doesnt matter, you decided.
3). everything is on backend server
4). single-level query with joins, with 3 or more tables.
5). doesnt matter, you decided.

to handle the "Pivot" part is also on backend server (engine),
the GUI purpose is to transform interactive form into raw SQL.
you dont have to worry what happened in the backend server.
for `tablefunc` extension, i can provide it.

##############################################################################

yes, users need to define the WHERE.

##############################################################################

sure, do it. the current concept is quite good.

if you ready, make a standalone working app with dummy data (ill change it to API myself).

V2 ##############################################################################

yes, their queries follow a predictable pattern.

about the data,
all thematic tables have geometry column and have relation to regional table.
the schema is very simple, it is a geospatial database.
There is 1 regional table (covering provinces, districts) and many thematic tables (covering areas, forests, roads, rivers, etc.).
then using postgis, we overlay it (union,intersect,different,etc.).

about the bad things that will occurs,
i understand it, every freedom has its consequences,
that is why, the app is for internal use, the already know the data.

about the backend, you can careless about it,
the GUI tool purpose is to convert interactive form into raw SQL.
