//创建公共组件的第二种方式：布局组件
import Head from "next/head";
import Header from "./header";
import Footer from "./footer";
import "../../static/style/styles.less";
import 'antd/dist/antd.less';
import {ConfigProvider} from 'antd';
import zhCN from 'antd/lib/locale/zh_CN';
import React from "react";

export default ({ children, title = "公司官网" }) => (
    <ConfigProvider locale={zhCN}>
        <div className="layout">
            <Head>
                <title>{title}</title>
                <meta charSet="utf-8" />
                <meta
                    name="viewport"
                    content="initial-scale=1.0, width=device-width"
                />
                <link rel="icon" href="/favicon.png" />
            </Head>
            <Header />
            <div className="content">{children}</div>
            <Footer />
        </div>
    </ConfigProvider>
);
