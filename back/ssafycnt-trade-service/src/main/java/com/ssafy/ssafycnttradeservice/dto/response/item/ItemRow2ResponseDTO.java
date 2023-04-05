package com.ssafy.ssafycnttradeservice.dto.response.item;

import com.ssafy.ssafycnttradeservice.constants.CdConstants;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;
import java.util.Map;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ItemRow2ResponseDTO {
    private String itemName;
    private String period;
    private Map<String, Object> expdlrChange;
    private Map<String, Object> exportTop;
    private Map<String, Object> importTop;

    public ItemRow2ResponseDTO(List<Map<String, Object>> list, String item, String startDate, String endDate) {
        this.itemName = CdConstants.HSCDS.get(item);
        this.period = startDate + " ~ " + endDate;
        expdlrChange = list.get(0);
        exportTop = list.get(1);
        importTop = list.get(2);
    }
}
