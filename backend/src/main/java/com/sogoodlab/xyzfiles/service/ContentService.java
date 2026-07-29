package com.sogoodlab.xyzfiles.service;

import com.sogoodlab.xyzfiles.controllers.ContentController;
import jakarta.servlet.http.HttpServletRequest;
import org.apache.commons.io.FileUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;

import java.io.ByteArrayInputStream;
import java.io.File;
import java.io.IOException;
import java.io.InputStream;
import java.nio.charset.StandardCharsets;

@Service
public class ContentService {

    Logger log = LoggerFactory.getLogger(ContentController.class);

    public static String DEFAULT_INIT_PATH = "/default/init.json";

    @Value("${root.path}")
    private String rootPath;

    public String getContent(String path) throws IOException {
        log.info("Path: {}", path);

        if (path == null || path.isEmpty()) {
            return new String(this.getClass().getResourceAsStream(DEFAULT_INIT_PATH).readAllBytes(), StandardCharsets.UTF_8);
        }

        File contentFile = new File(rootPath + path);

        if(contentFile.exists()){
            return FileUtils.readFileToString(contentFile, StandardCharsets.UTF_8);
        }

        log.warn(String.format("Didn't find a file in %s; creating new from default", contentFile));

        try (InputStream is = this.getClass().getResourceAsStream(DEFAULT_INIT_PATH)) {
            FileUtils.copyInputStreamToFile(is, contentFile);
        } catch (IOException e) {
            throw new RuntimeException(e);
        }

        return FileUtils.readFileToString(contentFile, StandardCharsets.UTF_8);
    }

    public void updateContent(String path, String content) throws IOException {

        if (path == null || path.isEmpty()) {
            log.warn("Path is null -> content was not updated");
            return;
        }

        File contentFile = new File(rootPath + path);

        try (InputStream is = new ByteArrayInputStream(content.getBytes(StandardCharsets.UTF_8))) {
            FileUtils.copyInputStreamToFile(is, contentFile);
        } catch (IOException e) {
            throw new RuntimeException(e);
        }
    }
}
