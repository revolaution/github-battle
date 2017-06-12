import axios from 'axios'
const client_id = "YOUR_CLIENT_ID";
const client_secret = "YOUR_SECRET_KEY";
const params = `?client_id=${client_id}&client_secret${client_secret}`;

const getProfile = (username = 'revolaution') => {
  return axios.get(`https://api.github.com/users/${username + params}`)
    .then((user) => {
      return user.data;
    })
}

const getRepos = (username = 'revolaution') => {
    return axios.get(`https://api.github.com/users/${username}/repos${params}&per_page=100`)
}

const getStarCount = (repos) => {
  return repos.data.reduce((count, repo) => {
    return count + repo.stargazers_count;
  }, 0);
}

const calculateScore = (profile, repos) => {
  const followers = profile.followers;
  const totalStars = getStarCount(repos);

  return (followers * 3) + totalStars;
}

const handleError = (error) => {
  console.warn(error);
  return null;
}

const getUserData = (player) => {
  return axios.all([
    getProfile(player),
    getRepos(player)
  ]).then((data) => {
    const profile = data[0];
    const repos = data[1];

    return {
      profile,
      score: calculateScore(profile, repos)
    }
  })
}

const sortPlayers = (players) => {
  return players.sort((a, b) => {
    return b.score - a.score;
  })
}

export async function battle (players) {
  try {
    const playerData = await Promise.all(players.map(getUserData))
    return await sortPlayers(playerData);
  } catch (error) {
    handleError(error)
  }
}

export function fetchPopularRepos (language) {
  const encodedURI = window.encodeURI(`https://api.github.com/search/repositories?q=stars:>1+language:${language}%sort=stars&order=desc&type=Repositories`);

  return axios.get(encodedURI)
    .then((response) => {
      return response.data.items;
    })
}
