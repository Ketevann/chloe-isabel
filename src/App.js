import React, { Component } from 'react';
const generateAntWinLikelihoodCalculator = require('../algorithm');
const { createApolloFetch } = require('apollo-fetch');
const apolloFetch = createApolloFetch({
  uri: 'https://antserver-blocjgjbpw.now.sh/graphql',
});

export default class App extends Component {

  constructor(props) {
    super(props)
    this.state = { ants: [], allTests: 'Not Started', counter: 0 };
    this.calculate = this.calculate.bind(this);
    this.callback = this.callback.bind(this);
  }

  componentWillMount() {
    //request ant data from api
    apolloFetch({ query: '{ants {name, weight, length, color }}' })
      .then(res => {
        const { ants } = res.data;
        const antsArr = [];
        //create characteristics object for each ant and set to state
        ants.forEach(ant => {
          antsArr.push({ name: ant.name, weight: ant.weight, color: ant.color, length: ant.length, score: "No Scores", singleTest: 'Not Yet Started' })
        });
        this.setState({ ants: antsArr });
      })
  }

  callback(index) {
    const { ants, counter } = this.state;
    //use index to find ant and update ant testing state
    const currAnts = [...ants];
    currAnts[index].singleTest = 'In Progress';
    currAnts[index].score = 'No Score';
    this.setState({ ants: currAnts });//set updated ants array to state

    return (score) => {
       const { counter } = this.state;
      //assign score to ant and update testing state
      //use counter to determine when all ant calculations are completed
      currAnts[index].score = score;
      currAnts[index].singleTest = 'Test Calculated';
      this.setState({
        ants: currAnts,
        counter: counter + 1 //increment counter in state
      });
      //when counter equals ants array length, all calculations have completed, terminate testing process
      if (counter === ants.length) {
        this.setState({
          allTests: 'calculated',
          counter: 0
        });
      }
    }
  }

  calculate() {
    //update overall testing state
    this.setState({ allTests: 'In Progress' });
    //Map ants array and calculate their likelyhood of winning
    this.state.ants.forEach((eachAnt, index) => {
      generateAntWinLikelihoodCalculator()(this.callback(index))
    })
  }
  render() {
    const { ants } = this.state;
    return (
      <div>
        {ants.length > 0 ?
            <div id="ants-flex">
              <div id="overall-test">Tests {this.state.allTests}</div>
              <table className="table ">
                <thead>
                  <tr>
                    <th className="col-names" scope="col">Name</th>
                    <th className="col-names" scope="col">Weight</th>
                    <th className="col-names" scope="col">Color</th>
                    <th className="col-names" scope="col">Length</th>
                    <th className="col-names" scope="col">Progress</th>
                    <th className="col-names" scope="col">Scores</th>
                  </tr>
                </thead>
                {
                  ants.sort(function (a, b) {
                    return b.score < a.score;   // <== compare numeric values
                  })
                    .map((single, index) => {
                      return (
                        <tbody
                          key={index}
                        >
                          <tr>
                            <td className="ant-info" id="name">{single.name}</td>
                            <td className="ant-info" id="weight">{single.weight}</td>
                            <td className="ant-info" id="color">{single.color}</td>
                            <td className="ant-info" id="length">{single.length}</td>
                            <td className="ant-info" id="progress">{single.singleTest}</td>
                            <td className="ant-info" id="scores">{single.score}</td>
                          </tr>
                        </tbody>
                      )
                    })
                }
              </table>
            <div id="button">
              <button onClick={() => this.calculate()}>Start</button>
          </div>
           </div>
          : null}
      </div>
    )
  }
}



