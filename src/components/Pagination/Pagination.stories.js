import * as React from 'react'
import { storiesOf } from '@storybook/react'
import { PVPagination as Pagination } from './Pagination'

storiesOf('Pagination', module)
  .addWithJSX(
    'Pagination',
    () => (
      <Pagination
        currentPage={10}
        pageRange={3}
        totalPages={100}/>
    )
  )