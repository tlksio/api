lint:
	./node_modules/.bin/gulp jscs

all: lint

docker:
	docker build -t tlksio/api .

docker-run:
	docker run -ti --name api --rm -p 9001:9001 -v `pwd`:/opt/tlks.io/api --link db:db -t tlksio/api bash

docker-up:
	docker run -d --name api -p 9001:9001 -v `pwd`:/opt/tlks.io/api --link db:db -t tlksio/api


.PHONY: lint all
