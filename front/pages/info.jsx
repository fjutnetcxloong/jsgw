//资讯中心
import Layout from "../components/layout/layout";
import InfoModule from "../components/info-module/infoModule";
import React from "react";

class Product extends React.PureComponent {


    render() {
        return (
            <Layout>
                <div className="bulletin">
                    <div className="banner">
                        <div className="join-one">资讯中心</div>
                        <div className="join">Information Center</div>
                    </div>
                    <InfoModule/>
                </div>
            </Layout>
        )
    }
}

export default Product;
