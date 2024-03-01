import { Button, Typography } from '@mui/material';
import React from 'react';
import useStyles from './styles';

const Pagination = ({ setPage, currentPage, totalPages }) => {
  const classes = useStyles();

  
  
  
  const toNextPage = () => {
      if(currentPage !== totalPages){
          setPage((prev) => prev + 1)
        }
    };
    
    const toPrevPage = () => {
        if(currentPage !== 1){
            setPage((prev) => prev - 1)
        }
    };

    if(totalPages === 0) return null;
  return (
    <div className={classes.container}>
      <Button
        variant='contained'
        className={classes.button}
        type='button'
        color='primary'
        onClick={toPrevPage}
        disabled={currentPage === 1}
      >
        Prev
      </Button>
      <Typography variant='h4' className={classes.pageNumber}>
        {currentPage}
      </Typography>
      <Button
        variant='contained'
        className={classes.button}
        type='button'
        color='primary'
        onClick={toNextPage}
        disabled={currentPage === totalPages}

        
      >
        Next
      </Button>
    </div>
  );
};

export default Pagination;
