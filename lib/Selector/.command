coffee -b -o ./dist/ -c ./src/selector.coffee
uglifyjs --compress --mangle -o ./dist/selector.min.js ./dist/selector.js