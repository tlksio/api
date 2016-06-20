lint:
	./node_modules/.bin/gulp jscs

all: lint

docker:
	docker build -t tlksio/api .

docker-run:
	docker run --name api -d tlksio/api

.PHONY: lint all
