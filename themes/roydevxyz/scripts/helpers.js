// Multilingual Helper Functions

hexo.extend.helper.register('i18n_field', function(field, lang) {
  if (field === undefined || field === null) return '';

  // Arrays are returned as-is
  if (Array.isArray(field)) {
    return field;
  }

  // If field is a string, return it directly
  if (typeof field === 'string') {
    return field;
  }

  // If field is an object with language keys
  if (typeof field === 'object') {
    // Get the current language or default to 'en'
    const currentLang = lang || this.page.lang || this.config.language[0] || 'en';

    const localized =
      field[currentLang] ||
      field['en'] ||
      field[Object.keys(field)[0]];

    return localized !== undefined ? localized : '';
  }

  return field;
});

hexo.extend.helper.register('get_current_lang', function() {
  // Try to get language from various sources
  return this.page.lang ||
         this.config.language[0] ||
         'en';
});

hexo.extend.helper.register('i18n_tags', function(tags, lang) {
  if (!tags || !tags.length) return [];

  const currentLang = lang || this.page.lang || this.config.language[0] || 'en';

  // If tags is already an array of strings, return it
  if (typeof tags.data === 'undefined') {
    return tags;
  }

  return tags;
});

hexo.extend.helper.register('render_markdown', function(text) {
  if (!text) return '';
  return hexo.render.renderSync({text, engine: 'markdown'});
});
