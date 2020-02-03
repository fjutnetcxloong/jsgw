//资讯中心详情页
import Layout from "../components/layout/layout";
import React from "react";
import {Input, Button} from 'antd';
import fetch from 'isomorphic-unfetch';

class BulletinDetails extends React.Component {
    componentDidMount() {
        this.getJobType()
    }

    constructor(props) {
        super(props)
        const {info} = props
        this.state = {
            info
        }
    }

    getJobType = () => {
        const id = window.location.search.substr(1).split('=')[1]
        fetch('http://localhost:8000/api/get_communicate_detail',{method:'POST',
        headers:{'Content-Type': 'application/json'},
        body: JSON.stringify({id, is_read: 1})
        }).then(res => {
            return res.json()
        }).then(ret => {
            if(ret && ret.status === 0) {
                this.setState({
                    info: ret.data
                })
            }
        })
    }

    render() {
        const {info} = this.state;
        console.log(info)
        return (
            <Layout>
                <div className="exchangeDetails distance">
                    <div className="headline-box">
                        <div className="headline">{info && info.title}</div>
                    </div>
                    <div className="time-preview">
                        <div className="time">
                            <span>{info && info.create_time}</span>
                            <span>11:11</span>
                            <span>产品组：庄宇坤</span>
                        </div>
                    </div>
                    {/* <div className="consult-img"><img src="./consult.png" alt=""/></div> */}
                    <div className="content" dangerouslySetInnerHTML={{__html: info && info.describe}}></div>
                </div>
            </Layout>
        )
    }
}

export default BulletinDetails;
