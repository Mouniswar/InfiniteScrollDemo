import React from 'react';
import Table from './Table';
import { parse } from 'query-string';

class AllItems extends React.Component {
    state = {link: this.props.location.search}

    componentDidMount() {
        const params = parse(this.props.location.search);
        console.log(params);
        this.setState({link: params.is_untagged})
        console.log("Link: ",this.state.link)
    }

    render() {
        return (
            <Table url={this.state.link} />
        )
    }
}

export default AllItems;