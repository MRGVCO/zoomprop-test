import { PropsWithChildren } from 'react'

interface ConditionProps extends PropsWithChildren {
  match: boolean
}

const Condition = ({ match, children }: ConditionProps) => {
  if (!match) return null
  return <>{children}</>
}

export default Condition
