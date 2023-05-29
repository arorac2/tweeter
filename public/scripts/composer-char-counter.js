$(document).ready(function() {
    function updateCharacterCount() {
      const textarea = $(this);
      const counter = textarea.next().find('output');
      const remainingChars = 140 - textarea.val().length;
      counter.text(remainingChars);
      
      if (remainingChars < 0) {
        counter.addClass('invalid');
      } else {
        counter.removeClass('invalid');
      }
    }
  
    $('textarea').on('input', updateCharacterCount);
  });
  
  