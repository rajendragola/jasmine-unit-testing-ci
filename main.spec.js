describe('main.js', function()
{
  describe('calculate()', function()
  {
    it('validates expression', function()
    {
      //spyOn(window, 'updateResult').and.stub();
      spyOn(window, 'updateResult');//and.stub() is default and can be omitted

      calculate('1+2');

      expect(window.updateResult).toHaveBeenCalled();
    });

    it('validates expression when first number is invalid', function()
    {
      spyOn(window, 'updateResult');

      calculate('a+2');

      expect(window.updateResult).toHaveBeenCalled();
      expect(window.updateResult).toHaveBeenCalledWith('Expression not recognized');
      expect(window.updateResult).toHaveBeenCalledTimes(1);
    });

    it('validates expression when second number is invalid', function()
    {
      spyOn(window, 'updateResult');

      calculate('1+a');

      expect(window.updateResult).toHaveBeenCalled();
      expect(window.updateResult).toHaveBeenCalledWith('Expression not recognized');
      expect(window.updateResult).toHaveBeenCalledTimes(1);
    });

    it('validates expression when operation is invalid', function()
    {
      spyOn(window, 'updateResult');

      calculate('1=2');

      expect(window.updateResult).toHaveBeenCalled();
      expect(window.updateResult).toHaveBeenCalledWith('Expression not recognized');
      expect(window.updateResult).toHaveBeenCalledTimes(1);
    });

    it('calls add', function()
    {
      spyOn(Calculator.prototype, 'add');

      calculate('3+4');

      expect(Calculator.prototype.add).toHaveBeenCalledTimes(2);
      expect(Calculator.prototype.add).toHaveBeenCalledWith(3);
      expect(Calculator.prototype.add).toHaveBeenCalledWith(4);
    });

    it('calls subtract', function()
    {
      spyOn(Calculator.prototype, 'subtract');

      calculate('6-1');

      expect(Calculator.prototype.subtract).toHaveBeenCalledTimes(1);
      expect(Calculator.prototype.subtract).toHaveBeenCalledWith(1);
    });

    it('calls multiply', function()
    {
      const spy = spyOn(Calculator.prototype, 'multiply');

      calculate('7*9');

      expect(spy).toHaveBeenCalledTimes(1);
      expect(spy).toHaveBeenCalledWith(9);
    });

    it('call divide', function()
    {
      const spy = spyOn(Calculator.prototype, 'divide');

      calculate('56/2');

      expect(spy).toHaveBeenCalledTimes(1);
      expect(spy).toHaveBeenCalledWith(2);
    });

    it('calls updateResult (example using and .callThrough)', function()
    {
      spyOn(window, 'updateResult');
      /* Calling real implementation of spyOn function*/
      spyOn(Calculator.prototype, 'multiply').and.callThrough();

      calculate('5*5');

      expect(window.updateResult).toHaveBeenCalled();
      expect(window.updateResult).toHaveBeenCalledWith(25);
    });

    it('calls updateResult (example using and .callFake)', function()
    {
      spyOn(window, 'updateResult');
      spyOn(Calculator.prototype, 'multiply').and.callFake(function(number)
      {
        return 'it works';
      });

      calculate('5*6');

      expect(window.updateResult).toHaveBeenCalled();
      expect(window.updateResult).toHaveBeenCalledWith('it works');
    });

    it('calls updateResult (example using and .returnValue)', function()
    {
      spyOn(window, 'updateResult');
      spyOn(Calculator.prototype, 'multiply').and.returnValue('whatever [multiply] return');

      calculate('5*6');

      expect(window.updateResult).toHaveBeenCalled();
      expect(window.updateResult).toHaveBeenCalledWith('whatever [multiply] return');
    });

    it('calls updateResult (example using and .returnValues)', function()
    {
      spyOn(window, 'updateResult');
      spyOn(Calculator.prototype, 'add').and.returnValues(null, 'whatever [add] return');

      calculate('5+6');

      expect(window.updateResult).toHaveBeenCalled();
      expect(window.updateResult).toHaveBeenCalledWith('whatever [add] return');
    });

    it('does not handle error', function()
    {
      spyOn(Calculator.prototype, 'multiply').and.throwError('some error');

      expect(function() { calculate('5*7') }).toThrowError('some error')
    });
  });

  describe('updateResult()', function()
  {
    beforeAll(function()
    {
      //Executed once before all specs are executed
      element = document.createElement('div');
      element.setAttribute('id', 'result');
      this.element = element;
      document.body.appendChild(this.element);
    });

    afterAll(function()
    {
      //Executed once after all specs are executed
      document.body.removeChild(this.element);
    });

    it('adds result to DOM element', function()
    {
      updateResult('5');
      expect(this.element.innerText).toBe('5');
    });
  });

  describe('showVersion()', function(){

    it('calls calculator.version', function(){
      spyOn(document, 'getElementById').and.returnValue({ 
        innerText: null 
      }); 

      const spy = spyOnProperty(Calculator.prototype, 'version', 'get').and.returnValue(
        Promise.resolve()
        );

      showVersion();

      expect(spy).toHaveBeenCalled();

    });

  });
});