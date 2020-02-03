//创建公共组件的第一种方式：页头组件
import React from "react";
import Link from "next/link";
import {Menu, Dropdown, Icon, Modal, Input, Form, Button, message} from 'antd';
import fetch from 'isomorphic-unfetch';
import md5 from "md5";

const links = [
    { href: "/index", label: "首页"},
    { href: "/about", label: "关于我们" },
    { href: "/info", label: "资讯中心" },
    { href: "/join", label: "加入我们"},
    { href: "/product", label: "产品中心"}
].map(link => {
    link.key = `nav-link-${link.href}-${link.label}`;
    return link;
});

class Header extends React.Component {
    state = {
        visible: false,   //登入弹窗
        report: '',         //账号存储
        cipher: '',         //密码存储
        register: false,       //账号密码弹窗
        accountName: '',        //账户名
        test: '',     //当前浏览地址
        focus: false
    };

    componentDidMount() {
        this.setState({
            test: window.location.href
        });
        if(sessionStorage.getItem('statusCode')){
            this.setState({
                register: true,
                accountName: JSON.parse(sessionStorage.getItem('statusCode')).name + `(${JSON.parse(sessionStorage.getItem('statusCode')).identity})`,
            })
        }
    }

    //登录弹窗
    examine = (arr) => {
        console.log('执行了');
        this.setState({
            visible: arr
        })
    };

    //监听账号
    account = (e) => {
        this.setState({
            report:e.target.value
        })
    };

    //监听密码
    password = (e) => {
        this.setState({
            cipher:e.target.value
        })
    };

    //登入
    handleSubmit = () => {
        const {report, cipher} = this.state;
        fetch('http://localhost:8000/api/login', {method: 'POST',headers: {
                'Content-Type': 'application/json'
            }, body: JSON.stringify({
                account: report ,password: md5(cipher)
            })}).then(res => {
            return res.json()
        }).then(res => {
            if (res && res.status === 0) {
                sessionStorage.setItem('statusCode', JSON.stringify(res.data));
                this.setState({
                    register: true,
                    visible: false,
                    accountName: res.data.name + `(${res.data.identity})`,
                },() => {
                    message.success('登入成功');
                })
            } else {
                message.error('账号或密码错误');
                this.setState({
                    visible: false
                })
            }
        })
    };

    //退出登入
    quit = () => {
        sessionStorage.setItem('statusCode', '')
        this.setState({
            register: false,
        })
    };

    getFocus = (e) => {
        console.log(e);
        this.setState({
            focus: e
        })
    }

    render() {
        const {visible, register, accountName, test, focus} = this.state;
        console.log(test);
        const menu = (
            <Menu>
                <Menu.Item>
                    <Link href="/bulletin">
                        <a>公司公告</a>
                    </Link>
                </Menu.Item>
                {
                    register && (
                        <Menu.Item>
                            <Link href="/exchange">
                                <a>内部交流</a>
                            </Link>
                        </Menu.Item>
                    )
                }

            </Menu>
        );
        return (
            <div className="header distance test">
                <img className="header-logo" src="/zzha.png" alt=""/>
                <div className="header-tab">
                    {links.map(({ href, label, key}) => (
                        <div className={test.includes(href) ? 'select' : ''} key={href}>
                            <Link href={href}>
                                <a key={key}>{label}</a>
                            </Link>
                        </div>
                    ))}
                    <div>
                        <Dropdown overlay={menu}>
                            <a className="ant-dropdown-link" href="#">
                                内部板块 <Icon type="down" />
                            </a>
                        </Dropdown>
                    </div>
                </div>
                {
                    register ? (
                        <div className="staff">
                            <span>{accountName}</span>
                            <span onClick={this.quit}>退出</span>
                        </div>
                    ) : (
                        <div className="staff" onClick={() => this.examine(true)}>员工登录</div>
                    )
                }

                {
                    visible && (
                        <Modal
                            className="enter-window"
                            // title="账号登入"
                            visible={this.state.visible}
                            onCancel={() => this.examine(false)}
                            footer={null}
                            closable={false}
                        >
                            <Form className="login-form" onSubmit={this.handleSubmit}>
                                <div className="close"><img onClick={() => this.examine(false)} src="/close.png" alt=""/></div>
                                <Form.Item>
                                    <Input
                                        className={`fill ${focus ? 'focus' : ''}`}
                                        prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                        placeholder="请输入登陆账号"
                                        onChange={(e)=>this.account(e)}
                                        onBlur={() => this.getFocus(false)}
                                        onFocus={() => this.getFocus(true)}
                                    />
                                </Form.Item>
                                <Form.Item>
                                    <Input
                                        prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                        type="password"
                                        placeholder="请输入密码"
                                        onChange={(e)=>this.password(e)}
                                    />
                                </Form.Item>
                                <Form.Item>
                                    <Button  onClick={this.handleSubmit} type="primary" className="login-form-button">
                                        登入
                                    </Button>
                                </Form.Item>
                            </Form>
                        </Modal>
                    )
                }

            </div>
        )
    }
}

export default Header;
