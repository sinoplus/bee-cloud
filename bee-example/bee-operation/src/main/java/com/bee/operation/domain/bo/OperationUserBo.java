package com.bee.operation.domain.bo;

import com.bee.common.core.validate.AddGroup;
import com.bee.common.core.validate.EditGroup;
import com.bee.common.core.web.domain.BaseEntity;
import lombok.Data;
import lombok.EqualsAndHashCode;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import java.util.Date;

/**
 * 会员信息业务对象
 *
 * @date 2023-05-27
 */

@Data
@EqualsAndHashCode(callSuper = true)
public class OperationUserBo extends BaseEntity {

    /**
     * 用户ID
     */
    @NotNull(message = "用户ID不能为空", groups = {EditGroup.class})
    private Long userId;

    /**
     * 用户类型（app_user客户端用户）
     */
    private String userType;

    /**
     * 用户账号
     */
    @NotBlank(message = "用户账号不能为空", groups = {AddGroup.class, EditGroup.class})
    private String userName;

    /**
     * 用户昵称
     */
    @NotBlank(message = "用户昵称不能为空", groups = {AddGroup.class, EditGroup.class})
    private String nickName;

    /**
     * 真实姓名
     */
    @NotBlank(message = "真实姓名不能为空", groups = {AddGroup.class, EditGroup.class})
    private String realName;

    /**
     * 用户性别（0男 1女 2未知）
     */
    @NotBlank(message = "用户性别（0男 1女 2未知）不能为空", groups = {AddGroup.class, EditGroup.class})
    private String sex;

    /**
     * 头像地址
     */
    @NotBlank(message = "头像地址不能为空", groups = {AddGroup.class, EditGroup.class})
    private String avatar;

    /**
     * 密码
     */
    @NotBlank(message = "密码不能为空", groups = {AddGroup.class, EditGroup.class})
    private String password;

    /**
     * 手机号
     */
    @NotBlank(message = "手机号不能为空", groups = {AddGroup.class, EditGroup.class})
    private String phoneNumber;

    /**
     * 用户邮箱
     */
    @NotBlank(message = "用户邮箱不能为空", groups = {AddGroup.class, EditGroup.class})
    private String email;

    /**
     * 地址
     */
    @NotBlank(message = "地址不能为空", groups = {AddGroup.class, EditGroup.class})
    private String address;

    /**
     * 帐号状态（0正常 1停用）
     */
    @NotBlank(message = "帐号状态（0正常 1停用）不能为空", groups = {AddGroup.class, EditGroup.class})
    private String status;

    /**
     * 最后登录IP
     */
    private String loginIp;

    /**
     * 最后登录时间
     */
    private Date loginDate;

    /**
     * 备注
     */
    private String remark;


}
