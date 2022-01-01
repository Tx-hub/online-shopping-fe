import Vue from 'vue'
import Element, { Message, MessageBox } from 'element-ui'
import '../element-variables.scss'
Vue.use(Element)
Vue.prototype.$message = Message
Vue.prototype.$confirm = MessageBox.confirm
