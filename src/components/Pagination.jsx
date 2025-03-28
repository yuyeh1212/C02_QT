import PropTypes from 'prop-types';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

export default function Pagination({ pageInfo, handlePageChange }) {
  return (
    <>
      <div className="d-flex justify-content-center align-items-center">
        <nav>
          <ul className="pagination ">
            <li className="page-item">
              <button
                className={`page-link ${pageInfo.page === 1 ? 'disabled text-secondary-50' : 'text-primary-02'}`}
                onClick={() => handlePageChange(pageInfo.page - 1)}
              >
                <ArrowBackIosIcon />
              </button>
            </li>
            {Array.from({ length: pageInfo.maxPage }).map((item, index) => (
              <li
                className={`page-item ${pageInfo.page === index + 1 && 'active'} d-flex align-items-center`}
                key={index}
              >
                <button className="page-link" onClick={() => handlePageChange(index + 1)}>
                  {index + 1}
                </button>
              </li>
            ))}
            <li className="page-item">
              <button
                className={`page-link ${pageInfo.page === pageInfo.maxPage ? 'disabled text-secondary-50' : 'text-primary-02'}`}
                onClick={() => handlePageChange(pageInfo.page + 1)}
              >
                <ArrowForwardIosIcon />
              </button>
            </li>
          </ul>
        </nav>
      </div>
    </>
  );
}

Pagination.propTypes = {
  pageInfo: PropTypes.shape({
    page: PropTypes.number.isRequired,
    maxPage: PropTypes.number.isRequired,
  }).isRequired,
  handlePageChange: PropTypes.func.isRequired,
};
