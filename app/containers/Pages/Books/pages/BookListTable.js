import { withStyles } from '@material-ui/core/styles';

import * as webapis from 'bdf-api/webapi';
import PropTypes from 'prop-types';
import React from 'react';
import EditableBook from './EditableBook';

const styles = ({
	root: {
		flexGrow: 1,
		'padding-left': '24px',
		'padding-right': '24px',
	}
});

class BookListTable extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			_isMounted: false,
			body: [
			],
		};
	}

	componentDidMount() {
		if (this.props.leaf != null) {
			webapis.getBooksByCategory(this.props.leaf).then(
				(response) => {
					this.setState({ body: response.data, _isMounted: true });
				},
				(error) => {
				}
			);
		}
	}

	componentWillUnmount() {
		this.setState({ _isMounted: false });
	}

	render() {
		return (
			(this.state._isMounted) ? (
				<div>
					<EditableBook
						dataSource={this.state.body}
						onBackTreeView={this.props.onBackTreeView}
						category={this.props.leaf}
					/>
				</div>
			) : (
					<></>
				)
		);
	}
}

BookListTable.propTypes = {
	leaf: PropTypes.number.isRequired,
	onBackTreeView: PropTypes.func.isRequired,
};

BookListTable.defaultProps = {
};

BookListTable.propTypes = {
};

export default withStyles(styles)(BookListTable);

