import './index.css'

const LanguageFilterItem = props => {
  const {isActive, languageDetails, onClickLanguage} = props
  const btnClassName = isActive ? 'active-btn btn' : 'btn'
  const mainLanguageFilter = () => {
    onClickLanguage(languageDetails.id)
  }

  return (
    <li>
      <button
        className={btnClassName}
        onClick={mainLanguageFilter}
        type="button"
      >
        {languageDetails.language}
      </button>
    </li>
  )
}

export default LanguageFilterItem
