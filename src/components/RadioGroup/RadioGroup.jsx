/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react';
import PropTypes from 'prop-types';
import style from './style';

class TextField extends React.Component {
  constructor(props) {
    super(props);
    this.state = { };
  }

  render() {
    const { error, label, options, ...rest } = this.props;
    if (!options) return '';
    return (
      <>
        {(label) ? (
          <div
            style={{
              fontWeight: 'bold', fontSize: '15px', paddingBottom: '20px', paddingTop: '20px',
            }}
          >
            {label}
          </div>
        ) : ''}
        {
          options.map(response => (
            // eslint-disable-next-line jsx-a11y/label-has-for
            <label key={response.value}>
              <input
                type="radio"
                {...rest}
                key={response.value}
                name="Sports"
                value={response.label}
                style={{ ...style.base }}
              />
              <span style={{ cursor: 'pointer' }}>
                {response.value}
              </span>
            </label>
          ))
        }
        {(error) ? <p style={{ color: 'red', fontSize: '14px' }}>{error}</p> : ''}
      </>
    );
  }
}
TextField.propTypes = {
  error: PropTypes.string,
  label: PropTypes.string,
  value: PropTypes.string.isRequired,
  options: PropTypes.arrayOf(PropTypes.string),
};
TextField.defaultProps = {
  error: '',
  label: 'Please Select',
  options: [],
};
export default TextField;
