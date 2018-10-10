import * as React from 'react'
import Select from 'react-select'

type Props = {
  handleOnChange: Function
  options: any
  placeholder: string
  value: string
}

export const MediaListSelect: React.StatelessComponent<Props> = props => {
  const { handleOnChange, options, placeholder, value } = props

  return (
    <Select
      className='media-list__select'
      defaultValue={value}
      isSearchable={false}
      onChange={handleOnChange}
      options={options}
      placeholder={placeholder} />
  )
}
