//公司简介
import React from "react";
import AboutCulture from "../components/about-culture/aboutCulture"
import AboutIntros from "../components/about-intros/aboutIntros"
import AboutRecord from "../components/about-record/aboutRecord"
import Layout from "../components/layout/layout";

export default class About extends React.PureComponent {
    render() {
        return (
            <Layout title="关于我们">
                <div className="about">
                    <div className="banner ">
                        <div className="join-one">公司简介</div>
                        <div className="join">Company profile</div>
                    </div>
                    <AboutIntros
                        appear={true}
                    />
                    <AboutRecord appearName={true}/>
                    <AboutCulture appearName={true}/>
                </div>
            </Layout>
        )
    }
}
