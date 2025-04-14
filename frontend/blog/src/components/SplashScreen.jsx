import React from 'react';
import { LottiePlayer } from 'lottie-react';
import Lottie from 'lottie-react';
import splashAnimation from '../animations/splash.json'; 


const SplashScreen = () => {
  return (
    <div className="splash-container">
      <Lottie animationData={splashAnimation} loop={true} />
    </div>
  );
};

export default SplashScreen;