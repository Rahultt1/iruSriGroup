import React from 'react';
import PropTypes from 'prop-types';
import { motion } from 'framer-motion';

const BookHoverDetails = ({ volumeInfo, position }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 10 }}
      className="absolute z-50 bg-white rounded-lg shadow-lg p-4 w-64"
      style={{
        left: position.x,
        top: position.y,
        transform: 'translate(-50%, -100%)',
      }}
    >
      <h3 className="text-lg font-semibold mb-2">{volumeInfo.title || 'Unknown Title'}</h3>
      {volumeInfo.authors && volumeInfo.authors.length > 0 && (
        <p className="text-sm text-gray-600 mb-2">By {volumeInfo.authors.join(', ')}</p>
      )}
      {volumeInfo.description && (
        <p className="text-xs text-gray-500 mb-2 line-clamp-3">{volumeInfo.description}</p>
      )}
      {volumeInfo.averageRating && (
        <div className="flex items-center mb-2">
          <span className="text-yellow-500 mr-1">★</span>
          <span className="text-sm">{volumeInfo.averageRating.toFixed(1)}</span>
        </div>
      )}
      {volumeInfo.publishedDate && (
        <p className="text-xs text-gray-500">
          Published: {new Date(volumeInfo.publishedDate).getFullYear()}
        </p>
      )}
    </motion.div>
  );
};

BookHoverDetails.propTypes = {
  volumeInfo: PropTypes.shape({
    title: PropTypes.string,
    authors: PropTypes.arrayOf(PropTypes.string),
    description: PropTypes.string,
    averageRating: PropTypes.number,
    publishedDate: PropTypes.string,
  }).isRequired,
  position: PropTypes.shape({
    x: PropTypes.number.isRequired,
    y: PropTypes.number.isRequired,
  }).isRequired,
};

export default BookHoverDetails;