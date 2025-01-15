package com.nimbus.backend.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class CreateUserDTO {
    private String username;
    private String password;

    public CreateUserDTO() {
    }

    public CreateUserDTO(String username, String password) {
        this.username = username;
        this.password = password;
    }
}