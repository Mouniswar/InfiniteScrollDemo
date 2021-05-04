import React, { Component } from 'react';
import Table from './Table';
import { parse } from 'query-string';

export default class DisabledItems extends Component {
    state = {link: this.props.location.search, path:""}

    componentDidMount() {
        const params = parse(this.props.location.search);
        const term = this.props.location.pathname;
        let splittedTerm = term.replace("/","");
        this.setState({link: params.bool, path: splittedTerm});
    }

    render() {
        return (
            <Table url={this.state.link} path={this.state.path}/>
        )
    }
}