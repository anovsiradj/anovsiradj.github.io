help make sql to query "Cartesian Product" from multiple tables (2 or more) in postgis (postgresql).

that multiple tables is called tematik.
that tematik will be filtered using wilayah tables (wilayah_prov,wilayah_kab),
that tables is to hold geometry for the regions.
the summary is to find luas (area size, in hectare) based on spatial operation.
the function signature is always `function(geomA, geomB)`.

sample values for wilayah tables (kode,nama,geom):
- provinsi1,01,geom
- kabupaten1,01.01,geom
- kabupaten2,01.02,geom
- provinsi2,02,geom
- etc

from the frontend perspective (user input):
- they choose spatial operation (a postgis function)
- choose tematik tables (1,2 or more)
- they choose specific columns for each selected tematik (1,2 or more)
- submit the form, and get the summary.

The spatial operations refer to the "Overlay Functions" in PostGIS:
- ST_Difference
- ST_Intersection
- ST_MemUnion
- ST_Node
- ST_Subdivide
- ST_SymDifference
- ST_UnaryUnion
- ST_Union

simulation:

here is the simulation.

table1
|a|b|geom|
|-|-|---|
|1|1|1|
|1|2|2|
|2|2|3|

table2
|c|d|geom|
|-|-|---|
|3|3|2|
|3|4|2|
|4|4|3|

result
|a|b|c|luas|
|-|-|-|-|
|1|2|3|2|
|2|2|3|3|

---

interrogate me until you understand 100% about what i want, not what i should i want.

===============================================================================================
===============================================================================================
===============================================================================================

after reading your research, i have some questions.

why using `cross join` instead of `union all` on the query?

why there is no `group by` using selected columns on the query?