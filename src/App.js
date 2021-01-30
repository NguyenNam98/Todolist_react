import Todos from './Components/Todos'
import React from 'react'
import './App.css';
import tick2 from './Components/icons/checked.png'
import tick1 from './Components/icons/check-circle.svg'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
 
} from "react-router-dom";

class App extends React.Component{
  constructor(props){
      super(props);
      this.state={
          newItem:"",
          Todolist:[
              {title :"đi đá bóng", isComplete:true},
              {title :"đi mua cá", isComplete:true},
              {title :"đi nhảy giây", isComplete:false},
              {title :"đi múa", isComplete:false},

          ]
      }
      this.onchange=this.onchange.bind(this);
      this.onKeyUp=this.onKeyUp.bind(this);
      this.ClickClear=this.ClickClear.bind(this);
      this.ClickAll=this.ClickAll.bind(this);
      }
  onchange(event){
    this.setState({
      newItem:event.target.value
    })
  }
  onKeyUp(event){
    if(event.keyCode===13){
      let text = event.target.value;
      if(!text){
        return;
      
      }
      text=text.trim();
      if(!text){
        return;
      }
      this.setState({
        newItem:"",
        Todolist:[
          {
            title:text, isComplete:false
          },
          ...this.state.Todolist
        ]
      })

    }
  }
  onClicked(todos){
    return(event)=>{
      const iscomplete=todos.isComplete;
      const {Todolist}=this.state;
      const index=Todolist.indexOf(todos);
      this.setState({
        Todolist:[
          ...Todolist.slice(0,index),
          {
            ...todos, isComplete:!iscomplete
          },
          ...Todolist.slice(index+1)
        ]
      })
    }
  }
  clickCancel(todos){
    return(event)=>{
      const {Todolist}=this.state;
      const index=Todolist.indexOf(todos);
      this.setState({
        Todolist:[
          ...Todolist.slice(0,index),
          ...Todolist.slice(index+1)
        ]
      })
    }
  }
  Count(x){
    let count=0;
    for(let i=0;i<x.length;i++){
      if(x[i].isComplete===false)
      {
        count++;
      }
    }
    return count;
  }
  ClickClear(){
    this.setState({
      Todolist:[]
    } )
  
  }
  ClickAll(){
    const {Todolist}=this.state;
    let temp=true
    for(let i=0; i<Todolist.length;i++){
      if(Todolist[i].isComplete===false)
      {
        temp=false;
        
      }
    }
    if(temp===false){
      this.setState({
      Todolist:Todolist.map((item)=>{
        item.isComplete=true;
        return item;
      })
     })
    }else{
      this.setState({
        Todolist:Todolist.map((item)=>{
          item.isComplete=false;
          return item;
        })
       })
    }
    
  }
  render(){
      const {Todolist}=this.state;
      let url=tick2;
      for(let i=0;i<Todolist.length;i++){
        if(Todolist[i].isComplete===false)
        {
          url=tick1;
        }
      }
      return (
        <>
        <h2 className="title">TODOS</h2>
        <div className="App">
          
          <div class="header">

            <img src={url} alt="all" width="32" height="32"
            onClick={this.ClickAll}
            />
            <input className="input" type="text"
              placeholder="Thêm một công việc"
              onChange={this.onchange}
              onKeyUp={this.onKeyUp}
              value={this.state.newItem}
            />
          </div>
          <div className="Footer">
            
            <Router>
                <div>

                  <Switch>
                    <Route path="/active">
                      {
                        Todolist.filter(item=>item.isComplete===false)
                        .map((todos,index)=>
                        <Todos id={index}
                        item={todos}
                        onclick={this.onClicked(todos)}
                        clickCancel={this.clickCancel(todos)}
                        
                        />
                        )
                      }
                    </Route>
                    <Route path="/complete">
                      {
                        Todolist.filter(item=>item.isComplete===true)
                        .map((todos,index)=>
                        <Todos id={index}
                        item={todos}
                        onclick={this.onClicked(todos)}
                        clickCancel={this.clickCancel(todos)}
                        />
                        )
                      }
                    </Route>
                    <Route path="/">
                         {
                          Todolist.map((todos,index)=>
                          <Todos id={index}
                          item={todos}
                          onclick={this.onClicked(todos)}
                          clickCancel={this.clickCancel(todos)}
                          />
                          )
                        }
            
                    </Route>
                  </Switch>

                  <ul className="route">
                  <li>
                    {this.Count(Todolist)} Item left
                  </li>
                    <li>
                      <Link to="/">All</Link>
                    </li>
                    <li>
                      <Link to="/active">Active</Link>
                    </li>
                    <li>
                      <Link to="/complete">Complete</Link>
                    </li>
                    <li onClick={this.ClickClear} className="clear">Clear Complete</li>
                  </ul>
                </div>
              </Router>
            
          
          </div>  
        </div>
        </>
      )

  }
}


export default App;
