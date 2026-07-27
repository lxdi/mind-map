import {registerObject, registerEvent, chkSt, fireEvent, registerReaction} from 'absevents'

var counter = 1

var content = {
	name: "Root",
	left: [],
	right: []
}

registerObject('state', {'content': content})
registerEvent('state', 'select', (stateSetter, node) => stateSetter('selected', node))

registerEvent('state', 'create-new', (stateSetter) => {

    const parentNode = chkSt('state', 'selected')

    var newNode = null

    if (parentNode != chkSt('state', 'content')) {
        newNode = createChildNode(parentNode)
    } else {
        newNode = createChildForRoot()
    }

    stateSetter('selected', newNode)
})

const createChildNode = function(parentNode) {
    const newNode = { name: "Untitled" + counter++ }

    if (parentNode.children != null) {
        parentNode.children.push(newNode)
    } else {
        parentNode.children = [newNode]
    }
}

const createChildForRoot = function() {
    const newNode = { name: "Untitled"  + counter++ }
    const root = chkSt('state', 'content')
    var children = null

    if (root.left.length > root.right.length) {
        children = root.right
    } else {
        children = root.left
    }

    children.push(newNode)
    return newNode
}


// var content = {
// 	name: "Root default",
// 	left: [
// 		{
// 			name: "Child left 1",
// 			children: [
// 				{
// 					name: "Child child left 1"
// 				},
// 				{
// 					name: "Child child left 2"
// 				}
// 			]
// 		},
//         {
// 					name: "Child left 2"
// 		}
// 	],
// 	right: [
// 		{
// 			name: "Child right 1"
// 		},
// 		{
// 			name: "Child right 2",
// 			children: [
// 				{
// 					name: "Child child right 1 super long title very"
// 				},
// 								{
// 					name: "Child child right 2",
// 					children: [
// 						{
// 							name: "Child child child right 1"
// 						}
// 					]
// 				},
// 				{
// 					name: "Child child right 3"
// 				}
// 			]
// 		},
// 		{
// 			name: "Child right 3"
// 		},
// 	]
// }
