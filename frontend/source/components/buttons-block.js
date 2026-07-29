import React from 'react';
import ReactDOM from 'react-dom';
import {Modal, Button, Form} from 'react-bootstrap'
import {registerObject, registerEvent, chkSt, fireEvent, registerReaction} from 'absevents'


export class ButtonsBlock extends React.Component{
  constructor(props){
    super(props)

    registerReaction('buttons-block', 'state', ['create-new', 'restore', 'delete', 'save', 'change'], ()=>this.setState({}))
    
  }

  render(){
    return (
                  <div>
                    <Button id='close' onClick={()=>fireEvent('state', 'restore')} variant="primary" >Undo</Button>
                    { showSave()? <Button id='close' onClick={()=>fireEvent('state', 'save')} variant="primary">Save</Button>: null}
                </div>
    )
  }
}

const showSave = function() {
    if (window.location.search.includes("path=")){
        return chkSt('state', 'changed') == true
    } else {
        return true
    }
}