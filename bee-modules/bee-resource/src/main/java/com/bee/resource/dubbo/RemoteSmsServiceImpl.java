package com.bee.resource.dubbo;

import cn.hutool.core.bean.BeanUtil;
import com.bee.common.core.exception.ServiceException;
import com.bee.common.core.utils.SpringUtils;
import com.bee.common.sms.config.properties.SmsProperties;
import com.bee.common.sms.core.SmsTemplate;
import com.bee.common.sms.entity.SmsResult;
import com.bee.resource.api.RemoteSmsService;
import com.bee.resource.api.domain.SysSms;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.apache.dubbo.config.annotation.DubboService;
import org.springframework.stereotype.Service;

import java.util.Map;

/**
 * 短信服务
 *
 */
@Slf4j
@RequiredArgsConstructor
@Service
@DubboService
public class RemoteSmsServiceImpl implements RemoteSmsService {

    private final SmsProperties smsProperties;

    /**
     * 发送短信
     *
     * @param phones     电话号(多个逗号分割)
     * @param templateId 模板id
     * @param param      模板对应参数
     */
    public SysSms send(String phones, String templateId, Map<String, String> param) throws ServiceException {
        if (!smsProperties.getEnabled()) {
            throw new ServiceException("当前系统没有开启短信功能！");
        }
        SmsTemplate smsTemplate = SpringUtils.getBean(SmsTemplate.class);
        SmsResult smsResult = smsTemplate.send(phones, templateId, param);
        return BeanUtil.toBean(smsResult, SysSms.class);
    }

}
