// Copyright (c) 2016 Mattermost, Inc. All Rights Reserved.
// See License.txt for license information.

import {FormattedMessage} from 'react-intl';

import * as Utils from 'utils/utils.jsx';

import React from 'react';
import ReactDOM from 'react-dom';
import Chart from 'chart.js';

export default class DoughnutChart extends React.Component {
    constructor(props) {
        super(props);

        this.initChart = this.initChart.bind(this);
        this.chart = null;
    }

    componentDidMount() {
        this.initChart();
    }

    componentDidUpdate(prevProps) {
        if (!Utils.areObjectsEqual(prevProps.data, this.props.data) || !Utils.areObjectsEqual(prevProps.options, this.props.options)) {
            if (this.chart) {
                this.chart.destroy();
            }
            this.initChart();
        }
    }

    componentWillUnmount() {
        if (this.chart) {
            this.chart.destroy();
        }
    }

    initChart() {
        if (!this.refs.canvas) {
            return;
        }
        var el = ReactDOM.findDOMNode(this.refs.canvas);
        var ctx = el.getContext('2d');
        this.chart = new Chart(ctx, {type: 'doughnut', data: this.props.data, options: this.props.options || {}}); //eslint-disable-line new-cap
    }

    render() {
        let content;
        if (this.props.data == null) {
            content = (
                <FormattedMessage
                    id='analytics.chart.loading'
                    defaultMessage='Loading...'
                />
            );
        } else {
            content = (
                <canvas
                    ref='canvas'
                    width={this.props.width}
                    height={this.props.height}
                />
            );
        }

        return (
            <div className='col-sm-6'>
                <div className='total-count'>
                    <div className='title'>
                        {this.props.title}
                    </div>
                    <div className='content'>
                        {content}
                    </div>
                </div>
            </div>
        );
    }
}

DoughnutChart.propTypes = {
    title: React.PropTypes.node,
    width: React.PropTypes.string,
    height: React.PropTypes.string,
    data: React.PropTypes.array,
    options: React.PropTypes.object
};
