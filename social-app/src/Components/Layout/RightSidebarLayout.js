import React from 'react';

export default function RightSidebarLayout({children}){
  return (
    <div className=" col-3 d-flex flex-column ps-1" id='scrollableDiv'>
      {children}
    </div>
  )
}