import React, { Component } from 'react';
import Particles from 'react-particles-js';
import Clarifai from 'clarifai';
// import FaceRecognition from './components/FaceRecognition/FaceRecognition';
import Navigation from './components/Navigation/Navigation';
// import Signin from './components/Signin/Signin';
// import Register from './components/Register/Register';
import Logo from './components/Logo/Logo';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
import Rank from './components/Rank/Rank';
import './App.css';

// Clrifai API

const app = new Clarifai.App({
  apiKey: 'df98d06bc0b44c84a04886b9fcfee9e9'
})

const particlesOptions = {
  particles: {
    number: {
      value: 30,
      density: {
        enable: true,
        value_area: 155
      }
    }
  }
}

class App extends Component {
  constructor(){
    super();

    this.state = {
      input: '',
    }
  }

  // This is an event listener. It listens to the changes made in the input bar of our app.
  onInputChange = (event) =>{
    console.log(event.target.value);
  }

  onImageSubmit = () => {
    console.log('click');
    app.models
    .predict(
      "a403429f2ddf4b49b307e318f00e528b", 
      "https://samples.clarifai.com/face-det.jpg")
    .then(
      function(response) {
        console.log(response);
      },
      function(err) {
        // there was an error
      }
    );
  }

  render() {
    return (
      <div className="App">
        <Particles className='particles'
          params={particlesOptions}
        />
        <Navigation />
        <Logo />
        <Rank />
        <ImageLinkForm 
          onInputChange={this.onInputChange}
          onImageSubmit={this.onImageSubmit} />
      </div>
    );
  }
}


export default App;
