-- ----------------------------
-- 初始化-菜单信息表数据
-- ----------------------------
-- 一级菜单
insert into sys_menu
values ('4', '运营管理', '0', '1', 'operation', null, '', 1, 0, 'M', '0', '0', '', 'peoples', 'admin', sysdate(), '', null,
        '运营管理目录');

-- 菜单 SQL
insert into sys_menu (menu_id, menu_name, parent_id, order_num, path, component, is_frame, is_cache, menu_type, visible, status, perms, icon, create_by, create_time, update_by, update_time, remark)
values(1662476056591290368, '会员信息', '4', '1', 'user', 'operation/user/index', 1, 0, 'C', '0', '0', 'operation:user:list', 'user', 'admin', sysdate(), '', null, '会员信息菜单');

-- 按钮 SQL
insert into sys_menu (menu_id, menu_name, parent_id, order_num, path, component, is_frame, is_cache, menu_type, visible, status, perms, icon, create_by, create_time, update_by, update_time, remark)
values(1662476056591290369, '会员信息查询', 1662476056591290368, '1',  '#', '', 1, 0, 'F', '0', '0', 'operation:user:query',        '#', 'admin', sysdate(), '', null, '');

insert into sys_menu (menu_id, menu_name, parent_id, order_num, path, component, is_frame, is_cache, menu_type, visible, status, perms, icon, create_by, create_time, update_by, update_time, remark)
values(1662476056591290370, '会员信息新增', 1662476056591290368, '2',  '#', '', 1, 0, 'F', '0', '0', 'operation:user:add',          '#', 'admin', sysdate(), '', null, '');

insert into sys_menu (menu_id, menu_name, parent_id, order_num, path, component, is_frame, is_cache, menu_type, visible, status, perms, icon, create_by, create_time, update_by, update_time, remark)
values(1662476056591290371, '会员信息修改', 1662476056591290368, '3',  '#', '', 1, 0, 'F', '0', '0', 'operation:user:edit',         '#', 'admin', sysdate(), '', null, '');

insert into sys_menu (menu_id, menu_name, parent_id, order_num, path, component, is_frame, is_cache, menu_type, visible, status, perms, icon, create_by, create_time, update_by, update_time, remark)
values(1662476056591290372, '会员信息删除', 1662476056591290368, '4',  '#', '', 1, 0, 'F', '0', '0', 'operation:user:remove',       '#', 'admin', sysdate(), '', null, '');

insert into sys_menu (menu_id, menu_name, parent_id, order_num, path, component, is_frame, is_cache, menu_type, visible, status, perms, icon, create_by, create_time, update_by, update_time, remark)
values(1662476056591290373, '会员信息导出', 1662476056591290368, '5',  '#', '', 1, 0, 'F', '0', '0', 'operation:user:export',       '#', 'admin', sysdate(), '', null, '');

-- ----------------------------
-- 会员信息表
-- ----------------------------
drop table if exists operation_user;
create table operation_user
(
    user_id      bigint(20)   not null comment '用户ID',
    user_type    varchar(10)  default 'app_user' comment '用户类型（app_user客户端用户）',
    user_name    varchar(30)  not null comment '用户账号',
    nick_name    varchar(30)  not null comment '用户昵称',
    real_name    varchar(30)  not null comment '真实姓名',
    sex          char(1)      default '0' comment '用户性别（0男 1女 2未知）',
    avatar       varchar(100) default '' comment '头像地址',
    password     varchar(100) default '' comment '密码',
    phone_number varchar(50)  not null comment '手机号',
    email        varchar(50)  default '' comment '用户邮箱',
    address      varchar(150) not null comment '地址',
    status       char(1)      default '0' comment '帐号状态（0正常 1停用）',
    del_flag     char(1)      default '0' comment '删除标志（0代表存在 2代表删除）',
    login_ip     varchar(128) default '' comment '最后登录IP',
    login_date   datetime comment '最后登录时间',
    create_by    varchar(64)           default '' comment '创建者',
    create_time  datetime comment '创建时间',
    update_by    varchar(64)           default '' comment '更新者',
    update_time  datetime comment '更新时间',
    remark       varchar(500)          default null comment '备注',
    primary key  (user_id)
) engine = innodb comment = '会员信息表';

-- ----------------------------
-- 种类信息表
-- ----------------------------
drop table if exists operation_category;
create table operation_category
(
    category_id   bigint(20)   not null comment '种类ID',
    category_code varchar(30)  not null comment '种类编码',
    category_name varchar(30)  not null comment '种类名称',
    pid           bigint(20)   comment '父级种类ID',
    create_by    varchar(64)   default '' comment '创建者',
    create_time  datetime comment '创建时间',
    update_by    varchar(64)   default '' comment '更新者',
    update_time  datetime comment '更新时间',
    remark       varchar(500)  default null comment '备注',
    primary key (category_id)
) engine = innodb comment = '种类信息表';
