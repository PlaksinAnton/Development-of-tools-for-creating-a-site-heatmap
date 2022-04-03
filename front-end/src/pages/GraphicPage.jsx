import React, { useState, useEffect } from 'react';
import GraphContainer from "../components/GraphContainer.jsx";
import h337 from "heatmap.js";


function GraphicPage() {
    useEffect(() => {
        var heatmapInstance = h337.create({
            // only container is required, the rest will be defaults
            container: document.querySelector('.graphs')
        });
        // now generate some random data
        var points = [];
        var max = 0;
        var width = 1600;
        var height = 600;
        var len = 200;

        while (len--) {
            var val = Math.floor(Math.random() * 100);
            max = Math.max(max, val);
            var point = {
                x: Math.floor(Math.random() * width),
                y: Math.floor(Math.random() * height),
                value: val
            };
            points.push(point);
        }
        // heatmap data format
        var data = {
            max: max,
            data: points
        };
        // if you have a set of datapoints always use setData instead of addData
        // for data initialization
        heatmapInstance.setData(data);
    })
    return (
        <>
            <GraphContainer />
        </>
    )
}
export { GraphicPage };