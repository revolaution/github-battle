import React from 'react'
import queryString from 'query-string'
import { battle } from '../utils/api'
import { Link } from 'react-router-dom'
import Player from './Player'
import PlayerPreview from './PlayerPreview'
import Loading from './Loading'

class Results extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      winner: null,
      loser: null,
      error: null,
      loading: true
    }
  }

  componentDidMount() {
    const players = queryString.parse(this.props.location.search);

    battle(
      [
        players.playerOneName,
        players.playerTwoName
      ]
    ).then((results) => {
      if(results === null) {
        return this.setState(() => {
          return {
            error: 'Looks like there was an error. Check that users exist on Github',
            loading: false
          }
        })
      }

      this.setState(() => {
        return {
          error: null,
          winner: results[0],
          loser: results[1],
          loading: false
        }
      })
    })
  }

  render() {
    const error = this.state.error;
    const winner = this.state.winner;
    const loser = this.state.loser;
    const loading = this.state.loading;

    if (loading == true) {
      return <Loading />
    }

    if (error) {
      return (
        <div>
          <p>{error}</p>
          <Link to='/battle'>
            Reset
          </Link>
        </div>
      )
    }

    return (
      <div className='row'>
        <Player
          label='Winner'
          score={winner.score}
          profile={winner.profile}
          />

        <Player
          label='Loser'
          score={loser.score}
          profile={loser.profile}
          />
      </div>
    )
  }
}

export default Results
