import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { updateusersettings, getCurrentUser } from '../Store/Slice/authSlice'

function UserSettings() {
    const { userData } = useSelector(state => state.user)
    const [settings, setSettings] = React.useState()
    const dispatch = useDispatch()

    const updateSettings = (e) => {

        let usersettings = {
            ...settings,
            [e.target.id]: e.target.checked
        }

        setSettings(usersettings)
        dispatch(updateusersettings(usersettings))
    }

    useEffect(() => {
        dispatch(getCurrentUser())
    }, [])

    useEffect(() => {
        setSettings({
            showProfilePic: userData?.settings?.usersettings?.showProfilePic,
            allowTagging: userData?.settings?.usersettings?.allowTagging,
            showMessage: userData?.settings?.usersettings?.showMessage
        })
    }, [userData])

    useEffect(() => {
        console.log('settings===>', userData.settings)
    }, [settings, userData])


    return (
        <>
            <div>UserSettings</div>

            <div className='flex p-5'>
                <label className='p-3'> showProfilePic </label>
                <input type="checkbox" id='showProfilePic'
                    onClick={(e) => { updateSettings(e) }}
                    checked={settings?.showProfilePic}
                />
            </div>
            <div className='flex p-5' >
                <label className='p-3'> showMessage </label>
                <input type="checkbox" id='showMessage'
                    onClick={(e) => { updateSettings(e) }}
                    checked={settings?.showMessage}
                />
            </div>
            <div className='flex p-5'>
                <label className='p-3'> allowTagging </label>
                <input type="checkbox" id='allowTagging'
                    onClick={(e) => { updateSettings(e) }}
                    checked={settings?.allowTagging}
                />
            </div>

        </>
    )
}

export default UserSettings