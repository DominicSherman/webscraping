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
                <h1>{'Portland Timbers'}</h1>
                {
                    this.state.matches.map((m) => {
                        let winner = 'tie';

                        if (Number(m.homeScore) < Number(m.awayScore)) {
                            winner = 'away';
                        } else if (Number(m.homeScore) > Number(m.awayScore)) {
                            winner = 'home';
                        }

                        return (
                            <div className={'App-rowWrapper'}>
                                <div className={'App-columnWrapper'}>
                                    <img
                                        alt={''}
                                        src={m.homeLogo}
                                    />
                                </div>
                                {
                                    winner === 'home'
                                        ?
                                        <div className={'App-columnWrapper'}><b>{m.home}</b></div>
                                        :
                                        <div className={'App-columnWrapper'}>{m.home}</div>
                                }
                                <div className={'App-columnWrapper'}>
                                    {
                                        m.time[0] === 'FT' ?
                                            <div>{m.homeScore}-{m.awayScore}</div>
                                            :
                                            <div><p>{m.time[0]}</p><p>{m.time[1]}</p></div>
                                    }
                                </div>
                                {
                                    winner === 'away'
                                        ?
                                        <div className={'App-columnWrapper'}><b>{m.away}</b></div>
                                        :
                                        <div className={'App-columnWrapper'}>{m.away}</div>
                                }
                                <div className={'App-columnWrapper'}>
                                    <img
                                        alt={''}
                                        src={m.awayLogo}
                                    />
                                </div>
                            </div>
                        );
                    })
                }
            </div>
        );
    }
}

export default App;
