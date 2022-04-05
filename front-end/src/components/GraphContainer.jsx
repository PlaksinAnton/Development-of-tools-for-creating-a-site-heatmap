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
  //const [dataArr, setDataArr] = useState('')

  useEffect(async () => {
    !dataForGraph &&
      axios("http://127.0.0.1:5000/get_data")
        .then((response) => {
          setDataForGraph(response.data.data);
          console.log(response.data.data);
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
          <VictoryPie colorScale={["tomato", "orange", "gold"]} />
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
          </VictoryChart>
        </div>
      </div>
    </section>
  );
};
export default App;
