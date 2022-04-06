export const Pagination = ({
  countriesPerPage,
  totalCountries,
  paginate,
  currentPage,
}) => {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalCountries / countriesPerPage) + 1; i++) {
    pageNumbers.push(i);
  }
  const limitedPagination = () => {
    let aux = [];
    if (currentPage > 3) {
      aux = pageNumbers.slice(currentPage - 3, currentPage + 2);
    } else {
      aux = pageNumbers.slice(0, 5);
    }
    return aux;
  };

  return (
    <nav className="pagination-container">
      {pageNumbers.length > 0 && (
        <div className="start-end" onClick={() => paginate(1)}>
          <p>Start</p>
        </div>
      )}
      {limitedPagination().map((number) => {
        return number === currentPage ? (
          <div
            className="active-element"
            onClick={() => paginate(number)}
            key={number}
          >
            <p>{number}</p>
          </div>
        ) : (
          <div onClick={() => paginate(number)} key={number}>
            <p>{number}</p>
          </div>
        );
      })}
      {pageNumbers.length > 0 && (
        <div className="start-end" onClick={() => paginate(pageNumbers.length)}>
          <p>End</p>
        </div>
      )}
    </nav>
  );
};
