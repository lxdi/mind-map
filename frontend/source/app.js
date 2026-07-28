import React from 'react';
import ReactDOM from 'react-dom';
import {NodeTree} from './components/node-tree'
import {NodeModal} from './components/node-modal'

import {registerEvent, registerObject, fireEvent, chkSt} from 'absevents'
import './service/onkeypress-handler'
import './service/state'


ReactDOM.render(<div id="app" />, document.body);
const app = document.getElementById("app");
document.addEventListener("keydown", (event)=>fireEvent('key-press-handler', 'press', [event]), false);

function rerender(){
	ReactDOM.render(
		<div class="nodes-main-frame">
			<NodeTree content={chkSt('state', 'content')} />
			<NodeModal/>
		</div>, app);
}

rerender();
