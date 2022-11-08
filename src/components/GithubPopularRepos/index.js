import {Component} from 'react'
import Loader from 'react-loader-spinner'
import RepositoryItem from '../RepositoryItem'
import LanguageFilterItem from '../LanguageFilterItem'

import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  is_progress: 'IS_PROGRESS',
}

const languageFiltersData = [
  {id: 'ALL', language: 'All'},
  {id: 'JAVASCRIPT', language: 'Javascript'},
  {id: 'RUBY', language: 'Ruby'},
  {id: 'JAVA', language: 'Java'},
  {id: 'CSS', language: 'CSS'},
]

class GithubPopularRepos extends Component {
  state = {
    apiStatus: apiStatusConstants.initial,
    languageFilter: languageFiltersData[0].id,
    data: [],
  }

  componentDidMount() {
    this.getPopularRepos()
  }

  getPopularRepos = async () => {
    const {languageFilter} = this.state
    this.setState({apiStatus: apiStatusConstants.is_progress})
    const response = await fetch(
      `https://apis.ccbp.in/popular-repos?language=${languageFilter}`,
    )
    if (response.ok === true) {
      const data = await response.json()
      const updatedData = await data.popular_repos.map(each => ({
        id: each.id,
        name: each.name,
        imageUrl: each.avatar_url,
        starsCount: each.stars_count,
        forksCount: each.forks_count,
        issuesCount: each.issues_count,
      }))
      this.setState({apiStatus: apiStatusConstants.success, data: updatedData})
    } else {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  renderLoadingView = () => (
    <div testid="loader">
      <Loader type="ThreeDots" color="#0284c7" height={80} width={80} />
    </div>
  )

  renderFailureView = () => (
    <div className="failure-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/api-failure-view.png "
        className="fail-img"
        alt="failure view"
      />
      <h1 className="fail-heading">Something Went Wrong</h1>
    </div>
  )

  renderRepositories = () => {
    const {data} = this.state

    return (
      <ul className="repositories-list">
        {data.map(each => (
          <RepositoryItem key={each.id} repositoryData={each} />
        ))}
      </ul>
    )
  }

  renderApiStatusView = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiStatusConstants.is_progress:
        return this.renderLoadingView()
      case apiStatusConstants.success:
        return this.renderRepositories()
      case apiStatusConstants.failure:
        return this.renderFailureView()
      default:
        return null
    }
  }

  clickLanguageFilter = newFilterId => {
    this.setState({languageFilter: newFilterId}, this.getPopularRepos)
  }

  renderLanguageFilterList = () => {
    const {languageFilter} = this.state

    return (
      <ul className="list-container">
        {languageFiltersData.map(each => (
          <LanguageFilterItem
            key={each.id}
            isActive={languageFilter === each.id}
            languageDetails={each}
            onClickLanguage={this.clickLanguageFilter}
          />
        ))}
      </ul>
    )
  }

  render() {
    return (
      <div className="bg-container">
        <div className="card-container">
          <h1 className="heading"> Popular </h1>
          {this.renderLanguageFilterList()}
          {this.renderApiStatusView()}
        </div>
      </div>
    )
  }
}

export default GithubPopularRepos
