import React from 'react';
import BackgroundWaves from './BackgroundWaves';
import LotusBloom from './LotusBloom';

export function BackgroundAnimation({ totalLoad = 0 }) {
    return (
        <>
            <BackgroundWaves totalLoad={totalLoad} />
            <LotusBloom totalLoad={totalLoad} />
        </>
    );
}

export default BackgroundAnimation;
