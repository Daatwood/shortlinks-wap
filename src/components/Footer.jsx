import React from 'react';

const Footer = ({link, creator}) => {
  const year = new Date().getFullYear();
  return (
    <div className='footer'>
      © {year}. Made by <a href={link} target='_blank' rel='noreferrer' >{creator}</a>
    </div>
  )
}
export default (Footer);