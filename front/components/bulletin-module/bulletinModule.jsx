//公司公告

import Paging from '../../components/paging/paging'
import fetch from 'isomorphic-unfetch';
import {Input, DatePicker, Button} from 'antd';
import React from "react";
import Link from 'next/link';
const {RangePicker} = DatePicker;

class Bulletin extends  React.PureComponent{

    componentDidMount() {
        this.getNotice()
    }

    getNotice = () => {
        console.log('執行了');
        fetch('http://localhost:8000/api/get_communicate_list',{method:'POST',
            headers:{'Content-Type': 'application/json'},
            body: JSON.stringify({limit:10, offset: 0,page: 1})}).then(res => {
            res.json().then(datal => {
                if (datal && datal.status === 0) {
                    this.setState({
                        data: datal.data,
                        gross: datal.data
                    })
                }
            })
        })
    }



    //时间格式更改
    formatDate = (timestamp,pass) => {
        const date = new Date(timestamp );//时间戳为10位需*1000，时间戳为13位的话不需乘1000
        const Y = date.getFullYear() + '-';
        const M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
        const D = date.getDate() + ' ';
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


    sellSearch = () => {
        const{keyWord,create_time} = this.state;
        if(!keyWord && !create_time) {
            return
        }
        const keyArr = ['title','create_time','end_time'];
        const arr = [keyWord];
        const datas = new FormData();
        if(create_time && create_time.length >0){
            arr.push(new Date(create_time[0]).getTime());
            arr.push(new Date(create_time[1]).getTime());
        }
        keyArr.forEach((item,index)=>{
            arr.forEach((data,num)=>{
                if(data && index === num){
                    datas.append(item,data);
                }
            })
        })
        fetch('http://localhost:8000/api/communicate_list',{method:'POST',body: datas
        }).then(res=>{
            res.json().then(datal=>{
                if(datal && datal.status === 0){
                    this.setState({
                        data:datal.data
                    })
                }
            })
        });
    }

    reception = (arr) => {
        this.setState({
            data: arr,
            gross: arr
        })
    }

    constructor(props) {
        super(props);
        // 定义state数据
        this.state = {
            data: [], //数据条
            gross: '',  //数据总条数
            keyWord: '',
            focus: false
        }
    }

    getFocus = (e) => {
        console.log(e);
        this.setState({
            focus: e
        })
    }

    //清除筛选条件
    clearSearch = () => {
        this.setState({
            keyWord: '',
            create_time: '',
        });
    }

    render(){
        const {data, create_time, gross, keyWord, focus} = this.state;
        console.log(data);
        return(
            <div className="bulletin">
                {/*表单搜索栏*/}
                <div className="sizer distance">
                    <div className="screen">
                        <div>
                            <Input
                                className={`fill ${focus ? 'focus' : ''}`}
                                value={keyWord} placeholder="请输入关键字"
                                onChange={(res)=>this.setState({keyWord:res.target.value})}
                                onBlur={() => this.getFocus(false)}
                                onFocus={() => this.getFocus(true)}
                            />
                            <RangePicker
                                onChange={(res)=>this.setState({create_time:res})}
                                value={create_time}
                                placeholder={['发布开始时间','发布结束时间']}
                            />
                        </div>
                        <div className="empty-select">
                            <div className="empty" onClick={() => this.clearSearch()}>清空筛选条件</div>
                            {/*<Button type="primary" onClick={() => this.sellSearch()}>搜索</Button>*/}
                            <div className="search" onClick={this.sellSearch}>搜索</div>
                        </div>
                    </div>
                </div>
                {/*公告栏*/}
                <div>
                    {
                        data.rows && data.rows.length > 0 && data.rows.map(item=>(
                            <Link href={{pathname: '/bulletinDetail', query: {id: item.id}}}>
                                <div key={item.create_time} className="bulletin-board distance">
                                    <div className={`explain ${item.is_read ? 'name-read' : ''}`}>{item.title}</div>
                                    <div className="time-date">
                                        <div className="data">{this.formatDate(item.create_time,1)}</div>
                                        <div className="time">{this.formatDate(item.create_time,2)}</div>
                                    </div>
                                </div>
                            </Link>
                        ))
                    }
                </div>
                {/*分页器*/}
                {
                    data.total && (
                        <Paging
                            pageChange={this.reception.bind(this)}
                            total={gross.total}
                            port="get_communicate_list"
                        />
                    )
                }
            </div>
        )
    }
}




export default Bulletin;
