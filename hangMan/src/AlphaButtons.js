import React, {Component} from 'react'

class AlphaButtons extends Component {
    
    constructor(props){
        super(props)
        this.handle_button = this.handle_button.bind(this)
    }

    handle_button(evt){
        this.props.onClick(evt)
    }
    
    render(){
        return (
            <button onClick = {this.handle_button} disabled = {this.props.disabled} value = {this.props.value}> {this.props.value} </button>
        )
    }
}
export default AlphaButtons;