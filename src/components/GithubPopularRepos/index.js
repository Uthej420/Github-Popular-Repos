import {Component} from 'react'
import Loader from 'react-loader-spinner'
import LanguageFilterItem from '../LanguageFilterItem'
import RepositoryItem from '../RepositoryItem'

import './index.css'

const apiStatusConstants = {
  success: 'SUCCESS',
  initial: 'INITIAL',
  failure: 'FAILURE',
  inProgress: 'IN PROGRESS',
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
    activeLanguageId: languageFiltersData[0].id,
    repoList: [],
    apiStatus: apiStatusConstants.initial,
  }

  componentDidMount() {
    this.getRepositoryLIst()
  }

  getRepositoryLIst = async () => {
    this.setState({apiStatus: apiStatusConstants.inProgress})

    const {activeLanguageId} = this.state
    const apiUrl = `https://apis.ccbp.in/popular-repos?language=${activeLanguageId}`
    const response = await fetch(apiUrl)
    console.log(response)
    const fetchedData = await response.json()
    console.log(fetchedData)
    if (response.ok) {
      const updatedData = fetchedData.popular_repos.map(eachItem => ({
        avatarUrl: eachItem.avatar_url,
        forksCount: eachItem.forks_count,
        id: eachItem.id,
        issuesCount: eachItem.issues_count,
        name: eachItem.name,
        starsCount: eachItem.stars_count,
      }))
      this.setState({
        repoList: updatedData,
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  renderRepositoryListView = () => {
    const {repoList} = this.state
    return (
      <ul className="repo-list">
        {repoList.map(eachRepo => (
          <RepositoryItem repositoryDetails={eachRepo} key={eachRepo.id} />
        ))}
      </ul>
    )
  }

  loadingView = () => (
    <div data-testid="loader">
      <Loader height={50} width={50} type="ThreeDots" color="#0284c7" />{' '}
    </div>
  )

  renderFailureView = () => (
    <div>
      <img
        src="https://assets.ccbp.in/frontend/react-js/api-failure-view.png"
        alt="failure view"
      />
      <h1>Something Went Wrong </h1>
    </div>
  )

  getActiveItemId = () => {
    const {activeLanguageId} = this.state
    const activeLanguageDetails = languageFiltersData.find(
      each => each.id === activeLanguageId,
    )
    if (activeLanguageDetails) {
      return activeLanguageDetails.id
    }
    return ''
  }

  setActiveLanguageId = id => {
    this.setState({activeLanguageId: id}, this.getRepositoryLIst)
  }

  renderLanguageItem = () => {
    const {activeLanguageId} = this.state
    return (
      <ul className="list-items">
        {languageFiltersData.map(eachLanguage => (
          <LanguageFilterItem
            languageFilterDetails={eachLanguage}
            key={eachLanguage.id}
            setActiveLanguageId={this.setActiveLanguageId}
            isActive={eachLanguage.id === activeLanguageId}
          />
        ))}
      </ul>
    )
  }

  renderRepositories = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderRepositoryListView()
      case apiStatusConstants.failure:
        return this.renderFailureView()
      case apiStatusConstants.inProgress:
        return this.loadingView()
      default:
        return null
    }
  }

  render() {
    return (
      <div className="git-repo-container">
        <h1 className="heading">Popular</h1>
        {this.renderLanguageItem()}
        {this.renderRepositories()}
      </div>
    )
  }
}

export default GithubPopularRepos
