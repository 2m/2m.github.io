import React from 'react';

import Zoom from 'react-medium-image-zoom'
import 'react-medium-image-zoom/dist/styles.css'
import styles from './styles.module.css';

export default function Img({ children, style, large, small }) {
    return (
        <div style={style}>
            <Zoom zoomImg={{ src: large, }} classDialog={styles.dialog}>
                <img src={small} />
            </Zoom>
            {children}
        </div>
    );
}
