package com.bee.operation.service.impl;

import cn.hutool.core.bean.BeanUtil;
import com.baomidou.mybatisplus.core.conditions.query.LambdaQueryWrapper;
import com.baomidou.mybatisplus.core.toolkit.Wrappers;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.bee.common.core.utils.StringUtils;
import com.bee.common.mybatis.core.page.PageQuery;
import com.bee.common.mybatis.core.page.TableDataInfo;
import com.bee.operation.domain.OperationUser;
import com.bee.operation.domain.bo.OperationUserBo;
import com.bee.operation.domain.vo.OperationUserVo;
import com.bee.operation.mapper.OperationUserMapper;
import com.bee.operation.service.IOperationUserService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Collection;
import java.util.List;
import java.util.Map;

/**
 * 会员信息Service业务层处理
 *
 * @date 2023-05-27
 */
@RequiredArgsConstructor
@Service
public class OperationUserServiceImpl implements IOperationUserService {

    private final OperationUserMapper baseMapper;

    /**
     * 查询会员信息
     */
    @Override
    public OperationUserVo queryById(Long userId) {
        return baseMapper.selectVoById(userId);
    }

    /**
     * 查询会员信息列表
     */
    @Override
    public TableDataInfo<OperationUserVo> queryPageList(OperationUserBo bo, PageQuery pageQuery) {
        LambdaQueryWrapper<OperationUser> lqw = buildQueryWrapper(bo);
        Page<OperationUserVo> result = baseMapper.selectVoPage(pageQuery.build(), lqw);
        return TableDataInfo.build(result);
    }

    /**
     * 查询会员信息列表
     */
    @Override
    public List<OperationUserVo> queryList(OperationUserBo bo) {
        LambdaQueryWrapper<OperationUser> lqw = buildQueryWrapper(bo);
        return baseMapper.selectVoList(lqw);
    }

    private LambdaQueryWrapper<OperationUser> buildQueryWrapper(OperationUserBo bo) {
        Map<String, Object> params = bo.getParams();
        LambdaQueryWrapper<OperationUser> lqw = Wrappers.lambdaQuery();
        lqw.eq(StringUtils.isNotBlank(bo.getUserType()), OperationUser::getUserType, bo.getUserType());
        lqw.like(StringUtils.isNotBlank(bo.getUserName()), OperationUser::getUserName, bo.getUserName());
        lqw.like(StringUtils.isNotBlank(bo.getNickName()), OperationUser::getNickName, bo.getNickName());
        lqw.like(StringUtils.isNotBlank(bo.getRealName()), OperationUser::getRealName, bo.getRealName());
        lqw.eq(StringUtils.isNotBlank(bo.getSex()), OperationUser::getSex, bo.getSex());
        lqw.eq(StringUtils.isNotBlank(bo.getAvatar()), OperationUser::getAvatar, bo.getAvatar());
        lqw.eq(StringUtils.isNotBlank(bo.getPassword()), OperationUser::getPassword, bo.getPassword());
        lqw.eq(StringUtils.isNotBlank(bo.getPhoneNumber()), OperationUser::getPhoneNumber, bo.getPhoneNumber());
        lqw.eq(StringUtils.isNotBlank(bo.getEmail()), OperationUser::getEmail, bo.getEmail());
        lqw.eq(StringUtils.isNotBlank(bo.getAddress()), OperationUser::getAddress, bo.getAddress());
        lqw.eq(StringUtils.isNotBlank(bo.getStatus()), OperationUser::getStatus, bo.getStatus());
        lqw.eq(StringUtils.isNotBlank(bo.getLoginIp()), OperationUser::getLoginIp, bo.getLoginIp());
        lqw.eq(bo.getLoginDate() != null, OperationUser::getLoginDate, bo.getLoginDate());
        return lqw;
    }

    /**
     * 新增会员信息
     */
    @Override
    public Boolean insertByBo(OperationUserBo bo) {
        OperationUser add = BeanUtil.toBean(bo, OperationUser.class);
        validEntityBeforeSave(add);
        boolean flag = baseMapper.insert(add) > 0;
        if (flag) {
            bo.setUserId(add.getUserId());
        }
        return flag;
    }

    /**
     * 修改会员信息
     */
    @Override
    public Boolean updateByBo(OperationUserBo bo) {
        OperationUser update = BeanUtil.toBean(bo, OperationUser.class);
        validEntityBeforeSave(update);
        return baseMapper.updateById(update) > 0;
    }

    /**
     * 保存前的数据校验
     */
    private void validEntityBeforeSave(OperationUser entity) {
        //TODO 做一些数据校验,如唯一约束
    }

    /**
     * 批量删除会员信息
     */
    @Override
    public Boolean deleteWithValidByIds(Collection<Long> ids, Boolean isValid) {
        if (isValid) {
            //TODO 做一些业务上的校验,判断是否需要校验
        }
        return baseMapper.deleteBatchIds(ids) > 0;
    }
}
