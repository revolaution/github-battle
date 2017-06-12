import React from 'react'
import PropTypes from 'prop-types';
import { fetchPopularRepos } from '../utils/api'
import Loading from './Loading'
import RepoGrid from './RepoGrid'
import SelectLanguage from './SelectLanguage'

class Popular extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedLanguage: 'All',
      repos: null
    };

    this.updateLanguage = this.updateLanguage.bind(this);
  }

  componentDidMount() {
    this.updateLanguage(this.state.selectedLanguage);
  }

  async updateLanguage(language) {
    try {
      this.setState(() => {
        return {
          selectedLanguage: language,
          repos: null
        }
      });

      const repos = await fetchPopularRepos(language)
      this.setState(() => {
        return {
          repos
        }
      });
    } catch (error) {
      console.warn('An error has occurred fetching repos!', error);
    }
  }

  render() {
    return (
      <div>
        <SelectLanguage
          selectedLanguage={this.state.selectedLanguage}
          onSelect={this.updateLanguage}
        />
        {
          !this.state.repos
          ? <Loading />
          : <RepoGrid repos={this.state.repos} />
        }
      </div>
    )
  }
}

export default Popular
