import * as React from 'react'

export interface Props {
  childrenLeft?: any
  childrenRight?: any
}

export const ButtonGroup: React.StatelessComponent<Props> = props => {
  const { childrenLeft, childrenRight } = props

  return (
    <div className='form-btn-group'>
      <div className='form-btn-group__left'>
        {childrenLeft}
      </div>
      <div className='form-btn-group__right'>
        {childrenRight}
      </div>
    </div>
  )
}
