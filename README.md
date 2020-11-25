<div align = "center">

[![GitHub issues](https://img.shields.io/github/issues/Nuung/DDmap)](https://github.com/Nuung/DDmap/issues)[![Hits](https://hits.seeyoufarm.com/api/count/incr/badge.svg?url=https%3A%2F%2Fgithub.com%2FNuung%2FDDmap&count_bg=%23B3A6FF&title_bg=%23000000&icon=highly.svg&icon_color=%23E7E7E7&title=HITS&edge_flat=false)](https://hits.seeyoufarm.com)

</div>



# DDMap
> 모든 화장실에 대한 모든 것, 대똥여지도 - DDMap

- Quick Project To do : [Click](https://github.com/Nuung/DDmap/projects/1)


## Getting Started
- 시작전 Infra / Stack을 체크하고 환경을 먼저 조성해야 합니다. 
	- 기본적으로 nodejs, nginx, env, database 모두 환경 설정이 되어야 합니다.

```bash

git clone https://github.com/Nuung/DDmap.git
cd ddmap-backend
sudo npm install
npm start # before this line, u have to check out the env! like db pass,,, etc

```

</br>

------------

</br>


## Design and Architecture about Project

### Mysql ERD

<div align = "center">
	<img src="https://github.com/Nuung/DDmap/blob/master/dev-note-md/images/ddmap_ERD_v0.1.png" width="70%" />
</div>

- 초기 모델 v0.1 ERD (2020.06 ~), 이미지와 현재 개발 DB 관계는 다를 수 있음
	- 가장 핵심적인 관계는 Toilet table과 review임. 1 : 1 or N의 관계


### Architecture

- MVC patten으로 최대한 지향했으며, 최대한 restful하게 하려고 노력함. mysql db가 메인 db로 적절한 사용을 위해 ***ORM으로 sequelize***를 사용함 


</br>

------------

</br>


## Infra / Stack

### AWS EC2 ubuntu 18.0.*
- free tier

### WebServer(EC2)
- nginx
	- test-frontend forwarding
	- /home/ubuntu/projects/ableProject/test-frontend
	- reverse proxy server setting (not yet)

- front-end
	- HTML5, CSS3 with bootstarp
	- vanilla javascript (at first)
	- to react.js (to scale up)

### WebApplicationServer(EC2)
- back-end
	- Nodejs 
		- express, resetAPI

### restfulApi Docs(maybe localhost)
- [swagger](https://github.com/swagger-api/swagger-node)
	- ```npm install -g swagger```
	- https://swagger.io/specification/
- But, local 환경 조성은 나중에 할듯,, 우선 swagger hub를 사용!

### DataBase
- mysql
- mongoDB

### IDE
- Visual Studio Code
	- sftp

### SSH
- putty(just in window)
	- private key: local download folder

### ETC
- github

### Open-source
- Docker (not yet)
- Elasticsearch (not yet)

<p align="center">©copyright ALL Copyrights reserved by Hyeonwoo, Jeong</p>