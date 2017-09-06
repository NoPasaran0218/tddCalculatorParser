var should = require('should');
var parser = require('../source/evalexpr');

describe('parser spec', function(){
   it('should calc exists', function () {
        should(parser).be.ok;
   });

   it('should return 3 for string 1+2', function () {
       should(parser.add('1+2')).equal(3);
   });

    it('should return 3 for string (1+2)', function () {
        should(parser.add('(1+2)')).equal(3);
    });

    it('should return 3.1 for string 1.1+2', function () {
        should(parser.add('1.1+2')).equal(3.1);
    });

    it('should return 2 for string 3-1', function () {
        should(parser.add('3-1')).equal(2);
    });

    it('should return 2.1 for string 3.1-1', function () {
        should(parser.add('3.1-1')).equal(2.1);
    });

    it('should return 2 for string (3-1)', function () {
        should(parser.add('(3-1)')).equal(2);
    });

    it('should return 4 for string 2*2', function () {
        should(parser.add('2*2')).equal(4);
    });


    it('should return 4 for string (2*2)', function () {
        should(parser.add('(2*2)')).equal(4);
    });

    it('should return 4.2 for string 2.1*2', function () {
        should(parser.add('2.1*2')).equal(4.2);
    });







    it('should return "1/2" -> 0.5', function () {
        should(parser.add('1/2')).equal(0.5);
    });

    it('should return "(1/2)" -> 0.5', function () {
        should(parser.add('(1/2)')).equal(0.5);
    });

    it('should return "1.1/2" -> 0.55', function () {
        should(parser.add('1.1/2')).equal(0.55);
    });

    it('should return "1/2 + 5 + 4*5" -> 25.5', function () {
        should(parser.add('1/2 + 5 + 4*5')).equal(25.5);
    });

    it('should return "1/2 + (5 + 4) * 5" -> 45.5', function () {
        should(parser.add('1/2 + (5 + 4) * 5')).equal(45.5);
    });

    it('should return "1/2    + (5 + 4) * 5" -> 45.5', function () {
        should(parser.add('1/2    + (5 + 4) * 5')).equal(45.5);
    });

    it('should return "1/2 + (5.5 + 4.7) * 5.1" -> 52.52', function () {
        should(parser.add('1/2 + (5.5 + 4.7) * 5.1')).equal(52.52);
    });

    it('should return "-1/2 + (-5.5 - 4.7) * 5.1" -> -52.52', function () {
        should(parser.add('-1/2 + (-5.5 - 4.7) * 5.1')).equal(-52.52);
    });

    it('should return "1+2/3" -> 1.67', function () {
        should(parser.add('1+2/3')).equal(1.67);
    });

    it('should return "1+2/45/78/78" -> 1', function () {
        should(parser.add('1+2/45/78/78')).equal(1);
    });

    it('should return "0" -> 0', function () {
        should(parser.add('0')).equal(0);
    });

    it('should return "18" -> 18', function () {
        should(parser.add('18')).equal(18);
    });

    it('should return "(1/2 + 5 + 4*5"  -> undefined', function () {
        should(parser.add('(1/2 + 5 + 4*5')).equal(undefined);
    });

    it('should return "1/2 ++ 5 + 4) * 5" -> undefined', function () {
        should(parser.add('1/2 ++ 5 + 4) * 5')).equal(undefined);
    });

    it('should return "[1/2] + 5 + 4 * 5" -> undefined', function () {
        should(parser.add('[1/2] + 5 + 4 * 5')).equal(undefined);
    });

    it('should return "1/2 >> 5 + 4) * 5" -> undefined', function () {
        should(parser.add('1/2 >> 5 + 4) * 5')).equal(undefined);
    });

    it('should return "1/2 + 5a + 4b * 5" -> undefined', function () {
        should(parser.add('1/2 + 5a + 4b * 5')).equal(undefined);
    });

    it('should return "trololo" -> undefined', function () {
        should(parser.add('trololo')).equal(undefined);
    });

});