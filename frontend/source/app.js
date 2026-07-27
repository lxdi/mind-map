import React from 'react';
import ReactDOM from 'react-dom';
import {NodeTree} from './components/node-tree'

import {registerObject, fireEvent} from 'absevents'


ReactDOM.render(<div id="app" />, document.body);
const app = document.getElementById("app");
//document.addEventListener("keydown", (event)=>fireEvent('key-press-handler', 'press', [event]), false);

var content = {
	name: "Root default",
	left: [
		{
			name: "Child left 1",
			children: [
				{
					name: "Child child left 1"
				},
				{
					name: "Child child left 2"
				}
			]
		}
	],
	right: [
		{
			name: "Child right 1"
		},
		{
			name: "Child right 2",
			children: [
				{
					name: "Child child right 1 super long title very"
				},
								{
					name: "Child child right 2",
					children: [
						{
							name: "Child child child right 1"
						}
					]
				},
				{
					name: "Child child right 3"
				}
			]
		},
		{
			name: "Child right 3"
		},
	]
}

function rerender(){
	ReactDOM.render(
		<div class="nodes-main-frame">
			<NodeTree content={content} />
		</div>, app);
}

rerender();
