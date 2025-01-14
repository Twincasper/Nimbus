package com.nimbus.backend.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
public class UserResponseDTO {
    private Integer id;
    private String username;

    public UserResponseDTO() {} // could use NoArgsConstructor from Lombok too
}
