package com.bee.common.excel.annotation;


import com.bee.common.excel.core.CellMergeStrategy;

import java.lang.annotation.*;

/**
 * excel 列单元格合并(合并列相同项)
 * <p>
 * 需搭配 {@link CellMergeStrategy} 策略使用
 */
@Target(ElementType.FIELD)
@Retention(RetentionPolicy.RUNTIME)
@Inherited
public @interface CellMerge {

    /**
     * col index
     */
    int index() default -1;

}