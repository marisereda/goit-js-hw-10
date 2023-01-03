# Country search

The Country search project is a front-end part of the application to search for
information about countries by their partial or full names.

HTTP requests use the public API Rest Countries, namely resource name, which
returns an array of country objects that match the search criteria. 

If the back-end interface returns more than 10 countries, a notification appears in the interface saying that the name should be more specific.

The project demonstrates the use of back-end queries based on promises.

## There were used:

- Ladosh library (debounce technique on the event handler of input change)
- Notiflix library
- API Rest Countries
