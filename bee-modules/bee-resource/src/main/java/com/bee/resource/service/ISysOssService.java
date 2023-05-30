package com.bee.resource.service;

import com.bee.common.mybatis.core.page.PageQuery;
import com.bee.common.mybatis.core.page.TableDataInfo;
import com.bee.resource.domain.bo.SysOssBo;
import com.bee.resource.domain.vo.SysOssVo;
import org.springframework.web.multipart.MultipartFile;

import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.Collection;
import java.util.List;

/**
 * 文件上传 服务层
 *
 */
public interface ISysOssService {

    TableDataInfo<SysOssVo> queryPageList(SysOssBo sysOss, PageQuery pageQuery);

    List<SysOssVo> listByIds(Collection<Long> ossIds);

    String selectUrlByIds(String ossIds);

    SysOssVo getById(Long ossId);

    SysOssVo upload(MultipartFile file);

    Boolean insertByBo(SysOssBo bo);

    void download(Long ossId, HttpServletResponse response) throws IOException;

    Boolean deleteWithValidByIds(Collection<Long> ids, Boolean isValid);
}
