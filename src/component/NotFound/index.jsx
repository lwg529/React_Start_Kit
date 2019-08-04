/*
 * @author: liuwengai
 * @date: 2019-03-19
 * @file: 404页面
 */

import React from 'react';
import { Link } from 'react-router-dom';

function NotFound() {
  return (
    <div style={{ textAlign: 'center' }}>
      没找到您请求的页面，
      <Link to="/">返回首页</Link>
    </div>
  );
}

export default NotFound;
