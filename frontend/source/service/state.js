import {registerObject, registerEvent, chkSt, fireEvent, registerReaction} from 'absevents'

var counter = 1
var history = []

var content = {
	name: "Root",
	left: [],
	right: []
}



registerObject('state', {'content': content})
registerEvent('state', 'select', (stateSetter, node) => stateSetter('selected', node))
registerEvent('state', 'unselect', (stateSetter) => stateSetter('selected', null))
registerEvent('state', 'safe-point', (stateSetter) => doSafePoint())

registerEvent('state', 'create-new', (stateSetter) => {

    const parentNode = chkSt('state', 'selected')

    var newNode = null

    if (parentNode != chkSt('state', 'content')) {
        newNode = createChildNode(parentNode)
    } else {
        newNode = createChildForRoot()
    }

    newNode.version = parentNode.version

    indexContent(newNode, parentNode, false)
    stateSetter('selected', newNode)
})

registerEvent('state', 'delete', (stateSetter) => {

    const node = chkSt('state', 'selected')

    if (chkSt('state', 'content') == node) {
        return
    }

    doSafePoint()
    removeByValue(getChildren(node['_parent'], node), node)
})

registerEvent('state', 'restore', (stateSetter) => {

    if (history.length < 1) {
        console.log('history is empty')
        return
    }

    const restored = history.pop()
    indexContent(restored, null, true)
    stateSetter('content', restored)
    fireEvent('dragndrop', 'clear')
})

const doSafePoint = function() {
    const content = chkSt('state', 'content')
    removeSystemProps(content)
    const clone = JSON.parse(JSON.stringify(content)) // structuredClone(chkSt('state', 'content'))
    history.push(clone)
    indexContent(content, null, false)
}

const createChildNode = function(parentNode) {
    const newNode = { name: "Untitled" + counter++ }

    if (parentNode.children != null) {
        parentNode.children.push(newNode)
    } else {
        parentNode.children = [newNode]
    }

    return newNode
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

const indexContent = function(curNode, parentNode, isNewVersion) {

    if (isNewVersion) {
        if (curNode.version == null ) {
            curNode.version = 1
        } else {
            curNode.version = curNode.version + 1
        }
    }

    if (parentNode != null) {
        curNode['_parent'] = parentNode
    }

    if (curNode.left != null) {
        curNode.left.forEach(child => indexContent(child, curNode, isNewVersion));
    }

    if (curNode.right != null) {
        curNode.right.forEach(child => indexContent(child, curNode, isNewVersion));
    }

    if (curNode.children != null) {
        curNode.children.forEach(child => indexContent(child, curNode, isNewVersion));
    }
}

const removeSystemProps = function(curNode) {

    if (curNode['_parent'] != null) {
        delete curNode['_parent']
    }

    if (curNode.left != null) {
        curNode.left.forEach(child => removeSystemProps(child));
    }

    if (curNode.right != null) {
        curNode.right.forEach(child => removeSystemProps(child));
    }

    if (curNode.children != null) {
        curNode.children.forEach(child => removeSystemProps(child));
    }
}

// -----TODO: copypaste ----

const removeByValue = function(arr, value) {
    const index = arr.indexOf(value);

    if (index > -1) {
        arr.splice(index, 1);
    }
}

const getChildren = function(parent, child) {

    if (parent.children != null && parent.children.includes(child)) {
        return parent.children
    }

    if (parent.left != null && parent.left.includes(child)) {
        return parent.left
    }

    if (parent.right != null && parent.right.includes(child)) {
        return parent.right
    }
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
