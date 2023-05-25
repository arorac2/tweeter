$(document).ready(function() {
    function updateCharacterCount() {
     console.log("helloworld");
      const textarea = $(this);
      const counter = textarea.next().find('output');
      const remainingChars = 140 - textarea.val().length;
      console.log("rem:", remainingChars);
      counter.text(remainingChars);
      
      if (remainingChars < 0) {
        counter.addClass('invalid');
      } else {
        counter.removeClass('invalid');
      }
    }
  
    $('textarea').on('input', updateCharacterCount);
  });
  
  