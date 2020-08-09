import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import * as React from 'react'

type Props = {
  hasAtLeastXCharacters: boolean
  hasLowercase: boolean
  hasNumber: boolean
  hasUppercase: boolean
  t: any
}

export const PasswordValidationInfo: React.StatelessComponent<Props> = props => {
  const { hasAtLeastXCharacters,  hasLowercase, hasNumber, hasUppercase, t } = props

  return (
    <div className='password-validation-info'>
      <p className={hasUppercase ? 'password-validation-info__is-valid' : ''}>
        {t('password validation - has uppercase')} &nbsp;
        {
          hasUppercase &&
            <FontAwesomeIcon icon='check' />
        }
      </p>
      <p className={hasLowercase ? 'password-validation-info__is-valid' : ''}>
        {t('password validation - has lowercase')} &nbsp;
        {
          hasLowercase &&
            <FontAwesomeIcon icon='check' />
        }
      </p>
      <p className={hasNumber ? 'password-validation-info__is-valid' : ''}>
        {t('password validation - has number')} &nbsp;
        {
          hasNumber &&
            <FontAwesomeIcon icon='check' />
        }
      </p>
      <p className={hasAtLeastXCharacters ? 'password-validation-info__is-valid' : ''}>
        {t('password validation - is at least 8 characters')} &nbsp;
        {
          hasAtLeastXCharacters &&
            <FontAwesomeIcon icon='check' />
        }
      </p>
    </div>
  )
}
