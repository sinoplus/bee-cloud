package com.bee.operation.service;

import com.bee.common.mybatis.core.page.PageQuery;
import com.bee.common.mybatis.core.page.TableDataInfo;
import com.bee.operation.domain.bo.OperationUserBo;
import com.bee.operation.domain.vo.OperationUserVo;

import java.util.Collection;
import java.util.List;

/**
 * 会员信息Service接口
 *
 * @author chenweigen
 * @date 2023-05-27
 */
public interface IOperationUserService {

    /**
     * 查询会员信息
     */
    OperationUserVo queryById(Long userId);

    /**
     * 查询会员信息列表
     */
    TableDataInfo<OperationUserVo> queryPageList(OperationUserBo bo, PageQuery pageQuery);

    /**
     * 查询会员信息列表
     */
    List<OperationUserVo> queryList(OperationUserBo bo);

    /**
     * 修改会员信息
     */
    Boolean insertByBo(OperationUserBo bo);

    /**
     * 修改会员信息
     */
    Boolean updateByBo(OperationUserBo bo);

    /**
     * 校验并批量删除会员信息信息
     */
    Boolean deleteWithValidByIds(Collection<Long> ids, Boolean isValid);
}
