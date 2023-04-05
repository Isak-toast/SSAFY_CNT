package com.ssafy.ssafycnttradeservice.dto.response.stat;

import com.ssafy.ssafycnttradeservice.constants.CdConstants;
import com.ssafy.ssafycnttradeservice.domain.Graph;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor 
public class StatRow1ResponseDTO {
    private String nationName;
    private String period;
    private Long expdlrSum;
    private Long impdlrSum;
    private Long balpaymentsDlr;
    private Long expwgtSum;
    private Long impwgtSum;
    private Long balpaymentsWgt;
    public StatRow1ResponseDTO(List<Graph> list, String statCd, String startDate, String endDate) {
        this.nationName = CdConstants.STATCDS.get(statCd);
        this.period = startDate + " ~ " + endDate;
        this.expdlrSum = 0L; this.impdlrSum = 0L; this.balpaymentsDlr = 0L;
        this.expwgtSum = 0L; this.impwgtSum = 0L; this.balpaymentsWgt = 0L;
        for(int i=0;i<list.size();i++) {
            this.expdlrSum += list.get(i).getExpdlr();
            this.impdlrSum += list.get(i).getImpdlr();
            this.balpaymentsDlr += list.get(i).getBalpayments();
            this.expwgtSum += list.get(i).getExpwgt();
            this.impwgtSum += list.get(i).getImpwgt();
            this.balpaymentsWgt += list.get(i).getExpwgt()-list.get(i).getImpwgt();
        }
    }
}
