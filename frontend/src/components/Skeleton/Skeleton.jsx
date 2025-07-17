import { Layout } from 'lucide-react';
import React from 'react';
import {Shimmer} from 'react-shimmer'
const Skeleton = ({width, height, children, isLoading, className ,counter=1}) => {
  return (
    <>
    
     {!isLoading && children}
     {isLoading && 
      Array.from({length: counter}, () => {
       return <Shimmer className={className} width={width} height={height}>
     </Shimmer>
     })
     }
    </>
  )
}

export default Skeleton