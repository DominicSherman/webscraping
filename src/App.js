import React, {Component} from 'react';
import './App.css';
import {getData} from './webscraping-service';

const TIMBERS = 'http://www.espn.com/soccer/team/_/id/9723';
const ARSENAL = 'http://www.espn.com/soccer/club/_/id/359/arsenal';
const LIVERPOOL = 'http://www.espn.com/soccer/club/_/id/364/liverpool';

class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
            matches: []
        }
    }

   async componentDidMount() {
        await this.setData(TIMBERS);
    }

    setData = async (url) => {
        const matches = await getData(url);
        this.setState({matches});
    };

    render() {
        console.log('this.state.matches', this.state.matches);
        return (
            <div className="App">
                <div className={'App-header'}>
                    <div
                        className={'App-button'}
                        onClick={() => this.setData(TIMBERS)}
                    >
                        {'Portland Timbers'}
                    </div>
                    <div
                        className={'App-button'}
                        onClick={() => this.setData(ARSENAL)}
                    >
                        {'Arsenal'}
                    </div>
                    <div
                        className={'App-button'}
                        onClick={() => this.setData(LIVERPOOL)}
                    >
                        {'Liverpool'}
                    </div>
                </div>
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
