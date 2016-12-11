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

    queryResults.matching.forEach(match => match.style.display = '');
    queryResults.notMatching.forEach(nonMatch => nonMatch.style.display = 'none');

    let noMatchText = document.querySelector('p.no-match-found');
    if (!queryResults.matching.length) {
      // No results found - show 'no results' text & hide table.
      if (!noMatchText) {
        noMatchText = document.createElement('p');
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
    const query = window.location.hash.substr(1);
    natureNameInput.value = query;
    const e = new Event('keyup');
    natureNameInput.dispatchEvent(e);
  }
})();
