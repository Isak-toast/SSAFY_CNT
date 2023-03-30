package com.ssafy.ssafycnttradeservice.domain;

import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;

@Data
@AllArgsConstructor
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Graph implements Serializable {
    private String year;
    private String hscd;
    private Long expwgt;
    private Long expdlr;
    private Long impwgt;
    private Long impdlr;
    private Long balpayments;
    public Graph(Object[] o) {
        this.year = (String) o[0];
        this.hscd = (String) o[1];
        this.expwgt = Long.parseLong((String) o[2]);
        this.expdlr = Long.parseLong((String) o[3]);
        this.impwgt = Long.parseLong((String) o[4]);
        this.impdlr = Long.parseLong((String) o[5]);
        this.balpayments = Long.parseLong((String) o[6]);
    }
}
