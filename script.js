(() => {
  'use strict';
  const toggle = document.querySelector('#language-toggle');
  const copy = window.SITE_COPY;
  if (!copy || !toggle) return;
  let language = 'zh';
  try { language = localStorage.getItem('jiahui-language') === 'en' ? 'en' : 'zh'; } catch (_) { /* Storage may be unavailable in private contexts. */ }

  function renderPublications() {
    const list = document.querySelector('#publications-list');
    if (!list || !Array.isArray(window.SITE_PUBLICATIONS)) return;
    const fragment = document.createDocumentFragment();
    window.SITE_PUBLICATIONS.forEach(paper => {
      const article = document.createElement('article');
      article.className = 'publication';
      const heading = document.createElement('h3');
      const titleLink = document.createElement('a');
      titleLink.href = paper.url;
      titleLink.target = '_blank';
      titleLink.rel = 'noopener noreferrer';
      titleLink.textContent = paper.title;
      heading.append(titleLink);
      const authors = document.createElement(paper.authors.length > 12 ? 'details' : 'p');
      authors.className = 'publication-authors';
      const isSelf = author => /^(Jiahui Huang|J\.\s?H\.\s?Huang|JH Huang)$/i.test(author);
      const appendNames = (container, names) => names.forEach((author, index) => {
        if (index > 0) container.append(document.createTextNode(', '));
        const name = document.createElement(isSelf(author) ? 'strong' : 'span');
        name.textContent = author;
        container.append(name);
      });
      if (paper.authors.length > 12) {
        const summary = document.createElement('summary');
        const shortList = document.createElement('span');
        const selfIndex = paper.authors.findIndex(isSelf);
        appendNames(shortList, paper.authors.slice(0, 3));
        if (selfIndex > 2) {
          shortList.append(document.createTextNode(', …, '));
          appendNames(shortList, [paper.authors[selfIndex]]);
        }
        shortList.append(document.createTextNode(', et al.'));
        const expandLabel = document.createElement('span');
        expandLabel.className = 'authors-expand';
        expandLabel.textContent = language === 'zh' ? `全部作者 (${paper.authors.length})` : `All authors (${paper.authors.length})`;
        summary.append(shortList, expandLabel);
        const completeList = document.createElement('p');
        appendNames(completeList, paper.authors);
        authors.append(summary, completeList);
      } else appendNames(authors, paper.authors);
      const metadata = document.createElement('p');
      metadata.className = 'publication-meta';
      metadata.textContent = `${paper.venue} · ${paper.year} · arXiv:${paper.arxiv}`;
      article.append(heading, authors, metadata);
      fragment.append(article);
    });
    list.replaceChildren(fragment);
  }

  function applyLanguage(nextLanguage) {
    language = nextLanguage;
    const dictionary = copy[language];
    document.documentElement.lang = language === 'zh' ? 'zh-CN' : 'en';
    document.title = language === 'zh' ? 'Jiahui Huang · 个人主页' : 'Jiahui Huang · Personal website';
    document.querySelectorAll('[data-i18n]').forEach(element => {
      const value = dictionary[element.dataset.i18n];
      if (typeof value === 'string') element.textContent = value;
    });
    document.querySelector('[data-nav]').setAttribute('aria-label', language === 'zh' ? '主导航' : 'Main navigation');
    document.querySelector('.brand').setAttribute('aria-label', language === 'zh' ? 'Jiahui Huang · 首页' : 'Jiahui Huang · Home');
    document.querySelector('#hero-illustration').alt = language === 'zh' ? '两个视角中的几何特征点及其对应关系' : 'Geometric feature points and their correspondences across two viewpoints';
    toggle.setAttribute('aria-label', language === 'zh' ? 'Switch to English' : '切换到中文');
    document.querySelector('#lang-zh').classList.toggle('active', language === 'zh');
    document.querySelector('#lang-en').classList.toggle('active', language === 'en');
    renderPublications();
    document.dispatchEvent(new CustomEvent('site-language-change', { detail: language }));
    try { localStorage.setItem('jiahui-language', language); } catch (_) { /* The page works without persisted settings. */ }
  }
  toggle.hidden = false;
  toggle.addEventListener('click', () => applyLanguage(language === 'zh' ? 'en' : 'zh'));
  document.querySelector('#copyright-year').textContent = new Date().getFullYear();
  applyLanguage(language);
})();
