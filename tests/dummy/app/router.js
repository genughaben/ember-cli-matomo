import EmberRouter from '@ember/routing/router';
import config from './config/environment';
import Piwik from 'ember-cli-piwik/mixins/page-view-tracker';

const Router = EmberRouter.extend(Piwik, {
  location: config.locationType,
  rootURL: config.rootURL
});

Router.map(function() {
});

export default Router;
