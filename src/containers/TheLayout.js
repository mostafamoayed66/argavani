import React from 'react';
import {
  TheFooter,
  TheHeader
} from './index';

const TheLayout = (props) => {

  return (
    <div className="c-app c-default-layout" style={{backgroundColor: '#fff'}}>
      <div className="c-wrapper">
        <TheHeader />
        <div className="c-body">
          {props.children}
        </div>
        <TheFooter />
      </div>
    </div>
  )
}

export default TheLayout
