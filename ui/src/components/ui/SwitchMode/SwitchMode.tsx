import { Spacer, Switch, useTheme } from '@nextui-org/react'
import { useTheme as useNextTheme } from 'next-themes'

const SwitchMode: React.FunctionComponent = () => {
    const { setTheme } = useNextTheme();
    const { isDark } = useTheme();
    return (
        <>
            <Spacer y={2.5} />
            <Switch
                checked={isDark}
                onChange={(e) => setTheme(e.target.checked ? 'dark' : 'light')}
            />
        </>
    )
}

export default SwitchMode