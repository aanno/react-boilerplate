#!/bin/bash
npm prune
npm install
cp custom-typings/react-hot-loader/index.d.ts node_modules/react-hot-loader/
cp custom-typings/styled-components/index.d.ts node_modules/styled-components/
cp custom-typings/redux-form/immutable.d.ts  node_modules/@types/redux-form/
