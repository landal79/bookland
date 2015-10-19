define(['filters','angular-mocks'], function() {

    describe('filter', function () {
        beforeEach(module('bookland.filters'));

        describe('reverse', function () {
            it('should capitalize a string', inject(function (capitalizeFilter) {
                expect(capitalizeFilter('abcd')).toEqual('Abcd');
            }));
        });

    });

});