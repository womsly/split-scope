import React from 'react'
import classes from './PageHeader.module.scss'

function PageHeader({children},{ title = "PageTitle", breadcrumb = "• Description of page options"}) {
  return (
    <>
      <div className={classes.header_container}>
        <div className={classes.header_text}>
          <h1>{title}</h1>
          <div>
            <p>Overview {breadcrumb}</p>
          </div>
        </div>
      </div>
      <div className={classes.page_container}>
        {children}
      </div>
    </>
  )
}

export default PageHeader