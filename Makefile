.PHONY : test serve

test:
	CHROME_BIN=chromium ng test --watch=false --code-coverage --source-map true

serve:
	ng serve --port 4444

build:
	ng build --sourceMap=false --configuration production
