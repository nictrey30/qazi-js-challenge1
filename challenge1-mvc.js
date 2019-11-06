var ageController = (function() {
  return {
    calculateAge: function(date) {
      return Math.round(
        (new Date().getTime() - date.getTime()) / (1000 * 3600 * 24)
      );
    }
  };
})();

var UIController = (function() {
  var domStrings = {
    inputDate: 'date',
    clickBtn: '.clickAge',
    resetBtn: '.resetAge',
    resultOut: 'flex-box-result'
  };
  return {
    getInput: function() {
      return document.getElementById(domStrings.inputDate).value;
    },
    getDomStrings: function() {
      return domStrings;
    },
    setResult: function(result) {
      var resultDisplay = document.getElementById(domStrings.resultOut);
      if (result === undefined) {
        resultDisplay.innerText = "You didn't choose your bday";
      } else if (result < 0) {
        resultDisplay.innerText = 'You chose a future birthday date!!';
      } else {
        resultDisplay.innerText = 'You are ' + result + ' days old';
      }
      return resultDisplay;
    },
    resetAll: function() {
      var resetResult = document.getElementById(domStrings.resultOut);
      resetResult.innerText = '';
    }
  };
})();

var controller = (function(ageCtrl, UICtrl) {
  var domCtrl = UICtrl.getDomStrings();
  var setupEventListeners = function() {
    document
      .querySelector(domCtrl.clickBtn)
      .addEventListener('click', checkDate);
    document
      .querySelector(domCtrl.resetBtn)
      .addEventListener('click', UICtrl.resetAll);
  };
  var checkDate = function() {
    // get the date
    var bdayInput = UIController.getInput();
    // check the date
    if (!bdayInput) {
      // set result as not inputted
      UICtrl.setResult(undefined);
    } else if (ageCtrl.calculateAge(new Date(bdayInput)) < 0) {
      // set result
      UICtrl.setResult(-1);
    } else {
      // display the resulted calculation
      UICtrl.setResult(ageCtrl.calculateAge(new Date(bdayInput)));
    }
  };
  return {
    init: function() {
      console.log('application has started');
      setupEventListeners();
    }
  };
})(ageController, UIController);
controller.init();
