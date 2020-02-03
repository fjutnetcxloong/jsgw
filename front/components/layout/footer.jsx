import React from "react";
import Link from "next/link";

class Footer extends React.PureComponent {
    handleScrollTop = () => {
        window.scrollTo(0, 0);
    }

    render() {
        return (
            <footer className="footer">
                <div className="bottom distance">
                    <img className="bottom-img" src="/zzha.png" alt=""/>
                    <div className="introduce">
                        {/*<div></div>*/}
                        <Link href="/about">
                            <a>公司介绍</a>
                        </Link>
                        <div className="relation">联系我们</div>
                    </div>
                    <div className="introduce">
                        <Link href="/product">
                            <a>产品中心</a>
                        </Link>
                        <div>0591-88888888</div>
                    </div>
                    <div className="introduce edge">
                        <Link href="/join">
                            <a>加入我们</a>
                        </Link>
                        <div>福建省福州市仓山区山亚大厦B座</div>
                    </div>
                    <div className="introduce friendship">
                        <a/>
                        <a target="_blank" href="https://www.zzha.vip/index.html#/home">中战华安</a>
                    </div>
                    <div className="introduce friendship">
                        <a/>
                        <div>电子商务公司</div>
                    </div>
                </div>
                <div className="copyright">
                    <img onClick={this.handleScrollTop} src="/up.png" alt=""/>
                    <span>版权所有 © 2019 zzjs. 福州中战科技网络有限公司</span>
                </div>
            </footer>
        )
    }
}

export default Footer;
