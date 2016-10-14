/**
 * Copyright (c) 2016 Apentle.com
 *
 * This source code is licensed under the MIT-style license found in
 * the LICENSE file in the root directory of this source tree.
 *
 * @flow
 */

const I18n = require('react-native-i18n');

I18n.fallbacks = true;

if (typeof global.__ === 'undefined') {
  global.__ = I18n.t.bind(I18n);
}

/**
 * addTranslation - add translations
 *
 * @param  {object} translations translations object
 * @param  {string} locale       locale name
 * @returns {undefined}
 */
function addTranslation(translations, locale) {
  if (typeof translations !== 'object') {
    return;
  }
  // add translations with format like
  // {
  //  en: {},
  //  fr: {},
  // }
  if (locale === undefined) {
    for (var key in translations) {
      addTranslation(translations[key], key);
    }
    return;
  }
  if (I18n.translations[locale] === undefined) {
    I18n.translations[locale] = translations;
  } else {
    Object.assign(I18n.translations[locale], translations);
  }
}

module.exports = addTranslation;
