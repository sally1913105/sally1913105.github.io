(() => {
  'use strict';
  const copy = window.SITE_COPY;
  const controls = document.querySelector('#language-controls');
  if (!copy || !controls) return;
  let language = 'en';
  try {
    const stored = localStorage.getItem('jiahui-language');
    if (stored === 'en' || stored === 'zh') language = stored;
  } catch (_) { /* Language selection works without storage. */ }

  const isSelf = author => /^(Jiahui Huang|J\.\s?H\.\s?Huang|JH Huang)$/i.test(author);
  function appendAuthorNames(container, names) {
    names.forEach((author, index) => {
      if (index) container.append(document.createTextNode(', '));
      const name = document.createElement(isSelf(author) ? 'strong' : 'span');
      name.textContent = author;
      container.append(name);
    });
  }
  function publicationLink(label, href, download = false) {
    const link = document.createElement('a');
    link.textContent = label;
    link.href = href;
    if (download) link.download = '';
    else { link.target = '_blank'; link.rel = 'noopener noreferrer'; }
    return link;
  }
  function renderPublications() {
    const list = document.querySelector('#publications-list');
    if (!list || !Array.isArray(window.SITE_PUBLICATIONS)) return;
    const fragment = document.createDocumentFragment();
    window.SITE_PUBLICATIONS.forEach(paper => {
      const article = document.createElement('article');
      article.className = 'publication';
      const details = document.createElement('div');
      details.className = 'publication-details';
      if (paper.figure) {
        const figure = document.createElement('figure');
        figure.className = 'publication-figure';
        const imageLink = publicationLink('', paper.figure.src);
        imageLink.className = 'publication-image-link';
        imageLink.setAttribute('aria-label', language === 'zh' ? `查看 ${paper.title} 的完整配图` : `View the full figure for ${paper.title}`);
        const image = document.createElement('img');
        image.src = paper.figure.src;
        image.alt = paper.figure.alt[language];
        image.width = paper.figure.width;
        image.height = paper.figure.height;
        image.loading = 'lazy';
        image.decoding = 'async';
        imageLink.append(image);
        const caption = document.createElement('figcaption');
        const captionTitle = document.createElement('p');
        captionTitle.className = 'publication-figure-caption';
        captionTitle.textContent = paper.figure.caption[language];
        const attribution = document.createElement('p');
        attribution.className = 'publication-figure-attribution';
        attribution.textContent = paper.figure.attribution;
        const figureLinks = document.createElement('div');
        figureLinks.className = 'publication-figure-links';
        figureLinks.append(publicationLink(language === 'zh' ? '查看大图' : 'Full-size figure', paper.figure.src));
        figureLinks.append(publicationLink(language === 'zh' ? '图片来源' : 'Source', paper.figure.source));
        if (paper.figure.license) figureLinks.append(publicationLink('CC BY-SA 4.0', paper.figure.license));
        caption.append(captionTitle, attribution, figureLinks);
        figure.append(imageLink, caption);
        article.append(figure);
      }
      const heading = document.createElement('h3');
      heading.append(publicationLink(paper.title, paper.url));
      const authors = document.createElement(paper.authors.length > 12 ? 'details' : 'p');
      authors.className = 'publication-authors';
      if (paper.authors.length > 12) {
        const summary = document.createElement('summary');
        const shortList = document.createElement('span');
        const selfIndex = paper.authors.findIndex(isSelf);
        appendAuthorNames(shortList, paper.authors.slice(0, 3));
        if (selfIndex > 2) {
          shortList.append(document.createTextNode(', …, '));
          appendAuthorNames(shortList, [paper.authors[selfIndex]]);
        }
        shortList.append(document.createTextNode(', et al.'));
        const label = document.createElement('span');
        label.className = 'authors-expand';
        label.textContent = language === 'zh' ? `全部作者 (${paper.authors.length})` : `All authors (${paper.authors.length})`;
        summary.append(shortList, label);
        const fullList = document.createElement('p');
        appendAuthorNames(fullList, paper.authors);
        authors.append(summary, fullList);
      } else appendAuthorNames(authors, paper.authors);
      const venue = document.createElement('p');
      venue.className = 'publication-venue';
      venue.textContent = `${paper.venue}, ${paper.year}`;
      details.append(heading, authors, venue);
      if (paper.researchQuestion?.[language]) {
        const question = document.createElement('p');
        question.className = 'publication-question';
        question.textContent = paper.researchQuestion[language];
        details.append(question);
      }
      if (paper.summary?.[language]) {
        const description = document.createElement('p');
        description.className = 'publication-summary';
        description.textContent = paper.summary[language];
        details.append(description);
      }
      const links = document.createElement('div');
      links.className = 'publication-links';
      links.append(publicationLink(language === 'zh' ? '论文' : 'Paper', paper.url));
      if (paper.pdf) links.append(publicationLink('PDF', paper.pdf));
      if (paper.citationFile) links.append(publicationLink('BibTeX', paper.citationFile, true));
      details.append(links);
      article.append(details);
      fragment.append(article);
    });
    list.replaceChildren(fragment);
  }
  function applyLanguage(nextLanguage) {
    language = nextLanguage;
    document.documentElement.lang = language === 'zh' ? 'zh-CN' : 'en';
    document.title = language === 'zh' ? 'Jiahui Huang | 计算机视觉与具身智能' : 'Jiahui Huang | Computer Vision & Embodied Intelligence';
    document.querySelectorAll('[data-i18n]').forEach(element => {
      const value = copy[language][element.dataset.i18n];
      if (typeof value === 'string') element.textContent = value;
    });
    document.querySelector('[data-nav]').setAttribute('aria-label', language === 'zh' ? '主页导航' : 'Main navigation');
    document.querySelector('.profile-column').setAttribute('aria-label', language === 'zh' ? '个人学术信息' : 'Academic profile');
    document.querySelector('.profile-name').setAttribute('aria-label', language === 'zh' ? 'Jiahui Huang，首页' : 'Jiahui Huang, home');
    controls.setAttribute('aria-label', language === 'zh' ? '语言' : 'Language');
    controls.querySelectorAll('button').forEach(button => button.setAttribute('aria-pressed', String(button.dataset.language === language)));
    renderPublications();
    try { localStorage.setItem('jiahui-language', language); } catch (_) { /* Persistence is optional. */ }
  }
  controls.hidden = false;
  controls.querySelectorAll('button').forEach(button => button.addEventListener('click', () => applyLanguage(button.dataset.language)));
  document.querySelector('#copyright-year').textContent = new Date().getFullYear();
  applyLanguage(language);
  const navigation = Array.from(document.querySelectorAll('.section-nav a'));
  function setCurrentSection(id) {
    navigation.forEach(link => {
      if (link.hash === `#${id}`) link.setAttribute('aria-current', 'location');
      else link.removeAttribute('aria-current');
    });
  }
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => { if (entry.isIntersecting) setCurrentSection(entry.target.id); });
    }, { rootMargin: '-8% 0px -65% 0px', threshold: 0 });
    document.querySelectorAll('.academic-section').forEach(section => observer.observe(section));
  }
  navigation.forEach(link => link.addEventListener('click', () => setCurrentSection(link.hash.slice(1))));
})();
