'use strict';

describe('Evpro.version module', function() {
  beforeEach(module('Evpro.version'));

  describe('version service', function() {
    it('should return current version', inject(function(version) {
      expect(version).toEqual('0.1');
    }));
  });
});
