//公司简介
import React from "react";
import { Anchor } from 'antd';
const { Link } = Anchor;
import fetch from 'isomorphic-unfetch';

class AboutIntros extends React.Component {
    state = {
        intros: '', //公司简介
    }
    componentDidMount() {
        this.getSynopsis();
    }

    //公司简介
    getSynopsis = () => {
        fetch('http://localhost:8000/api/render_html',{method:'POST',headers: {
                'Content-Type': 'application/json'
            }, body: JSON.stringify({
                id: 1
            })}).then(res => {
            res.json().then(datal => {
                if(datal && datal.status === 0){
                    console.log(datal);
                    this.setState({
                        intros:datal.data
                    })
                }
            })
        })
    }

    render() {
        const {intros, events} = this.state;
        const {appear} = this.props;
        return (
            <div className="about">
                {/*公司简介*/}
                <div id="brief" className="synopsis distance">
                    <div className="synopsis-left">
                        <img className="synopsis-img" src="/environment.png" alt="" />
                    </div>
                    <div className="synopsis-right">
                        <div className="across"/>
                        <div className="synopsis-name">中战科技网络有限公司</div>
                        <div className="synopsis-content" dangerouslySetInnerHTML={{__html:intros.html}}/>
                    </div>
                    {
                        appear && (
                            <Anchor className="anchor" affix>
                                <div>
                                    <Link href="#brief" title="公司简介" />
                                </div>

                                <Link href="#act" title="大事记" />
                                <Link href="#civil" title="企业文化" />
                            </Anchor>
                        )
                    }
                </div>
            </div>
        )
    }
}

export default AboutIntros;
