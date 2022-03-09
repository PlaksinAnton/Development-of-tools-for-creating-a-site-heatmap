import React, {useEffect} from "react";
import {
  VictoryPie,
  VictoryChart,
  VictoryBar,
  VictoryTheme,
  VictoryLine,
} from "victory";
import axios from "axios";

const [dataForGraph, setDataForGraph] = useState('')
//const [dataArr, setDataArr] = useState('')

useEffect(() =>{
    axios.get(`http://127.0.0.1:5000/login`, 'test: test')
        .then(response => {
            setDataForGraph(response.data.dataForGraph)
            console.log(response)
        }).catch(error => {
            console.log(error)
    })
})

const dataArr = []
for(let i=0;i<dataForGraph.lenght; i++) {
    //к нужному виду
}

/*
const testHui = async () => {
    const json = {
        test: 'test'
    }
    await axios.post(`http://127.0.0.1:5000/login`, json)
        .then(response => {
            console.log(response)
        })
}
*/

class App extends React.Component {
  render() {
    return (
      <section class="graphs">
        <div class="graphs-container">
          <div class="victorypie">
            <VictoryPie
              colorScale={["tomato", "orange", "gold"]}
              data={dataArr}
            />
            <VictoryChart theme={VictoryTheme.material} domainPadding={10}>
              <VictoryBar
                style={{ data: { fill: "#c43a31" } }}
                data={[
                  { x: "Header", y: 25 },
                  { x: "Footer", y: 40 },
                  { x: "Sections", y: 55 },
                ]}
              />
            </VictoryChart>
            <VictoryChart theme={VictoryTheme.material}>
              <VictoryLine
                style={{
                  data: { stroke: "#c43a31" },
                  parent: { border: "1px solid #ccc" },
                }}
                data={[
                  { x: 1, y: 2 },
                  { x: 2, y: 3 },
                  { x: 3, y: 5 },
                  { x: 4, y: 4 },
                  { x: 5, y: 7 },
                ]}
              />
            </VictoryChart>
          </div>
        </div>
      </section>
    );
  }
}
export default App;
