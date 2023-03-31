package com.ssafy.ssafycnttradeservice.dto.response.stat;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;
import java.util.Map;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class StatRow3ResponseDTO {
    private String period;
    private Map<String, Object> exportDetail;
    private Map<String, Object> importDetail;

    public StatRow3ResponseDTO(List<Map<String, Object>> list, String startDate, String endDate) {
        this.period = startDate + " ~ " + endDate;
        exportDetail = list.get(0);
        importDetail = list.get(1);
    }
}
