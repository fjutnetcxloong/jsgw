//公司公告
import Layout from "../components/layout/layout";
import BulletinModule from '../components/bulletin-module/bulletinModule'
import React from "react";

class Bulletin extends  React.PureComponent{
    render(){
        return(
            <Layout>
                <div className="bulletin">
                    <div className="banner ">
                        <div className="join-one">公司公告</div>
                        <div className="join">Company announcement </div>
                    </div>
                    <BulletinModule/>
                </div>
            </Layout>
        )
    }
}




export default Bulletin;
