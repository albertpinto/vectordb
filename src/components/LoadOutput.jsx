import React from 'react'

function LoadOutput({output}) {
    // If loader out prop is an empty string, return null (nothing will be rendered)
    if (output === "") {
        return (<></>);
      }
    
      // If loader out is not an empty string, render the component with the output
      return ( 
        <div className="p-2 w-96 h-auto border-8 border-cyan-500 rounded-2xl shadow-2xl">
          <div className="text-lg font-semibold text-center">Output</div>
          <div className="text-lg">{output}</div>
          <div className=""break-after-page></div>
        </div>
      );
}

export default LoadOutput
