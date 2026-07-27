import {registerObject, registerEvent, chkSt, fireEvent, registerReaction} from 'absevents'

registerEvent('key-press-handler', 'press', (stSetter, event)=>{

  if(event.key=='Tab' && chkSt('state', 'selected') != null){
    fireEvent('state', 'create-new')
    event.preventDefault()
  }
})