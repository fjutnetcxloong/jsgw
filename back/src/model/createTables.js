// 生成表
const Sequelize = require('sequelize');
const db = require('../db/db')
const Users = db.defineModel('gw_users', {
    id: {
        type: Sequelize.INTEGER(11),
        primaryKey: true,
        allowNull: false,
        autoIncrement: true
    },
    account: {
        type: Sequelize.STRING(50),
        unique: 'column'
    },
    password: Sequelize.STRING(50),
    identity_id: Sequelize.BOOLEAN(4),
    status: Sequelize.BOOLEAN(4)
})


// const Roles = db.defineModel('gw_role', {
//     role_id: {
//         type: Sequelize.INTEGER(11),
//         primaryKey: true,
//         allowNull: false,
//         autoIncrement: true
//     },
//     department: Sequelize.STRING(30),

// })

//账户表
const Account = db.defineModel('gw_account', {
    id: {
        type: Sequelize.INTEGER(11),
        primaryKey: true,
        allowNull: false,
        autoIncrement: true
    },
    //账号
    account: {
        type: Sequelize.STRING(50),
        allowNull: false,
    },
    //密码
    password: {
        type: Sequelize.STRING(50),

    },
    //身份id,对应identity表的主键
    identity_id: {
        type: Sequelize.INTEGER(11),
    },
    account_status: {
        type: Sequelize.STRING(1),
        defaultValue: "1"
    }
});

//身份表
const Identity = db.defineModel('gw_identity', {
    id: {
        type: Sequelize.INTEGER(11),
        primaryKey: true,
        allowNull: false,
        autoIncrement: true
    },
    //身份：超级管理员，普通管理员，普通员工
    identity: {
        type: Sequelize.STRING(50)
    }
})
// .bulkCreate([{id: 1,identity: '超级管理员'}, {id: 2,identity: '管理员'}, {id: 3,identity: '员工'}], [{updateOnDuplicate:true}])

