import * as React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { PVButton as Button } from 'components/Button/Button'
import { InputGroup, InputGroupAddon, Input } from 'reactstrap'

type Props = {
  clearFilterText?: any
  filterText?: string
  handleFilterTextChange?: any
  hide?: boolean
  inputRef?: any
  placeholder: string
  t?: any
}

type State = {}

export class FilterCtrl extends React.Component<Props, State> {

  inputRef = null as any

  render() {
    const { clearFilterText, filterText, handleFilterTextChange, hide, placeholder, t } = this.props
    const className = `media-list__filter ${hide ? 'hide' : ''}`
  
    return (
      <div className={className}>
        <InputGroup>
          <InputGroupAddon
            addonType='prepend'
            className='media-list-filter__filter-icon'>
            <Button>
              <FontAwesomeIcon icon='filter' /> {t('filter')}
            </Button>
          </InputGroupAddon>
          <React.Fragment>
            <Input
              defaultValue={filterText}
              innerRef={el => this.inputRef = el}
              onChange={handleFilterTextChange}
              {...(placeholder ? { placeholder } : {})} />
            <InputGroupAddon
              addonType='append'
              className='media-list-filter__clear-icon'>
              <Button onClick={() => {
                this.inputRef.value = ''
                clearFilterText()
              }}>
                <FontAwesomeIcon icon='times' />
              </Button>
            </InputGroupAddon>
          </React.Fragment>
        </InputGroup>
      </div>
    )
  }
}
