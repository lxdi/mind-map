import {registerObject, registerEvent, chkSt, fireEvent, registerReaction} from 'absevents'

registerEvent('key-press-handler', 'press', (stSetter, event)=>{

  if(event.key=='Tab' && chkSt('state', 'selected') != null){
    event.preventDefault()
    fireEvent('state', 'create-new')
  }

  if (event.key == 'Backspace' && chkSt('state', 'selected') != null) {
    fireEvent('state', 'delete')
  }

})