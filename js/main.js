(function() {
  // Replace no-js with js for inevitable future styling.
  let htmlClasses = document.querySelector('html.no-js').classList;
  htmlClasses.remove('no-js');
  htmlClasses.add('js');

  let natureTable = document.querySelector('.natures-table');
  let natureNameInput = document.querySelector('#nature-name');

  let filterByName = function(input) {
    let query = input.toUpperCase();
    let natures = natureTable.querySelectorAll('tbody tr');

    for (let i = 0; i < natures.length; i++) {
      let natureName = natures[i].getElementsByTagName('td')[0];

      if (natureName) {
        if (natureName.innerHTML.toUpperCase().indexOf(query) > -1) {
          natures[i].style.display = '';
        } else {
          natures[i].style.display = 'none';
        }
      }

      // @TODO: Add 'No results found'.
    }
  };

  natureNameInput.addEventListener('keyup', function(e) {
    filterByName(natureNameInput.value);
  });

  if (window.location.hash) {
    let query = window.location.hash.substr(1);
    natureNameInput.value = query;
    let e = new Event('keyup');
    natureNameInput.dispatchEvent(e);
  }
})();
