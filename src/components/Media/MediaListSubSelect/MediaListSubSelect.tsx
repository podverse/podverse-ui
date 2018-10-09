import * as React from 'react'
import Select from 'react-select'

type Props = {
  handleOnChange: Function
  options: any
}

export const MediaListSubSelect: React.StatelessComponent<Props> = props => {
  const { handleOnChange, options } = props

  return (
    <Select
      className='media-list__sub-select'
      onChange={handleOnChange}
      options={options} />
  )
}
