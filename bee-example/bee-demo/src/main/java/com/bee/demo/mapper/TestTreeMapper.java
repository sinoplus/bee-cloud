package com.bee.demo.mapper;

import com.bee.common.mybatis.annotation.DataColumn;
import com.bee.common.mybatis.annotation.DataPermission;
import com.bee.common.mybatis.core.mapper.BaseMapperPlus;
import com.bee.demo.domain.TestTree;
import com.bee.demo.domain.vo.TestTreeVo;

/**
 * 测试树表Mapper接口
 *
 * @date 2021-07-26
 */
@DataPermission({
    @DataColumn(key = "deptName", value = "dept_id"),
    @DataColumn(key = "userName", value = "user_id")
})
public interface TestTreeMapper extends BaseMapperPlus<TestTreeMapper, TestTree, TestTreeVo> {

}
