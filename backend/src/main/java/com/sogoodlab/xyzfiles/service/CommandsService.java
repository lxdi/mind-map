package com.sogoodlab.xyzfiles.service;

import com.sogoodlab.xyzfiles.dto.FileUpdate;
import com.sogoodlab.xyzfiles.dto.state.BookmarkDto;
import com.sogoodlab.xyzfiles.dto.state.Commands;
import com.sogoodlab.xyzfiles.dto.state.StateDto;
import com.sogoodlab.xyzfiles.util.JsonUtil;
import com.sogoodlab.xyzfiles.util.TextExtensions;
import org.apache.commons.io.FileUtils;
import org.json.JSONArray;
import org.json.JSONObject;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import javax.swing.plaf.nimbus.State;
import java.io.*;
import java.nio.charset.StandardCharsets;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.*;
import java.util.stream.Collectors;

@Service
public class CommandsService {

    private Logger log = LoggerFactory.getLogger(CommandsService.class);

    @Value("${root.path}")
    private String rootPath;

    public void open(String path){
        log.info("Opening: " + path);
        runCommand(getCommand(path));
    }

    void runCommand(List<String> command) {
        try {
            log.info("Running command: {}", String.join(" ", command));
            ProcessBuilder processBuilder = new ProcessBuilder();
            processBuilder.command(command);
            printOutput(processBuilder.start());
        } catch (IOException e) {
            log.error("Error while opening command", e);
        }
    }

    void printOutput(Process process) throws IOException {

        BufferedReader reader = new BufferedReader(
                new InputStreamReader(process.getInputStream())
        );

        String line;
        StringBuilder output = new StringBuilder();
        while ((line = reader.readLine()) != null) {
            output.append(line).append("\n");
        }

        log.info("Result: {}", output);
    }

    public List<String> getCommand(String path){

        if (!path.startsWith("/")){
            path = rootPath + path;
        }

        List<String> res = getCommandByOs();
        res.add(path);
        return res;
    }

    private List<String> getCommandByOs() {

        List result = new ArrayList<String>();

        if(System.getProperty("os.name").toLowerCase().contains("windows")){
            result.add("explorer.exe");
            return result;
        }

        if(System.getProperty("os.name").toLowerCase().contains("mac")){
            result.add("open");
            return result;
        }

        result.add("mimeopen");
        result.add("-n");
        return result;
    }
}
