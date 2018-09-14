<?php
require __DIR__ . '/fn_dirtree.php';

$index_development = false;
$index_output_path = __DIR__ . '/../index.html';

$tree_contents_target = __DIR__ . '/../';
$tree_contents = [];
fn_dirtree($tree_contents_target, $tree_contents, function(&$entry) {
	$end2back = (strlen($entry['rawpath'])-strlen($GLOBALS['tree_contents_target']))*-1;
	$entry['staticpath'] = ltrim(str_replace('//', '/', substr($entry['rawpath'], $end2back)), '/');
	unset($entry['realpath']); unset($entry['rawpath']);
});

// header('content-type: text/plain');
// print_r($tree_contents);
// die;

if(!$index_development) ob_start();
?><!DOCTYPE html>
<html>
<head>
	<meta charset="UTF-8">
	<meta name='viewport' content='width=device-width, initial-scale=1.0'>
	<link rel="icon" href="favicon.ico" type="image/ico">
	<title>anovsiradj @ github.io</title>
	<style type="text/css">
	* {
		margin: 0px;
		padding: 0px;
	}
	html,body,table,tr,td {
		height: 100%;
		width: 100%;
		background-color: #222;
		color: #666; /*fff,eee,e6e6e6,ccc,b2b2b2,999,808080,666*/
	}
	table {
		text-align: center;
	}
	.h {
		color: #e6e6e6;
		font-size: 6em;
		margin: 0px auto;
		text-shadow: 3px 3px #669900;
	}
	.p {
		color: #999;
		font-size: 1.2em;
		text-shadow: 0px 0px 1px #eee;
	}
	#v {
		font-family: monospace;
		font-size: 25px;
		margin-bottom: 50px;
	}
	a {
		text-decoration: none;
	}
	</style>
	<script src="//cdnjs.cloudflare.com/ajax/libs/vue/2.5.17/vue.min.js"></script>
</head>
<body>
	<table>
		<tr>
			<td>
				<div class="h">Hello (GitHub) World !</div>
				<div class="p">anovsiradj @ github.io</div>
			</td>
		</tr>
	</table>

<!-- https://codepen.io/patrickhlauke/pen/azbYWZ -->
<pre id="v"><ascii-tree v-for="node in nodes" v-bind:branch="node" :key="node.realpath"></ascii-tree></pre>
	<script>
		Vue.component('ascii-tree', {
			props: ['branch'],
			template: (function() {
				return [
					'<div style="padding-left:25px;">',
						'├─ ',
						'<span v-if="branch.type === \'dir\'">{{branch.name}}</span>',
						'<a v-else v-bind:href="branch.staticpath">{{branch.name}}</a>',
						'<ascii-tree v-if="branch.node" v-for="node in branch.node" v-bind:branch="node" :key="node.realpath"></ascii-tree>',
					'</div>',
				].join('');
			})()
		});
		var vxtree = (new Vue({ el: '#v', data:{nodes: <?php echo json_encode($tree_contents) ?>} }));
	</script>
</body>
</html>

<?php
if(!$index_development) file_put_contents($index_output_path, ob_get_clean());
