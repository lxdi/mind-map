import React from 'react';
import ReactDOM from 'react-dom';
import {Modal, Button, Form} from 'react-bootstrap'
import {NodeTree} from './components/node-tree'
import {NodeModal} from './components/node-modal'

import {registerEvent, registerObject, fireEvent, chkSt} from 'absevents'
import './service/onkeypress-handler'
import './service/state'
import './service/dragndrop'


ReactDOM.render(<div id="app" />, document.body);
const app = document.getElementById("app");
document.addEventListener("keydown", (event)=>fireEvent('key-press-handler', 'press', [event]), false);

function rerender(){
	ReactDOM.render(
		<div>
			<div>
				<Button id='close' onClick={()=>fireEvent('state', 'restore')} variant="primary">Undo</Button>
				<Button id='close' onClick={()=>fireEvent('state', 'save')} variant="primary">Save</Button>
			</div>
			<div class="nodes-main-frame" onClick={(e)=> {e.preventDefault(); fireEvent('state', 'unselect')}}>
				<NodeTree />
				<NodeModal/>
			</div>
		</div>, app);
}

rerender();
