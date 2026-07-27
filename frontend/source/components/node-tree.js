import React from 'react';
import ReactDOM from 'react-dom';
import {registerEvent, registerReaction, fireEvent, chkSt, registerObject} from 'absevents'
import {ChildNode} from './child-node'


export class NodeTree extends React.Component {
	constructor(props){
		super(props);
		this.state = { root: props.content }
		this.nodeRef = React.createRef();

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

		return (
			<div>
                <table class='main-table'>
                    <tr>
						<td>
							{leftNodes.map(node => <ChildNode node = {node} isLeft = {true} refParent = {this.nodeRef} isLevel1 = {true} />)}
						</td>
                        <td>
							<div ref = {this.nodeRef} class='node-root node-common'>{this.state.root.name}</div>
						</td>
						<td>
							{rightNodes.map(node => <ChildNode node = {node} refParent = {this.nodeRef} isLevel1 = {true} />)}
						</td>
                    </tr>
                </table>
			</div>
		)
	}
}