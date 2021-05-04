import React from 'react';
import items from '../apis/items';
import { parse } from 'query-string';

class Table extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            items:[], 
            hasMore: true,
            checked: false,
            isLoading: false,
            counter: 1,
            incrementer: 1
        };

        // window.onscroll = _.debounce(() => {
        //     const { 
        //         fetchLists,
        //         state: {
        //             isLoading,
        //             hasMore
        //         } 
        //     } = this;

        //     if(isLoading || !hasMore) return;
        //     if (window.innerHeight + document.documentElement.scrollTop === document.documentElement.offsetHeight) {
        //         console.log("Reached to bottom of page")
        //         fetchLists();
        //     }
        // },100);

    }

    componentDidMount() {
        let prop = this.props.url;
        console.log(`${Object.keys(prop)}=${Object.values(prop)}`);
        console.log("Props", this.props);
        this.fetchLists();
        window.addEventListener('scroll',this.loadMore);
    }

    loadMore = () => {
            const scrollale = Math.ceil(document.documentElement.scrollHeight - window.innerHeight);
            const scrolled = Math.ceil(window.scrollY);
            console.log(scrolled);
            console.log("Inner Height:" ,window.innerHeight)
            console.log("document: ",document.documentElement.scrollHeight);

            if(scrollale === scrolled) {
                console.log('you reached to bottom of page');
                this.fetchLists();
                console.log(this.state.counter)
            }
     }
 

    fetchLists = () => { this.setState({isLoading: true}, () => {
            items.get(`?${this.props.path}=${this.props.url}&page=${this.state.incrementer}`)
            .then((results) => {
                const increment = parse(results.data.next);
                console.log("Increment: ", increment.page)
                this.setState({incrementer: increment.page});
                const result = results.data.results;
                this.setState({
                    isLoading:false,
                    items: [
                        ...this.state.items,
                        result
                    ]
                })
            })
        })
    }

 

    buildList() {
        console.log("items: ",this.state.items)
        if(!this.state.items) {
            console.log(this.props)
            return <div>Loading...</div>
        }


        let isChecked = this.state.checked === true ? (
            <input type="checkbox" checked />
        ) : (
            <input type="checkbox" />
        )

        const tablerows = this.state.items.map((wholeArray) => {
            return wholeArray.map((item) => {
                return (
                    <tr key={item['id']}>
                        <td>
                            {isChecked}
                        </td>
                        <td>{item.name}</td>
                        <td>{item.last_updated['date']}</td>
                        <td>{item.cogs} %</td>
                        <td>{item.cost_price}</td>
                        <td>{item.sale_price}</td>
                        <td>{item.gross_margin}</td>
                    </tr>
                );
            })
         
        })

    

        return (
            <table className="ui selectable striped table">
                <thead>
                    <tr style={{border:'1px solid black'}}>
                        <th>
                            <input type="checkbox" onChange={e => {this.setState({checked: e.target.checked})}} checked={this.state.checked} />
                        </th>
                        <th>Name</th>
                        <th>Last Updated<i className="sort icon"/></th>
                        <th>COGS(%)<i className="sort icon" /></th>
                        <th>COST PRICE<i className="sort icon" /></th>
                        <th>SALES PRICE<i className="sort icon" /></th>
                        <th>GROSS MARGIN<i className="sort icon" /></th>
                    </tr>
                </thead>
                <tbody>
                    {tablerows}
                </tbody>
            </table>
        )
    }

  

    render() {
        return (
            <div>
                {this.buildList()}
            </div>
        )
    }

}

export default Table;