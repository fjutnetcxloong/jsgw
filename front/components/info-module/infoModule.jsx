//公司简介
import React from "react";
import {Input, DatePicker, Button} from 'antd';
const {RangePicker} = DatePicker;
import Paging from '../../components/paging/paging'
import fetch from 'isomorphic-unfetch';
import Link from 'next/link';

class InfoModule extends React.PureComponent {
    state = {
        infoAns: {},  //数据
        key_val: '',
        start_time: [],
        focus: false
    }
    componentDidMount() {
        this.getNotice()
    }

    getNotice = () => {
        fetch('http://localhost:8000/api/get_info', {method: 'POST',headers: {
                'Content-Type': 'application/json'
            }, body: JSON.stringify({
                limit:10,offset:0,page:1
            })}).then(res => {
            res.json().then(datal => {
                if (datal && datal.status === 0) {
                    this.setState({
                        infoAns: datal.data,
                        key_val: '',
                        start_time: ''
                    })
                }
            })
        })
    }

    //筛选按钮
    getSelect = () => {
        console.log('执行了');
        const {key_val, start_time} = this.state;
        const timeArr = [];
        if(!key_val && !start_time) {
            return
        }
        if(start_time && start_time.length > 1){
            timeArr.push(new Date(start_time[0]).getTime())
            timeArr.push(new Date(start_time[1]).getTime())
        }
        const datas = {
            key_val,
            timeArr
        };
        fetch('http://localhost:8000/api/get_info', {method: 'POST',headers: {
                'Content-Type': 'application/json'
            }, body: JSON.stringify(datas)}).then(res => {
            res.json().then(datal => {
                if (datal && datal.status === 0) {
                    this.setState({
                        infoAns: datal.data
                    })
                }
            })
        })
    };

//时间格式更改
    formatDate = (timestamp, pass) => {
        const date = new Date(timestamp);//时间戳为10位需*1000，时间戳为13位的话不需乘1000
        const Y = date.getFullYear() + '-';
        const M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
        const D = date.getDate() + ' ';
        const h = date.getHours() + ':';
        const m = date.getMinutes() + ':';
        const s = date.getSeconds();
        if (pass === 1) {
            return Y + M + D
        } else if (pass === 2) {
            const mm = m.length === 2 ? '0' + m : m;
            const ss = String(s).length === 1 ? '0' + s : s;
            return h + mm + ss
        }
        return Y + M + D + h + m + s;
    };

    reception = (arr) => {
        this.setState({
            infoAns: arr
        })
    };

    //清除筛选条件
    clearSearch = () => {
        this.setState({
            key_val:'',
            start_time:'',
        });
    }

    getFocus = (e) => {
        console.log(e);
        this.setState({
            focus: e
        })
    }

    render() {
        const {infoAns, key_val, start_time, focus} = this.state;
        return (
            <div>
                {/*表单搜索栏*/}
                <div className="sizer distance">
                    <div className="screen">
                        <div>
                            <Input
                                className={`fill ${focus ? 'focus' : ''}`}
                                value={key_val}
                                onChange={(res)=>this.setState({key_val:res.target.value})} placeholder="输入关键字"
                                onBlur={() => this.getFocus(false)}
                                onFocus={() => this.getFocus(true)}
                            />
                            <RangePicker
                                placeholder={['发布开始时间','发布结束时间']}
                                onChange={(res)=>this.setState({start_time:res})}
                                value={start_time}
                            />
                        </div>
                        <div className="empty-select">
                            <div className="empty" onClick={this.clearSearch}>清空筛选条件</div>
                            <div className="search" onClick={this.getSelect}>搜索</div>
                            {/*<Button type="primary" >搜索</Button>*/}
                        </div>
                    </div>
                </div>
                {/*公告栏*/}
                <div className="list-box">
                    {
                        infoAns.rows && infoAns.rows.length > 0 && infoAns.rows.map(item => (
                            <Link href={{pathname: '/infoDetail', query: {id: item.id}}}>
                                <div key={item.id} className="bulletin-board distance">
                                    <div className="explain">{item.info_title}</div>
                                    <div className="time-date">
                                        <div className="data">{this.formatDate(item.createdAt, 1)}</div>
                                        <div className="time">{this.formatDate(item.createdAt, 2)}</div>
                                    </div>
                                </div>
                            </Link>
                        ))
                    }
                </div>
                {/*分页器*/}
                {
                    infoAns.total && (
                        <Paging
                            pageChange={this.reception.bind(this)}
                            total={infoAns.total}
                            port="get_info"
                        />
                    )
                }

            </div>
        )
    }
}

export default InfoModule;
