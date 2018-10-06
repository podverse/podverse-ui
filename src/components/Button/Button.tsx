import * as React from 'react'

export interface Props {
  /** this dictates what the button will say */
  label: string
  /** this dictates what the button will do */
  onClick: () => void
  /**
   * Disables onclick
   * 
   * @default false
   */
  disabled?: boolean
}

const noop = () => {}

export const Button = (props: Props) => {
  const { label, onClick, disabled = false } = props
  const disabledClass = disabled ? 'Button_disabled' : ''

  return (
    <div 
      className={`Button ${disabledClass}`}
      onClick={!disabled ? onClick : noop}>
      <span>{label}</span>
    </div>
  )
}
