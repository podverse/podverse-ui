import * as React from 'react'
import { Pagination, PaginationItem, PaginationLink } from 'reactstrap'
import { generateArrayWithRangeOfIntegers, safeAlert } from 'lib/utility'
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
      const start = 1
      const end = totalPages + 1
      range = generateArrayWithRangeOfIntegers(start, end) as never
    } else if (currentPage <= pageRange) { // beginning pages
      const start = 1
      const end = (pageRange * 2) + 2
      range = generateArrayWithRangeOfIntegers(start, end) as never
    } else if (currentPage > totalPages - pageRange) { // end pages
      const start = totalPages - (pageRange * 2)
      const end = totalPages + 1
      range = generateArrayWithRangeOfIntegers(start, end) as never
    } else { // middle pages
      const start = currentPage - pageRange
      const end = currentPage + pageRange + 1
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
      <React.Fragment>
        {
          totalPages > 1 &&
            <div className='pv-pagination'>
              <Pagination>
                {
                  (totalPages > pageRange * 2 + 1) && currentPage > 1 &&
                    <PaginationItem disabled={currentPage === 1}>
                      <PaginationLink onClick={() => handleQueryPage(1)}>
                        {'<<'}
                      </PaginationLink>
                    </PaginationItem>
                }
                {paginationItems}
                {
                  (totalPages > pageRange * 2 + 1) && currentPage < totalPages &&
                    <PaginationItem disabled={currentPage === totalPages}>
                      <PaginationLink onClick={() => handleQueryPage(totalPages)}>
                        {'>>'}
                      </PaginationLink>
                    </PaginationItem>
                }
              </Pagination>
              {
                totalPages > pageRange * 2 + 1 &&
                  <a
                    className='pv-pagination__skip-to'
                    onClick={() => {
                      const pageNumber = prompt('Type a page number:')
                      const page = pageNumber && parseInt(pageNumber, 10)
                      if ((page && page <= 0) || page === 0) {
                        safeAlert('Must be a number larger than 1.')
                      } else if (page && page > totalPages) {
                        safeAlert(`Page out of range. Must be a number smaller than ${totalPages}.`)
                      } else if (page) {
                        handleQueryPage(page)
                      }
                    }}
                    tabIndex={0}>Skip to page</a>
              }
            </div>
        }
      </React.Fragment>
    )
  }
}
