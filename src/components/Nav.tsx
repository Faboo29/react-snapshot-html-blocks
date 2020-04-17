import React, { useState } from 'react'
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles'
import InputLabel from '@material-ui/core/InputLabel'
import MenuItem from '@material-ui/core/MenuItem'
import FormControl from '@material-ui/core/FormControl'
import Select from '@material-ui/core/Select'
import { ILocale } from '../types/content'

interface NavProps {
  locales: ILocale[]
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    formControl: {
      margin: theme.spacing(1),
      minWidth: 120,
    },
    selectEmpty: {
      marginTop: theme.spacing(2),
    },
  })
)

const Nav: React.SFC<NavProps> = () => {
  const classes = useStyles()
  const [locale, setLocale] = useState('')
  const handleChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setLocale(event.target.value as string)
  }

  return (
    <FormControl className={classes.formControl}>
      <InputLabel id="select-locale">Locale</InputLabel>
      <Select
        labelId="select-locale"
        id="locale-select-input"
        value={locale}
        onChange={handleChange}
      ></Select>
    </FormControl>
  )
}

export default Nav
