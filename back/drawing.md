# user, news, trade에 대한 가장 쉬운 프레임워크 만들기

user는 회원 관련 + 보고서 내용만 포함할 수 있게 일단 반환하는 정도만 만들자.

공통적으로 사용되는 config, discovery, gateway를 설정해주도록 한다.

config service는 원격지에 있는 yml파일을 통해서 설정을 하기 때문에 github에 필요한 내용들을 삽입
보통의 서비스는 비슷비슷하게 환경을 구성하기 때문에 어렵지 않다.

config application-dev.yml

더미만 만든다고 생각해보자.

필요사항 
- config service
- apigateway
- discovery

api만 던져서 요청 결과를 뱉는 정석만 따른다. 

restcontroller
dto
repository
service 

trade api를 만든다고 가정

구조화
- bootstrap -> config 
- application.yml

보안 설정은 당장에 버린다. 

get 요청에 따라서 dto 구조를 만들어서 전달해주도록 하자. 
docker mysql에 붙여서 값을 생성 -> 기존 mysql을 넣음

