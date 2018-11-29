import React, {Component} from 'react';
import './App.css';
import {getData} from './webscraping-service';

class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
            matches: []
        }
    }

    async componentDidMount() {
        const matches = await getData();
        console.log('matches', matches);
        this.setState({matches});
    }

    render() {
        return (
            <div className="App">
                {
                    this.state.matches.map((m) => (
                        <div className={'App-rowWrapper'}>
                            <div className={'App-columnWrapper'}>
                                <img
                                    alt={''}
                                    src={m.homeLogo}
                                />
                            </div>
                            <div className={'App-columnWrapper'}>{m.home}</div>
                            <div className={'App-columnWrapper'}>
                                <div>{m.time}</div>
                                <div>{m.homeScore}-{m.awayScore}</div>
                            </div>
                            <div className={'App-columnWrapper'}>{m.away}</div>
                            <div className={'App-columnWrapper'}>
                                <img
                                    alt={''}
                                    src={m.awayLogo}
                                />
                            </div>
                        </div>
                    ))
                }
            </div>
        );
    }
}

export default App;
