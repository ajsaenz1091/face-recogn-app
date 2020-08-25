import React from 'react';
import './FaceRecognition.css';

const FaceRecognition = () => {
  return (
    <div className='center ma'>
      <div className='absolute mt2'>
        <img id='inputimage' alt='' src={'https://samples.clarifai.com/face-det.jpg'} width='500px' heigh='auto'/>
      </div>
    </div>
  );
}

export default FaceRecognition;