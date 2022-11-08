import './index.css'

const RepositoryItem = props => {
  const {repositoryData} = props

  return (
    <li className="repository-container">
      <img
        src={repositoryData.imageUrl}
        alt={repositoryData.name}
        className="rep-img"
      />
      <h1 className="rep-heading">{repositoryData.name}</h1>
      <div className="container">
        <img
          className="img"
          src="https://assets.ccbp.in/frontend/react-js/stars-count-img.png "
          alt="stars"
        />
        <p className="text"> {repositoryData.starsCount}</p>
      </div>
      <div className="container">
        <img
          className="img"
          src="https://assets.ccbp.in/frontend/react-js/forks-count-img.png"
          alt="forks"
        />
        <p className="text"> {repositoryData.forksCount}</p>
      </div>
      <div className="container">
        <img
          className="img"
          src="https://assets.ccbp.in/frontend/react-js/issues-count-img.png "
          alt="open issues"
        />
        <p className="text"> {repositoryData.issuesCount}</p>
      </div>
    </li>
  )
}

export default RepositoryItem
