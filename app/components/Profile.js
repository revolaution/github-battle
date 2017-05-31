let React = require('react');
let PropTypes = require('prop-types');
let PlayerPreview = require('./PlayerPreview');

const Profile = (props) => {
  var info = props.info;
  return (
    <PlayerPreview
      avatar={info.avatar_url}
      username={info.login}>
        <ul className='space-list-items'>
          {info.name && <li>{info.name}</li>}
          {info.location && <li>{info.location}</li>}
          {info.company && <li>{info.compney}</li>}
          <li>Followers: {info.followers}</li>
          <li>Following: {info.following}</li>
          <li>Public Repos: {info.public_repos}</li>
          {info.blog && <li><a href={info.blog}>{info.blog}</a></li>}
        </ul>
    </PlayerPreview>
  )
}

Profile.propTypes = {
  info: PropTypes.object.isRequired
}

module.exports = Profile;
