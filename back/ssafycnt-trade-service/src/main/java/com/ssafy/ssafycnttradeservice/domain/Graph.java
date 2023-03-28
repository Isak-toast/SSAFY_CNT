package com.ssafy.ssafycnttradeservice.domain;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.Column;
import javax.persistence.EmbeddedId;
import javax.persistence.Entity;
import javax.persistence.Table;
import java.io.Serializable;

@Data
@AllArgsConstructor
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Graph implements Serializable {
    @JsonProperty("year")
    private String year;
    @JsonProperty("hscd")
    private String hscd;
    @JsonProperty("expwgt")
    private String expwgt;
    @JsonProperty("expdlr")
    private String expdlr;
    @JsonProperty("impwgt")
    private String impwgt;
    @JsonProperty("impdlr")
    private String impdlr;
    @JsonProperty("balpayments")
    private String balpayments;
}
