import {ItemType} from "youyo-basic-layout";
import {RouterLink} from 'vue-router';
import {h} from 'vue';
import {MailOutlined} from "@ant-design/icons-vue";

const modules: ItemType[] = [
    {key: '0', title: 'Home', label: h(RouterLink, {to: '/'}, () => 'Home'), path: '/', icon: h(MailOutlined)},
    {key: '1', title: 'Page-01', label: h(RouterLink, {to: '/page01'}, () => 'Page-01'), path: '/page01', icon: h(MailOutlined)},
    {key: '2', title: 'Page-02', label: h(RouterLink, {to: '/page02'}, () => 'Page-02'), path: '/page02', icon: h(MailOutlined)},
    {key: '3', title: 'Page-03', label: h(RouterLink, {to: '/page03'}, () => 'Page-03'), path: '/page03', icon: h(MailOutlined)},
    {type: 'divider'},
    {key: '4', title: 'Page-04', label: h(RouterLink, {to: '/page04'}, () => 'Page-04'), path: '/page04', icon: h(MailOutlined)},
]

export default modules;