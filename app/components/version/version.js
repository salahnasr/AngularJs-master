'use strict';

angular.module('Evpro.version', [
  'Evpro.version.interpolate-filter',
  'Evpro.version.version-directive'
])

.value('version', '0.1');
