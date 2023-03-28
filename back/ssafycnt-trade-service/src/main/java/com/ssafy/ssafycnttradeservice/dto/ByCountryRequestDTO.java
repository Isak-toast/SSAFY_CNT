package com.ssafy.ssafycnttradeservice.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ByCountryRequestDTO {
    private String statCd;
    private String startDate;
    private String endDate;
}
