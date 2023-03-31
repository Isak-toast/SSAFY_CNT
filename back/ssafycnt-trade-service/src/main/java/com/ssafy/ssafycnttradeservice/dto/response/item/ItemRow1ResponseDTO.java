package com.ssafy.ssafycnttradeservice.dto.response.item;

import com.ssafy.ssafycnttradeservice.constants.CdConstants;
import com.ssafy.ssafycnttradeservice.domain.Graph;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;
import java.util.Map;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ItemRow1ResponseDTO {
    private String period;
    private Map<String, Object> exportDetail;
    private Map<String, Object> importDetail;

    public ItemRow1ResponseDTO(List<Map<String, Object>> list, String startDate, String endDate) {
        this.period = startDate + " ~ " + endDate;
        this.exportDetail = list.get(0);
        this.importDetail = list.get(1);
    }
}
