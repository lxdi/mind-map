import {registerObject, registerEvent, chkSt, fireEvent, registerReaction} from 'absevents'
import {sendGet, sendPost, sendPut, sendDelete} from './postoffice'
import {getChildren, removeByValue, parentCheck, getChildrenForNode, removeSystemProps, indexContent} from './common.js'
import {doSafePoint} from './state.js'

const buffer = []

registerEvent('clipboard', 'copy', (stSetter, e) => copy(e))
registerEvent('clipboard', 'cut', (stSetter) => cut())
registerEvent('clipboard', 'paste', (stSetter) => paste())

const copy = function(e) {


    buffer.length = 0

    const selected = chkSt('state', 'selected')

    if (selected == null) {
        return
    }

    const copy = structuredClone(selected)

    buffer.push(copy)

    // navigator.clipboard.writeText(null)
    //   .then(() => {})
    //   .catch(err => console.error("Error copying text: ", err));

}

const cut = function() {

    doSafePoint()

    buffer.length = 0

    const selected = chkSt('state', 'selected')

    if (selected == null) {
        return
    }

    buffer.push(selected)

    removeByValue(getChildren(selected['_parent'], selected), selected)

    // navigator.clipboard.writeText("test")
    //   .then(() => {})
    //   .catch(err => console.error("Error copying text: ", err));

}

const paste = function() {

    doSafePoint()

    const targetNode = chkSt('state', 'selected')

    if (targetNode == null) {
        return
    }

    const targetChildren = getChildrenForNode(targetNode)

    // var fromClipBoard = null
    
    // const getFromClipBoard = async () => {
    //     const fromClipBoard = navigator.clipboard.readText().then((text) => console.log('from clipboard' + text))
    //     console.log(fromClipBoard)
    // }

    // getFromClipBoard()

    //navigator.clipboard.readText().then((text) => console.log('from clipboard ' + text))

    // while(fromClipBoard == null) {}

    if (buffer.length == 0) {
        navigator.clipboard.readText().then((text) => {
            const newNode = {name: text}
            targetChildren.push(newNode)
            newNode['_parent'] = targetNode
            fireEvent('state', 'change')
        })
    } else {
        
        buffer
                .filter((node) => targetNode !== node)
                .filter((node) => !parentCheck(targetNode, node))
                .forEach((node) => {
                    targetChildren.push(node)
                    node['_parent'] = targetNode
        })

        buffer.length = 0
        fireEvent('state', 'change')
    }


}