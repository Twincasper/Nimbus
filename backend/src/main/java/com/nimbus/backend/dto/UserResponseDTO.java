package com.nimbus.backend.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class UserResponseDTO {
    private Integer id;
    private String username;

    public UserResponseDTO() {} // could use NoArgsConstructor from Lombok too
}
