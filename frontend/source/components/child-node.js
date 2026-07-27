import React from 'react';
import ReactDOM from 'react-dom';
import {registerEvent, registerReaction, fireEvent, chkSt, registerObject} from 'absevents'


export class ChildNode extends React.Component {
	constructor(props){
		super(props);
		this.state = { node: props.node, isLeft: props.isLeft, parentRef: props.refParent, nodeRef: React.createRef()}

    //registerObject('main-ui', {'three-frames':true})
	}

	  componentDidMount() {
		// Run initial calculation after the components mount to the DOM
		// this.calculateLine();

		// Attach native window event listeners
		// window.addEventListener('resize', this.calculateLine);
		// window.addEventListener('scroll', this.calculateLine);
		this.setState({})
  	}

	componentWillUnmount() {
		// Clean up event listeners to prevent severe memory leaks
		// window.removeEventListener('resize', this.calculateLine);
		// window.removeEventListener('scroll', this.calculateLine);
		this.setState({})
	}

	render() {

		var parentCord = calculateSidePoint(this.state.parentRef, this.state.isLeft)
		var nodeCord = calculateSidePoint(this.state.nodeRef, !this.state.isLeft)

		var style = this.props.isLevel1? 'node-level1': this.state.isLeft? 'node-child-left': 'node-child-right'

		return (
			<div id = {this.state.node.name} style = {getSideMargin(this.state.isLeft)}>
                <table class='child-table'>
                    <tr>
						<td>{getChildrenUI(this.state, this.state.isLeft)}</td>
                        <td>
							<div ref = {this.state.nodeRef} class={'node-common ' + style}>{this.state.node.name}</div>
						</td>
						<td>{getChildrenUI(this.state, !this.state.isLeft)}</td>
                    </tr>
                </table>
				{getLineUI(nodeCord, parentCord)}
			</div>
		)
	}
}

const getSideMargin = function(isLeft) {
		var sideMargin = {}

		if (isLeft) {
			sideMargin.marginRight = '15px'
		} else {
			sideMargin.marginLeft = '15px'
		}

		return sideMargin
} 

const getChildrenUI = function(state, isRender) {

	if (!isRender || state.node.children == null) {
		return null
	}

	console.log(state.node)

	return state.node.children.map(child => <ChildNode node = {child} isLeft = {state.isLeft} refParent = {state.nodeRef}/>)
}

const calculateSidePoint = function(ref, isLeft) {
	var node = ref.current

	if (!node) return null

	const rect = node.getBoundingClientRect();

	if (isLeft) {
		return { x: rect.left + window.scrollX, y: rect.top + rect.height / 2 + window.scrollY }
	} else {
		return { x: rect.right + window.scrollX, y: rect.top + rect.height / 2 + window.scrollY }
	}
}

const getLineUI = function(cord1, cord2) {

	if (cord1 == null || cord2 == null) {
		return null
	}

	const x1 = cord1.x; const y1 = cord1.y; const x2 = cord2.x; const y2 = cord2.y;


	return <svg 
          style={{ 
            position: 'absolute', top: 0, left: 0, 
            width: '100%', height: '100%', pointerEvents: 'none', zIndex: -1 
          }}
        >
          <line x1={x1} y1={y1} x2={x2} y2={y2} stroke="yellow" strokeWidth="1" />
        </svg>
}

// calculateLine() {
//     // Access DOM nodes via .current
//     const node1 = this.div1Ref.current;
//     const node2 = this.div2Ref.current;

//     if (!node1 || !node2) return;

//     const rect1 = node1.getBoundingClientRect();
//     const rect2 = node2.getBoundingClientRect();

//     this.setState({
//       x1: rect1.left + rect1.width / 2 + window.scrollX,
//       y1: rect1.top + rect1.height / 2 + window.scrollY,
//       x2: rect2.left + rect2.width / 2 + window.scrollX,
//       y2: rect2.top + rect2.height / 2 + window.scrollY,
//     });
//   }