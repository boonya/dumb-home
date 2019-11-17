/* eslint camelcase: 0 */
/* eslint global-require: 0 */
import { Meteor } from 'meteor/meteor';
import assert from 'assert';

describe('app', () => {
  if (Meteor.isClient) {
    it('client is not server', () => {
      assert.strictEqual(Meteor.isServer, false);
    });
  }

  if (Meteor.isServer) {
    it('server is not client', () => {
      assert.strictEqual(Meteor.isClient, false);
    });
  }
});

describe('Manifest, Theme and package.json', async () => {
  const { name, ...pkg } = await require('../package.json');
  const { theme_color, background_color, ...manifest } = await require('../public/manifest.json');
  const theme = require('../imports/ui/theme.js');

  it('Package name is "dumb-home"', () => {
    assert.strictEqual(name, 'dumb-home');
  });

  it('Package & manifest props are equal', () => {
    assert.strictEqual(pkg.version, manifest.version);
    assert.strictEqual(pkg.description, manifest.description);
    assert.strictEqual(pkg.author, manifest.author);
  });

  it('Theme Color in manifest.json is equal to Application Theme Color', () => {
    assert.strictEqual(theme_color, theme.default.palette.primary.main);
  });

  it('Backgrount Color in manifest.json is equal to Application Theme Background Color', () => {
    assert.strictEqual(background_color, theme.default.palette.background.default);
  });
});
