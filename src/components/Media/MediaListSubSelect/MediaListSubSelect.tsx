import * as React from 'react'
import Select from 'react-select'

type Props = {
  handleOnChange: Function
  options: any
  value: string
}

export const MediaListSubSelect: React.StatelessComponent<Props> = props => {
  const { handleOnChange, options, value } = props

  return (
    <Select
      className='media-list__sub-select'
      defaultValue={value}
      isSearchable={false}
      onChange={handleOnChange}
      options={options} />
  )
}
