describe('calculator.js', function()
{
  describe('Calculator', function()
  {
    let calculator;
    let calculator2;

    beforeEach(function()
    {
      //Anything in this block executes before each spec in this describe
      calculator = new Calculator();
      calculator2 = new Calculator();
    });

    afterEach(function()
    {
      //Anything in this block executes after each spec in this describe
    });

    it('should initialize the total', function()
    {
      expect(calculator.total).toBe(0);
    });

    it('has constructor', function()
    {
      //expect(constructor).toBe(constructor2); //uses  === , checks for both data and value
      expect(calculator).toEqual(calculator2); //uses ==, checks for values

    });
    
    it('can be instantiated', function()
    {     
      expect(calculator).toBeTruthy()
      expect(calculator.constructor.name).toContain('Calc');
    });

    it('instantiates new object', function()
    {
      expect(calculator).not.toBe(calculator2);
    });

    it('has common operations', function()
    {
      expect(calculator.add()).toBeDefined(); //or not.toBeUndefined();
      expect(calculator.add()).toBeDefined();
      expect(calculator.add()).toBeDefined();
      expect(calculator.add()).toBeDefined();
      
    });

    it('can overwrite total', function()
    {
      calculator.total = null;
      expect(calculator.total).toBeNull();
    });

    it('check for calculator instance', function()
    {
      jasmine.addMatchers(customMatchers); //register customMatchers
      
      expect(calculator).toBeCalculator();
      
      //expect(2).toBeCalculator();
      //expect(calculator).not.toBeCalculator();
    });

    describe('add()', function()
    {
      it('should add numbers to total', function()
      {
        calculator.total = 5;
        calculator.add(6);
    
        expect(calculator.total).toBe(11);
      });

      it('returns total', function()
      {
        calculator.total = 20;
    
        expect(calculator.add(50)).toBe(70);
        expect(calculator.total).toMatch(/-?\d+/);
        expect(typeof calculator.total).toMatch('number');
        expect(calculator.total).toEqual(jasmine.anything());
        //expect(null).toEqual(jasmine.anything());
        //expect(undefined).toEqual(jasmine.anything());
      });
    })

    describe('subtract()', function()
    {
      it('should subtract numbers from total', function()
      {
        calculator.total = 17;
        calculator.subtract(4);
    
        expect(calculator.total).toBe(13);
      });
    });

    describe('multiply()', function()
    {
      it('should multiply total by number', function()
      {
        calculator.total = 8;
        calculator.multiply(4);
    
        expect(calculator.total).toBe(32);
      });

      it('does not handle Nan', function()
      {
        calculator.total = 20;
        calculator.multiply('a');

        //expect(calculator.total).toBe('20a');
        expect(calculator.total).toBeNaN();
      });
    });

    describe('divide()', function()
    {
      it('should divide total by number', function()
      {
        calculator.total = 68;
        calculator.divide(4);
    
        expect(calculator.total).toBe(17);
      });

      it('handles divide by zero', function()
      {
        expect(function() { calculator.divide(0) }).toThrow();
        expect(function() { calculator.divide(0) }).toThrowError(Error);
        expect(function() { calculator.divide(0) }).toThrowError(Error, 'Cannot divide by zero');
      });
    });

    describe('get version', function()
    {
      it('fetches version from external source', function(done)
      {
        spyOn(window, 'fetch').and.returnValue(Promise.resolve(new Response('{ "version":"0.1" }')))
        calculator.version.then(function(version)
        {
          expect(version).toBe('0.1');
          done();
        });
      });

      it('fetches version from external source using async', async function(done)
      {
        spyOn(window, 'fetch').and.returnValue(Promise.resolve(new Response('{ "version":"0.1" }')));

        const version = await calculator.version
        expect(version).toBe('0.1');
        done();
      });
    });
  
  });
});