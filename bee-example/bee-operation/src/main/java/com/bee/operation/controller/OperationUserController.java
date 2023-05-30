package com.bee.operation.controller;

import cn.dev33.satoken.annotation.SaCheckPermission;
import com.bee.common.core.domain.R;
import com.bee.common.core.validate.AddGroup;
import com.bee.common.core.validate.EditGroup;
import com.bee.common.core.web.controller.BaseController;
import com.bee.common.excel.utils.ExcelUtil;
import com.bee.common.log.annotation.Log;
import com.bee.common.log.enums.BusinessType;
import com.bee.common.mybatis.core.page.PageQuery;
import com.bee.common.mybatis.core.page.TableDataInfo;
import com.bee.operation.domain.bo.OperationUserBo;
import com.bee.operation.domain.vo.OperationUserVo;
import com.bee.operation.service.IOperationUserService;
import lombok.RequiredArgsConstructor;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletResponse;
import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;
import java.util.Arrays;
import java.util.List;

/**
 * 会员信息控制器
 * 前端访问路由地址为:/operation/user
 *
 * @author chenweigen
 * @date 2023-05-27
 */
@Validated
@RequiredArgsConstructor
@RestController
@RequestMapping("/user")
public class OperationUserController extends BaseController {

    private final IOperationUserService iOperationUserService;

    /**
     * 查询会员信息列表
     */
    @SaCheckPermission("operation:user:list")
    @GetMapping("/list")
    public TableDataInfo<OperationUserVo> list(OperationUserBo bo, PageQuery pageQuery) {
        return iOperationUserService.queryPageList(bo, pageQuery);
    }

    /**
     * 导出会员信息列表
     */
    @SaCheckPermission("operation:user:export")
    @Log(title = "会员信息", businessType = BusinessType.EXPORT)
    @PostMapping("/export")
    public void export(OperationUserBo bo, HttpServletResponse response) {
        List<OperationUserVo> list = iOperationUserService.queryList(bo);
        ExcelUtil.exportExcel(list, "会员信息", OperationUserVo.class, response);
    }

    /**
     * 获取会员信息详细信息
     *
     * @param userId 主键
     */
    @SaCheckPermission("operation:user:query")
    @GetMapping("/{userId}")
    public R<OperationUserVo> getInfo(@NotNull(message = "主键不能为空") @PathVariable Long userId) {
        return R.ok(iOperationUserService.queryById(userId));
    }

    /**
     * 新增会员信息
     */
    @SaCheckPermission("operation:user:add")
    @Log(title = "会员信息", businessType = BusinessType.INSERT)
    @PostMapping()
    public R<Void> add(@Validated(AddGroup.class) @RequestBody OperationUserBo bo) {
        return toAjax(iOperationUserService.insertByBo(bo));
    }

    /**
     * 修改会员信息
     */
    @SaCheckPermission("operation:user:edit")
    @Log(title = "会员信息", businessType = BusinessType.UPDATE)
    @PutMapping()
    public R<Void> edit(@Validated(EditGroup.class) @RequestBody OperationUserBo bo) {
        return toAjax(iOperationUserService.updateByBo(bo));
    }

    /**
     * 删除会员信息
     *
     * @param userIds 主键串
     */
    @SaCheckPermission("operation:user:remove")
    @Log(title = "会员信息", businessType = BusinessType.DELETE)
    @DeleteMapping("/{userIds}")
    public R<Void> remove(@NotEmpty(message = "主键不能为空") @PathVariable Long[] userIds) {
        return toAjax(iOperationUserService.deleteWithValidByIds(Arrays.asList(userIds), true));
    }
}
