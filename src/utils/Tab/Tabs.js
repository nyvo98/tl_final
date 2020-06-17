import React from 'react'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronRight, faChevronLeft } from '@fortawesome/free-solid-svg-icons'

export class Tabs extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            selected: this.props.selected || 0
        }
    }

    HandleChooseTab = (index) => {
        this.setState({
            selected: index
        })
    }

    HandlePointNextTab = (count) => {
        if (this.state.selected === count - 1) {
            this.setState({
                selected: 0,
            })
        }
        else {
            let nextTab = this.state.selected + 1;
            this.setState({
                selected: nextTab,
            })
        }
    }

    HandlePointPreviousTab = (count) => {
        if (this.state.selected === 0) {
            let calMaxcount = count - 1;
            this.setState({
                selected: calMaxcount,
            })
        }
        else {
            let previousTab = this.state.selected - 1;
            this.setState({
                selected: previousTab,
            })
        }

    }
    render() {
        let countChildren = 0;
        return (
            <div className="order-display">
                <ul className="inline">
                    {this.props.children.map((elem, index) => {
                        let style = (index === this.state.selected ? 'selected' : '');
                        return (
                            <li className={style} key={index}
                                onClick={(e) => this.HandleChooseTab(index)}
                            >
                                <span style={{ marginRight: '5px' }}>{elem.props.iconAwe}</span>{elem.props.title}
                            </li>
                        )
                    })}
                    <div style={{ display: 'none' }}>{countChildren = this.props.children.length}</div>
                </ul>
                <div className="group-tab-btn">
                    <button
                        className="point-btn"
                        onClick={(e) => this.HandlePointPreviousTab(countChildren)}
                    >
                        <FontAwesomeIcon icon={faChevronLeft}
                            color="white"
                            size="lg"
                        />
                    </button>
                    <button
                        className="point-btn"
                        onClick={(e) => this.HandlePointNextTab(countChildren)}
                    >
                        <FontAwesomeIcon icon={faChevronRight}
                            color="white"
                            size="lg"
                        />
                    </button>

                </div>
                <div className="tab">{this.props.children[this.state.selected]}</div>
            </div>
        )
    }
}

export class Panel extends React.Component {
    render() {
        return <div className="order-tab-display">{this.props.children}</div>
    }
}