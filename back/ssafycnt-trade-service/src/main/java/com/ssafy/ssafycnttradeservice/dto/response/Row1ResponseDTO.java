package com.ssafy.ssafycnttradeservice.dto.response;

import com.ssafy.ssafycnttradeservice.constants.CdConstants;
import com.ssafy.ssafycnttradeservice.domain.Graph;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor 
public class Row1ResponseDTO {
//    nationName: "전세계",
//    period: "2022.03 ~ 2023.02",
//    expdlrSum: 13131692232,
//    impdlrSum: 6953342918,
//    balpaymentsLr: 6178349314,
//    expwgtSum: 9190234741,
//    impwgtSum: 8040220371,
//    balpaymentsWgt:	1150014370
    private String nationName;
    private String period;
    private Long expdlrSum;
    private Long impdlrSum;
    private Long balpaymentsDlr;
    private Long expwgtSum;
    private Long impwgtSum;
    private Long balpaymentsWgt;
    public Row1ResponseDTO(List<Graph> list, String statCd, String startDate, String endDate) {
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
