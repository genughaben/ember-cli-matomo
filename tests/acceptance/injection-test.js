import {
  module,
  test
} from 'qunit';
import { run } from '@ember/runloop';
import { isArray } from '@ember/array';
import $ from 'jquery';
import startApp from '../helpers/start-app';
import config from '../../config/environment';

let application;

module('acceptance:injection', {
  beforeEach: function() {
    application = startApp();
  },

  afterEach: function() {
    run(application, 'destroy');
  }
});

test('should inject two script tags in the html', function(assert) {
  assert.expect(4);

  visit('/');
  andThen(function() {
    // Use the values from the dummy config
    const piwikConfig = config.piwik || config.matomo;
    const sid = piwikConfig.sid;
    const php = piwikConfig.url + '/piwik.php';
    const js = piwikConfig.url + '/piwik.js';
    // Make sure the _paq object is there after the injection
    assert.ok(isArray(window._paq), 'initialization script has been injected');

    // Inspect the head script for the right replacements
    assert.equal(window._paq[0][1], sid, 'initialization script has the correct replaced sid');
    assert.equal(window._paq[1][1], php, 'initialization script has the correct replaced url');

    // Inspect the body script src attribute
    assert.equal($('script').last().attr('src') || $('script').last().prev().attr('src'),
      js, 'tracker script has been injected');
  });
});
