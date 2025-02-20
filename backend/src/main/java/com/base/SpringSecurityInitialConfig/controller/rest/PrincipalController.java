package com.base.SpringSecurityInitialConfig.controller.rest;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class PrincipalController {
    @GetMapping("/helloNotSecured")
    public String helloNotSecured(){
        return "Hello World Not Secured";
    }

    @GetMapping("/helloSecured")
    public String helloSecured(){
        return "Hello World Secured";
    }

}
