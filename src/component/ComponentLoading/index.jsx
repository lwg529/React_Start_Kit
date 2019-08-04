import React from 'react';
import PropTypes from 'prop-types';
import Loadable from 'react-loadable';
import { Spin } from 'antd';

import './style.less';

export default function ComponentLoading({
  error,
  pastDelay,
}) {
  if (error) {
    return <p>出错了</p>;
  }

  if (pastDelay) {
    return (
      <div className="component-loading">
        <Spin size="large" spinning />
      </div>
    );
  }

  return null;
}

ComponentLoading.defaultProps = {
  error: null,
  pastDelay: true,
};

ComponentLoading.propTypes = {
  error: PropTypes.instanceOf(Error),
  pastDelay: PropTypes.bool,
};

export const withLoadable = (config = {}) => Loadable({
  loading: ComponentLoading,
  ...config,
});
