import EmberRouter from '@ember/routing/router';
import config from './config/environment';
import Matomo from 'ember-cli-matomo/mixins/page-view-tracker';

const Router = EmberRouter.extend(Matomo, {
  location: config.locationType,
  rootURL: config.rootURL,
});

Router.map(function() {
});

export default Router;
