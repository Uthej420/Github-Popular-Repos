import './index.css'

const LanguageFilterItem = props => {
  const {languageFilterDetails, setActiveLanguageId, isActive} = props
  const {language, id} = languageFilterDetails
  const languageClassName = isActive ? 'activeLanguage' : 'language'

  const onClickButton = () => {
    setActiveLanguageId(id)
  }

  return (
    <div className="list-items">
      <div className="language-items">
        <button
          className={languageClassName}
          onClick={onClickButton}
          type="button"
        >
          {language}
        </button>
      </div>
    </div>
  )
}

export default LanguageFilterItem
