function loadTheme(content: string, isDark) {
  const head = document.getElementsByTagName('head')[0];
  const styleList = head.getElementsByTagName('style');
  // 查找 style 是否存在，存在的话需要删除 dom
  if (styleList.length > 0) {
    for (let i = 0; i < styleList.length; i++) {
      if (!isDark && styleList[i].getAttribute('data-vite-dev-id')?.includes('antd.dark.less')) {
        styleList[i].remove();
      }

      if (styleList[i].getAttribute('data-type') === 'theme') {
        styleList[i].remove();
      }
    }
  }
  // 最后加入对应的主题和加载 less 文件
  const themeEle = document.createElement('style');
  themeEle.dataset.type = 'theme';
  themeEle.innerHTML = content;
  head.appendChild(themeEle);
}

export { loadTheme };
