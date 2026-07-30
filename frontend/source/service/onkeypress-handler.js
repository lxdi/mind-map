import {registerObject, registerEvent, chkSt, fireEvent, registerReaction} from 'absevents'

registerEvent('key-press-handler', 'press', (stSetter, event)=>{

  if(event.key=='Tab' && chkSt('state', 'selected') != null){
    event.preventDefault()
    fireEvent('state', 'create-new')
  }

  if (event.key == 'Backspace' && chkSt('state', 'selected') != null) {
    fireEvent('state', 'delete')
  }

  const isModifierPressed = event.ctrlKey || event.metaKey

  if (isModifierPressed && event.code === 'KeyX' && chkSt('state', 'selected') != null) {
    fireEvent('clipboard', 'cut')
  }

  if (isModifierPressed && event.code === 'KeyV' && chkSt('state', 'selected') != null) {
    fireEvent('clipboard', 'paste')
  }

  if (isModifierPressed && event.code === 'KeyS') {
    event.preventDefault()
    fireEvent('state', 'save')
  }

})