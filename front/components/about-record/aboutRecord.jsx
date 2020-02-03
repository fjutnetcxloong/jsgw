//公司简介
import React from "react";
import fetch from 'isomorphic-unfetch';


class AboutRecord extends React.Component {
    state = {
        events: [],  //大事记
    }
    componentDidMount() {
        this.getRecord();
    }

    //大事记
    getRecord = () => {
        fetch('http://localhost:8000/api/get_events', {method: 'POST'}).then(res => {
            res.json().then(datal => {
                if (datal && datal.status === 0) {
                    this.setState({
                        events: datal.data
                    })
                }
            })
        })
    }

    render() {
        const {events} = this.state;
        const {appearName} = this.props;
        return (
            <div className="about">
                {/*大事记*/}
                <div id="act" className="deed distance">
                    {
                        appearName && (
                            <div className="deed-name">中战大事记</div>
                        )
                    }
                    <div className="deed-each-box">
                        {
                            events.map((item, index) => (
                                <div className="deed-each">
                                    <div className="time">
                                        <div className={`circle ${index === 0 ? 'cycle' : ''}`}>
                                            <div className="dot"/>
                                        </div>
                                        <div className="short">{item.time.split('/')[0]}年</div>
                                    </div>
                                    <div className="each-content">{item.event_content}</div>
                                </div>
                            ))
                        }
                    </div>
                </div>
            </div>
        )
    }
}

export default AboutRecord;
