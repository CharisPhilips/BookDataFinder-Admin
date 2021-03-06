import React, { Component } from 'react';
import { Helmet } from 'react-helmet';
import brand from 'bdf-api/dummy/brand';
import { PapperBlock } from 'bdf-components';
import CompossedLineBarArea from './CompossedLineBarArea';

class BasicTable extends Component {
  render() {
    const title = brand.name + ' - Dashboard';
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
        <PapperBlock title="Pdf Download Chart" icon="ios-stats-outline" desc="" overflowX>
          <div>
            <CompossedLineBarArea />
          </div>
        </PapperBlock>
      </div>
    );
  }
}

export default BasicTable;
