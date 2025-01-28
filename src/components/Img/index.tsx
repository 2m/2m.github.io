import React from 'react';

import Zoom from 'react-medium-image-zoom'
import 'react-medium-image-zoom/dist/styles.css'
import styles from './styles.module.css';

export function Img({ children, style, large, small }) {
    return (
        <figure style={style}>
            <Zoom zoomImg={{ src: large, }} classDialog={styles.dialog}>
                <img src={small} />
            </Zoom>
            <figcaption>
                {children}
            </figcaption>
        </figure>
    );
}

export function ImgGallery({ children, images }) {
    let zoomable = images.map(([large, small], idx) => {
        return (
            <Zoom zoomImg={{ src: large, }} classDialog={styles.dialog}>
                <img src={small} />
            </Zoom>
        );
    });
    return (
        <figure className={styles.sidebyside}>
            {zoomable}
            <figcaption>
                {children}
            </figcaption>
        </figure>
    );
}
