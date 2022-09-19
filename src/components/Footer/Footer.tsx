import React from 'react';
import { Box } from '@material-ui/core';
import { ReactComponent as YeeldxIcon } from 'assets/images/yeeldxIcon.svg';
import 'components/styles/Footer.scss';

const Footer: React.FC = () => {
  const copyrightYear = new Date().getFullYear();

  return (
    <Box className='footer'>
      {/* <YeeldxIcon /> */}
      <p>© {copyrightYear} HalalSwap.</p>
    </Box>
  );
};

export default Footer;
