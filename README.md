<div align = "center">

[![GitHub issues](https://img.shields.io/github/issues/Nuung/NH-share-payment)](https://github.com/Nuung/NH-share-payment/issues) [![Hits](https://hits.seeyoufarm.com/api/count/incr/badge.svg?url=https%3A%2F%2Fgithub.com%2FNuung%2FNH-share-payment&count_bg=%2370C147&title_bg=%23555555&icon=apachespark.svg&icon_color=%23E7E7E7&title=Hits&edge_flat=false)](https://hits.seeyoufarm.com)

</div>


# Share Payment SNS - SPS Project
> 새로쓰는 가계부, 공유 기반 가계부 프로젝트


## Infra / Stack
- [check out this notion page](https://www.notion.so/486bc73e507945d893aed40e05313893)


### AWS EC2 ubuntu 18.0.*
- free tier

### WebServer

- front-end
	- HTML5, CSS3 with bootstarp
	- vanilla javascript (at first)
	- reactJS
	- nginX
		- sps-frontend forwarding
		- reverse proxy server setting (not yet)

### restfulAPI 
- back-end
	- nodejs 
		- express
		- DTO(모델보다는 단순 entity 개념으로) - Service (DAO에 가까우며 실제 쿼리 날리는 부분) - Controller (컨트롤러, 제일 앞단) => router (API)
		- ORM을 사용하지 않고 mysql 모듈만 사용함 / 그래서 위와 같은 뼈대로 형태를 잡음 
	- mysql

### restfulApi Docs(maybe localhost)
- 아직

### DataBase
- mysql
- mongoDB 

### DevOps
- github
- Docker (not yet)

<p align="center">©copyright ALL Copyrights reserved by Hyeonwoo, Jeong</p>