//部门表
const Department = db.defineModel('gw_department', {
    id: {
        type: Sequelize.INTEGER(11),
        primaryKey: true,
        allowNull: false,
        autoIncrement: true
    },
    //部门：列：前端、后端、产品、行政......
    department: {
        type: Sequelize.STRING(50)
    },
    dep_status: {
        type: Sequelize.STRING(2),
        allowNull: false,
        defaultValue: '1'
    }
});
//职位分类
const Post_classify = db.defineModel('gw_post_classify', {
    id: {
        type: Sequelize.INTEGER(11),
        primaryKey: true,
        allowNull: false,
        autoIncrement: true
    },
    //分类：研发类.......
    classify: {
        type: Sequelize.STRING(50)
    },
    //排序
    sort: {
        type: Sequelize.INTEGER(11)
    },
    //状态：禁用0或启用1
    status: {
        type: Sequelize.STRING(1)
    }
});
//侧边栏一级导航表
const First_broad = db.defineModel('gw_first_broad', {
    id: {
        type: Sequelize.INTEGER(11),
        primaryKey: true,
        allowNull: false,
        autoIncrement: true
    },
    //一级导航名称：列：官网首页、关于我们、产品咨讯、公司交流、加入我们、员工管理......
    broad_name: {
        type: Sequelize.STRING(50)
    }
});
//侧边栏二级导航表
const Second_broad = db.defineModel('gw_second_broad', {
    id: {
        type: Sequelize.INTEGER(11),
        primaryKey: true,
        allowNull: false,
        autoIncrement: true
    },
    //二级导航名称：列：官网首页、关于我们、产品咨讯、公司交流、加入我们、员工管理......
    se_broad_name: {
        type: Sequelize.STRING(50)
    },
    //一级导航id
    first_id: {
        type: Sequelize.INTEGER(11)
    }
});
//员工表
const Employee = db.defineModel('gw_employee', {
    id: {
        type: Sequelize.INTEGER(11),
        primaryKey: true,
        allowNull: false,
        autoIncrement: true
    },
    //员工姓名
    name: {
        type: Sequelize.STRING(30),
        unique: 'column'
    },
    //联系电话
    phone: {
        type: Sequelize.STRING(11)
    },
    //状态：1使用中，0禁用中
    status: {
        type: Sequelize.STRING(1),
        defaultValue: '1'
    },
    active: {
        type: Sequelize.STRING(1),
        defaultValue: '0'
    },
    ident_id: Sequelize.STRING(3),
    //部门id,对应部门表department的主键
    dep_id: {
        type: Sequelize.INTEGER(11)
    },
    //职位id,对应职位表的主键
    // post_id: {
    //     type: Sequelize.INTEGER(11)
    // },
    //账号id,对应账号表account的主键
    account_id: {
        type: Sequelize.INTEGER(11),
        allowNull: true
    }
});
//职位表
const Post = db.defineModel('gw_post', {
    id: {
        type: Sequelize.INTEGER(11),
        primaryKey: true,
        allowNull: false,
        autoIncrement: true
    },
    //职位名称(通过此字段和职位表关联)
    post_name: {
        type: Sequelize.STRING(50)
    },
    //部门id（职位分类,对应部门表的主键）
    dep_id: {
        type: Sequelize.INTEGER(11)
    },
    //职位分类id (对应职位分类表的主键)
    sort_id: {
        type: Sequelize.INTEGER(11)
    },
    //转态  1.启用  2.禁用
    use_status: {
        type: Sequelize.STRING(1)
    }
})
//地址表（市）
const city = db.defineModel('gw_city', {
    id: {
        type: Sequelize.INTEGER(11),
        primaryKey: true,
        allowNull: false,
        autoIncrement: true
    },
    //市
    city: {
        type: Sequelize.STRING(30)
    }
})
//省市
const PcatBak = db.defineModel('gw_pcat_bak', {
    id: {
        type: Sequelize.INTEGER(11),
        primaryKey: true,
        allowNull: false,
        autoIncrement: true
    },
    code: {
        type: Sequelize.STRING(20)
    },
    parentId: {
        type: Sequelize.STRING(20)
    },
    //名称
    name: {
        type: Sequelize.STRING(50)
    },
    //等级
    level: {
        type: Sequelize.STRING(5)
    }
})

//招聘信息表（加入我们）
const Invite = db.defineModel('gw_invite_info', {
    id: {
        type: Sequelize.INTEGER(11),
        primaryKey: true,
        allowNull: false,
        autoIncrement: true
    },
    //职位名称(通过此字段和职位表关联)
    post_name: {
        type: Sequelize.STRING(50)
    },
    // //所在地id (省级，对应城市表的id)
    // province_id: {
    //     type: Sequelize.STRING(255)
    // },
    // //所在地id (市，对应城市表的id)
    // city_id: {
    //     type: Sequelize.STRING(30)
    // },
    // //所在地id (县级，对应城市表的id)
    // county_id: {
    //     type: Sequelize.STRING(30)
    // },
    //地址的完整名称
    address_name: {
        type: Sequelize.STRING(30)
    },
    //详细地址
    detail_address: {
        type: Sequelize.STRING(255)
    },
    //薪资
    salary: {
        type: Sequelize.INTEGER(11)
    },
    //工作职责
    work_content: {
        type: Sequelize.TEXT
    },
    //任职要求
    post_job: {
        type: Sequelize.TEXT
    },
    //招聘人数
    require_num: {
        type: Sequelize.INTEGER(11)
    },
    //发布开始时间
    start_time: {
        type: Sequelize.BIGINT(200)
    },
    //联系电话
    phone: {
        type: Sequelize.STRING(30)
    },
    //邮箱
    email: {
        type: Sequelize.STRING(50)
    },
    //职位类型
    job_class: {
        type: Sequelize.STRING(10)
    },
    //是否启用类型  0 未启用 1启用
    enable: {
        type: Sequelize.STRING(1)
    },
    //排序
    sort: {
        type: Sequelize.STRING(11)
    }
})

