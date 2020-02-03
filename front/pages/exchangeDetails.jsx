//资讯中心内容页
import Layout from "../components/layout/layout";
import React from "react";
import { Input, Button, Form, message } from 'antd';

class ExchangeDetails extends React.PureComponent {

    // static async getInitialProps(props) {
    // const data = await fetch('http://localhost:8000/api/talk_detail', {
    //     method: 'POST',
    //     headers: {
    //         'Content-Type': 'application/json'
    //     },
    //     body: {id}
    // });

    //     // console.log(dep.data)
    //     const ans = await res.json();
    //     return {
    //         products: ans.data,
    //     }
    // }

    state = {
        data: {},
        evaluate: [] // 评论
    }

    componentDidMount() {
        this.getDetail();
        this.getEvaluate();
    }

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
            return h + m + s
        }
        return Y + M + D + h + m + s;
    }

    getDetail = () => {
        const id = window.location.search.substr(1).split('=')[1]
        fetch('http://localhost:8000/api/talk_detail', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ id, is_read: 1 })
        }).then(responst => responst.json())
            .then(res => {
                if (res && res.status === 0) {
                    this.setState({
                        data: res.data
                    })
                } else {

                }
            })
    }


    delTalk = () => {
        const id = window.location.search.substr(1).split('=')[1]
        fetch('http://localhost:8000/api/del_talk', {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ id })
        }).then(response => response.json())
            .then(res => {
                if (res && res.status === 0) {
                    window.location.href = '/exchange'
                }
            })
    }

    // 发送评论
    handleSubmit = () => {
        this.props.form.validateFields((err, values) => {
            const userinfo = JSON.parse(sessionStorage.getItem('statusCode'));
            console.log(userinfo)
            const id = window.location.search.substr(1).split('=')[1]
            console.log(userinfo.name)
            if (!userinfo) {
                message.error('用户未登录')
                return
            }
            if (!err) {
                fetch('http://localhost:8000/api/up_evaluate', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        id,
                        content: values.evaluate,
                        username: userinfo && userinfo.name,
                    }),
                }).then(response => response.json())
                    .then(res => {
                        // console.log(res)
                        if (res && res.status === 0) {
                            message.success('评论成功')
                            location.reload()
                        } else {
                            message.error(res.message)
                        }
                    })
            }
        });
    }

    // 获取评论
    getEvaluate = () => {
        const id = window.location.search.substr(1).split('=')[1];
        if (!id) {
            message.error('这条分享不存在')
            window.location.href = '/exchange'
        }
        fetch('http://localhost:8000/api/get_evaluate', {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ id })
        }).then(response => response.json())
            .then(res => {
                console.log(res)
                if (res && res.status === 0) {
                    // window.location.href = '/exchange'
                    this.setState({
                        evaluate: res.data
                    })
                }
            })
    }

    // 删除评论
    delEvaluate = id => {
        if (!id) {
            message.error('没有这条评论')
            return
        }
        fetch('http://localhost:8000/api/del_evaluate', {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ id })
        }).then(response => response.json())
            .then(res => {
                console.log(res)
                if (res && res.status === 0) {
                    message.success('删除成功')
                    location.reload()
                } else {
                    message.error(res.message)
                }
            })
    }

    render() {
        const { data, evaluate } = this.state;
        const { getFieldDecorator } = this.props.form;
        return (
            <Layout>
                <div className="exchangeDetails distance">
                    <div className="headline-box">
                        <div className="headline">{data && data.exchange_title}</div>
                        <div className="assistant" onClick={this.delTalk}>删除</div>
                    </div>
                    <div className="time-preview">
                        <div className="time">
                            <span>{this.formatDate(data.create_time, 1)}</span>
                            <span>{this.formatDate(data.create_time, 2)}</span>
                            <span>{`${data.department_id} ${data.username}`}</span>
                        </div>
                        <div className="preview">浏览量：{data && data.exchange_count}</div>
                    </div>
                    <div className="consult-img"><img src={data.exchange_pic} alt="" /></div>
                    <div className="content">{data.exchange_content}</div>
                    <div className="discuss">
                        <Form wrapperCol={{ span: 12 }} onSubmit={this.handleSubmit}>
                            <Form.Item wrapperCol={{ span: 23 }}>
                                {
                                    getFieldDecorator('evaluate', {
                                        rules: [
                                            {
                                                required: true,
                                                message: '请输入评论内容!',
                                            },
                                        ]
                                    })(
                                        <Input placeholder="请输入您要评论的内容"
                                            maxLength={200}
                                        />
                                    )
                                }
                            </Form.Item>
                        </Form>
                        <Button type="primary" onClick={this.handleSubmit}>发送</Button>
                    </div>
                    <div className="comment-box">
                        <div className="comment-name">评论</div>
                        {
                            evaluate && evaluate.length > 0 && evaluate.map(item => (
                                <div className="comment-details">
                                    <div>[{item.evaluate_name}]{item.evaluate_content}</div>
                                    <div onClick={() => this.delEvaluate(item.id)}>删除</div>
                                </div>
                            ))
                        }

                    </div>
                </div>
            </Layout>
        )
    }
}

export default Form.create()(ExchangeDetails);
