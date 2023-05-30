package com.bee.common.translation.core.impl;

import com.bee.common.core.service.DictService;
import com.bee.common.core.utils.StringUtils;
import com.bee.common.translation.annotation.TranslationType;
import com.bee.common.translation.constant.TransConstant;
import com.bee.common.translation.core.TranslationInterface;
import lombok.AllArgsConstructor;

/**
 * 字典翻译实现
 *
 */
@AllArgsConstructor
@TranslationType(type = TransConstant.DICT_TYPE_TO_LABEL)
public class DictTypeTranslationImpl implements TranslationInterface<String> {

    private final DictService dictService;

    @Override
    public String translation(Object key, String other) {
        if (key instanceof String && StringUtils.isNotBlank(other)) {
            return dictService.getDictLabel(other, key.toString());
        }
        return null;
    }
}
