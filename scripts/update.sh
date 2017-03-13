#!/bin/bash -x 

npm prune
npm install
cp custom-typings/react-hot-loader/index.d.ts node_modules/react-hot-loader/
cp custom-typings/styled-components/index.d.ts node_modules/styled-components/
