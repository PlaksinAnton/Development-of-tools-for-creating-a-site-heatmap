import React, { useEffect, useState } from "react";
import {
  VictoryPie,
  VictoryChart,
  VictoryBar,
  VictoryTheme,
  VictoryLine,
} from "victory";
import axios from "axios";

const App = function (props) {
  const [dataForGraph, setDataForGraph] = useState("");
  const [dataArr, setDataArr] = useState('')

  useEffect(async () => {
    !dataForGraph &&
      axios("http://127.0.0.1:5000/get/browser_gist")
        .then((response) => {
          let data = []
          for (let i = 0; i < response.data.data.length; i++) {
            data.push({ x: i + 1, y: response.data.data[i].value, label: response.data.data[i].browser })
          }
          const dataNew = { data }
          setDataForGraph(dataNew);
          console.log(dataNew)
        })
        .catch((error) => {
          console.log(error);
        });
  });
  return (
    <section class="graphs">
      <div class="graphs-container">
        <div className="button-container">
          <button className="data-button">
            Получить данные из базы данных!
          </button>
        </div>
        <div class="victorypie">
          {/* <VictoryPie colorScale={["tomato", "orange", "gold"]} />
          <VictoryChart theme={VictoryTheme.material} domainPadding={10}>
            <VictoryBar
              style={{ data: { fill: "#c43a31" } }}
              data={Object.values(dataForGraph)}
            />
          </VictoryChart>
          <VictoryChart theme={VictoryTheme.material}>
            <VictoryLine
              style={{
                data: { stroke: "#c43a31" },
                parent: { border: "1px solid #ccc" },
              }}
              data={Object.values(dataForGraph)}
            />
          </VictoryChart> */}
          <VictoryBar
            // data={
            //   [
            //     { x: 1, y: 2, label: "A" },
            //     { x: 2, y: 4, label: "B" },
            //     { x: 3, y: 7, label: "C" },
            //     { x: 4, y: 3, label: "D" },
            //     { x: 5, y: 5, label: "E" },
            //   ]
            // }
            data={dataForGraph}
            events={[
              {
                target: "data",
                eventHandlers: {
                  onClick: () => {
                    return [{
                      target: "labels",
                      mutation: (props) => {
                        return props.text === "clicked" ?
                          null : { text: "clicked" }
                      }
                    }];
                  }
                }
              }
            ]}
          />
        </div>
      </div>
    </section>
  );
};
export default App;
