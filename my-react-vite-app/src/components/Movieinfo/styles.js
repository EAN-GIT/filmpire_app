import { makeStyles } from "@mui/styles";

export default makeStyles((theme) => ({
    containerSpaceAround:{
        display:"flex",
        justifyContent:"space-around",
        [theme.breakepoints.down('sm')]:{
            flexDirection:'column',
            flexwrap:'wrap'
        }
    },
    poster:{
        borderRadius:'20px',
        boxShadow:'0.5em 1em 1em rgb(64, 64, 70)',
        width : '80%',
        [theme.breakepoints.down('md')]:{
            margin:'0 auto',
            width:'50%',
            height:'350px',
        },
        [theme.breakepoints.down('sm')]:{
            margin:'0 auto',
            width:'100%',
            height:'350px',
            marginBottom:'30px'
        },
    },genresContainer:{
        marging:"10px 0 !important"
        ,display:'flex',
        justifyContent:'space-around'
    },
    genreImage:{
    filter: theme.palette.mode === 'dark' && 'invert(1)',
    marginRight:'10px'
    },
    links:{
        display:'flex',
        justifyContent:'center',
        [theme.breakepoints.down('sm')]:{
           padding:'0.5rem 1rem'
        }

    }
}));
