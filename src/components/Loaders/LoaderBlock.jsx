import React from 'react';
import { Blocks } from 'react-loader-spinner';

function LoaderBlock() {
  return (
    <div 
    style={{
        width: "100%",
        display: "flex",
        justifyContent: "center",
    }}
    >
        <Blocks></Blocks>
    </div>
  )
}

export default LoaderBlock