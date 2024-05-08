import React from 'react';
import { ReactCompareSlider, ReactCompareSliderImage } from 'react-compare-slider';

export default function Juxtapose({ children, itemOne, labelOne, itemTwo, labelTwo }) {
    const labelStyle: React.CSSProperties = {
        fontSize: '1rem',
        position: 'absolute',
        padding: '0.25rem',
        color: 'white',
        transition: 'opacity 0.25s ease-in-out'
    };

    return (
        <ReactCompareSlider
            portrait
            itemOne={
                <div>
                    <div style={labelStyle}>{labelOne}</div>
                    <ReactCompareSliderImage src={itemOne} />
                </div>
            }
            itemTwo={
                <div>
                    <div style={{ ...labelStyle, bottom: 0 }}>{labelTwo}</div>
                    <ReactCompareSliderImage src={itemTwo} />
                </ div>
            }
        />
    );
}
