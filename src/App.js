import { render } from '@testing-library/react';
import React from 'react' ;
import './App.css';
import Form from './Components/SearchForm' ;
import ShowData from './Components/ShowData' ;

class App extends React.Component {

  state = {
    informations: undefined,
    id: undefined ,
    fullInformations: undefined
  }

  handleSearch = (event) => {

    // reset state to undefined for new search request


    event.preventDefault() ;

    const city = event.target.elements.city.value ;
    const country = event.target.elements.country.value ;

    // console.log(city , country) ;

    fetch(`http://api.openweathermap.org/data/2.5/weather?q=${city}%2C${country}&appid=5d37c4b48cef8e9bae91fa889fd97ea9`)

    .then(res => res.json())

    .then(data => {

      // console.log('informations' ,data) ;

      this.setState({
        informations: data,
        id: data.id
      });

    })

    .catch(err => console.log(err));

    setTimeout(() => {

      
    fetch(`http://api.openweathermap.org/data/2.5/forecast?id=${this.state.id}&appid=e36ed364400282e43250b6c4c0274d44`)

    .then(respo => respo.json())

    .then(fulldata => {

      // console.log(this.state.id)

      // console.log('fullInfromations' , fulldata) ;

      this.setState({
        fullInformations: fulldata
      });

    })

    }, 1500);

  }


  render(){

  if(this.state.informations && this.state.fullInformations){
    return(

      <div className="App">
        <div className="background-1"></div>
        <div className="background-2"></div>


        <Form handleSearch={this.handleSearch}/>

      
        <ShowData informations={this.state.informations} fullInformatinos={this.state.fullInformations}/>
      </div>
    );
  }else{

    return(
      <div className="App">
        <div className="background-1"></div>
        <div className="background-2"></div>


        <Form handleSearch={this.handleSearch}/>

        </div>
    )

  }


  }
}

export default App ;

