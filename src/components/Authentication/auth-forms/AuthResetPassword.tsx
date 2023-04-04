import AnimateButton from '@/components/Button/AnimatedButton'
import { resetPassword } from '@/services'
import { StringColorProps } from '@/types'
import { strengthColor, strengthIndicator } from '@/utils/password-strength'
// assets
import Visibility from '@mui/icons-material/Visibility'
import VisibilityOff from '@mui/icons-material/VisibilityOff'
import {
  Box,
  Button,
  CircularProgress,
  FormControl,
  FormHelperText,
  Grid,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  Typography,
} from '@mui/material'
// material-ui
import { useTheme } from '@mui/material/styles'
import { Formik } from 'formik'
// project imports
import { useRouter } from 'next/router'
import React, { useState } from 'react'
// third party
import * as Yup from 'yup'

// ========================|| FIREBASE - RESET PASSWORD ||======================== //

const AuthResetPassword = ({ ...others }) => {
  const theme = useTheme()
  const router = useRouter()

  const { email, code, new_signup } = router.query

  const [showPassword, setShowPassword] = React.useState(false)
  const [strength, setStrength] = React.useState(0)
  const [level, setLevel] = useState<StringColorProps>()
  const [loading, setLoading] = useState(false)
  const [pwError, setPwError] = useState(false)

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword)
  }

  const handleMouseDownPassword = (event: React.SyntheticEvent) => {
    event.preventDefault()
  }

  const changePassword = (value: string) => {
    const temp = strengthIndicator(value)
    setStrength(temp)
    setLevel(strengthColor(temp))
  }

  return (
    <Formik
      initialValues={{
        password: '',
        confirmPassword: '',
      }}
      validationSchema={Yup.object().shape({
        password: Yup.string().max(255).required('Password is required'),
        confirmPassword: Yup.string().when('password', {
          is: (val: string) => !!(val && val.length > 0),
          then: Yup.string().oneOf(
            [Yup.ref('password')],
            'Both Password must be match!',
          ),
        }),
      })}
      onSubmit={async (values: any) => {
        setLoading(true)
        const obj = {
          email: email,
          confirmationCode: code,
          password: values.password,
          newSignup: new_signup ? new_signup : false,
        }

        resetPassword(obj).then((res) => {
          if (res.data && res.data.message == 'success') {
            if (res.data.new_signup) {
              setTimeout(() => {
                if (res.data.access_token) {
                  localStorage.setItem(
                    'Zoomprop_AuthToken',
                    res.data.access_token,
                  )
                  window.location.href = '/'
                }
              }, 3000)
            } else {
              setTimeout(() => {
                window.location.href = '/sign-in'
              }, 3000)
            }
          } else {
            setPwError(res.data.message)
            setLoading(false)
          }
        })
      }}
    >
      {({
        errors,
        handleBlur,
        handleChange,
        handleSubmit,
        isSubmitting,
        touched,
        values,
      }) => (
        <form noValidate onSubmit={handleSubmit} {...others}>
          <FormControl
            fullWidth
            error={Boolean(touched.password && errors.password)}
            sx={{ ...theme.typography.customInput }}
          >
            <InputLabel htmlFor="outlined-adornment-password-reset">
              Password
            </InputLabel>
            <OutlinedInput
              id="outlined-adornment-password-reset"
              type={showPassword ? 'text' : 'password'}
              value={values.password}
              name="password"
              onBlur={handleBlur}
              onChange={(e) => {
                handleChange(e)
                changePassword(e.target.value)
              }}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                    edge="end"
                    size="large"
                  >
                    {showPassword ? <Visibility /> : <VisibilityOff />}
                  </IconButton>
                </InputAdornment>
              }
              inputProps={{}}
            />
          </FormControl>
          {touched.password && errors.password && (
            <FormControl fullWidth>
              <FormHelperText error id="standard-weight-helper-text-reset">
                {errors.password}
              </FormHelperText>
            </FormControl>
          )}
          {strength !== 0 && (
            <FormControl fullWidth>
              <Box sx={{ mb: 2 }}>
                <Grid container spacing={2} alignItems="center">
                  <Grid item>
                    <Box
                      style={{ backgroundColor: level?.color }}
                      sx={{
                        width: 320,
                        height: 8,
                        borderRadius: '7px',
                      }}
                    />
                  </Grid>
                  <Grid item>
                    <Typography variant="subtitle1" fontSize="0.75rem">
                      {level?.label}
                    </Typography>
                  </Grid>
                </Grid>
              </Box>
            </FormControl>
          )}

          <FormControl
            fullWidth
            error={Boolean(touched.confirmPassword && errors.confirmPassword)}
            sx={{ ...theme.typography.customInput }}
          >
            <InputLabel htmlFor="outlined-adornment-confirm-password">
              Confirm Password
            </InputLabel>
            <OutlinedInput
              id="outlined-adornment-confirm-password"
              type="password"
              value={values.confirmPassword}
              name="confirmPassword"
              label="Confirm Password"
              onBlur={handleBlur}
              onChange={handleChange}
              inputProps={{}}
            />
          </FormControl>

          {touched.confirmPassword && errors.confirmPassword && (
            <FormControl fullWidth>
              <FormHelperText
                error
                id="standard-weight-helper-text-confirm-password"
              >
                {' '}
                {errors.confirmPassword}{' '}
              </FormHelperText>
            </FormControl>
          )}

          {pwError && (
            <Box
              sx={{
                mt: 3,
              }}
            >
              <FormHelperText error>{pwError}</FormHelperText>
            </Box>
          )}
          <Box
            sx={{
              mt: 1,
            }}
          >
            <AnimateButton>
              <Button
                disableElevation
                disabled={isSubmitting}
                fullWidth
                size="large"
                type="submit"
                variant="contained"
                color="secondary"
              >
                {loading ? <CircularProgress /> : `Reset Password`}
              </Button>
            </AnimateButton>
          </Box>
        </form>
      )}
    </Formik>
  )
}

export default AuthResetPassword
