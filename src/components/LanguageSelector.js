
import React from 'react';
import { useTranslation } from 'react-i18next';

const LanguageSelector = () => {
  const { t, i18n } = useTranslation();

  const changeLanguage = (event) => {
    i18n.changeLanguage(event.target.value);
};

  return (
    <div>
      <div className="form-check form-check-inline" onChange={changeLanguage}>
        <input className="form-check-input" type="radio" value="en" name="language" id="language-en" defaultChecked />
        <label className="form-check-label" for="language-en">
          {t('english')}
        </label>
      </div>
      <div className="form-check form-check-inline" onChange={changeLanguage}>
        <input className="form-check-input" type="radio" value="de" name="language" id="language-de" />
        <label class="form-check-label" for="language-de">
          {t('german')}
        </label>
      </div>
    </div>
  );
}

export default LanguageSelector;