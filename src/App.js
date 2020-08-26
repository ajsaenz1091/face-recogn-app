import React, { Component } from 'react';
import Particles from 'react-particles-js';
import Clarifai from 'clarifai';
import FaceRecognition from './components/FaceRecognition/FaceRecognition';
import Navigation from './components/Navigation/Navigation';
import Signin from './components/Signin/Signin';
import Register from './components/Register/Register';
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
      imageUrl: '',
      box: {},
      route:'home',
      isSignedIn: false,
    }
  }


  calculateFaceLocation = (data) => {
    const clarifaiFace = data.outputs[0].data.regions[0].region_info.bounding_box;
    const image = document.getElementById('inputimage');
    const width = Number(image.width);
    const height = Number(image.height);
    // we are going to return an object that we will use to fill out the "box" state
    return {
      leftCol: clarifaiFace.left_col * width,
      topRow: clarifaiFace.top_row * height,
      rightCol: width - (clarifaiFace.right_col * width),
      bottomRow: height - (clarifaiFace.bottom_row * height)
    }
  }

  // This function uses the data returned by the calculateFaceLocation function to fill out the "box" state

  displayFaceBox = (box) => {
    this.setState({box: box});
  }

  // This is an event listener. It listens to the changes made in the input bar of our app.
  onInputChange = (event) =>{
    this.setState({input: event.target.value});
  }

  onImageSubmit = () => {
    this.setState({imageUrl: this.state.input})
    app.models
    .predict(
      Clarifai.FACE_DETECT_MODEL,
      this.state.input)
    .then(response => this.displayFaceBox(this.calculateFaceLocation(response)))
    .catch(err => console.log(err));
  }

  onRouteChange = (route) => {
    if (route === 'signout') {
      this.setState({isSignedIn: false});
    }else if (route === 'home'){
      this.setState({isSignedIn: true});
    }
    this.setState({route: route});
  }

  render() {
    const { box, imageUrl, isSignedIn, route } = this.state;
    return (
      <div className="App">
        <Particles className='particles'
          params={particlesOptions}
        />
      <Navigation isSignedIn={isSignedIn} onRouteChange={this.onRouteChange}/>
        { this.state.route === 'home' 
        ? <div >
            <Logo />
            <Rank />
            <ImageLinkForm 
              onInputChange={this.onInputChange}
              onImageSubmit={this.onImageSubmit} />
            <FaceRecognition imageUrl={imageUrl} box={box}/>
          </div>
        : (
            route === 'signin'
            ? <Signin onRouteChange={this.onRouteChange} />
            : <Register onRouteChange={this.onRouteChange} />
          )

        }
      </div>
    );
  }
}


export default App;
