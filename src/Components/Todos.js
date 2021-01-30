import React from 'react'
import './Todos.css'
import classnames from 'classnames'
import tick from '../Components/icons/check-circle.svg'
import tick2 from '../Components/icons/checked.png'
import cancel from '../Components/icons/x-circle.svg'
class Todos extends React.Component{
    
    render(){
        let url=tick;
        if(this.props.item.isComplete){
            url=tick2;
        }
        return (
            <div className="child" >
                <img onClick={this.props.onclick} 
                src={url} alt="anh" 
                 width={32} height={32}
                />
                <p className={classnames('todos',
                    {'isComplete':this.props.item.isComplete})}
                >
                    {this.props.item.title}
                </p>
                <img src={cancel} alt='cancel' 
                width={24} height={24} 
                className="cancel"
                onClick={ this.props.clickCancel}
                />
            </div>
        )
    }
}
export default Todos;