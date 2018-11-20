import * as passwordValidator from 'password-validator'

const schema = new passwordValidator()

const validatePasswordSchema = schema
  .is().min(8)
  .has().uppercase()
  .has().lowercase()
  .has().digits()
  .has().not().spaces()

export const validatePassword = password => {
  return validatePasswordSchema.validate(password)
}
