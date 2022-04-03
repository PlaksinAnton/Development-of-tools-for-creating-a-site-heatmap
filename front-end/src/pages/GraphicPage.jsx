import React, { useState, useEffect } from 'react';
import GraphContainer from "../components/GraphContainer.jsx";
import h337 from "heatmap.js";
import detect from "detect.js";


function GraphicPage() {
    useEffect(() => {
        var heatmapInstance = h337.create({
            container: document.querySelector('.graphs'),
            radius: 10,
            maxOpacity: .5,
            minOpacity: 0,
            blur: .75
        });
        var dataPoint = {
            x: 500,
            y: 500,
            value: 1000
        };
        var data = {
            max: 100,
            min: 0,
            data: [
                dataPoint, dataPoint
            ]
        };
        heatmapInstance.setData(data);
        // get information about users
        let graphSpy = document.querySelector('.graphs');
        graphSpy.addEventListener('click', function () {
            const date = new Date;
            let computerInfo = detect.parse(navigator.userAgent);
            const enterTime = sessionStorage.getItem('startTime');
            // console.log(enterTime);
            let currentTime = Date.now();
            // console.log(currentTime);
            let spentTime = (currentTime - enterTime) / 1000;
            // console.log(spentTime);
            let user = {
                date: date.toLocaleString(),
                browser: computerInfo.browser.name,
                gadget: computerInfo.device.name,
                gadgetType: computerInfo.device.type,
                os: computerInfo.os.name,
                computerInfo: navigator.userAgent,
                minutes: Math.floor(spentTime / 60),
                seconds: Math.floor(spentTime % 60)
            }
            console.log(user);
        });
    })
    return (
        <>
            <GraphContainer />
        </>
    )
}
export { GraphicPage };