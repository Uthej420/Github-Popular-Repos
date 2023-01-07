import './index.css'

const RepositoryItem = props => {
  const {repositoryDetails} = props
  const {
    avatarUrl,
    forksCount,
    name,
    starsCount,
    issuesCount,
  } = repositoryDetails
  return (
    <>
      <li className="repo-list">
        <div className="repo-container">
          <img className="avatar" src={avatarUrl} alt={name} />
          <h1 className="name">{name}</h1>
          <div className="container">
            <img
              className="icon"
              src="https://assets.ccbp.in/frontend/react-js/stars-count-img.png"
              alt="stars"
            />
            <p className="count">{starsCount} stars</p>
          </div>

          <div className="container">
            <img
              className="icon"
              src="https://assets.ccbp.in/frontend/react-js/forks-count-img.png"
              alt="forks"
            />
            <p className="count">{forksCount} forks</p>
          </div>

          <div className="container">
            <img
              className="icon"
              src="https://assets.ccbp.in/frontend/react-js/issues-count-img.png"
              alt="open issues"
            />
            <p className="count">{issuesCount} issues</p>
          </div>
        </div>
      </li>
    </>
  )
}

export default RepositoryItem
