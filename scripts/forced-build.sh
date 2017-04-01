#!/bin/bash -x 

rm -r node_modules/react-boilerplate-dlls build/*
npm run build:dll
npm run build
