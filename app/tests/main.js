import assert from 'assert';

describe('app', () => {
  it('package.json has correct name', async () => {
    const { name } = await import('../package.json.js');
    assert.strictEqual(name, 'home');
  });

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
