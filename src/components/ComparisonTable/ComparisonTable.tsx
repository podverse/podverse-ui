import * as React from 'react'
import { faSmile } from '@fortawesome/free-regular-svg-icons'
import { faCheck } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

export interface Props {
  featuresData: any[]
  headerIcon1: string
  headerIcon2: string
  headerText: string
}

export const ComparisonTable: React.StatelessComponent<Props> = props => {
  const { featuresData = [], headerIcon1, headerIcon2, headerText } = props

  const dataElements = featuresData && featuresData.map((x: any) => (
    <div className='comparison-table__row'>
      <div className='comparison-table-row__text'>{x.text}</div>
      <div className='comparison-table-row__icon'>{x.icon1 && <FontAwesomeIcon icon={x.iconType === 'smile' ? faSmile : faCheck} />}</div>
      <div className='comparison-table-row__icon'>{x.icon2 && <FontAwesomeIcon icon={x.iconType === 'smile' ? faSmile : faCheck} />}</div>
    </div>
  ))

  return (
    <div className='comparison-table'>
      <div className='comparison-table__header'>
        <div className='comparison-table-header__text'>{headerText}</div>
        <div className='comparison-table-header__icon'>{headerIcon1}</div>
        <div className='comparison-table-header__icon'>{headerIcon2}</div>
      </div>
      {
        dataElements && dataElements.length > 0 &&
          dataElements
      }
    </div>
  )
}
