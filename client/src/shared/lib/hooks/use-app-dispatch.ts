import { AppDispatch } from '@/processes/store'
import { useDispatch } from 'react-redux'

export const useAppDispatch = useDispatch<AppDispatch>
