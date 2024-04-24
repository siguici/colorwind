.PHONY: install check fix test build

install: node_modules pnpm-lock.yaml

node_modules: package.json
	pnpm i

pnpm-lock.yaml: package.json
	pnpm up

check: install
	pnpm check

test: check
	pnpm test

fix: install
	pnpm fix

build: fix
	pnpm build
