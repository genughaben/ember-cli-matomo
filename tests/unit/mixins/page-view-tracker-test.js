import {
  module,
  test
} from 'qunit';
import { run } from '@ember/runloop';
import EmberObject from '@ember/object';
import startApp from '../../helpers/start-app';
import PageViewTrackerMixin from 'ember-cli-piwik/mixins/page-view-tracker';

let application;
let originalPush;

module('mixin:page-view-tracker', {
  beforeEach: function() {
    application = startApp();
    originalPush = window._paq.push;
  },

  afterEach: function() {
    run(application, 'destroy');
    window._paq.push = originalPush;
  }
});

test('it works', function(assert) {
  const PageViewTrackerObject = EmberObject.extend(PageViewTrackerMixin);
  const subject = PageViewTrackerObject.create();

  assert.ok(subject, 'can be consumed by objects');
});

test('shoud call the tracker when transitioning into a route', function(assert) {
  let called = false;

  window._paq.push = function() {
    called = true;
  };

  assert.expect(1);

  visit('/');
  andThen(function() {
    assert.equal(called, true, 'transitioning into route triggers a call to `_paq.push`');
  });
});
