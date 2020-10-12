import * as React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { PVButton as Button } from 'components/Button/Button'
import { InputGroup, InputGroupAddon, Input } from 'reactstrap'

type Props = {
  clearFilterText?: any
  filterButtonHide?: string
  filterIsShowing?: boolean
  filterText?: string
  handleFilterTextChange?: any
  t?: any
  toggleFilter?: any
}

export const FilterCtrl: React.StatelessComponent<Props> = props => {
  const { clearFilterText, filterButtonHide, filterIsShowing, filterText,
    handleFilterTextChange, t, toggleFilter } = props

  return (
    <div>
      {
        filterButtonHide !== 'true' &&
        <div className='media-list__filter'>
          <InputGroup>
            <InputGroupAddon
              addonType='prepend'
              className='media-list-filter__filter-icon'>
              <Button
                className={filterIsShowing ? '' : 'not-showing'}
                onClick={toggleFilter}>
                <FontAwesomeIcon icon='filter' /> {t('filter')}
              </Button>
            </InputGroupAddon>
            {
              filterIsShowing &&
              <React.Fragment>
                <Input
                  onChange={handleFilterTextChange}
                  value={filterText || ''} />
                <InputGroupAddon
                  addonType='append'
                  className='media-list-filter__clear-icon'>
                  <Button onClick={clearFilterText}>
                    <FontAwesomeIcon icon='times' />
                  </Button>
                </InputGroupAddon>
              </React.Fragment>
            }
          </InputGroup>
        </div>
      }
    </div>
  )
}
