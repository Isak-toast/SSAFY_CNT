package com.ssafy.ssafycnttradeservice.dto.response;

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
public class Row2ResponseDTO {
    private String nationName;
    private String period;
    private Map<String, Object> expdlrChange;
    private Map<String, Object> exportTop;
    private Map<String, Object> importTop;

    public Row2ResponseDTO(List<Map<String, Object>> list, String statCd, String startDate, String endDate) {
        this.nationName = CdConstants.STATCDS.get(statCd);
        this.period = startDate + " ~ " + endDate;
        expdlrChange = list.get(0);
        exportTop = list.get(1);
        importTop = list.get(2);
    }
}
