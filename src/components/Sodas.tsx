import React, { useState, useEffect } from 'react';
import axios from 'axios';
import BrowserOnly from '@docusaurus/BrowserOnly';

export default function Sodas() {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        axios.get('/straw-mobile.json')
            .then(response => {
                setData(response.data);
                setLoading(false);
            })
    }, []);

    function unpack(rows, key) {
        return rows.map(function (row) { return row[key]; });
    }

    if (loading) return <div>Loading...</div>;

    return (
        // plotly does not support server-side rendering
        // therefore we need to wrap it in BrowserOnly
        // so it only runs on the client side
        <BrowserOnly>
            {() => {
                const Plot = require('react-plotly.js').default;
                return <Plot
                    data={[{
                        x: unpack(data, 'x'),
                        y: unpack(data, 'z'),
                        z: unpack(data, 'y'),
                        mode: 'markers',
                        marker: {
                            size: 3,
                            color: '#317539'
                        },
                        type: 'scatter3d',
                        hoverinfo: 'none',
                    }]}
                    layout={{
                        modebar: {
                            remove: ['orbitRotation', 'tableRotation', 'resetCameraDefault3d', 'toImage', 'zoom', 'pan']
                        },
                        scene: {
                            aspectratio: {
                                x: 1.25,
                                y: 1.25,
                                z: 1.25,
                            },
                            yaxis: {
                                title: 'z',
                            },
                            zaxis: {
                                title: 'y',
                            },
                        },
                        margin: {
                            l: 0,
                            r: 0,
                            b: 0,
                            t: 0,
                        },
                    }}
                    useResizeHandler={true}
                    style={{ width: "100%", height: "100%" }}
                />
            }}
        </BrowserOnly>
    );
}
