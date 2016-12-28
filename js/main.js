(function() {
  // Replace no-js with js for inevitable future styling.
  let htmlClasses = document.querySelector('html.no-js').classList;
  htmlClasses.remove('no-js');
  htmlClasses.add('js');

  const natureTable = document.querySelector('.natures-table');
  const natureNameInput = document.querySelector('#nature-name');

  const filterByName = function(input) {
    const query = input.toUpperCase();
    const natures = Array.from(natureTable.querySelectorAll('tbody tr'));

    // Reduce list to arrays of matching & non-matching natures.
    const queryResults = natures.reduce((results, nature) => {
      const natureName = nature.querySelector('td').textContent.toUpperCase();

      if (natureName.includes(query)) {
        results.matching.push(nature);
      } else {
        results.notMatching.push(nature);
      }

      return results;
    }, {
      matching: [],
      notMatching: []
    });

    // Show/Hide based on query results.
    queryResults.matching.forEach(match => match.style.display = '');
    queryResults.notMatching.forEach(nonMatch => nonMatch.style.display = 'none');

    const noMatchText = document.querySelector('p.no-match-found') || document.createElement('p');
    if (!queryResults.matching.length) {
      // No results found - show 'no results' text & hide table.
      if (!noMatchText.textContent.length) {
        // Initialise 'No match found' text.
        noMatchText.classList.add('no-match-found');
        document.querySelector('main').appendChild(noMatchText);
      }

      noMatchText.textContent = `No nature containing "${input}" exists.`;
      noMatchText.style.display = '';

      natureTable.style.display = 'none';
    } else {
      // At least one match - show table, hide 'no results'.
      natureTable.style.display = '';

      if (noMatchText) {
        noMatchText.style.display = 'none';
      }
    }
  };

  natureNameInput.addEventListener('keyup', function(e) {
    filterByName(natureNameInput.value);
  });

  if (window.location.hash) {
    natureNameInput.value = window.location.hash.substr(1);;
    natureNameInput.dispatchEvent(new Event('keyup'));
  }
})();
