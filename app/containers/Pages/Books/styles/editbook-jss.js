const styles = theme => ({
  flex: {
    flex: 1,
  },

  crudTableRoot: {
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(2),
  },

  field: {
    width: '100%',
    marginBottom: 20,
  },

  fieldBasic: {
    width: '100%',
    marginBottom: 20,
    marginTop: 10
  },

  inlineWrap: {
    display: 'flex',
    flexDirection: 'row'
  },

  button: {
    display: 'table',
    width: '100%',
    height: '100%',
    background: theme.palette.background.paper,
    borderRadius: theme.spacing(1.5),
    '&:hover': {
      background: theme.palette.type === 'dark' ? theme.palette.grey[700] : theme.palette.secondary.light
    },
    '& > span:first-child': {
      display: 'table-row',
    },
    '& $icon': {
      margin: '0 auto',
      display: 'table-cell',
      fontSize: 32,
    },
    '& $text': {
      width: 210,
      textAlign: 'left',
      paddingLeft: theme.spacing(1),
      verticalAlign: 'middle',
      display: 'table-cell'
    },
    '& $info': {
      display: 'block',
      textTransform: 'none',
      color: theme.palette.grey[500],
      whiteSpace: 'initial'
    }
  },
  
  upload: {
    margin: theme.spacing(1)
  },

  inputUpload: {
    display: 'none',
  },
});

export default styles;
