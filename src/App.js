import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'
import * as Game from './js/game'

const Home = () => (
  <div />
)

class App extends Component {
  renderLink() {
    const links = []
    const route = []

    for (let g in Game) {
      if (Game.hasOwnProperty(g)) {
        links.push(<li key={g}><Link to={`/${g}`}>{g}</Link></li>)
        route.push(<Route key={g} path={`/${g}`} component={Game[g]}/>)
      }
    }

    return (
      <div className="row">
        <div className="column column-20">
          <ul>
            <li><Link to="/">Home</Link></li>
            {links}
          </ul>
        </div>
        <div className="column column-80">
          <Route path="/" component={Home}/>
          {route}
        </div>
      </div>
    )
  }
  render() {
    return (
      <div className="container">
        <div className="row">
        </div>
        <Router>
        { this.renderLink() }
        </Router>
      </div>
    )
  }
}

export default App
