//首页
import Layout from "../components/layout/layout";
import Link from 'next/link';
import fetch from 'isomorphic-unfetch';
import React from "react";
import AboutCulture from "../components/about-culture/aboutCulture"
import AboutIntros from "../components/about-intros/aboutIntros"
import AboutRecord from "../components/about-record/aboutRecord"
import BulletinModule from '../components/bulletin-module/bulletinModule'

class Index extends React.Component {
    componentDidMount() {
        this.getModule();
    }

    static async getInitialProps(props){
        const res = await fetch('http://localhost:8000/api/get_products',{method:'POST'});
        const infoRes = await fetch('http://localhost:8000/api/get_info', {method: 'POST'});
        const ans = await res.json();
        const infoAns = await infoRes.json();
        return {
            products: ans.data,
            infoAns: infoAns.data ? infoAns.data.rows : []
        }
    }

    constructor(props){
        super(props);
        const {products, infoAns} = props;
        this.state = {
            products,
            infoAns,
            spaceNum: 0, //偏移距离
            spaceAmount: 0, //点击数量
            module: []
        }
    }

    removal = (site) => {
        const {spaceNum, spaceAmount, infoAns} = this.state;
        console.log(infoAns + 'infoAns');
        console.log(spaceAmount);
        if (site === 'left') {
            if (spaceNum >= 0) return;
            this.setState(prevState => ({
                spaceNum: prevState.spaceNum + 335,
                spaceAmount: prevState.spaceAmount - 1,
            }));
        } else {
            if (spaceAmount >= infoAns.length - 3) return;
            this.setState(prevState => ({
                spaceNum: prevState.spaceNum - 335,
                spaceAmount: prevState.spaceAmount + 1,
            }));
        }
    };

    //模块管理接口
    getModule = () => {
        fetch('http://localhost:8000/api/get_module').then(res => {
            res.json().then(datal => {
                if (datal && datal.status === 0) {
                    const arr = [];
                    datal.data.map(item => {
                        if (item.status === 1) {
                            arr.push ({
                                moduleName: item.module_name
                            })
                        }
                    });
                    this.setState({
                        module:arr
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
            return h + m + s
        }
        return Y + M + D + h + m + s;
    };

    render() {
        const {spaceNum, products, infoAns, module} = this.state;
        return(
            <Layout>
                <div className="home">
                    <img className="banner" src="/hong-bg.png" alt=""/>
                    <div className="distance">
                        {/*最新动态*/}
                        {
                            module.map(item => (
                                item.moduleName === "咨询中心" && (
                                    <div className="dynamic">
                                        <div className="headline">最新动态</div>
                                        <div className="carousel-wrap">
                                            <div className="carousel-wrap-abs" style={{left: spaceNum}}>
                                                {
                                                    infoAns.map(item => (
                                                        <div className="carousel-wrap-list" key={item.id}>
                                                            <img className="carousel-img" src={(item.info_content.split('src=')[1] && item.info_content.split('src=')[1].split('"')[1]) || '/hong-bg.png'} alt=""/>
                                                            <div className="carousel-content">
                                                                <div className="carousel-title">
                                                                    {item.info_title}
                                                                </div>
                                                                <div className="carousel-time">{this.formatDate(item.createdAt, 1)}</div>
                                                                <div className="carousel-btn">
                                                                    <Link href={{pathname: '/infoDetail', query: {id: item.id}}}>立即查看</Link>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    ))
                                                }
                                            </div>
                                        </div>
                                        <div className="arrow-left" onClick={() => this.removal('left')}>
                                            <div className="arrow-lines"/>
                                            <div className="arrow-line"/>
                                        </div>
                                        <div className="arrow-right" onClick={() => this.removal('right')}>
                                            <div className="arrow-line"/>
                                            <div className="arrow-lines"/>
                                        </div>
                                    </div>
                                )
                            ))
                        }


                    </div>
                    {/*产品中心*/}
                    <div className="distance">
                        {
                            module.map(item => (
                                item.moduleName === "产品中心" && (
                                    <div className="index-product">
                                        <div className="headline">产品中心</div>
                                        <div className="product-list">
                                            {
                                                products.map((item, index) => (
                                                    <div className="list" key={index}>
                                                        <img className="list-img" src={item.logo} alt=""/>
                                                        <div className="list-name">{item.pro_name}</div>
                                                    </div>
                                                ))
                                            }
                                        </div>
                                    </div>
                                )
                            ))
                        }
                    </div>
                    {/*加入我们*/}
                    {
                        module.map(item => (
                            item.moduleName === "招聘信息管理" && (
                                <div>
                                    <div className="headline">加入我们</div>
                                    <div className="participate">
                                        <Link href="/join">
                                            <div className="possess-box">
                                                <div className="possess">
                                                    <img src="possess.png" alt=""/>
                                                </div>
                                                <div>全部岗位</div>
                                            </div>
                                        </Link>
                                        <Link href={{pathname: '/join', query: {jobType: '研发类'}}}>
                                            <div className="computers-box">
                                                <div className="computers">
                                                    <img src="computers.png" alt=""/>
                                                </div>
                                                <div>研发岗位</div>
                                            </div>
                                        </Link>
                                        <Link href={{pathname: '/join', query: {jobType: '行政岗位'}}}>
                                            <div className="manage-box">
                                                <div className="manage">
                                                    <img className="manage-img" src="product.png" alt=""/>
                                                </div>
                                                <div>行政岗位</div>
                                            </div>
                                        </Link>
                                    </div>
                                </div>
                            )
                        ))
                    }

                    {/*公司简介*/}
                    {
                        module.map(item => (
                            item.moduleName === "公司简介" && (
                                <div className="index-synopsis">
                                    <div className="headline">公司简介</div>
                                    <AboutIntros appear={false}/>
                                </div>

                            )
                        ))
                    }

                    {/*大事记*/}
                    {
                        module.map(item => (
                            item.moduleName === "大事记" && (
                                <div className="index-synopsis">
                                    <div className="headline">大事记</div>
                                    <AboutRecord appearName={false}/>
                                </div>

                            )
                        ))
                    }
                    {/*公司文化*/}
                    {
                        module.map(item => (
                            item.moduleName === "企业文化" && (
                                <div className="index-synopsis">
                                    <div className="headline">企业文化</div>
                                    <AboutCulture appearName={false}/>
                                </div>
                            )
                        ))
                    }
                    {/*公司公告*/}

                    {
                        module.map(item => (
                            item.moduleName === "公告管理" && (
                                <div className="index-synopsis">
                                    <div className="headline">公告管理</div>
                                    <BulletinModule/>
                                </div>
                            )
                        ))
                    }
                </div>
            </Layout>
        )
    }
}

export default Index;
