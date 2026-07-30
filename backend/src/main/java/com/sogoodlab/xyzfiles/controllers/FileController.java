package com.sogoodlab.xyzfiles.controllers;

import com.sogoodlab.xyzfiles.service.CommandsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping(path="/file")
public class FileController {


    @Autowired
    private CommandsService commandsService;

    @PostMapping("/open")
    public void openFile(@RequestParam("path") String path) {
        commandsService.open(path);
    }
}
