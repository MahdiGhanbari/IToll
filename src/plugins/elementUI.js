import ElementUI from 'element-ui';
import locale from 'element-ui/lib/locale/lang/en'
import 'element-ui/lib/theme-chalk/index.css';

export default {
  install(vue) {
    vue.use(ElementUI, {locale})
  }
}