//招聘地区管理
const Adress = db.defineModel('gw_adress',{
    id:{
        type: Sequelize.INTEGER(11),
        primaryKey: true,
        allowNull: false,
        autoIncrement: true
    },
    //排序
    name: {
        type: Sequelize.STRING(2000)
    },
    //是否启用类型  0 未启用 1启用
    enable: {
        type: Sequelize.STRING(1)
    },
    //排序
    sort: {
        type: Sequelize.INTEGER(11)
    }
})
//产品表
const Product = db.defineModel('gw_product', {
    id: {
        type: Sequelize.INTEGER(11),
        primaryKey: true,
        allowNull: false,
        autoIncrement: true
    },
    //编号
    serial_number: {
        type: Sequelize.STRING(16),
    },
    //产品名称
    pro_name: {
        type: Sequelize.STRING(50)
    },
    //简介
    product_desc: {
        type: Sequelize.STRING(255)
    },
    //logo
    logo: {
        type: Sequelize.STRING(128)
    },
    //安卓下载地址
    android_link: {
        type: Sequelize.STRING(128)
    },
    //ios下载地址
    ios_link: {
        type: Sequelize.STRING(128)
    },
    //下载二维码
    link_code: {
        type: Sequelize.STRING(128)
    },
    //是否启用
    status: {
        type: Sequelize.STRING(1),
        defaultValue: '0'
    },
})

// 公司级简介
const Intro = db.defineModel('gw_intro', {
    id: {
        type: Sequelize.INTEGER(11),
        primaryKey: true,
        allowNull: false,
        autoIncrement: true
    },
    content: Sequelize.TEXT
})

// 咨询中心
const Information = db.defineModel('gw_information', {
    id: {
        type: Sequelize.INTEGER(11),
        primaryKey: true,
        allowNull: false,
        autoIncrement: true,
        unique: 'column'
    },
    info_title: Sequelize.STRING(30),
    info_content: Sequelize.TEXT,
    // 是否删除
    del_status: {
        type: Sequelize.STRING(1),
        defaultValue: "1"
    },
    // 是否隐藏
    show_status: {
        type: Sequelize.STRING(1),
        defaultValue: "1"
    },
    createdAt: {
        type: Sequelize.BIGINT(200),
        defaultValue: Date.now()
    },
    updatedAt: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW
    }
}, {
    timestamps: true,
})

const Events = db.defineModel('gw_events', {
    id: {
        type: Sequelize.INTEGER(11),
        primaryKey: true,
        allowNull: false,
        autoIncrement: true,
        unique: 'column'
    },
    time: Sequelize.STRING(30),
    event_title: Sequelize.STRING(50),
    event_content: Sequelize.TEXT,
    createdAt: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW
    },
    updatedAt: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW
    }
}, {
    timestamps: true,
})

//轮播图表
const Carousel = db.defineModel('gw_carousel', {
    id: {
        type: Sequelize.INTEGER(11),
        primaryKey: true,
        allowNull: false,
        autoIncrement: true
    },
    //序号
    serial_number: {
        type: Sequelize.INTEGER(11),
        allowNull: true
    },
    //图片地址
    pic_address: {
        type: Sequelize.STRING(128)
    },
    //跳转地址
    link: {
        type: Sequelize.STRING(128),
        allowNull: true
    },
    //轮播时间
    carousel_timer: {
        type: Sequelize.INTEGER(11),
        defaultValue: 3
    }
})

//首页模块展示表
const IndexModule = db.defineModel('gw_index_module', {
    id: {
        type: Sequelize.INTEGER(11),
        primaryKey: true,
        allowNull: false,
        autoIncrement: true
    },
    //模块名称
    module_name: {
        type: Sequelize.STRING(128),
        allowNull: false
    },
    //序号
    module_number: {
        type: Sequelize.STRING(128),
        allowNull: false
    },
    //状态
    status: {
        type: Sequelize.BOOLEAN,
        allowNull: false
    }
})

