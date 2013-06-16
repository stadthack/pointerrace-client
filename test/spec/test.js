/*global describe, it, beforeEach, GameController, expect */
'use strict';
(function () {
  describe('GameController', function () {
    beforeEach(function () {
      var self = this;

      this.hypeDoc = {};
      this.iframe = {
        contentWindow: {
          hypeDocument: function () { return self.hypeDoc; }
        },
        contentDocument: {
          body: {}
        },
        style: {}
      };
    });

    it('should instantiate', function () {
      var gc = new GameController(this.iframe);
      expect(gc).to.not.be.null;
    });
  });
})();
