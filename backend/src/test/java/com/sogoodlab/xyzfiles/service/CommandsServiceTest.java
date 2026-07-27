package com.sogoodlab.xyzfiles.service;

import org.junit.jupiter.api.Test;

import java.util.List;

public class CommandsServiceTest {

    private CommandsService service = new CommandsService();

    @Test
    void runCommandTest(){
        service.runCommand(List.of("echo", "test"));
    }

}
