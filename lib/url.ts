import qs from 'query-string'

interface FormUrlQueryProps {
  params: string
  key: string
  value: string
}

export const formUrlQuery = ({
  params,
  key,
  value
}: FormUrlQueryProps): string => {
  const queryString = qs.parse(params)

  queryString[key] = value

  return qs.stringifyUrl({
    url: window.location.pathname,
    query: queryString
  })
}

interface RemoveKeysFromUrlQueryProps
  extends Pick<FormUrlQueryProps, 'params'> {
  keysToRemove: string[]
}

export const removeKeysFromUrlQuery = ({
  params,
  keysToRemove
}: RemoveKeysFromUrlQueryProps): string => {
  const queryString = qs.parse(params)

  keysToRemove.forEach((key) => {
    // eslint-disable-next-line @typescript-eslint/no-dynamic-delete -- This is fine
    delete queryString[key]
  })

  return qs.stringifyUrl(
    {
      url: window.location.pathname,
      query: queryString
    },
    { skipNull: true }
  )
}
