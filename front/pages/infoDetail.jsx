//资讯中心详情页
import Layout from "../components/layout/layout";
import React from "react";
import {Input, Button} from 'antd';
import fetch from 'isomorphic-unfetch';

class InfoDetails extends React.Component {
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
        fetch('http://localhost:8000/api/get_info_detail',{method:'POST',
        headers:{'Content-Type': 'application/json'},
        body: JSON.stringify({id})
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

    //时间格式更改
    formatDate = (timestamp,pass) => {
        const date = new Date(timestamp );//时间戳为10位需*1000，时间戳为13位的话不需乘1000
        const Y = date.getFullYear() + '年';
        const M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '月';
        const D = date.getDate() + '日';
        const h = date.getHours() + ':';
        const m = date.getMinutes() + ':';
        const s = date.getSeconds();
        if(pass === 1){
            return Y + M + D
        }else if(pass === 2){
            const mm = m.length === 2 ? '0' + m : m;
            const ss = String(s).length === 1 ? '0' + s : s;
            return h + mm + ss
        }
        return Y + M + D + h + m + s;
    };

    render() {
        const {info} = this.state;
        console.log(info);
        return (
            <Layout>
                <div className="exchangeDetails distance">
                    <div className="headline-box">
                        <div className="headline">{info && info[0].info_title}</div>
                    </div>
                    <div className="time-preview">
                        <div className="time">
                            <span>{this.formatDate(info && info[0].createdAt,1)}</span>
                            <span>{this.formatDate(info && info[0].createdAt,2)}</span>
                            {/*<span>产品组：庄宇坤</span>*/}
                        </div>
                    </div>
                    {/* <div className="consult-img"><img src="./consult.png" alt=""/></div> */}
                    <div className="content" dangerouslySetInnerHTML={{__html: info && info[0].info_content}}></div>
                </div>
            </Layout>
        )
    }
}

export default InfoDetails;
