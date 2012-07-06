jQuery ListView
===============

This is a jQuery plugin doing similar things as iOS ListView but with HTML tag `<ul> <li>` as the data structure.
This plugin script part is ready. But the css I provide is bad.

**[DEMO](http://marcoleong.github.com/ListView/demo.html)** here.

Usage
-----

Add script

```javascript
$('.nestable-view').listView();
```

and include the library

```html
<script type="text/javascript" src="jquery-1.7.2.min.js"></script>
<script type="text/javascript" src="jquery.listview.js"></script>
```

Markup

```html
<ul class="nestable-view">
	<li>
		Campus 1
		<ul>
			<li>Block A
				<ul>
					<li>Room A1</li>
					<li>Room A2/li>
					<li>Room A3</li>
				</ul>
			</li>
			<li>Block B
				<ul>
					<li>Room B1</li>
					<li>Room B2</li>
					<li>Room B3</li>
				</ul>
			</li>
		</ul>
	</li>
	<li>
		Campus 2
		<ul>
			<li>Block C
				<ul>
					<li>Room C1</li>
					<li>Room C2</li>
					<li>Room C3</li>
				</ul>
			</li>
			<li>Block D</li>
		</ul>
	</li>
</ul>
```

Add style

```css
.nestable-container {
	overflow:hidden;
	width:100px;
	height:300px;
	position:relative;
	z-index:0;
	background-color: white;
	border:1px solid black;

}
.nestable-view {
	/*overflow:hidden;*/
	width:99px;
}

.nestable-view ul{
	display:inline-block;
	left:0px;
	top:0px;
	background-color:white;
	width:100px;
	height:300px;
}

ul.nestable-view,.nestable-view ul{
	position:absolute;
	padding:0;
	margin:0;
}

.nestable-view li {
	list-style:none;
}

.nestable-view li:hover {
	background-color: yellow;
}

```

