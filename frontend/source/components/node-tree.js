import React from 'react';
import ReactDOM from 'react-dom';
import {registerEvent, registerReaction, fireEvent, chkSt, registerObject} from 'absevents'
import {ChildNode} from './child-node'


export class NodeTree extends React.Component {
	constructor(props){
		super(props);
		this.state = { root: props.content }
		this.nodeRef = React.createRef();

		registerReaction('root-node-ui', 'state', ['select', 'create-new', 'unselect'], ()=>this.setState({}))
		registerReaction('root-node-ui', 'node-modal', ['close'], ()=>this.setState({}))
		registerReaction('root-node-ui', 'dragndrop', ['on-over', 'on-drop'], ()=>this.setState({}))

    //registerObject('main-ui', {'three-frames':true})
	}

	render() {

		var leftNodes = []
		var rightNodes = []

		if (this.props.content.left != null) {
			leftNodes = this.props.content.left
		}

		if (this.props.content.right != null) {
			rightNodes = this.props.content.right
		}

		var style = 'node-root node-common' 

		if (chkSt('state', 'selected') == this.state.root) {
			style = style + ' node-selected'
		}

		return (
			<div>
                <table class='main-table'>
                    <tr>
						<td>
							{leftNodes.map(node => <div key = {node.name}><ChildNode node = {node} isLeft = {true} refParent = {this.nodeRef} isLevel1 = {true} /> </div>)}
						</td>
                        <td>
							<div ref = {this.nodeRef} class={style} onClick={(e)=>{e.stopPropagation(); fireEvent('state', 'select', [this.state.root])}}>
								<a href="#" style={{textDecoration:'none'}}  onClick={(e)=>{e.stopPropagation(); fireEvent('node-modal', 'open', [this.state.root])}}>
									{this.state.root.name}
								</a>
								
							</div>
						</td>
						<td>
							{rightNodes.map(node => <div key = {node.name}><ChildNode id = {node.name} node = {node} refParent = {this.nodeRef} isLevel1 = {true} /> </div>)}
						</td>
                    </tr>
                </table>
			</div>
		)
	}
}