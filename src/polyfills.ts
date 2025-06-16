/***************************************************************************************************
 * Polyfills لدعم المتصفحات القديمة (مثلاً Android 4.4.4)
 */
import 'core-js/es6/symbol';
import 'core-js/es6/object';
import 'core-js/es6/function';
import 'core-js/es6/parse-int';
import 'core-js/es6/parse-float';
import 'core-js/es6/number';
import 'core-js/es6/math';
import 'core-js/es6/string';
import 'core-js/es6/date';
import 'core-js/es6/array';
import 'core-js/es6/regexp';
import 'core-js/es6/map';
import 'core-js/es6/set';

import 'classlist.js'; // لبعض التوافقات مع DOM
import 'web-animations-js'; // لو بتستخدم animations

import 'zone.js'; // مهم جدًا لـ Angular

/** IE9, IE10 and IE11 support */
import 'classlist.js';  // Run `npm install --save classlist.js`

/** Evergreen browsers require these. **/
import 'core-js/es/reflect'; // Run `npm install core-js`

/** For older browsers (iOS 9-12 Safari, Android < 5) */
import 'zone.js'; // Included with Angular CLI.

