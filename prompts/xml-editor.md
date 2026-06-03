create standalone XML editor using HTML,CSS,JS.

- use jquery, maximize its features.
- use jquery-jstree to display the xml as tree.
- use bootstrap v5 with dark mode, maximize its features.

workflow:
- import xml, to textarea or upload xml file then load the content to textarea.
- a form to edit (create/update) node with its attr (attribute)
- able delete node
- able delete attr
- export xml, to textarea or download the textarea content as xml file.
- repeat.

when editing node make sure it have no child node,
when it have child node make sure form only show attr form,
because if child node save as text it will break the xml structure.

use builtin browser standard features like XMLDocument,XMLSerializer,DOMParser if necessary.

# deepseek

after checking the result.
i need dedicated form section to create/update node with its attr.

workflow:
- import xml
- editing by create/update on dedicated form section
- delete
- export xml
