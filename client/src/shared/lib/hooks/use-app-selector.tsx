import { RootState } from '@/processes/store'
import { TypedUseSelectorHook, useSelector } from 'react-redux'

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
