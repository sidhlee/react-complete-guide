import React, { Component } from 'react';
import './App.css';
import Person from './Person/Person';

class App extends Component {
  // now you don't have to declare state inside constructor
  state = {
    persons: [
      { id: 'hd235', name: 'Jube', age: 39 },
      { id: 'kjb43', name: 'Shobe', age: 5 },
      { id: 'icq39', name: 'Ggurbe', age: 1 }
    ]
  }
  
  // using arrow function automatically binds it with lexical 'this'
  deletePersonHandler = (personIndex) => {
    const persons = [...this.state.persons];
    // splice works great for removing value by index
    persons.splice(personIndex, 1);
    this.setState({ persons: persons })
       
  }
  
  // React passes event as the last arg
  nameChangedHandler = (id, event) => {

    // arr.findIndex(cb) returns index of value with which cb returns true
    const personIndex = this.state.persons.findIndex(p => p.id === id);

    // clone the target object
    const person = {...this.state.persons[personIndex]};
    // mutate cloned object
    person.name = event.target.value;
    // clone state
    const persons = [...this.state.persons];
    persons[personIndex] = person; // mutate cloned state

    this.setState({
      persons: persons
    })
  }

  togglePersonsHandler = () => {
    this.setState({
      showPersons: !this.state.showPersons
    });
  }

  render() {
    let style = {
      font: 'inherit',
      padding: '8px',
      cursor: 'pointer',
      backgroundColor: 'white',
      borderRadius: '5px'
    }
    
    // everytime state is modified,
    // this is re-initiated with null
    let persons = null;
    // and run through this condition again
    if (this.state.showPersons) {
      // create list of component from state
      persons = (
        <div> 
          {this.state.persons.map((person, index) => {
            return <Person
              key={person.id}
              name={person.name}
              age={person.age}
              // already bound with arrow function 
              click={this.deletePersonHandler}
              // .bind to pass argument to event handler
              // event is passed internally as the last parameter 
              changed={this.nameChangedHandler.bind(this, person.id)} />
          })}
        </div>
      );
    }

    return (
      <div className="App">
        <h1>Hello</h1>
        <button
          style={style}
          onClick={this.togglePersonsHandler}>Toggle Persons</button>
        {persons}
      </div>
    );
  }
}

export default App;
