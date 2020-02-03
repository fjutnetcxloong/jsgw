//公司简介
import React from "react";
import { Anchor } from 'antd';
const { Link } = Anchor;
import fetch from 'isomorphic-unfetch';

class AboutCulture extends React.Component {
    state = {
        cultures: '',  // 公司文化
    }
    componentDidMount() {
        this.getCulture();
    }

    //公司文化
    getCulture = () => {
        fetch('http://localhost:8000/api/render_html',{method:'POST',headers: {
                'Content-Type': 'application/json'
            }, body: JSON.stringify({
                id: 2
            })}).then(res => {
            res.json().then(datal => {
                if(datal && datal.status === 0){
                    console.log(datal.data.html);
                    this.setState({
                        cultures:datal.data
                    })
                }
            })
        })
    }

    render() {
        const {cultures} = this.state;
        const {appearName} = this.props;
        return (
            <div className="about">
                {/*公司文化*/}
                <div id="civil" className="culture distance">
                    {
                        appearName && (
                            <div>
                                <div className="culture-name">公司文化</div>
                                <div className="across"/>
                            </div>

                        )
                    }
                    <div className="culture-content" dangerouslySetInnerHTML={{__html:cultures.html}}/>
                    <img className="culture-img" src="/environment.png" alt="" />
                </div>
            </div>
        )
    }
}

export default AboutCulture;
