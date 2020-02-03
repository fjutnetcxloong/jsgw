import React from "react";
import {Pagination} from 'antd';


class Paging extends React.PureComponent {

    state = {
        whichPage: '1'
    }

    //切换页码
    pageChange = (page, pagesize) => {
        console.log(page, pagesize);
        const {port} = this.props;
        fetch(`http://localhost:8000/api/${port}`,{method:'POST',headers:{'Content-Type': 'application/json'},body: JSON.stringify({
                limit:pagesize,offset:0,page
            })}).then(res=>{
            res.json().then(res=>{
                if(res && res.status === 0){
                    this.setState({
                        whichPage: page
                    })
                    this.props.pageChange(res.data)
                }
            })
        });
    }
    render() {
        const {total} = this.props;
        const {whichPage} = this.state;
        return (

                <div className="sorter distance">
                    {/*分页器*/}
                    <div className="present">当前第{whichPage}页</div>
                    <Pagination
                        showSizeChanger
                        showQuickJumper
                        total={total}
                        onChange={(page, pagesize) => this.pageChange(page, pagesize)}
                        onShowSizeChange={(page, pagesize) => this.pageChange(page, pagesize)}
                    />
                    <div className="total">{total}<span>条数据</span></div>
                </div>

        )
    }
}

export default Paging;
