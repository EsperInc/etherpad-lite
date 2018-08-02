'use strict';

/**
 * Client-side hooks
 *
 * NOTE1: Assumes an EP version where "addEditorCSS" supports absolute urls to resources - https://github.com/ether/etherpad-lite/pull/2850
 * NOTE2: Using 2 different hooks to add styles to minimize style flicker caused by async loading of stylesheets.
 * If I loaded all in "aceInitialized", style flicker would occur as the CSS is first added to the DOM after page is rendered thus.
 * The "addEditorCSS" runs, it builds head elements for the iframes, so if I add CSS there, the load starts as early as possible and reduces chances style flicker.
 * Then the "aceInitialized" runs and adds the stylesheet to the head of main page. But, as "addEditorCSS" already started loading the CSS, it should not flicker too much when adding CSS with JS.
 * I wish there was "addEditorCSS" kind of hook for the main page also. I cannot use "eejsBlock_styles" because I'm unable to read the embed parameters to detect which stylesheets to load.
 *
 * @see {@link http://etherpad.org/doc/v1.5.7/#index_client_side_hooks}
 */

var PREF_COOKIE_KEY = 'epThemesExtTheme';

/**
 * aceEditorCSS hook
 *
 * Adds the custom CSS tags to "ace_inner" and "ace_outer" frames.
 *
 * @param {string} hook_name Hook name
 *
 * @returns {Array} Array of stylesheets to include in EP iframe[name=ace_inner] and iframe[name=ace_outer]
 */
exports.aceEditorCSS = function (hook_name) {
    var styles = _getStyles();
    if (!styles) return [];
    return styles;
};

/**
 * aceInitialized hook
 *
 * Adds style tags to the Etherpad main frame that are specified in the config.
 *
 * @param {string} hook_name
 * @param {object} args Object containing the arguments passed to hook. {editorInfo: {object}, rep: {object}, documentAttributeManager: {object}}
 * @param {function} cb Callback function
 *
 * @see {@link http://etherpad.org/doc/v1.5.7/#index_aceinitialized}
 */

exports.aceInitialized = function (hook_name, args, cb) {
    _applyStyles([$(document)]); // $frameAceOuter, $frameAceInner added in "aceEditorCSS" hook assuming it supports absolute paths - https://github.com/ether/etherpad-lite/pull/2850
};

/**
 * postTimesliderInit hook
 *
 * Adds stylesheets to the timeline view
 */
exports.postTimesliderInit = function () {
    // HACKISH: There is no good event which is fired when timeslider is done loading the clientVars global variable which we need to get plugin config.
    // SO, we wait for the clientVars global variable to be defined and take it from there.
    var watchForClientVars = setInterval(function () {
        if (!Object.keys(clientVars).length) {
            return;
        }
        clearInterval(watchForClientVars);
        _applyStyles([$(document)]);
    }, 10);
};

/**
 * Apply stylesheets to defined target JQuery elements
 *
 * @param {Array} targets Array of JQuery objects to which stylesheets are added to their <head> element
 *
 * @private
 */
var _applyStyles = function (targets) {
    var styles = _getStyles();
    if (!styles) return;

    var stylesheetTags = [];
    styles.forEach(function (src) {
        stylesheetTags.push('<link rel="stylesheet" type="text/css" href="' + src + '"\/>');
    });

    targets.forEach(function ($target) {
        $target = $target.find('head');
        stylesheetTags.forEach(function (tag) {
            //console.log('Pushing ', tag, 'to', $target);
            $target.append(tag);
        });
    });
};

/**
 * Get stylesheets to include
 *
 * @returns Array Array of stylesheet urls
 */
var _getStyles = function () {
    var settings = clientVars.ep_themes_ext;
    var theme = 'default';

    var url = window.location.href;
    var padCookie = require('ep_etherpad-lite/static/js/pad_cookie').padcookie;
    var themeCookie = padCookie.getPref(PREF_COOKIE_KEY);

    // See if theme is specified by embed "theme" parameter, override the default
    var matches = url.match(/theme=([^=?&\s]*)/);
    if (matches && matches.length >= 2) {
        theme = matches[1];
        padCookie.setPref(PREF_COOKIE_KEY, theme);
    } else if (themeCookie) {
        theme = themeCookie;
    }

    if (!settings || !settings[theme] || !settings[theme].length) {
        console.warn('ep_themes_ext settings not found for theme "' + theme + '". The settings can be specified in EP settings.json.');
        return;
    }

    return settings[theme];
};
