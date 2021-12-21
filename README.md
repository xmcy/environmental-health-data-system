# monster

## Project setup

```
yarn install
```

### Compiles and hot-reloads for development

```
yarn serve
```

### Compiles and minifies for production

```
yarn build
```

### Lints and fixes files

```
yarn lint
```

### check up

```
yarn checkup
```

### Customize configuration

See [Configuration Reference](https://cli.vuejs.org/config/).

### 组件快捷创建

```
yarn addto [组件名称] [组件路径文件名字]
eg: yarn addto test-1 test
则会在 src/components/modules/test/test-1
```

### UI 组件

ant-design-vue

### 数据处理

```
import { isEqual, map } from "lodash-es";
```

### 接口请求

```
this.service
this.$axios
上述就是axios
```

### 弹框

```
this.$popup.open({})
this.$popup.close({})
```

### localStorage

```
import Storage from "@/common/utils/storage";

storage.set("user", user, { expires: 7 });
storage.get("user");
storage.remove("user");
```

### bus

```
this.$bus.on()
this.$bus.emit()
this.$bus.off()
this.$bus.once()
```

### Timer

```
this.$timer.setInterval(this, "queryProductList", this.queryProductList, 5000);
this.$timer.clearInterval(this, "queryProductList");
this.$timer.setTimeout(this, "queryProductList", this.queryProductList, 5000);
this.$timer.clearTimeout(this, "queryProductList");
this.$timer.clear(this);
```
