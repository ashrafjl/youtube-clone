import React from 'react'
import Skeleton, {SkeletonTheme} from 'react-loading-skeleton'
import "react-loading-skeleton/dist/skeleton.css";
import './SkeletonVideo.css'

const SkeletonVideo = () => {
  return (
    <div style={{width: '100%', margin: '1rem 0'}}>
            <Skeleton height={180}/>
        <div className='skeleton_bottom'>
            <div><Skeleton style={{margin: '0.5rem'}} circle height={40} width={40}/></div>
            <div><Skeleton height={50} width={'100%'}/></div>
        </div>
    </div>
  )
}

export default SkeletonVideo