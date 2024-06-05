.PHONY: install check fix test build

install: node_modules pnpm-lock.yaml

node_modules: package.json packages/colorwind/package.json
	pnpm cw.i
	pnpm i

pnpm-lock.yaml: package.json packages/colorwind/package.json
	pnpm cw.up
	pnpm up

check: install
	pnpm check

test: check
	pnpm test

fix: install
	pnpm fix

build: fix
	pnpm build
