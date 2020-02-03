//资讯中心内容页
import Layout from "../components/layout/layout";
import React from "react";
import { Menu, Dropdown, Icon } from 'antd';

class Product extends React.PureComponent {
    state = {

    }

    componentDidMount() {
        this.getProducts();
    }

    //选择下载图片
    downloadChoice = (e) => {
        this.setState ({
            android: e,
            ios: !e
        })
    };

    constructor(props){
        super(props);
        this.state = {
            android: false,
            ios: false,
            products: []
        }
    }

    //产品接口
    getProducts = () => {
        fetch('http://localhost:8000/api/get_products',{method:'POST'}).then(res => {
            res.json().then(datal => {
                if (datal && datal.status === 0) {
                    const pro = datal.data;
                    pro.map(item =>{
                        item.menu = <div className="link-img-box android">
                            <img className="link-img" src={item.link_code} alt=""/>
                        </div>
                    })
                    this.setState({
                        products: pro,
                    })
                }
            })
        })
    }


    render() {
        const {ios, android, products} = this.state;
        return (
            <Layout>
                <div className="product distance">
                    <div className="product-name">产品中心</div>
                    <div className="product-each-box">
                        {
                            products.map(item => (
                                <div className="product-each">
                                    <img className="each-img" src={item.logo} alt=""/>
                                    <div className="each-explain">
                                        <div className="project">{item.pro_name}</div>
                                        <div className="slogan">{item.product_desc}</div>
                                        <div className="download">
                                            <a href={item.android_link} download={item.pro_name}>
                                                <Dropdown className="download-link" overlay={item.menu}>
                                                    <div className="ios android">
                                                        <img src="android.png" alt=""/>
                                                        <div>安卓下载</div>
                                                    </div>
                                                </Dropdown>
                                            </a>
                                            <a href={item.ios_link} download="w3logo">
                                                <Dropdown className="download-link" overlay={item.menu}>
                                                    <div className="ios">
                                                        <img src="ios.png" alt=""/>
                                                        <div>IOS下载</div>
                                                    </div>
                                                </Dropdown>
                                            </a>

                                        </div>
                                        <div className="download-link">
                                            {
                                                android && (
                                                    <div className="link-img-box android">
                                                        <img className="link-img" src="/favicon.png" alt=""/>
                                                    </div>
                                                )
                                            }
                                            {
                                                ios && (
                                                    <div className="link-img-box">
                                                        <img className="link-img" src="/hong-bg.png" alt=""/>
                                                    </div>
                                                )
                                            }

                                        </div>
                                    </div>
                                </div>
                            ))
                        }
                    </div>
                </div>
            </Layout>
        )
    }
}

export default Product;
