let React = require('react');
let PropTypes = require('prop-types');
let PlayerPreview = require('./PlayerPreview')
let Profile = require('./Profile');

const Player = (props) => {
  return (
    <div>
      <h1 className='header'>{props.label}</h1>
      <h3 style={{textAlign: 'center'}}>
        Score: {props.score}
      </h3>
      <Profile info={props.profile}/>
    </div>
  )
}

Player.propTypes = {
  label: PropTypes.string.isRequired,
  score: PropTypes.number.isRequired,
  profile: PropTypes.object.isRequired
}

module.exports = Player;