//公司交流表
const communicate = db.defineModel('gw_communicate', {
    id: {
        type: Sequelize.INTEGER(11),
        primaryKey: true,
        allowNull: false,
        autoIncrement: true
    },
    //标题
    title: {
        type: Sequelize.STRING(1234)
    },
    //详情
    describe: {
        type: Sequelize.TEXT
    },
    //转态  0 隐藏  1 显示
    status: {
        type: Sequelize.STRING(1)
    },
    //发布时间
    create_time: {
        type: Sequelize.BIGINT(200)
    },
    //是否已读
    is_read: {
        type:Sequelize.BOOLEAN,
        defaultValue: 0
    }
})

//公司表
const Company = db.defineModel('gw_company', {
    id: {
        type: Sequelize.INTEGER(11),
        primaryKey: true,
        allowNull: false,
        autoIncrement: true
    },
    //公司名称
    comp_name: {
        type: Sequelize.STRING(50)
    },
    //公司简介
    intro: {
        type: Sequelize.TEXT
    },
    //电话（联系方式）
    link_phone: {
        type: Sequelize.STRING(30)
    },
    //联系地址
    address: {
        type: Sequelize.STRING(255)
    },
    //图片地址
    pic_rul: {
        type: Sequelize.STRING(255)
    }
})

//主要联络方式表
const mainConcat = db.defineModel('gw_main_concat', {
    id: {
        type: Sequelize.INTEGER(11),
        primaryKey: true,
        allowNull: false,
        autoIncrement: true
    },
    //公司id,对应公司表的主键
    comp_id: {
        type: Sequelize.INTEGER(11),
    },
    //页面名称
    page_name: {
        type: Sequelize.STRING(255)
    },
    // 跳转链接
    page_link: {
        type: Sequelize.STRING(255)
    }
})

//友情链接表
const friendConcat = db.defineModel('gw_friend_concat', {
    id: {
        type: Sequelize.INTEGER(11),
        primaryKey: true,
        allowNull: false,
        autoIncrement: true
    },
    //公司id,对应公司表的主键
    comp_id: {
        type: Sequelize.INTEGER(11),
    },
    //友情页面
    friend_page: {
        type: Sequelize.STRING(255)
    },
    //友情链接
    friend_link: {
        type: Sequelize.STRING(255)
    }
})
// 部门交流
const Exchange = db.defineModel('gw_exchange', {
    id: {
        type: Sequelize.INTEGER(11),
        primaryKey: true,
        allowNull: false,
        autoIncrement: true,
        unique: 'column'
    },
    exchange_content: Sequelize.TEXT,
    exchange_title: Sequelize.STRING(50),
    exchange_pic: {
        type: Sequelize.STRING(255)
    },
    create_time: {
        type: Sequelize.BIGINT(200),
        defaultValue: Date.now()
    },
    department_id: Sequelize.STRING(11),
    username: Sequelize.STRING(30),
    exchange_count: {
        type: Sequelize.BIGINT,
        defaultValue: 0
    },
    is_read: {
        type: Sequelize.BOOLEAN,
        defaultValue: 0
    }
})

// 交流评价
const Evaluate = db.defineModel('gw_evaluate', {
    id: {
        type: Sequelize.INTEGER(11),
        primaryKey: true,
        allowNull: false,
        autoIncrement: true,
        unique: 'column'
    },
    evaluate_content: Sequelize.TEXT,
    evaluate_name: Sequelize.STRING(50),
    exchange_id: Sequelize.STRING(255),
})

module.exports = {
    Users,
    Department,
    First_broad,
    Second_broad,
    Employee,
    Identity,
    Account,
    Post,
    Invite,
    Adress,
    Company,
    Product,
    Post_classify,
    city,
    PcatBak,
    Intro,
    Information,
    Events,
    Carousel,
    IndexModule,
    communicate,
    mainConcat,
    friendConcat,
    Exchange,
    Evaluate
    // Roles
}
