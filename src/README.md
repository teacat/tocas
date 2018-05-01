# 原始碼

```bash
coffee -c ./src/tocas.dev.coffee
coffee -c -w -o ./dist ./src/javascript
wt watch src/tocas.sass -b dist/ -s compressed
go build ./main.go && ./main
```