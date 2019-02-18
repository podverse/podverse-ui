import * as React from 'react'
import { Pagination, PaginationItem, PaginationLink } from 'reactstrap'
import { generateArrayWithRangeOfIntegers } from 'lib/utility'
const uuidv4 = require('uuid/v4')

type Props = {
  currentPage: number
  handleQueryPage?: any
  pageRange: number
  totalPages: number
}

type State = {}

export class PVPagination extends React.Component<Props, State> {

  static defaultProps: Props = {
    currentPage: 1,
    pageRange: 2,
    totalPages: 1
  }

  render () {
    const { currentPage, handleQueryPage, pageRange, totalPages } = this.props

    let range = []
    if (totalPages < pageRange * 2 + 1) {
      let start = 1
      let end = totalPages + 1
      range = generateArrayWithRangeOfIntegers(start, end) as never
    } else if (currentPage <= pageRange) { // beginning pages
      let start = 1
      let end = (pageRange * 2) + 2
      range = generateArrayWithRangeOfIntegers(start, end) as never
    } else if (currentPage > totalPages - pageRange) { // end pages
      let start = totalPages - (pageRange * 2)
      let end = totalPages + 1
      range = generateArrayWithRangeOfIntegers(start, end) as never
    } else { // middle pages
      let start = currentPage - pageRange
      let end = currentPage + pageRange + 1
      range = generateArrayWithRangeOfIntegers(start, end) as never
    }

    const paginationItems = range.map(x =>
        <PaginationItem
          active={x === currentPage}
          key={uuidv4()}>
          <PaginationLink
            key={uuidv4()}
            onClick={() => handleQueryPage(x)}>
            {x}
          </PaginationLink>
        </PaginationItem>
    )

    return (
      <Pagination className='pv-pagination'>
        {
          totalPages > pageRange * 2 + 1 &&
            <PaginationItem disabled={currentPage === 1}>
              <PaginationLink onClick={() => handleQueryPage(1)}>
                {'<<'}
              </PaginationLink>
            </PaginationItem>
        }
        {paginationItems}
        {
          totalPages > pageRange * 2 + 1 &&
            <PaginationItem disabled={currentPage === totalPages}>
              <PaginationLink onClick={() => handleQueryPage(totalPages)}>
                {'>>'}
              </PaginationLink>
            </PaginationItem>
        }
      </Pagination>
    )
  }
}
