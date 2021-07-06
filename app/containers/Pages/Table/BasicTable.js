import React, { Component } from 'react';
import { Helmet } from 'react-helmet';
import brand from 'bdf-api/dummy/brand';
import { PapperBlock, EmptyData } from 'bdf-components';
import StrippedTable from './StrippedTable';

class BasicTable extends Component {
  render() {
    const title = brand.name + ' - Table';
    const description = brand.desc;
    return (
      <div>
        <Helmet>
          <title>{title}</title>
          <meta name="description" content={description} />
          <meta property="og:title" content={title} />
          <meta property="og:description" content={description} />
          <meta property="twitter:title" content={title} />
          <meta property="twitter:description" content={description} />
        </Helmet>
        <div>
          <StrippedTable />
        </div>
        <div>
          <EmptyData />
        </div>
      </div>
    );
  }
}

export default BasicTable;
